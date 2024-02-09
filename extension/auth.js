export function getAuthToken() {
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    if (chrome.runtime.lastError) {
      // Handle errors during authentication
      console.error(chrome.runtime.lastError);
      alert('Authentication failed: ' + chrome.runtime.lastError.message);
    } else if (token) {
      // The token is valid, use it to make your API calls
      console.log('Obtained token:', token);
      // For example, you might want to store it in localStorage or send it to your backend
      // Be aware that storing tokens can pose a security risk, so ensure you're following best practices
    } else {
      // No token was obtained
      console.error('The OAuth Token was undefined. User may not be signed in to Chrome or did not approve access.');
    }
  });
}