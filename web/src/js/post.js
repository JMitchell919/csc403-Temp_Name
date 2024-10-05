// On document load
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to submit-post button
    document.getElementById('submit-post').addEventListener('click', function() {
        // Grab value of post-input
        const input = document.getElementById('post-input').value;
        console.log(input);

        // Get data needed and send off to database

        // Alert user of sent post
        alert("Post sent!")

        // Redirect to home page after login
        window.location.href = 'index.html';
    });
});