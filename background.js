chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "downloadFile") {
    chrome.downloads.download({ url: message.url }, function (downloadId) {
      console.log("Successfully downloaded the file");
      // Handle download initiation, if needed
    });
  }
});

chrome.webNavigation.onCompleted.addListener(function (details) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs && tabs[0] && tabs[0].id === details.tabId) {
      chrome.tabs.sendMessage(details.tabId, { action: "navigationCompleted" }, function (response) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        }
      });
    }
  });
});
