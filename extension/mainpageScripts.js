import {EmailGetter} from './getEmails.js';
// This function will be called when the Load Summaries button is clicked
function loadSummaries() {
  console.log('summaries...');
}

// This function simulates fetching email summaries, replace with your actual
// data fetching logic function fetchEmailSummaries() {}

// This function handles the display of email summaries on the page
// function displayEmailSummaries(summaries) {}

// Event listener for DOMContentLoaded to ensure the DOM is fully loaded before
// trying to access elements
document.addEventListener('DOMContentLoaded', (event) => {
  var emailGetter = new EmailGetter();
  // Get the button by its ID and add an event listener
  var loadButton = document.getElementById('loadButton');
  if (loadButton) {
    loadButton.addEventListener('click', function() {
      chrome.storage.local.get('token', function(result) {
        emailGetter.getEmailList()
      });
    });

  } else {
    console.error('loadButton not found')
  }
  var nextEmailButton = document.getElementById('nextEmail');
  if (nextEmailButton) {
    nextEmailButton.addEventListener('click', function() {
      emailGetter.getNextEmail()
    });
  }
});
