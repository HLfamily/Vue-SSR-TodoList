import Vue from 'vue'

const childComonent = {
  template: '<div>childComonent {{data.value}}</div>',
  inject: ['yeye', 'data'],
  mounted () {
    // console.log(this.yeye, this.value)
  }
}

const componet = {
  name: 'comp',
  components: {
    childComonent
  },
  // template: `
  //   <div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //     <div class="footer">
  //       <slot name="footer"></slot>
  //     </div>
  //   </div>
  // `,
  template: `
    <div :style="style">
      <slot :value="value" aaa="Dione"></slot>
      <childComonent></childComonent>
    </div>
  `,
  data () {
    return {
      value: 'I am comp',
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid green'
      }
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: componet
  },
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      data: data
    }
  },
  data () {
    return {
      value: 'I am Instance'
    }
  },
  template: `
    <div>
      <comp-one ref="comp">
        <span slot-scope="props" ref="span"> {{value}} {{props.value}} {{props.aaa}}</span>
      </comp-one>
      <input type="text" v-model="value">
    </div>
  `,
  mounted () {
    console.log(this.$refs.comp)
    console.log(this.$refs.span)
  },
  methods: {
  }
})
