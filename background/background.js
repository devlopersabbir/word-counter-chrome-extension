chrome.runtime.onMessage.addListener((message) => {
  chrome.action.setBadgeText({ text: message.letterCount?.toString() });
});
