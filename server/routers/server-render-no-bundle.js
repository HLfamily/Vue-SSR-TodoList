// 用ejs模板引擎生成html
const ejs = require ('ejs')
module.exports = async (ctx, renderer, template, bundle) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path, user: ctx.session.user } //获取到js文件的链接做好style标签的插入准备

  // 引入这个就显示正常,所以只需要content.renderScript能够拿到ssr-mainfest里面的json文件的值就可以了
  // var js = '<script type="text/javascript" src="http://127.0.0.1:8000/bundle.a98c2cdd.js"></script>'

  try {
    // 将vue渲染成html,appString是渲染后生成的html的模板
    // 通过一个地址,渲染出一个string类型的结果
    // const appString = await renderer.renderToString(context)
    const app = await bundle(context)

    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const appString = await renderer.renderToString(app, context)
    const {
      title
    } = context.meta.inject()

    // 渲染静态资源的路径和内容
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      initalState: context.renderState() // store里面state的值
    })

    ctx.body = html
  } catch (e) {
    console.log('render err', e)
    throw e
  }
}
