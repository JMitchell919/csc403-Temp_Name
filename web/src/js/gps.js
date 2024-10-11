document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            localStorage.setItem('latitude', latitude);
            localStorage.setItem('longitude', longitude);
        });
    }
});