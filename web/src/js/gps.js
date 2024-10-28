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
        
            if (longitude > -92.645) {
                if (latitude > 32.325) {
                    zone = "Zone 1";
                }else {
                    zone = "Zone 2";
                }
            }
            else {
                if (latitude < 32.325) {
                    zone = "Zone 3";
                }else {
                    zone = "Zone 4";
                }
            }

            localStorage.setItem('zone', zone);

        }, (error) => {
            document.getElementById('location').innerText = 'Unable to retrieve location';
            console.error(error);
        });
    }
});
