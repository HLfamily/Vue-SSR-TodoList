const path = require('path')
// const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
// 这个插件能帮我们单独生成一个json文件, 在vue的服务端渲染里面能帮助我们处理一些很复杂的逻辑
const VueServerPlugin = require('vue-server-renderer/server-plugin')
// const VueServerPlugin = require('vue-server-renderer/server-plugin')
// no bundle 的时候不用这个

// const defaultPlugins =  [
//   new webpack.DefinePlugin({
//     'process.env': {
//       NODE_ENV: '"development"'
//     }
//   })
// ]

let config

const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  new ExtractPlugin('styles.[contentHash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
    // 官方建议做的在server-render里面会用到这个属性
  })
]

if (isDev) {
  // no bundle 的时候不用这个
  // new VueServerPlugin()
  plugins.push(
    new VueServerPlugin()
  )
}

config = merge(baseConfig,{
  target: 'node', // 指定打包出来的代码的运行环境
  entry: path.join(__dirname, '../client/server-entry.js'),
  // vue server render有一个插件提供代码的调试功能,能提示到出错到了哪一行
  devtool: 'source-map',
  output: {
    // 规定打包出来的代码是通过module.export给放出去
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build'),
  },
  // 应用真正跑起来的时候不需要devdependience里面这些工具型的东西,只有在执行打包的时候才需要
  // 这些文件是不需要被打包的
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins
})

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/server-model.js')
  }
}

module.exports = config
