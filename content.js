function extractModelNumber() {
  const possibleLabels = [
    "Model Number",
    "Item model number",
    "Item Model Number",
    "Model number"
  ];

  const rows = document.querySelectorAll("#productDetails_techSpec_section_1 tr, #productDetails_detailBullets_sections1 tr, .a-keyvalue .a-row");
  for (let row of rows) {
    let label = row.querySelector("th, .a-keyvalue-label")?.innerText?.trim();
    let value = row.querySelector("td, .a-keyvalue-value")?.innerText?.trim();

    if (label && value) {
      for (let keyword of possibleLabels) {
        if (label.includes(keyword)) {
          return value;
        }
      }
    }
  }

  // Try bullet points (alternative structure)
  const bullets = document.querySelectorAll("#detailBullets_feature_div li");
  for (let li of bullets) {
    let text = li.innerText.trim();
    for (let keyword of possibleLabels) {
      if (text.includes(keyword)) {
        return text.split(":")[1]?.trim();
      }
    }
  }

  return "Model number not found.";
}

// Send to popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getModelNumber") {
    sendResponse({ modelNumber: extractModelNumber() });
  }
});
