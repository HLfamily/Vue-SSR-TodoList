//  主要讲解vue的实例对象
import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}}<span>{{obj.a}}</span></div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: {
  //   text (newText, oldText) {
  //     console.log(`${newText} : ${oldText}`)
  //   }
  // }
})

app.$mount('#root')
// let i = 0
setInterval(() => {
  // i++
  // app.text += 1 $nextTick
  // app.text += 1
  // app.obj.a = i
  // app.$set(app.obj, 'a', i)
  // app.$delete()
  // app.$forceUpdate() // 万不得已再用froceupdate性能太差
  // app.$options.data.text += 1
  // app.$data.text += 1
}, 1000)

// console.log(app.$options) 值变化的时候就会生效
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// console.log(app.$root === app)
// console.log(app.$children) //<item><div></div></item>
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer)
// const unwatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// setTimeout(() => {
//   unwatch()
// }, 2000)
// app.$on('test', (val) => {
//   console.log(val)
// })
// app.$once('test', (val) => {
//   console.log(val)
// })
// setInterval(() => {
//   app.$emit('test', 'dione')
// }, 1000)
