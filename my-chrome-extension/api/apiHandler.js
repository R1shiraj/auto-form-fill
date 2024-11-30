// apiHandler.js

async function sendToBackend(formFields, userData) {
  console.log("Sending data to backend:", { formFields, userData });

  try {
    const response = await fetch("http://localhost:3000/api/processForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formFields, userData }),
    });

    if (!response.ok) {
      throw new Error("Failed to send data to backend.");
    }

    const responseData = await response.json();
    console.log("Received response from backend:", responseData);

    return responseData; // Return the backend response
  } catch (error) {
    console.error("Error in apiHandler:", error);
    throw error;
  }
}

export default sendToBackend;
