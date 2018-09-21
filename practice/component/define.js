import Vue from 'vue'

// const data = {
//   text: 123
// }

const componet = {
  props: {
    active: {
      type: Boolean,
      // required: true,
      default: true, // default 和 required只传一个就可以
      validator (value) { // 对传入的数据进行一个自定义的验证
        return typeof value === 'boolean'
      }
    },
    propOne: Number
    // onChange: Function
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">可以看见我吗</span>
    </div>`,
  data () {
    return {
      text: 123
    }
    // return data
  },
  mounted () {
    // this.propOne = "AAA"
  },
  methods: {
    handleChange () {
      // this.onChange()
      this.$emit('change')
    }
  }
}

// Vue.component('CompOne', componet)

new Vue({
  el: '#root',
  components: {
    CompOne: componet
  },
  data () {
    return {
      text1: 400,
      text2: 500
    }
  },
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="text1" :on-change="handleChange"></comp-one>
      <comp-one :active="false" :prop-one="text2" :change="handleChange"></comp-one>
    </div>
  `,
  methods: {
    handleChange () {
      this.text1++
    }
  },
  mounted () {
    console.log(this.$refs.comp1)
  }
})
