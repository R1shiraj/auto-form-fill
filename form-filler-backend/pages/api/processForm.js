import cors, { runMiddleware } from '../../middleware/cors';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  // Replace with your actual API key (use .env for security)
  const geminiApiKey = process.env.GEMINI_API_KEY;

  // Initialize the client
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { formFields, userData } = req.body;

  if (!formFields || !userData) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  console.log("Received data from extension:", { formFields, userData });

  try {
    const instructions = `
      You are assisting in smart form filling. Based on the provided user data and form field metadata, map user data to form fields.
      Respond with a JSON array where each object corresponds to a field. Make sure that the response is an array containing json and do not include unnecessary spaces or new lines like shown in this format:
      [
        { "id": "fieldId1", "value": "Field Value 1" },
        { "id": "fieldId2", "value": "Field Value 2" }
      ]
    `;

    // Log the request data being sent to Gemini API
    const geminiRequestBody = {
      formFields,
      userData,
    };
    const requestBodyString = instructions + JSON.stringify(geminiRequestBody);

    console.log("Sending data to Google Gemini API:", requestBodyString);
//////////////////////////////////////////
const result = await model.generateContent(requestBodyString);

///////////////////////////////////////

    // Log the result from Google Gemini API
    console.log("Received result from Google Gemini API:", result.response.text());

    // if (result.ok) {
    //   res.status(200).json(geminiData); // Send Gemini's result back to the extension
    // } else {
    //   res.status(result.status).json({ error: geminiData.error || "Gemini API Error" });
    // }
    const answer = JSON.parse(result.response.text());
    console.log("Type of answer = ", typeof answer)
    console.log("Answer", answer)
    res.status(200).json({ result: answer });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
