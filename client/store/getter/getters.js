// 类似于vue实例中的computed函数
export default {
  fullName (state) {
    return `${state.firstName}  ${state.lastName}`
  }
}
