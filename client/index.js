import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()
// const root = document.createElement('div')
// document.body.appendChild(root)

// 注册模块
// store.registerModule('c', {
//   state: {
//     text: '我是注册的小三模块'
//   }
// })

// 解绑模块
// store.unregisterModule('c')

// store里面watch state的用法
// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('new Count watched', newCount)
// })
// store里面watch mutation的用法
// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })
// store里面watch action的用法
// store.subscribeAction((action, state) => {
//   console.log(action.type)
//   console.log(action.payload)
// })

// 验证用户登陆
// router.beforeEach((to, from, next) => {
//   next()
//   // if (to.fullPath === '/app') {
//   //   next({
//   //     path: '/login'
//   //   })
//   // } else {
//   //   next()
//   // }
//   console.log('router before invoked')
// })

// router.beforeResolve((to, from, next) => {
//   console.log('router resolve invoked')
//   next()
// })

// router.afterEach((to, from) => {
//   console.log('router after invoked')
// })

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
