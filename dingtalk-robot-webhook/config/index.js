const qianduanjishuzhongxin = 'https://oapi.dingtalk.com/robot/send?access_token=e5bba005804c728b7395f901583577e6964d8912021413089b0ad39661b13cca';
const chanpin = 'https://oapi.dingtalk.com/robot/send?access_token=2ca2921d1f17eb7cdd67e26114d223bfd7c7f47b7487bdfb2d4bbfb8daba35a5';
const banbenfabu = 'https://oapi.dingtalk.com/robot/send?access_token=81898c17e5aaea32b2125f5ba53ad65cfdeffa889695e6764dfd533f7ac5863c';

const test = 'https://oapi.dingtalk.com/robot/send?access_token=4debfc027a1546afd374bb41dc29dcf00d10f270af038822f8dde60b5142a5e2';

const config = [
    {
        webhooks: [
            banbenfabu,
            chanpin,
            qianduanjishuzhongxin
        ],
        action: 'gitlab_version'
        // },
        // {
        //     action: 'gitlab_test',
        //     webhooks: ['https://oapi.dingtalk.com/robot/send?access_token=4debfc027a1546afd374bb41dc29dcf00d10f270af038822f8dde60b5142a5e2']
    }, {
        webhooks: [
            chanpin,
            qianduanjishuzhongxin
        ],
        action: 'gitlab_document',
        projects: ['gm_static_document']
    }, {
        webhooks: [
            banbenfabu,
            chanpin,
            qianduanjishuzhongxin
        ],
        action: 'gitlab_storage',
        projects: ['gm_static_storage']
    }, {
        webhooks: [
            test
        ],
        action: 'gitlab_merge'
    }, {
        webhooks: [
            banbenfabu,
            chanpin,
            qianduanjishuzhongxin
        ],
        action: 'tag'
    }, {
        webhooks: [
            banbenfabu,
            chanpin,
            qianduanjishuzhongxin
        ],
        action: 'testing'
    }
];

module.exports = config;