window.addEventListener("message", (event) => {
    if (event.data.action === "FILL_FORM") {
      const formData = {
        name: "John Doe",
        email: "johndoe@example.com",
        age: "25",
        academicDetails: "Bachelor's in Computer Science",
        projectTitle: "AI-Powered App",
        projectDescription: "An innovative application leveraging AI to solve real-world problems.",
        feedback: "Great work!",
      };
  
      for (const [key, value] of Object.entries(formData)) {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) {
          input.value = value;
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    }
  });
  