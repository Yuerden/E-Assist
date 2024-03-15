import { getAuthToken } from './auth.js';

function fetchUserEmail(token) {
    console.log('here ', token);
    const url = 'https://people.googleapis.com/v1/people/me?personFields=emailAddresses';
    fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.emailAddresses && data.emailAddresses.length > 0) {
            console.log('User email:', data.emailAddresses[0].value);
            document.getElementById('userInfo').textContent = `Email: ${data.emailAddresses[0].value}`;
            document.getElementById('authButton').style.display = 'none';
            document.getElementById('openaiApiKey').style.display = 'block';
            document.getElementById('saveApiKeyButton').style.display = 'block';
            document.getElementById('freeButton').style.display = 'block'; // Show Skip button after authorization
        } else {
            console.log('Email address not found.');
        }
    })
    .catch(error => {
        console.error('Error fetching user email:', error);
    });
}

function validateOpenAIKey(apiKey) {
    const isValid = apiKey.startsWith('sk-') && apiKey.length === 51; // Example validation
    if (!isValid) {
        alert('Invalid OpenAI API key. Please check the key and try again.' + apiKey.length);
    }
    return isValid;
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('authButton').addEventListener('click', function() {
        getAuthToken().then(token => {
            if (token) {
                fetchUserEmail(token);
            } else {
                console.log('Token not found in storage.');
            }
        });
    });

    document.getElementById('saveApiKeyButton').addEventListener('click', function() {
        const apiKey = document.getElementById('openaiApiKey').value.trim();
        if (validateOpenAIKey(apiKey)) {
            chrome.storage.local.set({ 'openaiApiKey': apiKey }, () => {
                console.log('OpenAI API key is stored securely.');
                document.getElementById('openaiApiKey').style.display = 'none';
                document.getElementById('saveApiKeyButton').style.display = 'none';
                document.getElementById('freeButton').style.display = 'none'; // Hide Skip button
                document.getElementById('redirectButton').style.display = 'block'; // Show redirect button
            });
        } else {
            document.getElementById('openaiApiKey').focus();
        }
    });

    document.getElementById('freeButton').addEventListener('click', function() {
        // User chooses to skip OpenAI API key entry
        document.getElementById('openaiApiKey').style.display = 'none';
        document.getElementById('saveApiKeyButton').style.display = 'none';
        document.getElementById('freeButton').style.display = 'none'; // Hide Skip button
        document.getElementById('redirectButton').style.display = 'block'; // Show redirect button
    });

    document.getElementById('redirectButton').addEventListener('click', redirectToMainPage);
});

function redirectToMainPage() {
    chrome.tabs.create({ url: 'mainpage.html' });
}
