// background scripting for Airtab

// add a tab list to registry
function addList(list) {
  console.log(list);
}

// generate list of tabs
function generateTabList() {
  chrome.tabs.query({ pinned: false }, (tabs) => {
    const list = tabs.map(tab => ({ url: tab.url, title: tab.title, favicon: tab.favIconUrl }));
    addList(list);
  });
}

// initialize Firebase and attempt silent authentication
function init() {
  // initialize Firebase with configuration (config.js)
  firebase.initializeApp(config);
  // get Chrome identity
  chrome.identity.getAuthToken({ interactive: false }, (token) => {
    if (chrome.runtime.lastError) {
      // error
    } else if (token) {
      const credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth.signInWithCredential(credential).catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedToken({ token });
        }
        // error
      });
    } else {
      // error
    }
  });
}

window.onload = () => {
  init();
};
