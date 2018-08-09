function create(callback) {
    return function handler(ctx, next) {
        // /tag/master_2017_11_09_18_13_44_limingyi

        if (ctx.url.indexOf('/tag/') === -1) {
            return next();
        }

        ctx.status = 200;
        ctx.set({'content-type': 'application/json'});
        ctx.body = JSON.stringify({
            code: 0,
            msg: 'ok'
        });

        console.log(ctx);

        const tag = ctx.url.slice('/tag/'.length);

        const emitData = {
            tag: decodeURIComponent(tag)
        };

        console.log('tagInfo emitData', emitData);

        // 不能阻塞 koa 返回 200
        setTimeout(() => {
            callback(emitData);
        }, 500);
    }
}

module.exports = create;