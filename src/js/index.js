const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
})

document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('show');
});

// Assume this is the user login status (true if logged in, false if not)
let isLoggedIn = true;

// Function to toggle buttons based on login state
function updateButtons() {
    if (isLoggedIn) {
        // User is logged in: show Post and Logout buttons, hide Login and Register
        document.getElementById('postButton').style.display = 'inline-block';
        document.getElementById('logoutButton').style.display = 'inline-block';
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('registerButton').style.display = 'none';
    } else {
        // User is not logged in: show Login and Register buttons, hide Post and Logout
        document.getElementById('postButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('loginButton').style.display = 'inline-block';
        document.getElementById('registerButton').style.display = 'inline-block';
    }
}

// Temporary login and logout functions
function login() {
    isLoggedIn = true;
    updateButtons();
}

function logout() {
    isLoggedIn = false;
    updateButtons();
}

document.addEventListener('DOMContentLoaded', function() {
    updateButtons();
});

document.getElementById('logoutButton').addEventListener('click', logout);

