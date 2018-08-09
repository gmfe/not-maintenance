const ChatBot = require('dingtalk-robot-sender');
const _ = require('lodash');

function robotSend(webhooks, content) {
    _.each(webhooks, webhook => {
        const robot = new ChatBot({webhook});
        robot.send(content);
    });
}

module.exports = robotSend;