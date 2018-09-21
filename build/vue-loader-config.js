//默认vue-loader的部分配置属性在生产环境和extract-text-webpack-plugin会冲突
//const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
    return {
        preserveWhiteSpace: true, //去掉html里面文字分段产生的空格
        extractCSS: !isDev, //异步加载每个模块的css只需要在那个模块要显示的时候加载,提高首屏加载速度
        //将vue文件引用的style里面的css生成编码名字在对应的html里面用对应的编码去获取,需要开启module模式
        cssModules: {
            //变相的css加密
            //localIdentName: isDev ? '[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
            //camelCase: true //驼峰式的命名方式
        },
        loaders: {
            //'docs': docsLoader,
            //js: 'coffe-loader',
        },
        //解析前自定义loader先解析
        //preLoader: {},
        //解析后自定义loader在解析
        //postLoader: {}
        //hotReload: false ,//根据环境变量生成,默认会在production的时候自动关闭热重载
    }
}