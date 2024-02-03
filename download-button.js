function addDownloadButton() {
  let artWork =
    document.querySelector(".listenArtworkWrapper") ||
    document.querySelector(".fullHero__artwork");

  console.log(artWork);

  if (!artWork || artWork.querySelector(".download-button")) {
    return;
  }

  let downloadIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
  <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
  <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
  </svg>
  `;
  let downloadButton = document.createElement("span");
  downloadButton.innerHTML = downloadIcon;
  downloadButton.classList.add("download-button");
  downloadButton.addEventListener("click", () => {
    console.log("Clicked me");
    let span = artWork.querySelector("span");
    let coverArtUrl = span.style["backgroundImage"].split('"')[1];
    chrome.runtime.sendMessage({
      action: "downloadFile",
      url: coverArtUrl,
    });
  });
  artWork.append(downloadButton);
}

window.onload = addDownloadButton;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "navigationCompleted") {
    // Your code to execute upon successful navigation
    console.log("adding the download button");
    addDownloadButton();
  }
});
