const Koa = require('koa')
const send = require('koa-send')
const path = require('path')

//const staticRouter = require('./routers/static')

const app = new Koa()

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

//app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}

// pageRouter.routes()是个function查看路由组件的匹配与否
// pageRouter.allowedMethods()也是个function查看http请求状态码
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
