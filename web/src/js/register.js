document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitCredentials').addEventListener('click', function() {

        registerData.append("username", document.getElementById('username-input').value);
        registerData.append("password", document.getElementById('password-input').value);
        registerData.append("email", document.getElementById('email-input').value);
        
        const isUsernameAvailable = await checkUser(username);
        
        if (isUsernameAvailable) {
            const registerData = {
                username: username,
                password: password,
                email: email
            };

            await sendRegistration(registerData);
            sendConfirmationEmail(email);
            window.location.href = '/confirm';
        } else {
            alert('This username is already in use.');
        }
    });

    // Function to check if the username exists in the database
    async function checkUser(username) {
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

            // If response is 200, it means the user already exists
            return response.status === 404;  // Returns true if username does not exist
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
            .catch(error => {
                console.error('Error fetching config:', error);
            });

        try {
            const response = await fetch(`${apiDomain}:${apiPort}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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

    function sendConfirmationEmail(email) {
        emailjs.send("service_yr686mq", "template_m5dvqvv", {
            to_email: email,
            subject: "Registration Confirmation",
            message: "Thank you for registering! Your account has been successfully created."
        })
        .then((response) => {
            console.log("Email sent successfully!", response.status, response.text);
        })
        .catch((error) => {
            console.log("Failed to send email:", error);
        });
        return;
    }


    window.location.href = '/confirm';
    });
});
