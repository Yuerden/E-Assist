function getAuthToken() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }
    console.log('Obtained token:', token);
    // Use the token to make API requests
  });
}