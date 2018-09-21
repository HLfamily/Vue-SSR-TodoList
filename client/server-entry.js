import createApp from './create-app'

// 找到对应的组件并返回组件
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // 当有请求的文件的时候, 将文件地址添加到router里面
    router.push(context.url)

    // 找到匹配的组件并返回
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      context.meta = app.$meta()
      resolve(app)
    })
  })
}
