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

// interactive authorization function
function authorize() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

// set extension badge to success
function setBadgeSuccess() {
  chrome.browserAction.setBadgeText({ text: '' });
  if (chrome.browserAction.onClicked.hasListener(authorize)) {
    chrome.browserAction.onClicked.removeListener(authorize);
  }
  if (!chrome.browserAction.onClicked.hasListener(generateTabList)) {
    chrome.browserAction.onClicked.addListener(generateTabList);
  }
}

// set extension badge to failure
function setBadgeFailure() {
  chrome.browserAction.setBadgeBackgroundColor({ color: '#F00' });
  chrome.browserAction.setBadgeText({ text: '!' });
  if (chrome.browserAction.onClicked.hasListener(generateTabList)) {
    chrome.browserAction.onClicked.removeListener(generateTabList);
  }
  if (!chrome.browserAction.onClicked.hasListener(authorize)) {
    chrome.browserAction.onClicked.addListener(authorize);
  }
}

// initialize Firebase and attempt silent authentication
function init() {
  // initialize Firebase with configuration (config.js)
  firebase.initializeApp(config);
  // set up Firebase auth state listener
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setBadgeSuccess();
    } else {
      setBadgeFailure();
    }
  });
  // get Chrome identity
  chrome.identity.getAuthToken({ interactive: false }, (token) => {
    if (chrome.runtime.lastError) {
      setBadgeFailure();
    } else if (token) {
      // generate Firebase credential and authorize
      const credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth.signInWithCredential(credential).catch((error) => {
        // credential was invalid or expired, so remove the cached Google token
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedToken({ token });
        }
        setBadgeFailure();
      });
    } else {
      setBadgeFailure();
    }
  });
}

chrome.browserAction.onClicked.addListener(authorize);

window.onload = () => {
  init();
};
