const fs = require('fs').promises;
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function processResultCard(imagePath, apiKey) {
    try {
        // Configure the API
        const genAI = new GoogleGenerativeAI(apiKey);

        // Set up the model
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Read the image
        const imageBytes = await fs.readFile(imagePath);
        const imageBase64 = imageBytes.toString('base64');

        // Prepare the prompt
        const prompt = `
            Extract all subject details from the results image and create a JSON object with the following structure:
            {
                "semester": "2", // Extracted from the image
                "courses": [
                    {
                        "course_name": "NAME OF COURSE IN CAPITALS",
                        "course_code": "SUBJECT CODE",
                        "course_credit": 0, // Default to 0 if not specified
                        "grade": "GRADE"
                    }
                ]
            }
            Return only the JSON object without any additional text or explanations.
        `;

        // Generate response
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: 'image/jpeg',
                },
            },
        ]);

        const responseText = result.response;

        // Clean up the response text to ensure it's valid JSON
        const cleanedText = responseText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        // Parse and format the JSON
        const parsedResult = JSON.parse(cleanedText);
        return JSON.stringify(parsedResult, null, 2);
    } catch (error) {
        return JSON.stringify({ error: error.message }, null, 2);
    }
}

async function main() {
    // Replace with your Gemini Pro API key
    const API_KEY = 'AIzaSyCfgJjB605M7J9PcPwWjSzMr2P3KY_43JY';

    // Path to the image
    const imagePath = 'result.jpg';

    try {
        // Process the image
        const resultJson = await processResultCard(imagePath, API_KEY);

        // Save the output to a JSON file
        const outputFile = 'result_card_output.json';
        await fs.writeFile(outputFile, resultJson);

        console.log(`\nResults saved to ${outputFile}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the main function
main().catch(console.error);
