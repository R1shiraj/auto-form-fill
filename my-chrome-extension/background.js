chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed!");
  });
  
  chrome.action.onClicked.addListener((tab) => {
    // Inject content script when the user clicks the extension icon
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  });
  