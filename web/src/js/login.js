document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitLogin').addEventListener('click', async function() {
        
        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;
        
        // Fetch the full user info using the new /getUser endpoint
        const user = await fetchUserInfo(username);

        if (user) {
            // Compare entered password with stored password
            if (user.password === password) {
                // Set login status in local storage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                
                // Redirect to home page
                window.location.href = '/';
            } else {
                alert('Incorrect credentials.');
            }
        } else {
            alert('Incorrect credentials.');
        }
    });

    // Fetches user information (e.g., ID, username, password, email, profile picture)
    async function fetchUserInfo(username) {
        try {
            const response = await fetch(`${localStorage.getItem("apiDomain")}:${localStorage.getItem("apiPort")}/getUser?username=${username}`, {
                method: 'GET'
            });

            console.log(response)
            if (response.ok) {
                return await response.json(); // Return the full user data as JSON
            } else if (response.status === 404) {
                return null; // User does not exist
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
});

