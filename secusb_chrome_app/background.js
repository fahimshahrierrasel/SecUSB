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


var devicePath;
chrome.serial.getDevices(function(ports) {
    for (var i=0; i<ports.length; i++) {
      devicePath = ports[i].path;
    }
   connectDevice(devicePath);
});

function connectDevice(path){
    chrome.serial.connect(path, function(connectionInfo){
        if(!connectionInfo){
            console.log("Connection failed.");
            return;
        }else{
            console.log("Connected!");
        }
    });
} 
