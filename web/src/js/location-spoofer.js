document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById("output")
    output.innerHTML = '';

    // Submit Zone
    document.getElementById("submit-zone").addEventListener('click', function() {
        const zone = document.getElementById("zone-input").value;
        if (zone == '') {
            output.innerHTML += 'Cannot set an empty zone.<br>';
            return;
        }
        localStorage.setItem('overrideZone', zone);
        output.innerHTML += `Zone succesfully set to ${zone}.<br>`;
    });

    // Reset Zone
    document.getElementById("reset-zone").addEventListener('click', function() {
        localStorage.removeItem('overrideZone');
        output.innerHTML += `Zone succesfully reset to ${localStorage.getItem('zone')}.<br>`;
    });

    // Submit Coords
    document.getElementById("submit-coords").addEventListener('click', function() {
        const lat = document.getElementById("lat-input").value;
        const lon = document.getElementById("lon-input").value;
        if (lat == '') {
            output.innerHTML += 'Cannot set an empty latitude.<br>';
            return;
        } else if (lon == '') {
            output.innerHTML += 'Cannot set an empty longitude.<br>';
            return;
        } else if (isNaN(parseFloat(lat))) {
            output.innerHTML += 'Latitude must be a float.<br>';
            return;
        } else if (isNaN(parseFloat(lon))) {
            output.innerHTML += 'Longitude must be a float.<br>';
            return;
        }
        localStorage.setItem('overrideLatitude', lat);
        localStorage.setItem('overrideLongitude', lon);
        output.innerHTML += `Coords succesfully set to ${lat}, ${lon}.<br>`;
    });

    // Reset Coords
    document.getElementById("reset-coords").addEventListener('click', function() {
        localStorage.removeItem('overrideLatitude');
        localStorage.removeItem('overrideLongitude');
        output.innerHTML += `Coords succesfully reset to ${localStorage.getItem('latitude')}, ${localStorage.getItem('longitude')}.<br>`;
    });
});