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

// interactive auth function
function auth() {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    console.log(token);
  });
}

// log in
function logIn() {
  chrome.browserAction.setBadgeText({ text: '' });
  chrome.browserAction.onClicked.addListener(generateTabList);
}

// log out
function logOut() {
  chrome.browserAction.setBadgeText({ text: '!' });
  chrome.browserAction.setBadgeBackgroundColor({ color: '#F00' });
  chrome.browserAction.onClicked.addListener(auth);
}

// silent auth function
function authSilent() {
  chrome.identity.getAuthToken({ interactive: false }, (token) => {
    if (chrome.runtime.lastError) {
      logOut();
    } else {
      // successfully logged in
      console.log(token);
      logIn();
    }
  });
}

// browser action listener
chrome.browserAction.onClicked.addListener(auth);

// attempt to authorize
authSilent();
