document.getElementById("fillForm").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm" }, (response) => {
      document.getElementById("status").textContent = response?.status || "Error!";
    });
  });
});
