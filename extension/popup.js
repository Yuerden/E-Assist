import {getAuthToken} from './auth.js';

function fetchUserEmail(token) {
  console.log('here ', token);
  const url =
      'https://people.googleapis.com/v1/people/me?personFields=emailAddresses';
  fetch(url, {
    method: 'GET',
    headers: {'Authorization': `Bearer ${token}`, 'Accept': 'application/json'}
  })
      .then(response => response.json())
      .then(data => {
        if (data.emailAddresses && data.emailAddresses.length > 0) {
          console.log('User email:', data.emailAddresses[0].value);
          document.getElementById('userInfo').textContent =
              `Email: ${data.emailAddresses[0].value}`;
          document.getElementById('authButton').style.display = 'none';
          document.getElementById('redirectButton').style.display = 'block';
        } else {
          console.log('Email address not found.');
          document.getElementById('authButton').style.display = 'block';
          document.getElementById('redirectButton').style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Error fetching user email:', error);
      });
}

function redirectToMainPage() {
  chrome.tabs.create({url: 'mainpage.html'});
}

window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('redirectButton')
      .addEventListener('click', redirectToMainPage);
  document.getElementById('authButton').addEventListener('click', function() {
    getAuthToken().then(() => {
      console.log('test2');
      chrome.storage.local.get('token', function(result) {
        if (result.token) {
          fetchUserEmail(result.token);  // Call fetchUserEmail with the token
        } else {
          console.log('Token not found in storage.');
        }
      });
    });
  });
});