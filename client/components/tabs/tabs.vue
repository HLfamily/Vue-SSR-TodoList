<script>
    import TabContainer from './tab-container.vue'

    export default {
      name: 'tabs',
      components: {
        TabContainer
      },
      // $parent 是直接的父节点 provide提供的是所有的子孙都能拿到
      // provide () {
      //   return {
      //     value: this.value
      //   }
      // },
      props: {
        value: {
          type: [String, Number],
          required: true
        }
      },
      data () {
        return {
          panes: []
        }
      },
      render () {
        // const contents = this.panes.map(pane => {
        //   // pane.$slots.default
        //   return pane.active ? pane.$slots.default : null
        // })
        // return (
        //   <div class='tabs'>
        //     <ul class='tabs-header'>
        //       {this.$slots.default}
        //     </ul>
        //     <div class="tab-content">
        //       {contents}
        //     </div>
        //   </div>
        // )
        return (
          <div class='tabs'>
            <ul class='tabs-header'>
              {this.$slots.default}
            </ul>
            <tab-container panes={this.panes}></tab-container>
          </div>
        )
      },
      methods: {
        onChange (index) {
          this.$emit('change', index)
        }
      }
    }
</script>

<style lang="stylus" scoped>
  .tabs-header
    display flex
    list-style none
    margin 0
    padding 0
    border-bottom 2px solid #ededed
</style>
