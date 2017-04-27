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

// log in
function logIn() {
  chrome.browserAction.setBadgeText({ text: '' });
  chrome.browserAction.onClicked.addListener(generateTabList);
}

// interactive auth function
function auth() {
  chrome.identity.getAuthToken({ interactive: true }, logIn);
}

// log out
function logOut() {
  chrome.browserAction.setBadgeText({ text: '!' });
  chrome.browserAction.setBadgeBackgroundColor({ color: '#F00' });
  chrome.browserAction.onClicked.addListener(auth);
}

// silent auth callback
function authSilentCallback() {
  if (chrome.runtime.lastError) {
    logOut();
  } else {
    logIn();
  }
}

// silent auth function
function authSilent() {
  chrome.identity.getAuthToken({ interactive: false }, authSilentCallback);
}

// browser action listener
chrome.browserAction.onClicked.addListener(auth);

// attempt to authorize
authSilent();
