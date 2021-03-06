chrome.tabs.onActivated.addListener(function () {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        doOurWork(url);
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var url = tabs[0].url;
            doOurWork(url);
        });
    }
});

function doOurWork(tabUrl){
    const appId = "mfbkopomkdkinlbkfbajdkniehbkiecp";
    chrome.runtime.sendMessage(appId, {'currentUrl': tabUrl}, function(response) {
            console.log(response.response);
      });
    console.log(tabUrl);
}

