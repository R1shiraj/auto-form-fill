import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Replace with your actual API key (use .env for security)
  const geminiApiKey = process.env.GEMINI_API_KEY;

  // Initialize the client
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    // Define prompt or request payload
    const { userData, formFields } = req.body;
    const prompt = `
       You are assisting in smart form filling. Based on the provided user data and form field metadata, map user data to form fields.
       Respond with a JSON array where each object corresponds to a field, in this format:
       [
         { "id": "fieldId1", "value": "Field Value 1" },
         { "id": "fieldId2", "value": "Field Value 2" }
       ]
     `;

    const request = {
      prompt: prompt,
      context: {
        formFields,
        userData
      }
    };

    const result = await model.generateContent(request);

    // Send response back to the client
    res.status(200).json({ result: result.response.text() });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
