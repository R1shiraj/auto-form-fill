const userData = {
  name: "Rishiraj Sontakke",
  email: "rishirajdev25@gmail.com",
  phone: "+1-123-456-7890",
  address: { street: "123 Main St", city: "Springfield", state: "IL", zip: "62704", country: "USA" },
  dateOfBirth: "1990-05-15",
  gender: "Male",
  age: "21",
  feedback: "Apis are working",
  college: "Pillai College of Enginnering",
  Projects: "AI form filler, Ecommerce Website",
  projectDescription: "Very lenghty but useful and knowledge giving project",
  occupation: "Software Developer",
  company: "Tech Solutions Inc.",
  socialProfiles: { linkedin: "https://linkedin.com/in/johndoe", twitter: "https://twitter.com/johndoe" },
  preferences: { newsletter: true, notifications: false },
  paymentDetails: { cardNumber: "4111111111111111", expiry: "12/25", cvv: "123" },
};

// Extract form fields
function getFormFields() {
  const fields = [];
  const inputs = document.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    fields.push({
      id: input.id,
      name: input.name,
      placeholder: input.placeholder,
      type: input.type,
      tag: input.tagName.toLowerCase(),
    });
  });

  return fields;
}

// Fill form based on API response
function fillForm(fieldsData) {
  fieldsData.forEach(({ id, value }) => {
    const element = document.getElementById(id);
    if (element) {
      if (element.type === "checkbox" || element.type === "radio") {
        element.checked = Boolean(value);
      } else if (element.tagName.toLowerCase() === "select") {
        const option = Array.from(element.options).find(opt => opt.value === value);
        if (option) element.value = value;
      } else {
        element.value = value;
      }
      element.style.border = "2px solid green"; // Highlight filled fields
    }
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fillForm") {
    (async () => {
      try {
        const formFields = getFormFields();

        const response = await fetch("http://localhost:3000/api/processForm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formFields, userData }),
        });

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        console.log("typeof data = ", typeof data)
        console.log("Response Data: ", data);  // Check the structure

        
        const fieldValues = await data.result;

        console.log("typeof data.fieldValues = ", typeof fieldValues)
        console.log("Response data.fieldValues: ", fieldValues);  // Check the structure


        if (!Array.isArray(fieldValues)) {
          throw new Error("Invalid response format: 'fieldValues' must be an array.");
        }

        fillForm(fieldValues);
        sendResponse({ status: "Form filled successfully!" });
      } catch (error) {
        console.error("Error filling the form:", error);
        sendResponse({ status: "Error filling the form", error: error.message });
      }
    })();

    return true; // Keep the message channel open
  }
});
