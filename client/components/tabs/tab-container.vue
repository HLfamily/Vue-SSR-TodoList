<script>
    // 切记不能有template标签,否则渲染不出来, 渲染为空
    export default {
      name: 'tab-container',
      props: {
        panes: {
          type: Array,
          required: true
        }
      },
      render () {
        const contents = this.panes.map(pane => {
          return pane.active ? pane.$slots.default : null
        })
        return (
          <div class="tab-content">
            {contents}
          </div>
        )
      }
    }
</script>

<style scoped>

</style>
