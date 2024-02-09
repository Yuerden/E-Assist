import { getAuthToken } from './auth.js';

// Ensure the DOM is fully loaded before trying to access the element
window.addEventListener('DOMContentLoaded', (event) => {
  var redirectButton = document.getElementById('redirectButton');
  if (redirectButton) {
    redirectButton.addEventListener('click', function() {
      chrome.tabs.create({ url: 'mainpage.html' }); // This will open mainpage.html in a new tab
    });
  } else {
    console.error('redirectButton not found');
  }

  var authButton = document.getElementById('authButton');
  if (authButton) {
    authButton.addEventListener('click', function() {
      getAuthToken(); // Call the function to authenticate the user
    });
  } else {
    console.error('authButton not found');
  }
});