document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submit").addEventListener('click', function() {
        const domain = document.getElementById("domain-input").value;
        const endpoint = document.getElementById("endpoint-input").value;
        console.log(`${domain}${endpoint}`)

        fetch(`${domain}${endpoint}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById("response").innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error:', error));
    });
});

