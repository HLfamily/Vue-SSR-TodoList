// 有异步代码的逻辑写进action里面
export default {
  updateCountASync (store, data) {
    console.log('ddd')
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  }
}
