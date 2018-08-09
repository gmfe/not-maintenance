function create(callback) {
    return function handler(ctx, next) {
        if (ctx.url.split('?').shift() !== '/webhook') {
            return next();
        }

        function hasError(msg) {
            ctx.status = 400;
            ctx.set({'content-type': 'application/json'});
            ctx.body = JSON.stringify({error: msg});

            const err = new Error(msg);
            console.warn(err);
            next(err);
        }

        const gitlabEvent = ctx.get(`x-gitlab-event`);
        const githubEvent = ctx.get(`x-github-event`);

        if (!gitlabEvent && !githubEvent) {
            return hasError(`No x-gitlab-event or x-github-event found on request`);
        }

        const event = githubEvent || gitlabEvent;

        ctx.status = 200;
        ctx.set({'content-type': 'application/json'});
        ctx.body = JSON.stringify({
            code: 0,
            msg: 'ok'
        });

        const emitData = {
            event: event,
            payload: ctx.request.body,
            protocol: ctx.protocol,
            host: ctx.get('host'),
            url: ctx.url
        };

        console.log('webhookInfo emitData', emitData);

        // 不能阻塞 koa 返回 200
        setTimeout(() => {
            callback(emitData);
        }, 500);
    }
}

module.exports = create;