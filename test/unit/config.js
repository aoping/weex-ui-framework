export default{
  install (Vue, options) {
    Vue.prototype.getQuery = function (key) {
      return 234235
    }
    Vue.prototype.$getConfig = function () {
      return {
        env: {
          deviceHeight: 1920
        }
      }
    }
    Vue.prototype.lang = 'ZH'
    Vue.prototype.$t = function (key) {
      return key
    }
  }
}
