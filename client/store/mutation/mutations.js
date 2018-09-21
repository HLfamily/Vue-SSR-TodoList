// 所有的data的修改官方推荐放在mutation里面//同步修改
export default {
  // 没有第三个参数之说, 第二个参数可以传对象
  updateCount (state, { num, num2 }) {
    console.log(num2)
    state.count = num
  }
}
