# About
这是慕课网上[Vue+Webpack打造todo应用](https://www.imooc.com/learn/935)课程的源码

# 使用方法
```
npm i webpack-merge -D
访问到的是一个目录结构,而不是一个页面
vue-loader默认没有style-loader(热更替),若是想有 npm i vue-style-loader -D 然后把webpack.config.client.js里面的style-loader换成
vue-style-loader
npm i rimraf -D 打包之前删除dist目录


npm i eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise
eslint-plugin-import eslint-plugin-node -D
npm i eslint-plugin-html
npm i eslint-loader babel-eslint -D


建立editorconfig 编码格式规范用编辑器规范编码格式

git提交之前的代码控制
先git init 之后在安装githusky的工具
npm i husky -D


runtime-only: 不能编译template的代码
npm i webpack@^3.0.0 -D
下去查看doc-loader的代码


npm i vue-router -S

修改hash路由

异步加载路由的时候需要用到import关键字
支持import关键字需要安装npm i babel-plugin-syntax-dynamic-import -D 然后需要修改.bebelrc文件
然后重启服务


npm i vuex -S

.babelrc在env的情况下不支持语法展开运算符的形式
需要安装npm i babel-preset-stage-1 -D 在.babelrc里面配置"stage-1"

给VueX加热更替的功能

如何写好的代码 一个function只做一个事情,function只是管道

npm i vue -S 是装在package.json里面的dependencies里面
npm i vue - 是装在package.json里面的devDependencies里面 //工具性的东西,应用跑起来的时候是不需要的,只是打包的时候需要的


server端渲染
npm i vue-server-renderer -S vue服务端渲染必须有的一个包

写node
npm i koa -S

要处理服务端渲染,需要安装koa的中间件
npm i koa-router -S

npm i axios -S
npm i memory-fs -D

安装中间件 npm i ejs -S

打包出现error: Vue packages version mismatch
                 - vue@2.5.13
                 - vue-server-renderer@2.5.17
This may cause things to work incorrectly. Make sure to use the same version for both
错误原因 常见于在已经配置好的webpack vue项目中更新了vue依赖时出现,附加规则是vue和vue-server-renderer二者的版本必须是一一对应的
因为vue-loader的版本是大于10的
npm update vue-server-renderer (也可以通过npm list去检查npm的依赖)
如果还是不行 npm install vue-server-renderer@2.5.13 -S 则运行正常


npm i koa-send -S //服务端渲染能很好的发送一些静态文件

npm i nodemon -D  //server端的热更新并配置nodemon.json文件

npm i concurrently -D //同时启动client和server的服务

npm i vue-meta -S  //动态的设置页面meta-title的包

koa去做了一个简单的nodeserver 开发环境需要一个webpackServerCompiler帮我们编译出
server bundle 当用户请求的时候server-entry里面区分应该返回的东西通过ejs的模板引擎
渲染到html当中

正式环境逻辑相对比较简单

服务端渲染逻辑:
Vue.js构建客户端应用程序时, 默认情况下是在浏览器中输出Vue组件,生成Dom
和操作Dom, 而使用SSR可以将同一个组件渲染为服务器端的html字符串,然后将他们直接发送
到浏览器,最后静态标记"混合"为客户端上完全交互的应用程序
浏览器渲染： 指的是用JS去生成HTML,如Vue的路由
服务器渲染： 指的是用后端语言通过一些模板引擎生成的html,将数据与视图整理输出为完整的html文档发送给浏览器

SSR是一份代码运行在两个环境里面(服务端, 客户端) 服务端先运行好之后,把模板渲染成html页面,然后返回给前端,前端在载入js文件


npm i sha1 -S 安装后生成签名让db调用的
npm i koa-body -S 安装处理post请求中body参数的中间件
npm i koa-session -S 安装koa中间件session的中间件

session工作原理: 当登陆成功之后,会把session.user的
内容写到session webtoken里面, 给数据加签名, 用sha1签名, 类似于token的验证逻辑

当开启服务端的时候会遇上的错是：
 UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): ReferenceError: regeneratorRuntime is not defined
 解决办法，重新配置.babelrc文件将“env”从presents里面单独列出来

 正式环境打包的时候，对于不同的router路由导向的vue文件生成的js是0.hash.js, 1.hash.js等等,
 需要生成出来的chunk.js是带名字的时候需要加上NamedchunksPlugin()

 项目部署问题
 使用PM2进行一个项目的部署, nodejs专用的服务进程管理工具
 写好配置文件之后通过
 npm install pm2 -g // 全局安装
 pm2 start pm2.yml --env production
 重启项目: pm2 restart vue-todo(声明的时候起的名字)
 停掉项目: pm2 stop vue-todo(声明的时候起的名字)
 查看所有pm2启动起来的服务: pm2 list
 查看所有pm2启动起来的log日志： pm2 log vue-todo
 ssh root@jocky.me // 直接通过ssh连接到自己的本地服务器
 注意配置Ngnix服务器监听80端口

 ---静态资源上传到CDN
 npm i qiniu -D
 在build下面新建upload的一个js文件,直接在package.json里面添加上传命令
 这个命令需要在:npm run build:client 和 npm run build:server后面跟着去执行
 上传
 切记host加'/'上传

 ```
 cdn 是 content delivery network就是一个 内容的分发网络，它的主要用法就是内容存储
 和分发技术 举个例子就是如果你的你的项目放到了服务器，那如果你们自己公司的服务器只有一
 台，你们自己维护的话 你在华东地区 那华南地区的人访问速度就会大大减缓 但是用cdn的话
 你把你打包好的项目代码全部上传到（用七牛cdn距离子的话）七牛的cdn存储空间，七牛的cdn
 会给你一个域名，这个域名你也可以自己购买特定的名字的, 或者用他们给的 七牛云会把你上
 传的项目文件扩散到他们的各个区域中去，然后你通过这个域名去访问你的项目的时候，他会
 就近给你返回离你最近的内容
 cdn拦截就是网络不安全,内容被某些代理服务器劫持了 这个就是https签名文件加密的情况了

 ```
 npm i module_name -S => npm i module_name --save => 写入到 dependencies 对象
 npm i module_name -D => npm i module_name --save-dev => 写入到 devDependencies 对象
 npm i module_name -G  全局安装

 ```


