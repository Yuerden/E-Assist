export function getEmailList() {
  chrome.storage.local.get('token', function(data) {
    const token = data.token;  // Ensure you're correctly extracting the token
    console.log('getting email list: ', token);

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    const userId = 'me';

    // Fetch URL without any query parameters
    fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages`,
        requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.messages && data.messages.length > 0) {
            data.messages.forEach((message) => {
              console.log(message.id);
            });
          }
          if (data.nextPageToken) {
            console.log('Next Page Token:', data.nextPageToken);
          }

          console.log(
              'Estimated number of total messages:', data.resultSizeEstimate);
        })
        .catch(error => console.error('Error fetching messages:', error));
  });
}
