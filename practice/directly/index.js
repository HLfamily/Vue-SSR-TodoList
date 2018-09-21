//  主要讲解vue的原生指令
import Vue from 'vue'

new Vue({
  el: '#root',
  // v-cloak适合html没有加载完成之前加上display:none当加载完成之后会自动去除v-clock标签
  template: `
    <div>
      <div v-once>Text: {{text}}</div>
      <div v-cloak>Text: {{text}}</div>
      <div v-pre>Text: {{text}}</div>
      <div v-if="active" v-on:click="handleClick">Text: {{text}}</div>
      <div v-else-if="text === 0">Else Text: {{text}}</div>
      <div v-else>else content</div>
      <div v-text="'Text:' + text">
      </div>
      <div v-html="html"></div>
      <input type="text" v-model.number="text">
      <input type="text" v-model.trim="text">
       <input type="text" v-model.lazy="text">
      <input type="checkbox" v-model="active">
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>   
      </ul>
      <ul>
        <li v-for="(val, key, index) in obj">{{val}}:{{key}}:{{index}}</li>   
      </ul>
    </div>
  `,
  data: {
    text: 0,
    active: false,
    html: '<span>this is html</span>',
    arr: [1, 2, 3],
    // 对象遍历的时候底层使用Object.keys()
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: ''
  },
  methods: {
    handleClick () {

    }
  }
})
