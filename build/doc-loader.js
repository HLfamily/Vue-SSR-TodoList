module.exports = function (source) {
    if (this.cacheable) this.cacheable()
    return source
}