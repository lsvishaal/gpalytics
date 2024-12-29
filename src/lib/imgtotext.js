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
        * Include a 'semester' field with the semester number
        * Create a 'subjects' array containing objects for each subject with:
           * code: Subject code
           * course_description: Name of the course in capitals
           * credit: Credit hours (use 0 if not specified)
           * grade: Letter grade received
        * Format the JSON with proper indentation for readability
        
        Return only the JSON object without any additional text or explanations.`;

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
    // Replace with your Gemini API key
    const API_KEY = "AIzaSyCfgJjB605M7J9PcPwWjSzMr2P3KY_43JY";
    
    // The uploaded image should be put in this below image path , need to make it a variable
    const imagePath = '1.jpg';
    
    try {
        // Process the image
        const resultJson = await processResultCard(imagePath, API_KEY);
        
        // Print the result
        // console.log("\nExtracted Results:");
        // console.log(resultJson);
        
        // Output file that will be sent to the backend
        await fs.writeFile('result_card_output.json', resultJson);
        // console.log("\nResults saved to result_card_output.json");
        
    } catch (error) {
        console.error("Error:", error);
    }
}

// Run the main function
main().catch(console.error);