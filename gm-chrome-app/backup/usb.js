(function () {
    const {_, chrome, Util} = window;
    const printInterfacesClass = 7;

    function print() {
        return new Promise((resolve, reject) => {
            chrome.usb.getDevices({}, function (devices) {
                console.log('getDevices', devices);

                if (devices.length === 0) {
                    console.warn('没有找打印设备');
                    reject('没有找到打印设备');
                    return;
                }

                console.log('打开打印设备', devices[0]);

                chrome.usb.openDevice(devices[0], function (connection) {
                    if (connection) {
                        console.log('打印设备已打开');

                        chrome.usb.listInterfaces(connection, function (interfaces) {
                            console.log('interfaces', interfaces);
                            const face = _.find(interfaces, face => face.interfaceClass === printInterfacesClass);
                            const interfaceNumber = face.interfaceNumber;
                            const endpoint = _.find(face.endpoints, endpoint => endpoint.direction === 'out').address;

                            console.log('claimInterface', interfaceNumber, endpoint);
                            chrome.usb.claimInterface(connection, interfaceNumber, function () {
                                if (chrome.runtime.lastError) {
                                    console.error(chrome.runtime.lastError);
                                    reject(chrome.runtime.lastError + '');
                                    return;
                                }

                                const text = 'chrome app print';

                                const data = Util.str2ab([
                                    'CLS ',
                                    'SIZE 40 mm, 30mm',
                                    'GAP 2 mm',
                                    'DIRECTION 1',
                                    'REFERENCE 0,0',
                                    `TEXT 0,0,"TSS24.BF2",0,1,1,"${text}"`,
                                    'PRINT 1',
                                    'SOUND 1,100'
                                ].join('\r\n'));

                                chrome.usb.bulkTransfer(connection, {
                                    direction: 'out',
                                    endpoint,
                                    data
                                }, function (event) {
                                    console.log('send data resultCode', event.resultCode, data);

                                    chrome.usb.releaseInterface(connection, interfaceNumber, () => {
                                        if (chrome.runtime.lastError) {
                                            console.error(chrome.runtime.lastError);
                                            reject(chrome.runtime.lastError + '');
                                        }
                                    });

                                    if (event.resultCode === 0) {
                                        console.log('print done');
                                        resolve();
                                    } else {
                                        reject('print fail');
                                    }
                                });
                            });
                        });
                    } else {
                        console.warn('无法打开打印设备');
                        reject('无法打开打印设备');
                    }
                });
            });
        });
    }

    // TODO test
    chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
        console.log(request, sender);
        sendResponse('onMessageExternal sendResponse');
    });

    function listener(request) {
        const {type, data} = request;

        if (type !== 'print') {
            return;
        }

        console.log('print', data);

        print().then(() => {
            chrome.runtime.sendMessage({
                type: 'printResult',
                data: {
                    code: 0,
                    msg: '成功'
                }
            });
        }, reason => {
            chrome.runtime.sendMessage({
                type: 'printResult',
                data: {
                    code: 1,
                    msg: reason
                }
            });
        });
    }

    chrome.runtime.onMessage.addListener(listener);
    chrome.runtime.onMessageExternal.addListener(listener);
})();