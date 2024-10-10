// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Once DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get log in status
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Function to create a new post HTML element
    function createPost(postData) {
        // Create a div for the post
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.setAttribute('data-post-id', postData.id);

        // HTML template
        postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-author">
                    <img src="${postData.profilePic}" alt="Profile Picture" class="profile-pic">
                    <p class="post-author">${postData.username}</p>
                </div>
                <div class="post-info">
                    <p class="post-location">${postData.location}</p>
                    <p class="post-date">${postData.date}</p>
                </div>
            </div>
            <p class="post-text">${postData.text}</p>
            <div class="picture-container">
                ${postData.postPics && postData.postPics.length > 0 ? postData.postPics.map(pic => `<img src="${pic}" alt="Picture" class="pic">`).join('') : ''}
            </div>
            <div class="post-footer">
                <button class="like-button">
                    <i class="fa-solid fa-thumbs-up"></i>
                    <p class="comment-count"><span class="like-count">${postData.likeCount}</span></span></p>
                </button>
                
                <button class="dislike-button">
                    <i class="fa-solid fa-thumbs-down"></i>
                    <p class="comment-count"><span class="dislike-count">${postData.dislikeCount}</span></span></p>
                </button>
                
                <button class="comment-button">
                    <i class="fa-solid fa-comment"></i>
                    <p class="comment-count"><span class="comment-count-number">${postData.commentCount}</span></p>
                </button>
            </div>`;

        // Append the post to the posts section
        document.getElementById('posts-section').appendChild(postDiv);
    }

    // ignore all this mess. Ill clean it later

    // just some dummy post data
    // const examplePostsData = [
    //     // {
    //     //     id: 0,
    //     //     username: 'temp_user',
    //     //     profilePic: '../assets/images/temp_pfp_1.png',
    //     //     location: 'temp_location',
    //     //     date: '2024-09-25',
    //     //     text: 'Ayo look at this crazy horse!',
    //     //     postPics: [
    //     //         '../assets/images/temp_pic_1.png',
    //     //     ],
    //     //     likeCount: 5,
    //     //     dislikeCount: 1,
    //     //     commentCount: 10,
    //     // },
    //     {
    //         id: 1,
    //         username: 'Clab',
    //         profilePic: '../assets/images/temp_pfp_2.png',
    //         location: 'Galveston, Texas',
    //         date: '2024-03-14',
    //         text: 'Me and the boys.',
    //         postPics: [
    //             '../assets/images/temp_pic_2.png',
    //         ],
    //         likeCount: 15,
    //         dislikeCount: 2,
    //         commentCount: 25
    //     },
    //     {
    //         id: 2,
    //         username: 'Clab',
    //         profilePic: '../assets/images/temp_pfp_2.png',
    //         location: 'Ruston, Louisiana',
    //         date: '2024-10-1',
    //         text: 'First test from a post created using a template!',
    //         postPics: [
    //             'https://pbs.twimg.com/media/GXSejYjbkAAwFVJ?format=jpg&name=900x900',
    //             'https://pbs.twimg.com/media/GYcEE2obEAAyMZU?format=jpg&name=medium'
    //         ],
    //         likeCount: 15,
    //         dislikeCount: 2,
    //         commentCount: 25
    //     }
    // ]

    // Loop through example posts data
    // examplePostsData.forEach(postData => createPost(postData));

    // Get actual posts from API (remove dummy data and loop when implemented)
    // fetch(`${process.env.DB_DB_DOMAIN}/post`)
    //     .then(response => response.json())
    //     .then(data => function() {
    //         data.forEach(postData => createPost(postData));
    //     })
    //     .catch(error => console.error('Error:', error));
    
    fetch('http://localhost:8080/post')
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            createPost(data);
        })
        .catch(error => {
            console.error("Something's wrong dumby: ", error);
        })

    
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

    // Handle the like button click
    function handleLikeButtonClick(likeButton) {
        const likeCountSpan = likeButton.querySelector('.like-count');
        let currentLikes = parseInt(likeCountSpan.textContent, 10);

        const dislikeButton = likeButton.closest('.post-footer').querySelector('.dislike-button');
        const dislikeCountSpan = dislikeButton.querySelector('.dislike-count');
        let currentDislikes = parseInt(dislikeCountSpan.textContent, 10);

        if (likeButton.classList.contains('liked')) {
            // User is removing the like
            currentLikes--;
            likeButton.classList.remove('liked');
        } else {
            // User is liking the post
            currentLikes++;
            likeButton.classList.add('liked');
            likeButton.classList.add('animate-like'); // Add animation

            // API ADD LIKE TO POST

            // If the user had disliked the post before, remove the dislike
            if (dislikeButton.classList.contains('disliked')) {
                currentDislikes--;
                dislikeButton.classList.remove('disliked');

                // API REMOVE DISLIKE FROM POST
            }
        }

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
        const dislikeCountSpan = dislikeButton.querySelector('.dislike-count');
        let currentDislikes = parseInt(dislikeCountSpan.textContent, 10);

        const likeButton = dislikeButton.closest('.post-footer').querySelector('.like-button');
        const likeCountSpan = likeButton.querySelector('.like-count');
        let currentLikes = parseInt(likeCountSpan.textContent, 10);

        if (dislikeButton.classList.contains('disliked')) {
            // User is removing the dislike
            currentDislikes--;
            dislikeButton.classList.remove('disliked');
        } else {
            // User is disliking the post
            currentDislikes++;
            dislikeButton.classList.add('disliked');
            dislikeButton.classList.add('animate-dislike'); // Add animation

            // API ADD DISLIKE TO POST

            // If the user had liked the post before, remove the like
            if (likeButton.classList.contains('liked')) {
                currentLikes--;
                likeButton.classList.remove('liked');

                // API REMOVE LIKE FROM POST
            }
        }

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

    // Get all images with the class 'clickable-image'
    const images = document.querySelectorAll('.picture-container .pic');

    // Add click event listener to each image
    images.forEach(image => {
        image.addEventListener('click', function() {
            modal.style.display = 'block'; // Show modal
            modalImg.src = this.src;       // Set modal image to clicked image
            document.body.classList.add('no-scroll'); // Disable scrolling of main page
        });
    });

    // Add click event listener to close the modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none'; // Hide modal
        document.body.classList.remove('no-scroll'); // Enable scrolling of main page
    });
});

