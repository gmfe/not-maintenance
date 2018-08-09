const robotSend = require('../service/robot_send');

function gitlab_test(config, data) {

    if (data.event === 'Push Hook') {
        // 发送钉钉消息
        let textContent = {
            "msgtype": "text",
            "text": {
                "content": "我就是我, 是不一样的烟火"
            }
        };
        robotSend(config.webhooks, textContent);
    }
}

module.exports = gitlab_test;