// background scripting for Airtab

// TODO: move this to an object probably
let authToken;

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

// auth callback
function authCallback(token) {
  if (chrome.runtime.lastError) {
    chrome.browserAction.setBadge({ text: '!' });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#F00' });
  } else {
    console.log(token);
    authToken = token;
    chrome.browserAction.onClicked.addListener(generateTabList);
  }
}

// auth function
function auth(options = { interactive: false }) {
  chrome.identity.getAuthToken({ interactive: options.interactive }, authCallback);
}

// silent auth
function authSilent() {
  auth({ interactive: false });
}

// interactive auth
function authInteractive() {
  auth({ interactive: true });
}

// handler for browser button clicks
chrome.browserAction.onClicked.addListener(authInteractive);

// attempt to authorize
authSilent();
