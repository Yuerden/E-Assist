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
        loadButton.addEventListener('click', function() {
            showLoadingSpinner();
            emailGetter.getNextEmail().then(emailData => {
                displayEmailBody(emailData);
                hideLoadingSpinner();
            }); // Make sure getNextEmail() is correctly returning email data
        });
    }
    var summarizeButton = document.getElementById('summarize');
    if (summarizeButton) {
        summarizeButton.addEventListener('click', function() {
            showLoadingSpinner();
            emailGetter.summarizeEmail().then(summary => {
                displaySummary(summary);
                hideLoadingSpinner();
            }); // Update your method to properly call summarizeEmail with the necessary arguments
        });
    }
});
