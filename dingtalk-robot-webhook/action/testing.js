const robotSend = require('../service/robot_send');

function gitlab_version(config, data) {
    robotSend(config.webhooks, {
        "msgtype": "text",
        "text": {
            "content": data.msg
        }
    });
}

module.exports = gitlab_version;