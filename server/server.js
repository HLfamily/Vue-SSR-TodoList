const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const koaBody = require('koa-body')
const koaSession = require('koa-session')

const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const userRouter = require('./routers/user')
const createDb = require('./db/db')
const config = require('../app.config')

const db =  createDb(config.db.appId, config.db.appKey)

const app = new Koa()

// 设置session的设置
app.keys = ['vue ssr tech']
app.use(koaSession({
  key: "v-ssr-id",
  maxAge: 2 * 60 * 60 * 1000
}, app))

const isDev = process.env.NODE_ENV === 'development'

// ctx是来自客户端的请求用中间件来记录所有的请求和抓取错误
app.use(async (ctx, next) => {
  try {
    console.log(`req path from ${ctx.path}`)
    await next()
  } catch (e) {
    console.log(e)
    ctx.status = 500
    if (isDev) {
      ctx.body = e.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path == '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

//中间件处理db的问题
app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

// 安装中间件
app.use(koaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
// api router 以/api/开头的路由都会到app router里面去处理
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  // pageRouter = require('./routers/dev-ssr')
  pageRouter = require('./routers/dev-ssr')
} else {
  // pageRouter = require('./routers/ssr')
  pageRouter = require('./routers/ssr-no-bundle')
}

// pageRouter.routes()是个function查看路由组件的匹配与否
// pageRouter.allowedMethods()也是个function查看http请求状态码
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
