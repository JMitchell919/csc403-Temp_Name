// const { response } = require("express");

// On document load
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to submit-post button
    document.getElementById('submit-post').addEventListener('click', function() {
        // Grab value of post-input
        const input = document.getElementById('post-input').value;
        console.log(input);

        // Get data needed for post
        const date = new Date();

        // Construct post
        post = {
            username: localStorage.getItem('username'), // replace with id later
            location: localStorage.getItem('overrideZone') || localStorage.getItem('zone'),
            date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
            text: input,
            postPics: []
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