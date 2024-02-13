import {getAuthToken} from './auth.js';

function fetchAndDisplayUserInfo() {
  chrome.identity.getProfileUserInfo(
      {accountStatus: 'ANY'}, function(userInfo) {
        if (userInfo.email) {
          document.getElementById('userInfo').textContent =
              `Email: ${userInfo.email}`;
          document.getElementById('authButton').style.display = 'none';
          document.getElementById('redirectButton').style.display = 'block';
        } else {
          document.getElementById('authButton').style.display = 'block';
          document.getElementById('redirectButton').style.display = 'none';
        }
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
      fetchAndDisplayUserInfo();
    });
  });

  fetchAndDisplayUserInfo();  // Call on popup load
});