chrome.app.runtime.onLaunched.addListener(function () {
    console.log("SecUSB app launched");
});

chrome.runtime.onConnectExternal.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        console.log(msg);
    });
});

chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        if (request.currentUrl)
        {
            console.log(request.currentUrl);
            sendResponse({
                'response': 200
            });
        } else {
            sendResponse({
                "response": 400
            });
        }
});

chrome.serial.getDevices(function(ports) {
    for (var i=0; i<ports.length; i++) {
      console.log(ports[i].path);
    }
});