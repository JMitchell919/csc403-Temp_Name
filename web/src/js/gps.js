document.addEventListener('DOMContentLoaded', () => {
    let latitude;
    let longitude;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            localStorage.setItem('latitude', latitude);
            localStorage.setItem('longitude', longitude);

            getZone(latitude, longitude)
        }, (error) => {
            // document.getElementById('location').innerText = 'Unable to retrieve location';
            console.error(error);

            latitude = 32.52630391495159;
            longitude = -92.64321871265749;
            
            localStorage.setItem('latitude', latitude);
            localStorage.setItem('longitude', longitude);

            getZone(latitude, longitude)
        });
    } else {
        // Default ONLY FOR DEMONSTRATION since users can't use geolocation over http
        latitude = 32.52630391495159;
        longitude = -92.64321871265749;
        
        localStorage.setItem('latitude', latitude);
        localStorage.setItem('longitude', longitude);

        getZone(latitude, longitude)
    }


    function getZone(latitude, longitude) {
        fetch(`${localStorage.getItem('apiDomain')}:${localStorage.getItem('apiPort')}/zone?latitude=${localStorage.getItem('overrideLatitude') || latitude}&longitude=${localStorage.getItem('overrideLongitude') || longitude}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response}`);
            }
            return response.text()
        })
        .then(zone => {
            localStorage.setItem('zone', zone);
        })
        .catch(error => {
            console.error("Error fetching from /posts: ", error);
            localStorage.setItem('zone', '-');
        });
    }
    
});
