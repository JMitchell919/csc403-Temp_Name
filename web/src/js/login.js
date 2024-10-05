document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitLogin').addEventListener('click', function() {

        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;

        console.log(`${username} ${password}`)

        // Simulate login validation (replace this with actual back-end validation)
        if (username === 'user' && password === 'password') {
            // Store log in in local storage for persistance
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            // Redirect to home page after login
            window.location.href = '/';
        } else {
            alert('Invalid username or password!');
        }
    });
});