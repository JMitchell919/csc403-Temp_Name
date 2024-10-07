document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit").addEventListener('click', function() {
        const location = document.getElementById("location-input").value;
        const output = document.getElementById("output")

        // dummy var for error checking the location before setting
        const ok = true;
        
        if (ok) {
            // Set location

            output.innerHTML = `Location succesfully set to ${location}.`
        } else {
            output.innerHTML = `Error: ${location} does not exist or something else is wrong, idk.` 
        }
        
    });
});