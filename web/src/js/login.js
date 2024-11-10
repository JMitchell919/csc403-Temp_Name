document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitLogin').addEventListener('click', async function() {
        
        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;
        
        const user = await fetchUser(username);

        if (user) {
            // Compare entered password with stored password
            if (user.password === password) {
                // Set login status in local storage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                
                // Redirect to home page
                window.location.href = '/';
            } else {
                alert('Incorrect password. Please try again.');
            }
        } else {
            alert('Username not found.');
        }
    });

    async function fetchUser(username) {
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

        try {
            const response = await fetch(`${apiDomain}:${apiPort}/getUser?username=${username}`, {
                method: 'GET'
            });

            if (response.ok) {
                return await response.json(); // Return the user data as JSON
            } else if (response.status === 404) {
                return null; // User does not exist
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
});

        // console.log(`${username} ${password}`)

        // // Simulate login validation (replace this with actual back-end validation)
        // if (username === 'user' && password === 'password') {
        //     // Store log in in local storage for persistance
        //     localStorage.setItem('isLoggedIn', 'true');
        //     localStorage.setItem('username', username);

        //     // Redirect to home page after login
        //     window.location.href = '/';
        // } else {
        //     alert('Invalid username or password!');
        // }

