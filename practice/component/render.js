import Vue from 'vue'

const componet = {
  props: ['props1'],
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement(
      'div',
      {
        style: this.style
        // on: {
        //   click: () => { this.$emit('click') }
        // },
      },
      [
        // this.$slots.default,
        this.$slots.header,
        this.props1
      ]
    )
  },
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
  data () {
    return {
      value: 'I am Instance'
    }
  },
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span ref="span">{{value}}</span>
  //     </comp-one>
  //   </div>
  // `,
  // 用createElement会生成vnode的类,类似于dom结构的结构,是个虚拟dom,通过和真正的dom做对比,去修改真正的dom
  render (createElement) {
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          props1: this.value
        },
        // on: {
        //   click: this.handleClick
        // },
        nativeOn: { // 直接将时间绑定到根节点上面,如果这个节点是根节点,直接绑定到这个节点上面,如果不是,会直接绑定到他的根节点,不要子节点emit触发
          click: this.handleClick
        }
      },
      [
        createElement(
          'span',
          {
            ref: 'span',
            slot: 'header',
            attrs: {
              id: 'text-id'
            },
            // 会替换掉this.value的值
            domProps: {
              innerHTML: '<span>Dione</span>'
            }
          },
          this.value)
      ]
    )
  },
  mounted () {

  },
  methods: {
    handleClick () {
      console.log('clicked')
    }
  }
})
