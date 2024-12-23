window.onload = async function() {
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

            // Dynamic Header Buttons and stuff
            const currentPage = window.location.pathname.split('/').pop();
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
                    break;
                default:
                    nav.innerHTML = `
                        <a href="/"><button id="home-button">Home</button></a>
                    `;
                    break;
                    
            }

            // FOR KIEFER
            // Function to change the location shown in the header. (you don't have to use the function if you don't want. The code is short enough to bo used directly)
            function changeLocation(loc) {
                
            }

            changeLocation();

            fetch(`${localStorage.getItem('apiDomain')}:${localStorage.getItem('apiPort')}/zone?latitude=${localStorage.getItem('overrideLatitude') || localStorage.getItem('latitude')}&longitude=${localStorage.getItem('overrideLongitude') || localStorage.getItem('longitude')}`)
                .then(response => response.text())
                .then(zone => {
                    localStorage.setItem('zone', zone);
                    // document.querySelector('.location').innerHTML = `${localStorage.getItem('overrideZone') || zone}${localStorage.getItem('overrideZone') ? `${localStorage.getItem('overrideZone')}` : zone}`;
                    document.querySelector('.location').innerHTML = `${localStorage.getItem('overrideZone') ? `"${localStorage.getItem('overrideZone')}"` : zone}`;
                })
                .catch(error => {
                    console.error("Error fetching from /posts: ", error);
                    localStorage.setItem('zone', '-');
                });
        });

    let apiDomain = window.location.hostname === "localhost" ? "http://localhost" : `http://${window.location.hostname}`;
    let apiPort = '';

    await fetch('/config')
        .then(response => response.json())
        .then(config => {
            apiPort = config.apiPort;
        })
        .catch(error => {
            console.error('Error fetching config:', error);
        });

    localStorage.setItem('apiDomain', apiDomain);
    localStorage.setItem('apiPort', apiPort);
}