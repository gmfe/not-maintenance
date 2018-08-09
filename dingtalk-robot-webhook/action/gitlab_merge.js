const moment = require('moment');
const robotSend = require('../service/robot_send');

function gitlab_merge(config, data) {
    if (data.event === 'Merge Request Hook') {

        const {payload} = data;

        const {state, description} = payload.object_attributes;

        if (state !== 'opened') {
            return;
        }

        const info = {
            project: payload.project.name,
            author: payload.user.name,
            date: moment(payload.object_attributes.updated_at).format('YYYY-MM-DD HH:mm:ss'),
            url: payload.object_attributes.url,
            iid: payload.object_attributes.iid
        };

        const title = `新PR ${info.project}`,
            text = `**PR PR PR PR PR PR**\n
${info.project} [merge_requests ${info.iid}](${info.url})\n
Request to merge ${payload.object_attributes.source_branch} info ${payload.object_attributes.target_branch}\n
${info.author} ${info.date}\n
---\n
${payload.object_attributes.title}\n
${description}\n`;

        robotSend(config.webhooks, {
            msgtype: 'markdown',
            markdown: {
                title,
                text
            },
            at: {
                isAtAll: true
            }
        });
    } else if (data.event === 'Note Hook') {
        const {payload} = data;
        const {noteable_type} = payload.object_attributes;

        if (noteable_type === 'MergeRequest') {
            const title = `PR note`,
                text = `**PR note**\n
${payload.project.name} [merge_request ${payload.merge_request.iid}](${payload.object_attributes.url})\n
${payload.user.name}\n
---\n
${payload.object_attributes.note}\n`;

            robotSend(config.webhooks, {
                msgtype: 'markdown',
                markdown: {
                    title,
                    text
                }
            });
        }
    }
}

module.exports = gitlab_merge;