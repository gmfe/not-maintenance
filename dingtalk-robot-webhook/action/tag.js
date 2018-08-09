const robotSend = require('../service/robot_send');

function gitlab_version(config, data) {
    robotSend(config.webhooks, {
        "msgtype": "text",
        "text": {
            "content": "版本已发布 tag:" + data.tag
        }
    });
}

module.exports = gitlab_version;