require('./service/config_log4js');

const Koa = require('koa');
const koaBody = require('koa-body');
const _ = require('lodash');
const config = require('./config');
const webhookInfo = require('./service/webhookInfo');
const gitlab_version = require('./action/gitlab_version');
const gitlab_test = require('./action/gitlab_test');
const gitlab_document = require('./action/gitlab_document');
const gitlab_storage = require('./action/gitlab_storage');
const gitlab_merge = require('./action/gitlab_merge');

const tagInfo = require('./service/tagInfo');
const tag = require('./action/tag');

const testingInfo = require('./service/testingInfo');
const testing = require('./action/testing');

const app = new Koa();
app.use(koaBody({json: true}))
    .use(webhookInfo(webhookInfoCb))
    .use(tagInfo(tagInfoCb))
    .use(testingInfo(testingInfoCb))
    .use((ctx, next) => {
        ctx.status = 404;
        ctx.body = 'no such location';
    }).listen(8083);


function webhookInfoCb(data) {

    const project = data.payload.project.name;

    _.each(config, c => {
        // 如果存在 projects 配置，则过滤下
        if (c.projects && !c.projects.includes(project)) {
            return;
        }

        if (c.action === 'gitlab_version') {
            gitlab_version(c, data)
        } else if (c.action === 'gitlab_test') {
            gitlab_test(c, data);
        } else if (c.action === 'gitlab_document') {
            gitlab_document(c, data);
        } else if (c.action === 'gitlab_storage') {
            gitlab_storage(c, data);
        } else if (c.action === 'gitlab_merge') {
            gitlab_merge(c, data);
        }
    });
}


function tagInfoCb(data) {
    _.each(config, c => {
        if (c.action === 'tag') {
            tag(c, data);
        }
    });
}

function testingInfoCb(data) {
    _.each(config, c => {
        if (c.action === 'testing') {
            testing(c, data);
        }
    });
}