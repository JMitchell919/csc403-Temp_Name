document.addEventListener('DOMContentLoaded', function() {
    localStorage.setItem('isLoggedIn', false);
    while (localStorage.getItem('isLoggedIn') === 'true') {};
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 3000);
});