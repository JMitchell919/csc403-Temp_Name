// hammed gurber
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
})

document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('show');
});

// Assume user is logged out
let isLoggedIn = false;

// Log out button functionality
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.reload();
    alert("You've been logged out.")
});

// Function to toggle buttons based on login state
function updateButtons() {
    if (isLoggedIn) {
        // User is logged in: show Post and Logout buttons, hide Login and Register
        document.getElementById('postButton').style.display = 'inline-block';
        document.getElementById('logoutButton').style.display = 'inline-block';
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('registerButton').style.display = 'none';
    } else {
        // User is not logged in: show Login and Register buttons, hide Post and Logout
        document.getElementById('postButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('loginButton').style.display = 'inline-block';
        document.getElementById('registerButton').style.display = 'inline-block';
    }
}

// When document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get log in status
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // Update header buttons
    updateButtons();

    // just some dummy post data
    const examplePostsData = [
        {
            username: 'temp_user',
            profilePic: '../assets/images/temp_pfp_1.png',
            location: 'temp_location',
            date: '2024-09-25',
            text: 'Ayo look at this crazy horse!',
            postPics: [
                '../assets/images/temp_pic_1.png',
            ],
            likeCount: 5,
            dislikeCount: 1,
            commentCount: 10,
        },
        {
            username: 'Clab',
            profilePic: '../assets/images/temp_pfp_2.png',
            location: 'Galveston, Texas',
            date: '2024-03-14',
            text: 'Me and the boys.',
            postPics: [
                '../assets/images/temp_pic_2.png',
            ],
            likeCount: 15,
            dislikeCount: 2,
            commentCount: 25
        },
        {
            username: 'Clab',
            profilePic: '../assets/images/temp_pfp_2.png',
            location: 'Ruston, Louisiana',
            date: '2024-10-1',
            text: 'First test from a post created using a template!',
            postPics: [
                'https://pbs.twimg.com/media/GXSejYjbkAAwFVJ?format=jpg&name=900x900',
                'https://pbs.twimg.com/media/GYcEE2obEAAyMZU?format=jpg&name=medium'
            ],
            likeCount: 15,
            dislikeCount: 2,
            commentCount: 25
        }
    ]

    // Function to create a new post HTML element
    function createPost(postData) {
        // Create a div for the post
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

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
                    👍 Like
                    <p class="comment-count"><span class="like-count">${postData.likeCount}</span></span></p>
                </button>
                
                <button class="dislike-button">
                    👎 Dislike
                    <p class="comment-count"><span class="dislike-count">${postData.dislikeCount}</span></span></p>
                </button>
                
                <button class="comment-button">
                    💬 Comment
                    <p class="comment-count"><span class="comment-count-number">${postData.commentCount}</span></p>
                </button>
            </div>`;

        // Append the post to the posts section
        document.getElementById('posts-section').appendChild(postDiv);
    }

    // Loop through example posts data
    examplePostsData.forEach(postData => createPost(postData));
});
