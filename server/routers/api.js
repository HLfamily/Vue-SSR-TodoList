const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

// 把用户验证当中间件的插入请求当中
const validateUser = async (ctx, next) => {
  if (!ctx.session.user){
    ctx.status = 401
    ctx.body = 'need login'
  } else {
    await next()
  }
}

apiRouter.use(validateUser)

const successResp = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter
  .get('/todos', async(ctx) => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResp(todos)
  })
  .post('/todo', async(ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResp(data)
  })
  .put('/todo/:id', async(ctx) => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResp(data)
  })
  .delete('/todo/:id', async(ctx) => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResp(data)
  })
  .post('/delete/completed', async(ctx) => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResp(data)
  })
  // .get('/todos', validateUser, async(ctx) => {
  //   const todos = await ctx.db.getAllTodos()
  //   ctx.body = successResp(todos)
  // })

module.exports = apiRouter


