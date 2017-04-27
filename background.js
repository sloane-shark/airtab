// background scripting for Airtab

// function to add list to registry
function addList(list) {
  console.log(list);
}

// function to generate list of tabs
function generateTabList() {
  chrome.tabs.query({ pinned: false }, (tabs) => {
    const list = tabs.map(tab => ({ url: tab.url, title: tab.title, favicon: tab.favIconUrl }));
    addList(list);
  });
}

// handler for browser button clicks
chrome.browserAction.onClicked.addListener(generateTabList);
