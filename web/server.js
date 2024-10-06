const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.WEB_PORT || 3000;

// Serve static files (CSS and JS) from the "src" directory
app.use(express.static(path.join(__dirname, 'src')));

// Automatically serve all HTML files in the "src/pages" directory
const pagesDirectory = path.join(__dirname, 'src/pages');

// Read all files in the pages directory
fs.readdir(pagesDirectory, (err, files) => {
    if (err) {
        console.error('Could not list the files in the directory.', err);
        return;
    }

    // Filter for HTML files and create routes
    files.forEach(file => {
        if (path.extname(file) === '.html') {
            // Create a route for each HTML file
            const routePath = '/' + path.basename(file, '.html'); // Use the file name as route
            app.get(routePath, (req, res) => {
                res.sendFile(path.join(pagesDirectory, file));
            });
        }
    });
});

// Fallback route to serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(pagesDirectory, 'index.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});