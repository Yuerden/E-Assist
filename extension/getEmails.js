export class EmailGetter {
  constructor() {
    chrome.storage.local.get('token', (result) => {
      this.token = result.token;
      this.initEmailList();
    });
    chrome.storage.local.get('openaiApiKey', (result) => {
      this.GPTKey = result.openaiApiKey;
    });
    this.messageList = null;
    this.nextPageToken = null;
    this.emailPointer = 0;
    this.currentEmailBody = null;
  }

  async initEmailList() {
    await this.getEmailList();
  }

  async getEmailList() {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);

    let url = `https://gmail.googleapis.com/gmail/v1/users/me/messages`;
    if (this.nextPageToken) {
      url += `?pageToken=${this.nextPageToken}`;
    }

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data.messages && data.messages.length > 0) {
        this.messageList = data.messages;
        this.emailPointer = 0;
      }
      if (data.nextPageToken) {
        this.nextPageToken = data.nextPageToken;
      }

      console.log(
          'Estimated number of total messages:', data.resultSizeEstimate);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  async getNextEmail() {
    if (!this.messageList || this.emailPointer >= this.messageList.length) {
      await this.getEmailList();
      if (!this.messageList || this.emailPointer >= this.messageList.length) {
        return null;
      }
    }

    const emailId = this.messageList[this.emailPointer].id;
    this.emailPointer += 1;

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);

    const requestOptions = {
      method: 'GET',
      headers: headers,
    };

    try {
      const response = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${
              emailId}?format=full`,
          requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const emailData = {sender: '', subject: '', body: '', timestamp: ''};

      // Extract headers for sender, subject, and date
      data.payload.headers.forEach(header => {
        if (header.name === 'From') {
          emailData.sender = header.value;
        } else if (header.name === 'Subject') {
          emailData.subject = header.value;
        } else if (header.name === 'Date') {
          emailData.timestamp = header.value;
        }
      });

      // Decode email body
      let bodyData = '';
      if (data.payload.parts) {
        data.payload.parts.forEach(part => {
          if (part.mimeType === 'text/plain' && part.body && part.body.data) {
            bodyData += this.decodeBase64(part.body.data);
          }
        });
      } else if (data.payload.body.data) {
        bodyData = this.decodeBase64(data.payload.body.data);
      }
      emailData.body = bodyData.replace(/<[^>]+>/g, '').replace(/{[^>]+}/g, '');

      console.log('Processed email data:', emailData);
      // this.summarizeEmail(emailData)
      this.currentEmailBody = emailData;
      return emailData;
    } catch (error) {
      console.error('Error fetching email:', error);
      return null;
    }
  }

  decodeBase64(encodedString) {
    const decodedString =
        atob(encodedString.replace(/-/g, '+').replace(/_/g, '/'));
    const textDecoder = new TextDecoder('utf-8');
    const decodedBytes =
        Uint8Array.from(decodedString.split(''), c => c.charCodeAt(0));
    return textDecoder.decode(decodedBytes);
  }

  async summarizeEmail() {
    let summary = '';
    if (this.currentEmailBody === null) {
      summary =
          'There is no current email loaded at this time, please click Get Next Email Button'
      console.log(summary);
      return summary;
    }
    if (this.GPTKey === 'FREE_VERSION') {
      // do free version
      summary =
          'You are using the free version, currently no Summaries Available';
      console.log(summary);
      return summary;
    }
    // else continue using chatGPT bellow:

    const url = 'https://api.openai.com/v1/chat/completions';

    const data = {
      model: 'gpt-3.5-turbo',  // Adjust model as necessary
      messages: [{
        role: 'user',
        content:
            `Given the following email content, generate a concise summary that includes the subject, key points, any action required, the overall sentiment, and any additional notes that are important. Ensure the summary is clear and captures all critical details without missing important information.
        
        Email sender:
        "${this.currentEmailBody.sender}
        "Email subject:
        "${this.currentEmailBody.subject}"
        Email body:
        "${this.currentEmailBody.body}"
        Email timestamp:
        "${this.currentEmailBody.timestamp}"
        
        Please format the summary as follows:
        - Subject: [Subject of the Email]
        - Key Points:
        * [Point 1]
        * [Point 2]
        * [And so on...]
        - Action Required: [What needs to be done, by whom, and by when]
        - Sentiment: [Overall tone of the email]
        - Additional Notes: [Any other important details]
        - From: [message sender]`,
      }],
      temperature: 0.5,
      max_tokens: 2048,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.GPTKey}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      summary = jsonResponse.choices[0].message.content;
      console.log(summary);  // This is ChatGPT's response
      return summary;
    } catch (error) {
      console.error('Error calling ChatGPT:', error.message);
    }
  }


  // async createResponse(tone, length, emailContent) {
  //   try {
  //     const response = await this.openai.chat.completions.create({
  //       model: 'gpt-3.5-turbo',
  //       messages: [{
  //         role: 'user',
  //         content: `"Given the following email, generate a ${
  //             tone} response that addresses all the questions or points
  //             raised:

  //                 Email Content:"${emailContent}"

  //                 Please ensure the response is ${
  //             length} and
  //             [Action-Oriented/Question-Answering/Information-Requesting/Feedback-Giving],
  //             reflecting a [Urgency] sense of urgency.
  //                 ,`,
  //       }],
  //       temperature: 0.5,
  //       max_tokens: 2048,
  //     });
  //     console.log(response.choices[0].message);  // This is ChatGPT's
  //     response return response.choices[0].message;
  //   } catch (error) {
  //     if (error.code === 'insufficient_quota') {
  //       console.error(
  //           'RateLimitError: You exceeded your current quota. Please check
  //           your plan and billing details.');
  //     } else {
  //       console.error('Error calling ChatGPT:', error);
  //     }
  //   }
  // }
}