const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
// 一个简单的内存文件系统, 将数据保存在javascript对象中
const fs = require('fs')
// 类似于fs 直接将内容写进内存 fs是直接将内容写进磁盘
const MemoryFs = require('memory-fs')
// webpack是一个自主的server
const webpack = require('webpack')
// 服务端的render函数在node环境里面去渲染出vue代码生成的html代码,直接返回给用户的浏览器
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
//
const serverConfig = require('../../build/webpack.config.server')

// serverCompiler会生成一个server bundle, 也就是服务端的app.js, 当node server获取到 server bundle
// 之后, 就可以执行vueserverRenderer去渲染出html代码, 直接返回给用户, 这样的话就不需要通过js再去渲染出页面内容, 减少用户的等待时间
const serverCompiler = webpack(serverConfig)
// 指定webpack的输出目录在mfs里面
const mfs = new MemoryFs()
serverCompiler.outputFileSystem = mfs

let bundle

// 用来记录webpack每次打包生成的新的文件
/*
* 这里使用watch的好处是跟webpack-dev-server一样, 在client目录下面每次修改一个文件
* 它都会重新执行一次打包,就可以拿到新文件了
* */
serverCompiler.watch({}, (err,stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(err))

  // 服务端打包生成的server-bundle的文件, 服务端生成的bundle文件
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  // 将bundle文件用utf-8编码然后转成json文件返回给html
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new boundle packaged')
})

const handleSSR = async(ctx) => {
  if (!bundle) {
    ctx.body = "稍等会..."
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
  )

  // webpackDevServer提供给我们的一个json文件里面是静态文件资源的地址
  const clientMainfest = clientManifestResp.data

  // ejs模板渲染引擎生成html
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  // VueServerRenderer帮我们处理好地址的依赖关系
  // createBundleRenderer创建一个bundleRender实例,每一次渲染的时候调用
  /*
  * 生成可以直接调用的renderer的函数,接收几个参数第一个inject:设置为false,它就不会执行其他的注入的操作了
  * 第二个clientmanifest,它会自动生成一个带有script标签的js文件引用的字符串,这样可以直接添加到ejs里面
  * */
  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientMainfest
    })

  await serverRender(ctx, renderer, template)
}

// 不管什么请求, 进来先执行SSR
const router = new Router()
router.get('*', handleSSR)

module.exports = router



