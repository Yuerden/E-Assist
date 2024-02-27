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
        } else {
            console.log('Email address not found.');
        }
    })
    .catch(error => {
        console.error('Error fetching user email:', error);
    });
}

function validateOpenAIKey(apiKey) {
    // Example validation: check if key starts with proper characters and has correct length
    const isValid = apiKey.startsWith('sk-') && apiKey.length === 51; // Adjust based on actual criteria for OpenAI API keys
    if (!isValid) {
        // Provide feedback to the user directly in the popup
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
        const apiKey = document.getElementById('openaiApiKey').value.trim(); // Trim whitespace
        if (validateOpenAIKey(apiKey)) {
            chrome.storage.local.set({ 'openaiApiKey': apiKey }, () => {
                console.log('OpenAI API key is stored securely.');
                document.getElementById('openaiApiKey').style.display = 'none';
                document.getElementById('saveApiKeyButton').style.display = 'none';
                document.getElementById('redirectButton').style.display = 'block';
            });
        } else {
            // The input field remains visible for the user to correct the key
            document.getElementById('openaiApiKey').focus(); // Focus on the input field for user attention
        }
    });

    document.getElementById('redirectButton').addEventListener('click', redirectToMainPage);
});

function redirectToMainPage() {
    chrome.tabs.create({ url: 'mainpage.html' });
}
