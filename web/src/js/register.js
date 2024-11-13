document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitCredentials').addEventListener('click', async function() {
        
        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;
        const email = document.getElementById('email-input').value;

        const isUsernameAvailable = await checkUser(username);
        
        if (isUsernameAvailable) {
            const registerData = { username, password, email };

            await sendRegistration(registerData);
            #sendConfirmationEmail(email);
            window.location.href = '/confirm';
        } else {
            alert('This username is already in use.');
        }
    });

    async function checkUser(username) {
        let apiDomain = '';
        let apiPort = '';

        await fetch('/config')
            .then(response => response.json())
            .then(config => {
                apiDomain = config.apiDomain;
                apiPort = config.apiPort;
            })
            .catch(error => console.error('Error fetching config:', error));

        try {
            const response = await fetch(`${apiDomain}:${apiPort}/getUser?username=${username}`, {
                method: 'GET'
            });

            return response.status === 404;
        } catch (error) {
            console.error("Error checking username:", error);
            return false;
        }
    }

    async function sendRegistration(registerData) {
        let apiDomain = '';
        let apiPort = '';

        await fetch('/config')
            .then(response => response.json())
            .then(config => {
                apiDomain = config.apiDomain;
                apiPort = config.apiPort;
            })
            .catch(error => console.error('Error fetching config:', error));

        try {
            const response = await fetch(`${apiDomain}:${apiPort}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                alert("Registration successful!");
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    }
});

