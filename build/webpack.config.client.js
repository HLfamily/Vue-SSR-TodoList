const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
// cdn打包的时候需要引入的文件
// const cdnConfig =  require('../app.config').cdn

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins =  [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'temp.html')
  }),
  new VueClientPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  headers: { 'Access-Control-Allow-Origin': '*' }, // 解决热更替的update-host.json文件跨域获取的问题
  historyApiFallback: {
    index: '/index.html' //dist生成目录或者htmlplugin生成的目录下面的html文件
  }, //防止刷新后显示找不到路由对应的页面
  // 获取todos列表的时候在前端渲染的时候需要用8000端口请求3333端口去获取所有的todo数据,需要配置代理
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333',
  },
  hot: true
}
let config

if (isDev) {
  config = merge(baseConfig,{
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'style-loader',
            'css-loader',
              /*{
                loader:'css-loader',
                  options: {
                    module: true,
                    localIdentName: isDev ? '[path]-[name]-[hash:base64:5]':'[hash:base64:5]'
                  }
              },//这样也可以开启module*/
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig,{
    entry: {
      // app: path.join(__dirname, '../client/index.js'),
      app: path.join(__dirname, '../client/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/dist/'
      // publicPath: cdnConfig.host // cdn打包的问题
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      new webpack.NamedChunksPlugin()
    ])
  })
}

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/client-model.js')
  }
}

module.exports = config
