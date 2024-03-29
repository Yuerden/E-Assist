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

// Loading Icon Spinner:
function showLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
}
function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', (event) => {
    var emailGetter = new EmailGetter();
    
    var loadButton = document.getElementById('loadButton');
    if (loadButton) {
        showLoadingSpinner();
        loadButton.addEventListener('click', function() {
            // Here you should adapt to fetch and then display
            emailGetter.getNextEmail().then(displayEmailBody); // Make sure getNextEmail() is correctly returning email data
            hideLoadingSpinner();
        });
    }
    
    var summarize = document.getElementById('summarize');
    if (summarize) {
        showLoadingSpinner();
        summarize.addEventListener('click', function() {
            emailGetter.summarizeEmail().then(displaySummary); // Same here for fetching next email
            
        });
    }
});
