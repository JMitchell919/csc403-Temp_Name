window.onload = function() {
    fetch('../components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            // Assume user is logged out
            let isLoggedIn = false;

            // Get log in status
            isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            // hamed gurber
            const hamburger = document.querySelector('.hamburger');
            const nav = document.querySelector('.menu');

            hamburger.addEventListener('click', () => {
                nav.classList.toggle('active');
            })
        
            document.querySelector('.hamburger').addEventListener('click', function() {
                document.querySelector('.menu').classList.toggle('show');
            });

            //
            const currentPage = window.location.pathname.split('/').pop();
            console.log(currentPage);
            switch (currentPage) {
                case 'index.html':
                    nav.innerHTML = `
                        ${isLoggedIn ? `<a href="profile.html"><button id="profile-button">Profile</button></a>` : `<a href="login.html"><button id="loginButton">Login</button></a>`}
                        ${isLoggedIn ? `<a href="post.html"><button id="post-button">Post</button></a>` : `<a href="register.html"><button id="register-button">Register</button></a>`}
                        ${isLoggedIn ? `<a href="logout.html"><button id="logout-button">Logout</button></a>` : ``}
                    `;
                    break;
                case 'post.html':
                    nav.innerHTML = `
                        <a href="index.html"><button id="home-button">Home</button></a>
                        <a href="logout.html"><button id="logout-button">Logout</button></a>
                    `;
                    break;
                case 'register.html':
                    nav.innerHTML = `
                        <a href="index.html"><button id="home-button">Home</button></a>
                        <a href="login.html"><button id="loginButton">Login</button></a>
                    `;
                    break;
                case 'login.html':
                    nav.innerHTML = `
                        <a href="index.html"><button id="home-button">Home</button></a>
                        <a href="register.html"><button id="register-button">Register</button></a>
                    `;
                    break;
                case 'logout.html':
                    nav.innerHTML = `
                        <a href="index.html"><button id="home-button">Home</button></a>
                        <a href="login.html"><button id="loginButton">Login</button></a>
                        <a href="register.html"><button id="register-button">Register</button></a>
                    `;
                    break;
                case 'profile.html':
                    nav.innerHTML = `
                        <a href="index.html"><button id="home-button">Home</button></a>
                        <a href="post.html"><button id="post-button">Post</button></a>
                        <a href="settings.html"><button id="settings-button">Settings</button></a>
                        <a href="logout.html"><button id="logout-button">Logout</button></a>
                    `;
                    break;
                case 'settings.html':
                    nav.innerHTML = `
                        <a href="index.html"><button id="home-button">Home</button></a>
                        <a href="profile.html"><button id="profile-button">Profile</button></a>
                        <a href="logout.html"><button id="logout-button">Logout</button></a>
                    `;
            }

            

            
            // Function to toggle buttons based on login state
            // function updateButtons() {
            //     if (isLoggedIn) {
            //         // User is logged in: show Post and Logout buttons, hide Login and Register
            //         document.getElementById('postButton').style.display = 'inline-block';
            //         document.getElementById('logoutButton').style.display = 'inline-block';
            //         document.getElementById('loginButton').style.display = 'none';
            //         document.getElementById('register-button').style.display = 'none';
            //     } else {
            //         // User is not logged in: show Login and Register buttons, hide Post and Logout
            //         document.getElementById('postButton').style.display = 'none';
            //         document.getElementById('logoutButton').style.display = 'none';
            //         document.getElementById('loginButton').style.display = 'inline-block';
            //         document.getElementById('register-button').style.display = 'inline-block';
            //     }
            // }

            // Update header buttons
            // updateButtons();

            

            // Log out button functionality
            // document.getElementById('logoutButton').addEventListener('click', function() {
            //     localStorage.removeItem('isLoggedIn');
            //     localStorage.removeItem('username');
            //     window.location.reload();
            //     alert("You've been logged out.")
            // });

            
        })
}