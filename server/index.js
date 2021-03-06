const Koa = require('koa'),
    router = require('koa-router')(),
    app = new Koa(),
    // 中间件
    bodyparser = require('koa-bodyparser'),
    dayjs = require('dayjs')().format('YYYY-MM-DD HH:mm:ss'),
    tokenError = require('./services/tokenError'),
    jwtKoa = require('koa-jwt'),
    { secret } = require('./config/jwt');



require('./config/cors')(app) // 配置跨域支持
require('./routes')(router); //把router 扔到routes文件里


app
    // logger
    .use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        console.log(`[${dayjs}] ${ctx.method} ${ctx.status} ${ctx.url} - ${ms}ms\n`);
    })
    // middlewares
    .use(bodyparser({
        enableTypes: ['json', 'form', 'text'],
        onerror: (err, ctx) => {
            ctx.throw('数据解析出错：', 422);
        }
    }))



    // token 验证
    // .use(jwtKoa({ secret }).unless({
    //     path: ['/login'] //数组中的路径不需要通过 jwt 验证
    // }))
    // .use(tokenError()) // 拦截token


    // 接口 router
    .use(router.routes())
    .use(router.allowedMethods())



    // response
    // .use(async ctx => {
    //     ctx.body = { info: "is json data ?" };
    // });

    // 错误处理
    .on('error', (err, ctx) => {
        console.error('【server error: 】', err, ctx)
    })

    .listen(3001, () => { console.info('RSFroum 项目启动 ---> http://localhost:3001') });