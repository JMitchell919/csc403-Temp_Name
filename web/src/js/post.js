// const { response } = require("express");

// On document load
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to submit-post button
    document.getElementById('submit-post').addEventListener('click', function() {
        // Grab value of post-input
        const input = document.getElementById('post-input').value;
        console.log(input);

        // Get data needed for post
        // Fetch user details

        // Construct post
        post = {
            id: 2,
            username: 'user',
            profilePic: '',
            location: 'Ruston, Louisiana',
            date: '2024-10-10',
            text: input,
            postPics: [],
            likeCount: 0,
            dislikeCount: 0,
            commentCount: 0
        }


        // Send post off
        fetch('http://localhost:8080/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
        .then(response => {
            if (!response.ok) {
                // Alert user of sent post
                alert("Network response was not ok");
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            
        })
        .catch(error => {
            alert(error);
            console.error('Oopsie poopsie', error);
        });

        // Alert user of sent post
        alert("Post sent!");

        // Redirect to home page after login
        window.location.href = '/';
    });
});