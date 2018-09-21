import Vue from 'vue'

const componet = {
  props: {
    active: {
      type: Boolean
    },
    propOne: String
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
  },
  mounted () {
    console.log('comp lalala')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  extends: componet,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    // this.$parent.text = 6789
    console.log(this.$parent.$options.name)
  }
}
// const CompVue = Vue.extend(componet)

// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: '123344'
//   },
//   mounted () {
//     console.log('instance lalala')
//   }
// })

new Vue({
  parent: parent,
  name: 'Root',
  el: '#root',
  components: {
    Comp: component2
  },
  data () {
    return {
      text: 4567
    }
  },
  template: `
    <div>
      <comp></comp>
      <span>{{text}}</span>
    </div>
  `,
  mounted () {
    console.log('instance lalala')
    console.log(this.$parent.$options.name)
  }
})
