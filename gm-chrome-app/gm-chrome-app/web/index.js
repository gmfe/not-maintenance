(function () {

    const {document, chrome, fetch, Util} = window;

    const $ = function (id) {
        return document.getElementById(id);
    };

    const updateUrl = 'http://js.guanmai.cn/static_storage/json/chromeapp/update.json?random=' + Math.random();

    (function () {
        const version = chrome.runtime.getManifest().version;
        $('version').innerHTML = 'V' + version;

        fetch(updateUrl).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('发生错误');
        }).then(json => {
            console.log(json);
            if (Util.versionDiff(json.version, version)) {
                $('versionMsg').innerHTML = ` 最新版本是 V${json.version} <a id="versionDownload" target="_blank" href="${json.url}">点我下载升级</a> <a id="versionDownload" target="_blank" href="${json.url}">安装说明TODO</a>`;

                chrome.notifications.clear('versionNotification');
                chrome.notifications.create('versionNotification', {
                    type: 'basic',
                    iconUrl: '../images/logo.png',
                    title: '提示',
                    message: `最新版本是${json.version}，点我下载升级！
${json.msg}`
                });
                const timer = setInterval(() => {
                    chrome.notifications.clear('versionNotification');
                    chrome.notifications.create('versionNotification', {
                        type: 'basic',
                        iconUrl: '../images/logo.png',
                        title: '提示',
                        message: `最新版本是${json.version}，点我下载升级！
${json.msg}`
                    });
                }, 10000);

                chrome.notifications.onClicked.addListener(function (id) {
                    if (id !== 'versionNotification') {
                        return;
                    }

                    clearInterval(timer);
                    $('versionDownload').click();
                });
            }
        });
    })();

// weight
    let timer = null;
    let weightQueue = [];
    $('connectWeight').onclick = function () {
        chrome.runtime.sendMessage({
            type: 'connectWeight'
        });
        clearInterval(timer);
        timer = setInterval(() => {
            chrome.runtime.sendMessage({
                type: 'getWeight'
            }, function (res) {
                $('weight').innerHTML = res.data;
            });
        }, 500);
    };

    $('disconnectWeight').onclick = function () {
        chrome.runtime.sendMessage({
            type: 'disconnectWeight'
        });
        clearInterval(timer);
    };

    chrome.runtime.onMessage.addListener(request => {
        const {type, data} = request;

        if (type !== 'connectWeightResult') {
            return;
        }

        weightQueue.push(data);
        weightQueue = weightQueue.slice(-6);

        $('connectWeightMsg').innerHTML = JSON.stringify(weightQueue);
        console.log(data);
        // TODO 通知
    });

    // TODO
    // chrome.runtime.sendMessage('gjicmdfpcikpoginaeiopgfbdalbbhof', {type: 'version'}, res => console.log(res));
})();