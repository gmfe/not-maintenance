const sh = require("shelljs");
const path = require('path');
const robotSend = require('../service/robot_send');

function gitlab_document(config, data) {
    if (data.event === 'Merge Request Hook') {

        const {payload} = data;

        const {state} = payload.object_attributes;

        if (state !== 'merged') {
            return;
        }

        // 发送钉钉消息
        robotSend(config.webhooks, {
            "msgtype": "text",
            "text": {
                "content": "gm_static_document 开始更新"
            }
        });

        sh.exec(path.resolve(__dirname, '../cgi-bin/document_update.sh'), () => {
            robotSend(config.webhooks, {
                "msgtype": "text",
                "text": {
                    "content": "gm_static_document 更新完毕"
                }
            });
        });
    }
}

module.exports = gitlab_document;