// Exucute this file with:
// node apiLogger.js

// If you don't have node.js, get it here:
// https://nodejs.org/en



// Type in the api url here
const url = '';

// An example api url
const exampleUrl = 'https://jsonplaceholder.typicode.com/posts';


fetch(url || exampleUrl) // (url || exampleUrl) chooses which ever is not empty. choses first option otherwise. 
    .then(response => response.json())  // Parse the JSON response
    .then(data => console.log(data))  // Handle the API data here
    .catch(error => console.error('Error:', error));