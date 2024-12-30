const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs').promises;

async function processResultCard(imagePath, apiKey) {
    try {
        // Configure the API
        const genAI = new GoogleGenerativeAI(apiKey);

        // Set up the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Read and prepare image
        const imageBytes = await fs.readFile(imagePath);
        const imageBase64 = imageBytes.toString('base64');

        // Prepare the prompt
        const prompt = `Extract all subject details from the results image and create a JSON object with the following structure:
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
        Ensure proper indentation and return only the JSON object without any extra text.`;

        // Generate response from the model
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: "image/jpeg"
                }
            }
        ]);

        const response = await result.response;
        let responseText = response.text();

        // Clean up the response text to ensure it's valid JSON
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        // Parse and format the JSON
        const parsedResult = JSON.parse(responseText);
        return JSON.stringify(parsedResult, null, 2);

    } catch (error) {
        return JSON.stringify({ error: error.message }, null, 2);
    }
}

async function main() {

    const API_KEY = "AIzaSyCfgJjB605M7J9PcPwWjSzMr2P3KY_43JY";
    
    
    const imagePath = 'result.jpg'; 
    
    try {
        // Process the image
        const resultJson = await processResultCard(imagePath, API_KEY);
        
        // Output file that will be sent to the backend
        await fs.writeFile('result_card_output.json', resultJson);
        // console.log("\nResults saved to result_card_output.json");
        
    } catch (error) {
        console.error("Error:", error);
    }
}

// Run the main function
main().catch(console.error);
