//  主要讲解vue的数据绑定
import Vue from 'vue'

// var global = 'dione' // eslint-disable-line

new Vue({
  el: '#root',
  // template: '<div v-bind:id="aaa" v-on:click="handClick"><p v-html="html"></p></div>',
  template: `
    <div :class="[{ active: isActive }]" :style="styles">
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: true,
    arr: [1, 2, 3],
    html: '<span>Dione</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none'
    }
  },
  // computed: {
  //   className () {
  //
  //   }
  // },
  methods: {
    handClick () {
      // 全局只绑定一定事件给body
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})

// app.$mount('#root')

// setTimeout(() => {
//   app.text += 1
// }, 2000)
