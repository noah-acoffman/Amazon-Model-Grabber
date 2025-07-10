function extractModelNumber() {
  const possibleLabels = [
    "Model Number",
    "Item model number",
    "Item Model Number",
    "Model number"
  ];

  const rows = document.querySelectorAll(
    "#productDetails_techSpec_section_1 tr, " +
    "#productDetails_detailBullets_sections1 tr, " +
    ".a-keyvalue .a-row"
  );

  for (const row of rows) {
    const label = row.querySelector("th, .a-keyvalue-label")?.innerText?.trim();
    const value = row.querySelector("td, .a-keyvalue-value")?.innerText?.trim();
    if (label && value && possibleLabels.some(k => label.includes(k))) {
      return value;
    }
  }

  const bullets = document.querySelectorAll("#detailBullets_feature_div li");
  for (const li of bullets) {
    const text = li.innerText.trim();
    if (possibleLabels.some(k => text.includes(k))) {
      return text.split(":")[1]?.trim();
    }
  }

  return "Model number not found.";
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log(`✅ Copied to clipboard: ${text}`);
  } catch (err) {
    console.error("❌ Failed to copy: ", err);
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getModelNumber") {
    const modelNumber = extractModelNumber();
    copyToClipboard(modelNumber);
    sendResponse({ modelNumber });
  }
});
