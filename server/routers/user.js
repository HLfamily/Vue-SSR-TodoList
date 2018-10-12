const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  // 获取user的对象
  const user = ctx.request.body
  if (user.username === 'dione' && user.password === '333333') {
    ctx.session.user = {
      username: 'dione'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'dione'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
