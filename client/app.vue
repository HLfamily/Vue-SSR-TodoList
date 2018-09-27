<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!--<p>{{fullName}}{{counter}}</p>-->
    <!--<p>{{textA}}{{textPlus}}{{textC}}</p>-->
    <!--<router-link :to="{name: 'app'}">app</router-link>-->
    <!--<router-link to="/app/123">app</router-link>-->
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <!--<router-link to="/login/exact">login exact</router-link>-->
    <!--<todo></todo>-->
    <transition name="fade">
    <router-view></router-view>
    </transition>
    <Footer></Footer>
    <!--<router-view name="a"></router-view>-->
  </div>
</template>

<script>
  // import {
  //   mapGetters,
  //   mapState,
  //   mapActions,
  //   mapMutations
  // } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

// console.log(Header, __docs)

export default {
    metaInfo: {
      title: 'Dione App'
    },
    components: {
      Header,
      Footer
      // Todo
    },
    computed: {
      // textA () {
      //   return this.$store.state.b.text
      // },
      // ...mapState({
      //   counter: (state) => state.count,
      //   textA: (state) => state.a.text,
      //   textC: (state) => state.c.text
      // }),
      // count () {
      //   return this.$store.state.count
      // },
      // ...mapGetters(['fullName', 'a/textPlus'])
      // ...mapGetters({
      //   fullName: 'fullName',
      //   textPlus: 'a/textPlus'
      // })
      // fullName () {
      //   return this.$store.getters.fullName
      // }
    },
    methods: {
      // ...mapActions(['updateCountASync', 'a/add', 'b/testAction']),
      // ...mapMutations(['updateCount', 'a/updateText'])
    },
    mounted () {
      // console.log(this.$route) // 包含所有的参数
      // console.log(this.$store)
      // this['b/testAction']()
      // this.updateCountASync({
      //   num: 5,
      //   time: 2000
      // })
      // this.updateCount({
      //   num: 'cc',
      //   num2: 'dd'
      // })
      // this.$store.dispatch('updateCountASync', {
      //   num: 5,
      //   time: 2000
      // })
      // this.$store.state.count = 5 // 可以外部修改store参数
      // this.$store.commit('updateCount', {
      //   num: 'cc',
      //   num2: 'dd'
      // })
      // let i = 1
      // setInterval(() => {
      //   this.$store.commit('updateCount', {
      //     num: i++,
      //     num2: 2
      //   })
      // }, 2000)
    }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>


