# 📝 Chrome Extension Form Filler with Next.js Backend

This project is a complete solution for testing and using an automated form filler. It consists of three main components:  

1. **Form-Filler Backend**: A Next.js backend that handles API calls and logic for the form filler.  
2. **Form Website**: A sample Next.js app with forms for testing the extension.  
3. **Chrome Extension**: A browser extension to automatically fill form fields using data from the backend.  

---  

## 🚀 Features  

### Chrome Extension  
- Automatically identifies and fills out form fields like name, email, and age.  
- Simple, intuitive popup interface with a "Fill Form" button for user interaction.  

### Form Website  
- A responsive sample form built using Next.js and Tailwind CSS.  

### Form-Filler Backend  
- Powered by Next.js, this backend handles API requests from the Chrome Extension.  
- Allows custom configurations and supports Gemini’s API (API key required).  

---  

## 🛠️ Setup Instructions  

### 1. Clone the Repository  
```bash  
git clone https://github.com/R1shiraj/auto-form-fill.git
cd <project-folder>  
```  

### 2. Set Up the Form-Filler Backend  
1. Navigate to the `form-filler-backend` folder:  
   ```bash  
   cd form-filler-backend  
   ```  
2. Create a `.env` file in the `form-filler-backend` folder and add your Gemini API key:  
   ```  
   GOOGLE_GEMINI_API_KEY="your-api-key-here"
   ```  
3. Install dependencies and start the backend:  
   ```bash  
   npm install  
   npm run dev  
   ```  
4. The backend should now be running on `http://localhost:3000`.  

### 3. Set Up the Chrome Extension  
1. Open Google Chrome and navigate to `chrome://extensions/`.  
2. Enable **Developer Mode**.  
3. Click **Load Unpacked** and select the `chrome-extension` folder.  
4. The extension should now be loaded in your browser.  

### 4. Run the Form Website  
1. Navigate to the `form-website` folder:  
   ```bash  
   cd form-website  
   ```  
2. Install dependencies and start the Next.js app:  
   ```bash  
   npm install  
   npm run dev  
   ```  
3. 📌 The sample form website will be running on `http://localhost:3000`.  

---  

## 📂 Project Structure  
- **form-filler-backend/**: Handles API requests and logic for the form filler extension.  
- **form-website/**: A Next.js app for testing form-filling functionality.  
- **chrome-extension/**: The browser extension for filling forms automatically.  

---  

## 🌟 Contributing  
Contributions are welcome! If you want to fix a bug or add a feature, feel free to fork the repo, make your changes, and submit a pull request.  

---  

## 📌 Notes  
- The backend (form-filler-backend) **must** be running on `http://localhost:3000` for proper API communication with the Chrome Extension.  
- Ensure you have your Gemini API key ready to use the backend.  

Happy building! 🚀  

---  

Replace `<repository-url>` with your actual repository link.
