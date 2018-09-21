//  主要讲解computed和watch
import Vue from 'vue'

new Vue({
  el: '#root',
  // <p><input type="text" v-model="newName"></p>
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>FullName: {{fullName}}</p>
      <p>Number input: <input type="text" v-model="number"></p>
      <p>FirstName input: <input type="text" v-model="firstName"></p>
      <p>LastName input: <input type="text" v-model="LastName"></p>
      <p>Obj.a input: <input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstName: 'Dione',
    LastName: 'Hong',
    number: 0,
    fullName: '',
    obj: {
      a: 0
    }
  },
  // 只有name里面引用的data有改变的时候, 方法才会被重新调用
  computed: { // 类似于vue的$set属性
    name () { // 一旦data里面的数据改变页面重新渲染的时候这个不会被重新调用
      console.log('new name')
      return `${this.firstName} ${this.LastName}`
    }
    // newName: {
    //   get () {
    //     console.log('get name')
    //     return `${this.firstName} ${this.LastName}`
    //   },
    //   set (name) {
    //     console.log('set name')
    //     const names = name.split(' ')
    //     this.firstName = names[0]
    //     this.firstName = names[1]
    //     return `${this.firstName} ${this.LastName}`
    //   }
    // }
  },
  methods: {
    getName () { // 一旦data里面的任何一个数据有改变凡是template里面用到的方法都会重新调用
      console.log('getName invoked')
      return `${this.firstName} ${this.LastName}`
    }
  },
  mounted () {
    this.obj = {
      a: '345'
    }
  },
  watch: {
    // firstName (newName, oldName) {
    //   this.fullName = newName + '' + this.LastName
    // }
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + '' + this.LastName
      },
      immediate: true // 让handler在实例初始化的时候就加载一次
    },
    'obj.a': {
      handler () {
        console.log('obj.a changed')
        this.obj.a += 1 // 对this.obj.a 不要改监听值的情况要不然会无穷的触发监听
      },
      immediate: true
      // deep: true
    }
  }
})
