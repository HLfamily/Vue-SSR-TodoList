const path = require('path')
const createVueLoaderOptions = require('./vue-loader-config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  // entry: path.join(__dirname, '../client/index.js'),
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: "http://127.0.0.1:8000/"
    // publicPath: "/public/" // 如果这里加了client.js里面的historyapifallback也应该加哦
  },
  module: {
    rules: [
        {
            test: /\.(vue|js|jsx)$/,
            loader: 'eslint-loader',
            exclude: /node-modules/,
            enforce: "pre" //预处理对对应的文件进行预处理如果报错就不用执行下面的loader了,直接报错就可以了
        },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
          options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/  //js编译的时候要忽略掉node_module里面的js(这些已经编译过了)
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
