// Once DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Get log in status
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

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

    // Function to create a new post HTML element
    function constructPost(postData) {
        // Create a div for the post
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.setAttribute('post-id', postData.id);

        // Check if the user liked or disliked the post
        const isLiked = userInteractions.likes.includes(String(postData.id));
        const isDisliked = userInteractions.dislikes.includes(String(postData.id));
        console.log(`${postData.id} ${isLiked} ${isDisliked}`)
        
        // HTML template
        postDiv.innerHTML = `
            <div class="highlight">
                <a href="view?postId=${postData.id}" class="post-anchor">
                    <div class="post-header">
                        <div class="post-author no-redirect">
                            <img src="${postData.profilePic}" alt="Profile Picture" class="profile-pic">
                            <p class="post-author">${postData.username}</p>
                        </div>
                        <div class="post-info">
                            <p class="post-location">${postData.location}</p>
                            <p class="post-date">${postData.date}</p>
                        </div>
                    </div>
                    
                    <p class="post-text no-redirect">${postData.text}</p>
            
                    <div class="picture-container">
                        ${postData.postPics && postData.postPics.length > 0 ? postData.postPics.map(pic => `<img src="${pic}" alt="Picture" class="pic">`).join('') : ''}
                    </div>
            
                    <div class="post-footer">
                        <button class="like-button no-redirect ${isLiked ? 'liked' : ''}">
                            <i class="fa-solid fa-thumbs-up"></i>
                            <p class="comment-count"><span class="like-count">${postData.likeCount}</span></span></p>
                        </button>
                        
                        <button class="dislike-button no-redirect ${isDisliked ? 'disliked' : ''}">
                            <i class="fa-solid fa-thumbs-down"></i>
                            <p class="comment-count"><span class="dislike-count">${postData.dislikeCount}</span></span></p>
                        </button>
                        
                        <button class="comment-button">
                            <i class="fa-solid fa-comment"></i>
                            <p class="comment-count"><span class="comment-count-number">${postData.commentCount}</span></p>
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
        document.getElementById('posts-section').appendChild(postDiv);
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

    // Fetch posts
    fetch(`${apiDomain}:${apiPort}/posts`)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                // post.postPics = [
                //     'https://media.discordapp.net/attachments/880342502660530176/1295663084056346727/monk_autism.png?ex=670f77c7&is=670e2647&hm=0aa3be9dbd1434b6db5743c251f1a8d237e39b0569be9c4ff95c3326b842e51f&=&format=webp&quality=lossless&width=381&height=391',
                //     'https://media.discordapp.net/attachments/880342502660530176/1295699271064092766/image0.jpg?ex=670f997b&is=670e47fb&hm=ea9c83a5625e192e14d8cd0f870fc99f9cd75e01bb9a4133633ecd17b875b9f0&=&format=webp&width=623&height=822'
                // ]
                constructPost(post)
            });
        })
        .catch(error => {
            console.error("Error fetching from /posts: ", error);
        });
    
    // Add event listener to all like and dislike buttons
    document.getElementById('posts-section').addEventListener('click', function(event) {
        const likeButton = event.target.closest('.like-button');
        const dislikeButton = event.target.closest('.dislike-button');

        if (likeButton) {
            handleLikeButtonClick(likeButton);
        }

        if (dislikeButton) {
            handleDislikeButtonClick(dislikeButton);
        }
    });

    // Apply drop down functionality
    document.querySelector('.dropdown-button').addEventListener('click', function() {
        const subheader = document.getElementById('subheader-container');
        const dropdownButton = document.querySelector('.dropdown-button');
        subheader.classList.toggle('expanded');
        dropdownButton.classList.toggle('expanded');
    });

    // Handle the like button click
    function handleLikeButtonClick(likeButton) {
        const postId = likeButton.closest('.post').getAttribute('post-id');

        const likeCountSpan = likeButton.querySelector('.like-count');
        let currentLikes = parseInt(likeCountSpan.textContent, 10);

        const dislikeButton = likeButton.closest('.post-footer').querySelector('.dislike-button');
        const dislikeCountSpan = dislikeButton.querySelector('.dislike-count');
        let currentDislikes = parseInt(dislikeCountSpan.textContent, 10);

        if (likeButton.classList.contains('liked')) {
            // User is removing the like
            userInteractions.likes = userInteractions.likes.filter(likedPostId => likedPostId !== postId);
            currentLikes--;
            likeButton.classList.remove('liked');

            interact(postId, "remove", "like");

        } else {
            // User is liking the post
            userInteractions.likes.push(postId);
            currentLikes++;
            likeButton.classList.add('liked');
            likeButton.classList.add('animate-like'); // Add animation

            interact(postId, "add", "like");

            // If the user had disliked the post before, remove the dislike
            if (dislikeButton.classList.contains('disliked')) {
                userInteractions.dislikes = userInteractions.dislikes.filter(dislikedPostId => dislikedPostId !== postId);
                currentDislikes--;
                dislikeButton.classList.remove('disliked');

                interact(postId, "remove", "dislike");
            }
        }

        // Save interactions to localStorage
        localStorage.setItem('userInteractions', JSON.stringify(userInteractions));

        // Update the like and dislike counts in the UI
        likeCountSpan.textContent = currentLikes;
        dislikeCountSpan.textContent = currentDislikes;

        // Remove animation class after the animation completes
        setTimeout(() => {
            likeButton.classList.remove('animate-like');
        }, 200);
    }

    // Handle the dislike button click
    function handleDislikeButtonClick(dislikeButton) {
        const postId = dislikeButton.closest('.post').getAttribute('post-id');

        const dislikeCountSpan = dislikeButton.querySelector('.dislike-count');
        let currentDislikes = parseInt(dislikeCountSpan.textContent, 10);

        const likeButton = dislikeButton.closest('.post-footer').querySelector('.like-button');
        const likeCountSpan = likeButton.querySelector('.like-count');
        let currentLikes = parseInt(likeCountSpan.textContent, 10);

        if (dislikeButton.classList.contains('disliked')) {
            // User is removing the dislike
            userInteractions.dislikes = userInteractions.dislikes.filter(dislikedPostId => dislikedPostId !== postId);
            currentDislikes--;
            dislikeButton.classList.remove('disliked');

            interact(postId, "remove", "dislike");

        } else {
            // User is disliking the post
            userInteractions.dislikes.push(postId);
            currentDislikes++;
            dislikeButton.classList.add('disliked');
            dislikeButton.classList.add('animate-dislike'); // Add animation

            interact(postId, "add", "dislike");

            // If the user had liked the post before, remove the like
            if (likeButton.classList.contains('liked')) {
                userInteractions.likes = userInteractions.likes.filter(likedPostId => likedPostId !== postId);
                currentLikes--;
                likeButton.classList.remove('liked');

                interact(postId, "remove", "like");
            }
        }

        // Save interactions to localStorage
        localStorage.setItem('userInteractions', JSON.stringify(userInteractions));

        // Update the dislike and like counts in the UI
        dislikeCountSpan.textContent = currentDislikes;
        likeCountSpan.textContent = currentLikes;

        // Remove animation class after the animation completes
        setTimeout(() => {
            dislikeButton.classList.remove('animate-dislike');
        }, 200);
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

    document.getElementById('enlarged-image').addEventListener('click', function(event) {
        event.stopPropagation();
    })

    // localStorage.getItem('userId')

    function interact(postId, method, type) { 
        fetch(`${apiDomain}:${apiPort}/interaction?userId=${1}&postId=${postId}&method=${method}&type=${type}`, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('No worky: ', response);
            }
        })
        .then(data => {
            console.log('Does worky: ', data);
        })
        .catch(error => console.error('No workey: ', error));
    }
});

