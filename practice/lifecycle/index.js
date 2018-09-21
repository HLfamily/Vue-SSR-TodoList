//  主要讲解vue的生命周期
import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () { // 只能做数据有关的
    console.log(this.$el, 'created')
  },
  // 挂载到dom上, 没有dom都不知道要挂载到哪里
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () { // 在组件章节讲解
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  render (h) {
    console.log('render')
    // throw new TypeError('render err')
    return h('div', {}, this.text)
  },
  renderError (h, err) { // 只能用在开发环境的err捕捉
    return h('div', {}, err.stack)
  },
  errorCaptured () { // 可以用在生产环境的err捕捉
    // 会向上冒泡
  }
})

app.$mount('#root')

// setTimeout(() => {
//   app.text += 1
// }, 2000)

// setTimeout(() => {
//   app.$destroy()
// }, 2000)
