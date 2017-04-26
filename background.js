// background scripting for Airtab

// browser action listener
chrome.browserAction.onClicked.addListener((_) => {
  // get unpinned tabs
  chrome.tabs.query({ pinned: false }, (tabs) => {
    // get urls for tabs
    const data = tabs.map(tab => tab.url);
    console.log(data);
  });
});
