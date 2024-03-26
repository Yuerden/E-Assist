// mainpageScripts.js

import {EmailGetter} from './getEmails.js';

function displayEmailBody(emailData) {
    // Assuming emailData contains the body of the email
    document.getElementById('emailBodyContainer').textContent = emailData.body; // Use innerHTML if you need to render HTML content, but ensure it is sanitized to prevent XSS attacks.
    displaySummary(""); //Wipes current summary
}
function displaySummary(summary) {
  // Assuming emailData contains the body of the email
  document.getElementById('emailSummaryContainer').textContent = summary; // Use innerHTML if you need to render HTML content, but ensure it is sanitized to prevent XSS attacks.
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
    
    var nextEmailButton = document.getElementById('summarize');
    if (nextEmailButton) {
        nextEmailButton.addEventListener('click', function() {
            emailGetter.summarizeEmail().then(displaySummary); // Same here for fetching next email
        });
    }
});
