import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutation/mutations'
import getters from './getter/getters.js'
import actions from './action/actions.js'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 不能从外部修改data数据
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [
      // Vuex 的插件
      (store) => {
        // console.log('我是vuex的插件')
        // store.subscribe()
      }
    ]
    // modules: { // 模块里面注意命名空间, 模块可以向下无限延申
    //   a: {
    //     namespaced: true, // 控制名字的唯一性, 需要使用模块名/属性或者方法名获取
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         console.log('a.state', state)
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) {
    //         return state.text + rootState.count
    //       }
    //     },
    //     actions: {
    //       // 直接拿到的是个ctx的数据包含了
    //       add ({ state, commit, rootSate }) {
    //         // commit('updateText', rootSate.count) // 只会在当前的模块找
    //         commit('updateCount', { num: 56789 }, { root: true }) // 会在总的模块找
    //       }
    //     }
    //   },
    //   b: {
    //     namespaced: true, // 控制名字的唯一性
    //     state: {
    //       text: 2
    //     },
    //     actions: {
    //       testAction ({ commit }) {
    //         // commit('a/updateText', 'test text')
    //         commit('a/updateText', 'test text', { root: true })
    //       }
    //     }
    //   }
    // }
  })

  // 给VueX加上一个热更替的功能, 防止修改后的页面刷新
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutation/mutations',
      './getter/getters',
      './action/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutation = require('./mutation/mutations').default
      const newGetter = require('./getter/getters').default
      const newAction = require('./action/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutation,
        getters: newGetter,
        actions: newAction
      })
    })
  }

  return store
}
