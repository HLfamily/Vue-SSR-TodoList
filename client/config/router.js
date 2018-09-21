import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history', // 去掉路由里面的#号
    // base: '/dione/' // 基路径非强制性的添加
    // 路径匹配但是完全匹配的时候会加这个样式
    // linkActiveClass: 'active-link', // router-link在被激活的时候应该显示的样式
    // linkExactActiveClass: 'exact-active-link' // 路径完全匹配时会加上的样式
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition // 默认浏览器滚动到页面之前离开的位置
      } else {
        return { x: 0, y: 0 }
      }
    },
    fallback: true // 自动切换路由与单页应用(点击跳转页面不重新刷新,在一个页面进行)有关设置成false就成了多页应用
    // parseQuery (query) { // 将string转成json
    //
    // },
    // stringifyQuery (obj) { // 将object/json转成string
    //
    // }
  })
}
