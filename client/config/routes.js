// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id', // /app/xxx 跟query相连,id不同的时候传入的时候routeupdate钩子会被处罚
    // props: true, // 会通过params里面的id转换名称
    // props: (route) => ({
    //   id: route.query.b
    // }),
    path: '/app',
    component: () => import('../views/todo/todo.vue'), // 作为todo的props给传进来
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app'
    // meta: { // 页面元信息
    //   title: 'this is app',
    //   description: 'dione app'
    // },
    // beforeEnter (to, from, next) {
    //   console.log('app route before enter')
    //   next()
    // },
    // children: [
    //   {
    //     path: 'test',
    //     component: () => import('../views/login/login.vue')
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
  // {
  //   path: '/login/exact',
  //   component: () => import('../views/login/login.vue')
  // }
]
