(function () {
    const {chrome} = window;

    chrome.app.runtime.onLaunched.addListener(function () {
        chrome.app.window.create('./web/index.html', {
            'bounds': {
                'width': 500,
                'height': 500
            }
        });
    });

    chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
        const {type} = request;

        if (type !== 'version') {
            return;
        }

        sendResponse({
            code: 0,
            data: chrome.runtime.getManifest().version
        });
    });
})();