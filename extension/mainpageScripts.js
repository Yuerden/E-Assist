// mainpageScripts.js

import {EmailGetter} from './getEmails.js';

// Define a new function to display the email body
function displayEmailBody(emailData) {
    // Assuming emailData contains the body of the email
    document.getElementById('emailBodyContainer').textContent = emailData.body; // Use innerHTML if you need to render HTML content, but ensure it is sanitized to prevent XSS attacks.
}

// This function will be called when the Load Summaries button is clicked
function loadSummaries() {
    console.log('summaries...');
    // Implement your summary fetching logic here
}

document.addEventListener('DOMContentLoaded', (event) => {
    var emailGetter = new EmailGetter();
    
    var loadButton = document.getElementById('loadButton');
    if (loadButton) {
        loadButton.addEventListener('click', function() {
            // Here you should adapt to fetch and then display
            emailGetter.getNextEmail().then(displayEmailBody); // Make sure getNextEmail() is correctly returning email data
        });
    } else {
        console.error('loadButton not found')
    }
    
    var nextEmailButton = document.getElementById('nextEmail');
    if (nextEmailButton) {
        nextEmailButton.addEventListener('click', function() {
            emailGetter.getNextEmail().then(displayEmailBody); // Same here for fetching next email
        });
    }
});
