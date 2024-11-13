// Global vars
const userInteractions = {
    likes: [],
    dislikes: []
};

// Once DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    if (window.location.pathname != '/') {
        return;
    }

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

    // Apply drop down functionality
    document.querySelector('.dropdown-button').addEventListener('click', function() {
        const subheader = document.getElementById('subheader-container');
        const dropdownButton = document.querySelector('.dropdown-button');
        subheader.classList.toggle('expanded');
        dropdownButton.classList.toggle('expanded');
    });

    document.getElementById('popularSortBtn').addEventListener('click', function() {
        feedAlgorithm = 'Popular';
        extraParams = '';
        constructFeed();
    });
    document.getElementById('hotSortBtn').addEventListener('click', function() {
        feedAlgorithm = 'Hot';
        extraParams = '';
        constructFeed();
    });
    document.getElementById('nearSortBtn').addEventListener('click', function() {
        feedAlgorithm = 'Near';
        extraParams = `&userLat=${localStorage.getItem('overrideLatitude') || localStorage.getItem('latitude')}&userLon=${localStorage.getItem('overrideLongitude') || localStorage.getItem('longitude')}`
        constructFeed();
    });
    document.getElementById('recentSortBtn').addEventListener('click', function() {
        feedAlgorithm = 'Recent';
        extraParams = '';
        constructFeed();
    });

    // Construct the feed
    const postsSection = document.getElementById('posts-section');
    let feedAlgorithm = 'Popular'
    let extraParams = '';
    constructFeed();


    // Function to create a new post HTML element
    function constructPost(postData) {
        // Create a div for the post
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.setAttribute('post-id', postData.id);

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
        postDiv.innerHTML = `
            <div class="highlight">
                <a href="view?postId=${postData.id}" class="post-anchor">
                    <div class="post-header">
                        <div class="post-author no-redirect">
                            <img src="${postData.profilePic}" alt="Profile Picture" class="profile-pic" onerror="this.onerror=null; this.src='../assets/images/defaultPfp.jpg';">
                            <p class="post-author">${postData.username}</p>
                        </div>
                        <div class="post-info">
                            <p class="post-location">${postData.location}</p>
                            <p class="post-date">${printDate}</p>
                        </div>
                    </div>
                    
                    <p class="post-text no-redirect">${postData.text}</p>
            
                    <div class="picture-container">
                        ${postData.postPics && postData.postPics.length > 0 ? postData.postPics.map(pic => `<img src="../assets/postImages/${pic}" alt="Picture" class="pic">`).join('') : ''}
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
        postsSection.appendChild(postDiv);
    }

    // Fetch posts
    async function constructFeed() {
        // Clear previous feed
        postsSection.innerHTML = ''

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

        console.log(`${apiDomain}:${apiPort}/feed?algorithm=${feedAlgorithm}${extraParams}`);
        fetch(`${apiDomain}:${apiPort}/feed?algorithm=${feedAlgorithm}${extraParams}`)
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

// Handle button clicks
function handleButtonClick(event) {

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


    const likeButton = event.target.closest('.like-button');
    const dislikeButton = event.target.closest('.dislike-button');

    if (likeButton) {
        handleLikeButtonClick(likeButton);
    }

    if (dislikeButton) {
        handleDislikeButtonClick(dislikeButton);
    }
}

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

// localStorage.getItem('userId')

async function interact(postId, method, type) { 
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
    .then(data => {})
    .catch(error => console.error('No workey: ', error));
}

export { handleButtonClick };

