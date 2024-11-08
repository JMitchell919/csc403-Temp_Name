import { handleButtonClick } from './index.js';

const userInteractions = {
    likes: [],
    dislikes: []
};

document.addEventListener('DOMContentLoaded', async function() {
    document.getElementById('display-name').textContent = '-';
    document.getElementById('username').textContent = localStorage.getItem('username');
    document.getElementById('email').textContent = '-';

    document.getElementById('followers-count').textContent = '-';
    document.getElementById('following-count').textContent = '-';
    document.getElementById('total-post-count').textContent = '-';
    document.getElementById('total-likes-count').textContent = '-';
    document.getElementById('total-dislikes-count').textContent = '-'; 

    // Get user's interactions
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
    
    // Construct the feed
    const postsSection = document.getElementById('posts-section');
    constructFeed()

    // Function to create a new post HTML element
    function constructPost(post) {
        // Create a div for the post
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.setAttribute('post-id', post.id);

        // Format the date
        const dateObject = new Date(post.date);
        const printDate = dateObject.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })

        // Check if the user liked or disliked the post
        const isLiked = userInteractions.likes.includes(String(post.id));
        const isDisliked = userInteractions.dislikes.includes(String(post.id));
        
        // HTML template
        postDiv.innerHTML = `
            <div class="highlight">
                <a href="view?postId=${post.id}" class="post-anchor">
                    <div class="post-header">
                        <div class="post-author no-redirect">
                            <img src="${post.profilePic}" alt="Profile Picture" class="profile-pic">
                            <p class="post-author">${post.username}</p>
                        </div>
                        <div class="post-info">
                            <p class="post-location">${post.location}</p>
                            <p class="post-date">${printDate}</p>
                        </div>
                    </div>
                    
                    <p class="post-text no-redirect">${post.text}</p>
            
                    <div class="picture-container">
                        ${post.postPics && post.postPics.length > 0 ? post.postPics.map(pic => `<img src="../assets/postImages/${pic}" alt="Picture" class="pic">`).join('') : ''}
                    </div>
            
                    <div class="post-footer">
                        <button class="like-button no-redirect ${isLiked ? 'liked' : ''}">
                            <i class="fa-solid fa-thumbs-up"></i>
                            <p class="comment-count"><span class="like-count">${post.likeCount}</span></span></p>
                        </button>
                        
                        <button class="dislike-button no-redirect ${isDisliked ? 'disliked' : ''}">
                            <i class="fa-solid fa-thumbs-down"></i>
                            <p class="comment-count"><span class="dislike-count">${post.dislikeCount}</span></span></p>
                        </button>
                        
                        <button class="comment-button">
                            <i class="fa-solid fa-comment"></i>
                            <p class="comment-count"><span class="comment-count-number">${post.commentCount}</span></p>
                        </button>
                    </div>
                </a>
            </div>
        `;
    
        // Prevent redirect if a no-redirect element is clicked
        postDiv.querySelector('.post-anchor').addEventListener('click', function(event) {
            if (event.target.closest('.no-redirect')) {
                event.preventDefault();
            }
        });
        
        // Add click event listener to images for enlarging
        postDiv.querySelectorAll('.pic').forEach(image => {
            image.addEventListener('click', function(event) {
                event.preventDefault();
                modal.style.display = 'block';
                modalImg.src = this.src;
                document.body.classList.add('no-scroll');
            });
        });

        // Append the post to the posts section
        postsSection.appendChild(postDiv);
    }

    // Fetch posts
    async function constructFeed() {
        // Fetch config
        let apiDomain = window.location.hostname === "localhost" ? "http://localhost" : `http://${window.location.hostname}`;
        let apiPort = '';
        await fetch('/config')
            .then(response => response.json())
            .then(config => {
                apiPort = config.apiPort;
            })
            .catch(error => {
                console.error('Error fetching config:', error);
            });

        fetch(`${apiDomain}:${apiPort}/feed?algorithm=user&username=${localStorage.getItem('username')}`)
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    constructPost(post)
                });
            })
            .catch(error => {
                console.error("Error fetching from /posts: ", error);
            });

        // Clear previous event listeners for like and dislike buttons
        postsSection.removeEventListener('click', handleButtonClick);
        postsSection.addEventListener('click', handleButtonClick);
    }

    // Get the modal and modal content elements
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('enlarged-image');
    const closeBtn = document.querySelector('.close');

    // Add click event listener to close the modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none'; // Hide modal
        document.body.classList.remove('no-scroll'); // Enable scrolling of main page
    });

    modal.addEventListener('click', function() {
        modal.style.display = 'none'; // Hide modal
        document.body.classList.remove('no-scroll'); // Enable scrolling of main page
    });

    modalImg.addEventListener('click', function(event) {
        event.stopPropagation();
    })
});