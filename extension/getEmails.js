export class EmailGetter {
  constructor(token) {
    this.token = token;
    this.messageList = null;
    this.nextPageToken = null;
    this.emailPointer = 0;

    this.getEmailList()
  }

  getNextPage() {
    if (this.nextPageToken === null) {
      console.log('No next page token available, cannot fetch next page.');
      return;
    }

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    const url =
        `https://gmail.googleapis.com/gmail/v1/users/me/messages?pageToken=${
            this.nextPageToken}`;

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.messages && data.messages.length > 0) {
            this.messageList = data.messages;
            this.emailPointer = 0;
          } else {
            console.log('No more messages to fetch.');
            this.messageList = null;
          }
          if (data.nextPageToken) {
            this.nextPageToken = data.nextPageToken;
          } else {
            this.nextPageToken = null;
          }
        })
        .catch(
            error =>
                console.error('Error fetching next page of messages:', error));
  }


  getEmailList() {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);

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
          if (data.messages && data.messages.length > 0) {
            this.messageList = data.messages;
          }
          if (data.nextPageToken) {
            this.nextPageToken = data.nextPageToken;
          }

          console.log(
              'Estimated number of total messages:', data.resultSizeEstimate);
        })
        .catch(error => console.error('Error fetching messages:', error));
  }

  getNextEmail() {
    if (!this.messageList || this.emailPointer >= this.messageList.length) {
      this.getNextPage();
      if (!this.messageList || this.emailPointer >= this.messageList.length) {
        return null;
      }
    }

    const email = this.messageList[this.emailPointer];
    this.emailPointer += 1;

    return email;
  }
}
