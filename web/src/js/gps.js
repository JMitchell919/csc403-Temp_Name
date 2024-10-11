document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // probably want to store lat long in the future for sorting by distance.
            localStorage.setItem('latitude', latitude);
            localStorage.setItem('longitude', longitude);
            
            let zone;
        
            if (latitude > 32.5263) {
                zone = "Zone 1"
            }
            else {
                zone = "Zone 2"
            }

            localStorage.setItem('zone', zone);

        }, (error) => {
            document.getElementById('location').innerText = 'Unable to retrieve location';
            console.error(error);
        });
    }
});