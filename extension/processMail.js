// For api key
require('dotenv').config();

// Import the OpenAI package
const OpenAI = require('openai');

// Configure OpenAI API access with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function sendToChatGPTV2(emailContent) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: `Given the following email content, generate a concise summary that includes the subject, key points, any action required, the overall sentiment, and any additional notes that are important. Ensure the summary is clear and captures all critical details without missing important information.
                
                Email Content:
                "${emailContent}"
                
                Please format the summary as follows:
                Summary of Email:
                - Subject: [Subject of the Email]
                - Key Points:
                  - [Point 1]
                  - [Point 2]
                  - [And so on...]
                - Action Required: [What needs to be done, by whom, and by when]
                - Sentiment: [Overall tone of the email]
                - Additional Notes: [Any other important details]
                - From: [message sender]`,
            }],
            temperature: 0.5,
            max_tokens: 2048,
        });
        console.log(response.choices[0].message); // This is ChatGPT's response
        return response.choices[0].message;
    } catch (error) {
        if (error.code === 'insufficient_quota') {
            console.error("RateLimitError: You exceeded your current quota. Please check your plan and billing details.");
        } else {
            console.error("Error calling ChatGPT:", error);
        }
    }
}

//Testing:
async function testSend() {
    const emailContent = "Hi team, I wanted to bring up the discussion we had last week regarding the upcoming project deadline. As you know, the deadline for the Phoenix Project is rapidly approaching, that being February 25th, and there are still a significant number of tasks that need to be completed. I've reviewed our progress, and it's clear that we need to prioritize the development of the new feature set, as well as finalizing the marketing materials. I'm concerned that if we don't allocate additional resources to these areas, we won't meet our deadline. Could I ask for volunteers to work this weekend to help catch up? We really need at least two more people on the development tasks, and someone with marketing experience would be invaluable right now. Please let me know by the end of today if you can commit to this. It's crucial for the success of the project, and I know we can count on the team's dedication to get this across the line. Thanks for your understanding and hard work. Best, Jordan";
    sendToChatGPTV2(emailContent);
}

testSend();