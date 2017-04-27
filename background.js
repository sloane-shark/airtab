// background scripting for Airtab

// function for arbitrary xhr request
function handleReq(options) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    options.callback(xhr);
  };
  xhr.open(options.method, options.url, true);
  xhr.setRequestHeader('Authorization', `Bearer ${options.token}`);
  xhr.send(options.params);
}

// check if an object is empty
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

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
chrome.browserAction.onClicked.addHandler(generateTabList);
