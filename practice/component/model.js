import Vue from 'vue'

const componet = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value', 'value1'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value">
      <span>{{value}}</span>
    </div>`,
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
      // this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    Comp: componet
  },
  data () {
    return {
      value: 123
    }
  },
  template: `
    <div>
      <comp :value="value" :input="handleInput"></comp>
      {{value}}
    </div>
  `,
  methods: {
    handleInput () {
      this.value = arguments[0]
    }
  }
})
