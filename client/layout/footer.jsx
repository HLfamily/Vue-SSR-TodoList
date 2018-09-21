import '../assets/styles/footer.styl'
// import jsxClass from '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'Dione'
    }
  },
  render () {
    return (
    // <div id={jsxClass.footer}>
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
