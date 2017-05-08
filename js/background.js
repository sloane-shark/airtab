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
  firebase.initializeApp(config);
}

window.onload = () => {
  init();
};
