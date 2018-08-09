const moment = require('moment');
const robotSend = require('../service/robot_send');

function gitlab_version(config, data) {
    if (data.event === 'Merge Request Hook') {

        const {payload} = data;

        const {state} = payload.object_attributes;

        if (state !== 'merged') {
            return;
        }

        const info = {
            project: payload.project.name,
            hash: payload.object_attributes.merge_commit_sha.slice(0, 7),
            author: payload.user.name,
            date: moment(payload.object_attributes.updated_at).format('YYYY-MM-DD HH:mm:ss'),
            subject: payload.object_attributes.title,
            body: payload.object_attributes.description,
            url: payload.object_attributes.url,
            iid: payload.object_attributes.iid
        };

        const title = `Merge ${info.project}`,
            text = `Merge ${info.project}\n
${info.author} ${info.date}\n
标题: ${info.subject}\n
描述: ${info.body}\n
---\n
[merge_requests ${info.iid}](${info.url})\n`;

        robotSend(config.webhooks, {
            msgtype: 'markdown',
            markdown: {
                title,
                text
            }
        });
    }
}

module.exports = gitlab_version;