function create(callback) {
    return function handler(ctx, next) {
        if (ctx.url.indexOf('/testing/') === -1) {
            return next();
        }

        ctx.status = 200;
        ctx.set({'content-type': 'application/json'});
        ctx.body = JSON.stringify({
            code: 0,
            msg: 'ok'
        });

        console.log(ctx);

        const msg = ctx.url.slice('/testing/'.length);

        const emitData = {
            msg: decodeURIComponent(msg)
        };

        console.log('testingInfo emitData', emitData);

        // 不能阻塞 koa 返回 200
        setTimeout(() => {
            callback(emitData);
        }, 500);
    }
}

module.exports = create;