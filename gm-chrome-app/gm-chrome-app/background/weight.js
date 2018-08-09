(function () {
    const {_, chrome, Util} = window;

    let weight = '';

    let devices = [];
    let connectionIds = [];
    chrome.serial.getDevices(list => {
        devices = list;
    });

    chrome.serial.onReceive.addListener((info) => {
        if (info.connectionId && info.data) {
            const d = Util.ab2str(info.data);
            if (d) {
                weight = d;
            }
        }
    });

    function connectWeight() {
        if (devices.length === 0) {
            chrome.runtime.sendMessage({
                type: 'connectWeightResult',
                data: {
                    code: 1,
                    msg: '没有串口'
                }
            });
            return;
        }
        disconnectWeight(() => {
            // 重新连接， 先暴力全部连接
            _.each(devices, device => {
                chrome.serial.connect(device.path, {}, info => {
                    console.log('connect', info);
                    if (info) {
                        connectionIds.push(info.connectionId);
                    }
                });
            });
        });
    }

    function disconnectWeight(cb) {
        // 初始化 和 断开所有设备
        weight = '';

        if (connectionIds.length === 0) {
            cb && cb();
            return;
        }

        _.each(connectionIds, id => {
            chrome.serial.disconnect(id, result => {
                if (result) {
                    connectionIds = _.without(connectionIds, id);
                }

                if (connectionIds.length === 0) {
                    cb && cb();
                }
            });
        });
    }

    function listener(request, sender, sendResponse) {
        const {type} = request;

        if (type === 'connectWeight') {
            connectWeight();
            return;
        }

        if (type === 'disconnectWeight') {
            disconnectWeight();
            return;
        }

        if (type === 'getWeight') {
            sendResponse({
                data: weight
            });
            return;
        }
    }

    chrome.runtime.onMessage.addListener(listener);
    chrome.runtime.onMessageExternal.addListener(listener);
})();