/**
 * @author walid
 * @date 2017/3/4
 * @description 界面跳转工具类
 */

import qs from 'qs'
import ip from 'config'
import instance from 'utils/weex/instance'
import routePage from 'router/page'

const navigator = weex.requireModule('navigator')
const myNavigator = weex.requireModule('mynavigator')
const appName = weex.config.env.appName
const weexAppName = 'weexDemo'

function getBaseUrl () {
  const bundleUrl = weex.config.bundleUrl
  const isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/') >= 0
  const isiOSAssets = bundleUrl.indexOf('file:///') >= 0
  let nativeBase = ''
  if (isAndroidAssets) {
    nativeBase = 'file://assets/dist/weex/'
  } else if (isiOSAssets) {
    // nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('bundlejs/') + 9) + 'weex/'
    nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('weex/') + 5)
  } else {
    let host = `${ip}:8081`
    const matches = /\/\/([^\/]+?)\//.exec(bundleUrl)
    if (matches && matches.length >= 2) {
      host = matches[1]
    }
    if (appName === weexAppName && host.indexOf('192.168.') <= -1) {
      nativeBase = `http://${host}/HYBRIDAPP/bundlejs/weex/`
    } else {
      nativeBase = `http://${host}/dist/weex/`
    }
  }
  const h5Base = '?page=../dist/web/'
  // // in Browser or WebView
  const inBrowserOrWebView = typeof window === 'object'
  return inBrowserOrWebView ? h5Base : nativeBase
}

function pushByUrl (url, query) {
  if (weex.config.env.platform.toLowerCase() === 'android' && weex.config.env.appName === weexAppName) {
    // myNavigator.openURL(query ? `${url}?${qs.stringify(query)}` : url)
    myNavigator.push(query ? `${url}?${qs.stringify(query)}` : url, event => {
      console.log('callback: ', event)
    })
  } else {
    navigator.push({
      url: query ? `${url}?${qs.stringify(query)}` : url,
      animated: 'true'
    }, event => {
      console.log('callback: ', event)
    })
  }
}

function pushWeb(url, query) {
  if (instance.isWeb()) {
    window.location.href = url
    return
  }
  query = query || {}
  query.url = url
  push(routePage.web, query)
}

function push (routePage, query = null, anim = 'right') {
  const url = query ? `${getBaseUrl()}${routePage.jsPath}.js?${qs.stringify(query)}` : `${getBaseUrl()}${routePage.jsPath}.js`
  if (myNavigator && myNavigator.push) {
    myNavigator.push(url, anim, event => {
      console.log('callback: ', event)
    })
  } else {
    navigator.push({
      url: url
    }, event => {
      console.log('callback: ', event)
    })
  }
}

function pop () {
  if (myNavigator && myNavigator.push) {
    myNavigator.pop('', event => {
      console.log('callback: ', event)
    })
  } else {
    navigator.pop({}, event => {
      console.log('callback: ', event)
    })
  }
}

function popToUrl (routePage, query = null) {
  const url = query ? `${getBaseUrl()}${routePage.jsPath}.js?${qs.stringify(query)}` : `${getBaseUrl()}${routePage.jsPath}.js`
  if (myNavigator && myNavigator.push) {
    myNavigator.popToUrl(url)
  } else {
    navigator.push({
      url: url
    })
  }
}

function resetTo(routePages) {
  var urlsArr = []
  routePages.forEach((routePage) => {
    var url = routePage.query ? `${getBaseUrl()}${routePage.page.jsPath}.js?${qs.stringify(routePage.query)}` : `${getBaseUrl()}${routePage.page.jsPath}.js`
    urlsArr.push(url)
  })
  if (myNavigator && myNavigator.resetTo) {
    myNavigator.resetTo(urlsArr)
  } else {
    navigator.push({
      url: urlsArr[urlsArr.length - 1]
    })
  }
}

function replace(routePage, query = null) {
  const url = query ? `${getBaseUrl()}${routePage.jsPath}.js?${qs.stringify(query)}` : `${getBaseUrl()}${routePage.jsPath}.js`
  if (myNavigator && myNavigator.push) {
    myNavigator.replace(url, () => {

    })
  } else {
    navigator.push({
      url: url
    })
  }
}

function replaceAtIndex(routePage, index, query = null) {
  const url = query ? `${getBaseUrl()}${routePage.jsPath}.js?${qs.stringify(query)}` : `${getBaseUrl()}${routePage.jsPath}.js`
  if (myNavigator && myNavigator.replaceAtIndex) {
    myNavigator.replaceAtIndex(url, index)
  } else {
    navigator.push({
      url: url
    })
  }
}

function replaceByUrl(routePage, targetPage, query = null) {
  const url = query ? `${getBaseUrl()}${routePage.jsPath}.js?${qs.stringify(query)}` : `${getBaseUrl()}${routePage.jsPath}.js`
  const targetUrl = `${getBaseUrl()}${targetPage.jsPath}.js`
  if (myNavigator && myNavigator.replaceByUrl) {
    myNavigator.replaceByUrl(url, targetUrl)
  } else {
    navigator.push({
      url: url
    })
  }
}

function popHomePage () {
  if (appName === weexAppName) {
    myNavigator.popToHotelFrontPage()
  } else {
    navigator.pop({
      animated: 'true'
    }, event => {
      console.log('callback: ', event)
    })
  }
}

export default {
  push,
  pushByUrl,
  getBaseUrl,
  pushWeb,
  pop,
  popToUrl,
  resetTo,
  replace,
  replaceAtIndex,
  replaceByUrl,
  popHomePage
}
