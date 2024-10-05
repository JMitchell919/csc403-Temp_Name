window.onload = function() {
    fetch('../components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            // hamed gurber
            const hamburger = document.querySelector('.hamburger');
            const nav = document.querySelector('.menu');

            hamburger.addEventListener('click', () => {
                nav.classList.toggle('active');
            })
        
            document.querySelector('.hamburger').addEventListener('click', function() {
                document.querySelector('.menu').classList.toggle('show');
            });

            // Assume user is logged out
            let isLoggedIn = false;

            // Get log in status
            isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            //
            const currentPage = window.location.pathname.split('/').pop();
            console.log(currentPage);
            switch (currentPage) {
                case '':
                    nav.innerHTML = `
                        ${isLoggedIn ? `<a href="profile"><button id="profile-button">Profile</button></a>` : `<a href="/login"><button id="loginButton">Login</button></a>`}
                        ${isLoggedIn ? `<a href="post"><button id="post-button">Post</button></a>` : `<a href="register"><button id="register-button">Register</button></a>`}
                        ${isLoggedIn ? `<a href="logout"><button id="logout-button">Logout</button></a>` : ``}
                    `;
                    break;
                case 'post':
                    nav.innerHTML = `
                        <a href="/"><button id="home-button">Home</button></a>
                        <a href="logout"><button id="logout-button">Logout</button></a>
                    `;
                    break;
                case 'register':
                    nav.innerHTML = `
                        <a href="/"><button id="home-button">Home</button></a>
                        <a href="login"><button id="loginButton">Login</button></a>
                    `;
                    break;
                case 'login':
                    nav.innerHTML = `
                        <a href="/"><button id="home-button">Home</button></a>
                        <a href="register"><button id="register-button">Register</button></a>
                    `;
                    break;
                case 'logout':
                    nav.innerHTML = `
                        <a href="/"><button id="home-button">Home</button></a>
                        <a href="login"><button id="loginButton">Login</button></a>
                        <a href="register"><button id="register-button">Register</button></a>
                    `;
                    break;
                case 'profile':
                    nav.innerHTML = `
                        <a href="/"><button id="home-button">Home</button></a>
                        <a href="post"><button id="post-button">Post</button></a>
                        <a href="settings"><button id="settings-button">Settings</button></a>
                        <a href="logout"><button id="logout-button">Logout</button></a>
                    `;
                    break;
                case 'settings':
                    nav.innerHTML = `
                        <a href="/"><button id="home-button">Home</button></a>
                        <a href="profile"><button id="profile-button">Profile</button></a>
                        <a href="logout"><button id="logout-button">Logout</button></a>
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