<script>
    // 切记不能有template标签,否则渲染不出来, 渲染为空
    export default {
      name: 'tab',
      props: {
        index: {
          required: true,
          type: [Number, String]
        },
        label: {
          type: String,
          default: 'tab'
        }
      },
      // inject: ['value'],
      computed: {
        active () {
          // return this.value === this.index
          return this.$parent.value === this.index
        }
      },
      render () {
        const tab = this.$slots.label || <span>{this.label}</span>
        const classNames = {
          tab: true,
          active: this.active
        }
        return (
          <li class={classNames} on-click={this.handleClick}>
            {tab}
          </li>
        )
      },
      mounted () {
        this.$parent.panes.push(this)
      },
      methods: {
        handleClick () {
          this.$parent.onChange(this.index)
        }
      }
    }
</script>

<style lang="stylus" scoped>
  .tab
    list-style none
    line-height 40px
    margin-right 30px
    position relative
    bottom -2px
    cursor pointer
    &.active
      border-bottom 2px solid blue
    &:last-child
      margin-right 0
</style>
