document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitCredentials').addEventListener('click', async function() {
        
        const username = document.getElementById('username-input').value;
        const password = document.getElementById('password-input').value;
        const email = document.getElementById('email-input').value;

        const isUsernameAvailable = await checkUser(username);
        console.log(isUsernameAvailable)
        
        if (!isUsernameAvailable) {
            alert('This username is already in use.');
            return;
        }
        
        await sendRegistration({ username, password, email });
        window.location.href = '/login';
        //sendConfirmationEmail(email);
        // window.location.href = '/confirm';
        
    });

    async function checkUser(username) {
        try {
            const response = await fetch(`${localStorage.getItem("apiDomain")}:${localStorage.getItem("apiPort")}/getUser?username=${username}`);
            if (!response.ok) {
                console.error('Failed to fetch user data:', response.status);
                return false;
            }

            const text = await response.text();
            if (!text) {
                return true;
            }
    
            const user = await response.json();
            if (user === null || user === undefined) {
                return true;
            }
    
            return false;

        } catch (error) {
            console.error('Error fetching user:', error);
            return false;
        }
    }

    async function sendRegistration(registerData) {
        try {
            const response = await fetch(`${localStorage.getItem("apiDomain")}:${localStorage.getItem("apiPort")}/register`, {
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

