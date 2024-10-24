import { handleButtonClick, interact } from './index.js';

document.addEventListener('DOMContentLoaded', async function() {
    // Grab postId from url
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');


    // Get user's interactions
    const userInteractions = {
        likes: [],
        dislikes: []
    };
    const storedInteractions = localStorage.getItem('userInteractions');

    // Check if there are stored interactions, if not initialize them
    if (storedInteractions) {
        try {
            // Attempt to parse stored interactions
            const parsedInteractions = JSON.parse(storedInteractions);
            // Ensure the parsed object has the expected structure
            userInteractions.likes = parsedInteractions.likes || [];
            userInteractions.dislikes = parsedInteractions.dislikes || [];
        } catch (error) {
            console.error('Error parsing user interactions from localStorage:', error);
            // Reset if parsing fails
            localStorage.removeItem('userInteractions');
        }
    } else {
        // Initialize empty interactions in localStorage
        localStorage.setItem('userInteractions', JSON.stringify(userInteractions));
    }

    // Fetch config
    let apiDomain = '';
    let apiPort = '';

    await fetch('/config')
        .then(response => response.json())
        .then(config => {
            apiDomain = config.apiDomain;
            apiPort = config.apiPort;
        })
        .catch(error => {
            console.error('Error fetching config:', error);
        });

    // Fetch post from api
    fetch(`${apiDomain}:${apiPort}/post?id=${postId}`)
        .then(response => response.json())
        .then(postData => {
            // Populate post details
            const postContainer = document.getElementById('post');
            postContainer.setAttribute('post-id', postData.id);
            
            // Format the date
            const dateObject = new Date(postData.date);
            const printDate = dateObject.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })

            // Check if the user liked or disliked the post
            const isLiked = userInteractions.likes.includes(String(postData.id));
            const isDisliked = userInteractions.dislikes.includes(String(postData.id));
            
            // HTML template
            postContainer.innerHTML = `
                <div class="post-header">
                    <div class="post-author">
                        <img src="${postData.profilePic}" alt="Profile Picture" class="profile-pic">
                        <p class="post-author">${postData.username}</p>
                    </div>
                    <div class="post-info">
                        <p class="post-location">${postData.location}</p>
                        <p class="post-date">${printDate}</p>
                    </div>
                </div>
                
                <p class="post-text">${postData.text}</p>
        
                <div class="picture-container">
                    ${postData.postPics && postData.postPics.length > 0 ? postData.postPics.map(pic => `<img src="../assets/postImages/${pic}" alt="Picture" class="pic">`).join('') : ''}
                </div>
        
                <div class="post-footer">
                    <button class="like-button ${isLiked ? 'liked' : ''}">
                        <i class="fa-solid fa-thumbs-up"></i>
                        <p class="comment-count"><span class="like-count">${postData.likeCount}</span></span></p>
                    </button>
                    
                    <button class="dislike-button ${isDisliked ? 'disliked' : ''}">
                        <i class="fa-solid fa-thumbs-down"></i>
                        <p class="comment-count"><span class="dislike-count">${postData.dislikeCount}</span></span></p>
                    </button>
                    
                    <button class="comment-button">
                        <i class="fa-solid fa-comment"></i>
                        <p class="comment-count"><span class="comment-count-number">${postData.commentCount}</span></p>
                    </button>
                </div>
            `;

            // Modal and image enlargement logic
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('enlarged-image');
            const closeBtn = document.querySelector('.close');

            // Close the modal when clicking close button or outside modal
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            });

            modal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            });

            // Prevent closing modal when clicking on the image itself
            modalImg.addEventListener('click', function(event) {
                event.stopPropagation();
            });

            // Add event listener for enlarging images on click
            postContainer.querySelectorAll('.pic').forEach(image => {
                image.addEventListener('click', function() {
                    modal.style.display = 'flex';  // Use flex to center the modal content
                    modalImg.src = this.src;  // Set modal image src to clicked image src
                    document.body.classList.add('no-scroll');  // Disable page scroll
                });
            });

            // Add click event listener to like and dislike buttons
            postContainer.addEventListener('click', handleButtonClick);

        })
        .catch(error => console.error('Error fetching post:', error));

    // Get post-input
    const commentInput = document.getElementById('comment-input');

    commentInput.addEventListener('input', function() {
        // Reset height
        this.style.minHeight = 'auto';

        // Set height based on content
        this.style.minHeight = this.scrollHeight + 'px';
    })
});