chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getModelNumber" }, (response) => {
    document.getElementById("output").textContent = response?.modelNumber || "Unable to extract model number.";
  });
});
