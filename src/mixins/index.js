import navigator from 'utils/modules/navigator'
import model from 'utils/modules/model'
import routerPage from 'router/page'
import constants from 'constants/constants'
import { getQueryStringByName } from 'utils/string'
import VueI18n from '../plugins/i18n/vue-i18n.min'
import locales from '../plugins/i18n'
import { getMemberLogined, getMemberToken, getMemberExpires, getMemberRefreshToken } from '../services/localstorage'
import { validNetwork } from '../services/native-services'

import * as filters from '../filters'

var langModule = weex.requireModule('langModule')
var globalEvent = weex.requireModule('globalEvent')
var native = weex.requireModule('nativeModule')
var lodash = require('lodash')

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 全局使用lodash
Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })

// if (langModule && langModule.getLang) {
//     langModule.getLang((res) => {
//         config.lang = res.lang ? res.lang : 'ZH'
//     })
// } else {
//     config.lang = 'ZH'
// }

// //响应ios语言切换
// globalEvent.addEventListener('langChange', (res) => {
//     config.lang = res.lang.toUpperCase()
// })

// modal.toast({
//     message: config.lang
// })
Vue.use(VueI18n)
var i18n = new VueI18n({
  locale: 'ZH',
  messages: locales
})

// 监听native 跳转路由事件
var modal = weex.requireModule('modal')

// 自定义的module,里面需要有一个跳转native页面的方法openNative, jsBack
var myModule = weex.requireModule('myModule')

export default {
  i18n: i18n,
  data() {
    return {
      model,
      routerPage,
      router: {},
      platform: weex.config.env.platform.toLowerCase(),
      lang: 'ZH',
      staticBaseUrl: constants.baseUrl,
      env: weex.config.env,
      isFirstAppear: true, // 页面是否是初次出现，用来控制再次出现刷新数据的场景
      isIphoneX: false
    }
  },
  computed: {
    isWeb() {
      return this.env.platform === 'Web'
    }
  },
  created() {
    let self = this
    this.router.push = function ({ page, params, query, anim }) {
      self.isFirstAppear = false
      if (self.platform === 'web') {
        self.$router.push({
          path: page.path,
          params: params,
          query: query
        })
        return
      }
      navigator.push(page, query, anim)
    }
    // 替换当前路由
    this.router.replace = function ({ page, params, query }) {
      self.isFirstAppear = false
      if (self.platform === 'web') {
        self.$router.replace({
          path: page.path,
          params: params,
          query: query
        })
        return
      }
      navigator.replace(page, query)
    }
    // 替换指定路由by index
    this.router.replaceAtIndex = function ({ page, params, query, index }) {
      self.isFirstAppear = false
      if (self.platform === 'web') {
        self.$router.replace({
          path: page.path,
          params: params,
          query: query
        })
        return
      }
      navigator.replaceAtIndex(page, index, query)
    }
    // 替换指定路由by url
    this.router.replaceByUrl = function ({ page, params, query, targetPage }) {
      self.isFirstAppear = false
      if (self.platform === 'web') {
        self.$router.replace({
          path: page.path,
          params: params,
          query: query
        })
        return
      }
      navigator.replaceByUrl(page, targetPage, query)
    }

    this.router.pop = function () {
      if (self.platform === 'web') {
        self.$router.back()
        return
      }
      navigator.pop()
    }
    // 返回首页
    this.router.popHomePage = function ({ page, params, query }) {
      if (self.platform === 'web') {
        self.$router.push({
          path: page.path,
          params: params,
          query: query
        })
        return
      }
      navigator.popHomePage()
    }
    // 返回特定页面
    this.router.popToUrl = function ({ page, params, query }) {
      if (self.platform === 'web') {
        self.$router.push({
          path: page.path,
          params: params,
          query: query
        })
        return
      }
      navigator.popToUrl(page, query)
    }
    // 重置路由栈
    this.router.resetTo = function (pages) {
      if (self.platform === 'web') {
        var lastPage = pages[pages.length - 1]
        self.$router.push({
          path: lastPage.page.path,
          params: lastPage.params,
          query: lastPage.query
        })
        return
      }
      navigator.resetTo(pages)
    }
    // if (langModule && langModule.getLang) {
    //     langModule.getLang((res) => {
    //         this.lang = res.lang ? res.lang.toUpperCase() : 'ZH'
    //         this.$i18n.locale = res.lang ? res.lang.toUpperCase() : 'ZH'
    //     })
    // } else {
    //     this.lang = 'ZH'
    //     this.$i18n.locale = 'ZH'
    // }
    // //响应语言切换
    // globalEvent.addEventListener('langChange', (res) => {
    //     this.lang = res.lang.toUpperCase()
    //     this.$i18n.locale = res.lang.toUpperCase()
    // })
    if (this.platform === 'ios') {
      native.getCurrentIphoneType((res) => {
        if (res === 'iPhone X') {
          self.isIphoneX = true
        }
      })
    }
  },
  mounted: function () {

  },
  methods: {
    getBaseUrl: navigator.getBaseUrl,
    getQuery(key) {
      return this.platform === 'web' ? this.$route.query[key] : getQueryStringByName(key)
    },
    jump(to) { // 弃用,只能在web跳转
      this.$router.push(to)
    },
    getSource: constants.getSource,
    airlineLogoSrc: constants.airlineLogoSrc,
    otaLogoSrc: constants.otaLogoSrc,
    jumpBack() {
      this.router.pop()
    },
    openNative() { // 到时候要跟app定义相应的路由
      modal.toast({
        message: '打开新页面',
        duration: 0.3
      })
      myModule.openNative()
    },
    openNative2() { // 到时候要跟app定义相应的路由
      myModule.openNative2('{"param1":"1","param2":"2"}')
    },
    addPopBackListener() {
      globalEvent.addEventListener('popBack', () => {
        this.router.pop()
      })
    },
    jsBack() {
      return myModule.jsBack(res => {
        this.jsBackMsg = res
      })
    },
    getLang() {
      let lang = 'ZH'
      if (langModule && langModule.getLang) {
        langModule.getLang((res) => {
          lang = res.lang
          return lang
        })
      } else {
        return lang
      }
    },
    getCurrency() {
      return '¥'
    },
    calculateHeight(height) {
      // 一屏显示，计算元素高度
      return height - (1334 - 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight)
    },
    getLogined() {
      return getMemberLogined()
    },
    validNetwork(needToast) {
      var self = this
      return new Promise((resolve, reject) => {
        if (native && native.checkNetWorkStatus) {
          native.checkNetWorkStatus(res => {
            if (res.status === 'NONE') {
              if (needToast) {
                modal.toast({
                  message: self.$t('network_err'),
                  duration: 0.5
                })
              }
              resolve(false)
            } else {
              resolve(true)
            }
          })
        } else {
          resolve(true)
        }
      })
    },
    checkLogin() {
      var self = this
      getMemberLogined().then(res => {
        if (!(res && JSON.parse(res) === 'true')) {
          self.router.resetTo([{
            page: self.routerPage.memberHomeNoLogin
          }])
        }
      })
    },
    alertToLogin(err) {
      var self = this
      modal.alert({
        message: self.$t(err) || self.$t('member_relogin_tip'),
        okTitle: self.$t('confirm')
      }, function (value) {
        self.router.resetTo([{
          page: self.routerPage.memberHomeNoLogin
        }, {
          page: self.routerPage.memberLogin
        }])
      })
    }
  }
}
