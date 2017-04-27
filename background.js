// background scripting for Airtab

// function to add list to local list
function addList(list) {
  console.log(list);
}

// function to generate list of tabs
function generateTabList() {
  chrome.tabs.query({ pinned: false }, (tabs) => {
    const list = tabs.map(tab => tab.url);
    addList(list);
  });
}

// browser action listener
chrome.browserAction.onClicked.addListener(generateTabList);
