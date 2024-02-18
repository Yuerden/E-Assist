// Initial load of openai npm package
const { Configuration, OpenAIApi } = require("openai");

//Setup OpenAI API key
const configuration = new Configuration({
    apiKey: "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",
});

//Configure OpenAI API access
const openai = new OpenAIApi(configuration);


async function sendToChatGPT(emailContent) {
    const openAIResponse = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer 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`
        },
        body: JSON.stringify({
            model: "text-davinci-003", // Update to the latest or most suitable model
            prompt: `Given the following email content, generate a concise summary that includes the subject, key points, any action required, the overall sentiment, and any additional notes that are important. Ensure the summary is clear and captures all critical details without missing important information.
        
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
        - Additional Notes: [Any other important details]`,
            temperature: 0.5,
            max_tokens: 2048,
        })
    });

    if (!openAIResponse.ok) {
        throw new Error(`OpenAI API request failed: ${openAIResponse.statusText}`);
    }

    const data = await openAIResponse.json();
    return data.choices[0].text; // This is ChatGPT's response
}

async function sendToChatGPTV2(emailContent) {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
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
                - Additional Notes: [Any other important details]`,
            },
        ],
        temperature: 0.5,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    if (!response.ok) {
        throw new Error(`OpenAI API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].text; // This is ChatGPT's response
}

//Testing
async function testSendToChatGPT() {
    const emailContent = "Hi team, I wanted to bring up the discussion we had last week regarding the upcoming project deadline. As you know, the deadline for the Phoenix Project is rapidly approaching, and there are still a significant number of tasks that need to be completed. I've reviewed our progress, and it's clear that we need to prioritize the development of the new feature set, as well as finalizing the marketing materials. I'm concerned that if we don't allocate additional resources to these areas, we won't meet our deadline. Could I ask for volunteers to work this weekend to help catch up? We really need at least two more people on the development tasks, and someone with marketing experience would be invaluable right now. Please let me know by the end of today if you can commit to this. It's crucial for the success of the project, and I know we can count on the team's dedication to get this across the line. Thanks for your understanding and hard work. Best, Jordan   ";
    try {
        const response = await sendToChatGPTV2(emailContent);
        console.log("Response from ChatGPT:", response);
    } catch (error) {
        console.error("Error calling ChatGPT:", error);
    }
}

// Call the test function
//testSendToChatGPT();

async function runCompletion () {
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "How are you today?",
    max_tokens:4000
    });
    console.log(completion.data.choices[0].text);
}
runCompletion();