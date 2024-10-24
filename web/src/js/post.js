// On document load
document.addEventListener('DOMContentLoaded', async function() {
    // Get post-input
    const postInput = document.getElementById('post-input');

    postInput.addEventListener('input', function() {
        // Reset height
        this.style.minHeight = 'auto';

        // Set height based on content
        this.style.minHeight = this.scrollHeight + 'px';
    })

    // Image upload support
    let selectedFiles = [];

    document.getElementById('fileInput').addEventListener('change', function(event) {
        var files = event.target.files;
        var preview = document.getElementById('preview');

        // Loop through all new files
        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            // Only process image files
            if (!file.type.match('image.*')) {
                continue;
            }

            // Add the file to the selectedFiles array
            selectedFiles.push(file);

            var imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');

            var img = document.createElement('img');
            img.src = URL.createObjectURL(file);

            var fileInfo = document.createElement('p');
            fileInfo.textContent = `${file.name} | ${file.size} bytes`;

            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remove';

            // Closure to capture the current file and apply eventListener to deleteButton
            (function(file, imgContainer) {
                deleteButton.addEventListener('click', function() {
                    imgContainer.remove();

                    // Remove the file from the selectedFiles array
                    const index = selectedFiles.indexOf(file);
                    if (index > -1) {
                        selectedFiles.splice(index, 1);
                    }
                });
            })(file, imgContainer); // Parameters for closure

            var imgSider = document.createElement('div');
            imgSider.classList.add('image-sider');

            imgSider.appendChild(fileInfo);
            imgSider.appendChild(deleteButton);

            // Append the image, file info, and delete button to the container
            imgContainer.appendChild(img);
            imgContainer.appendChild(imgSider);
            

            // Append the container to the preview div
            preview.appendChild(imgContainer);
        }
    });

    // Add click event to submit-post button
    document.getElementById('submit-post').addEventListener('click', async function() {
        // Grab value of post-input
        const input = postInput.value;
        console.log(input);

        if (input == "") {
            alert("Post text cannot be empty.");
            return;
        }

        // Get data needed for post
        const date = new Date();

        console.log(localStorage.getItem('username'));        

        const formData = new FormData();
        formData.append('username', localStorage.getItem('username'));
        formData.append('location', localStorage.getItem('overrideZone') || localStorage.getItem('zone'));
        formData.append('latitude', localStorage.getItem('latitude'));
        formData.append('longitude', localStorage.getItem('longitude'));
        formData.append('date', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
        formData.append('text', input);

        for (let file of selectedFiles) {
            formData.append('files', file);
        }

        // Log the FormData content
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
}

        let apiDomain = '';
        let apiPort = '';

        await fetch('/config')
            .then(response => response.json())
            .then(config => {
                apiDomain = config.apiDomain;
                apiPort = config.apiPort;
            })
            .catch(error => {
                console.error('Error fetching config:', error);
            });


        // Send post off
        fetch(`${apiDomain}:${apiPort}/upload`, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // return response.json();
        })
        .then(data => {
            // Alert user of sent post
            alert("Post sent!");
        })
        .catch(error => {
            alert(error);
            console.error('Oopsie poopsie', error);
        });

        

        // Redirect to home page after login
        window.location.href = '/';
    });
});