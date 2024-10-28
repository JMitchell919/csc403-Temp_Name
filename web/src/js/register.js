document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitCredentials').addEventListener('click', function() {

        const registerData = new FormData();

        registerData.append("username", document.getElementById('username-input').value);
        registerData.append("password", document.getElementById('password-input').value);
        registerData.append("email", document.getElementById('email-input').value);
        
        if (checkUser(document.getElementById('username-input'))){
            sendRegistration(registerData);
            sendConfirmationEmail(registerData.get("email"));
            window.location.href = '/confirm';
        } else {
            alert('This username is already in use.');
        }
        async function checkUser(username){
            postsSection.innerHTML = ''

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
                const response = await fetch(`${apiDomain}:${apiPort}/userCheck?username=${username}`, {
                    method: 'GET'
                })
                    
                if (response.status === 200) {
                    return false;
                } else if (response.status === 404) {
                    return true;
                }
            } catch (error) {
                console.error("Error checking username:", error);
            }
        }

        async function sendRegistration(registerData){
            try {
                const response = await fetch('${apiDomain}:${apiPort}/register', {
                    method: 'POST',
                    body: registerData
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