/**
 * @author 
 * @date 2017/11/03
 * @description Android/IOS调用nativeModule模块
 */

import { getUserBasicInfo } from './localstorage'
import { member } from './api'

const native = weex.requireModule('nativeModule')

/**
 * @author 
 * @date 2017/11/03
 * @description QQ登录（调用原生）
 *
 */
export function qqLogin() {
  return new Promise((resolve, reject) => {
    native.qqLogin(res => {
      resolve(JSON.parse(res))
    })
  })
}

/**
 * @author 
 * @date 2017/11/03
 * @description WeChat登录（调用原生）
 *
 */
export function wxLogin() {
  return new Promise((resolve, reject) => {
    native.wxLogin(res => {
      resolve(JSON.parse(res))
    })
  })
}

/**
 * @author 
 * @date 2017/11/03
 * @description 在线客服（调用原生）
 *
 */
export function openCustomerPage() {
  var self = this
  var userJsonStr = {
    'token': '',
    'nickename': '',
    'cellphone': '',
    'email': ''
  }
  getUserBasicInfo().then((res) => {
    if (res) {
      var data = JSON.parse(res)
      userJsonStr.token = data.token
      userJsonStr.nickename = data.nickName
      userJsonStr.cellphone = data.mobile
      userJsonStr.email = data.email
      native.openCustomerPage(userJsonStr)
    } else {
      native.openCustomerPage(userJsonStr)
    }
  })
}

/**
 * @author 
 * @date 2017/11/03
 * @description 上传头像（调用原生）
 *
 */
export function uploadImg(type, guid, token) {
  return new Promise((resolve, reject) => {
    var url = member.uploadImg(guid)
    native.uploadImg(type, url, guid, token, (res) => {
      resolve(res)
    })
  })
}

/**
 * @author 
 * @date 2017/11/08
 * @description 意见反馈（调用原生）
 *
 */
export function openCustomerFeedback() {
  native.openCustomerFeedback()
}

/**
 * @author 
 * @date 2017/11/10
 * @description 拨打电话（调用原生）
 *
 */
export function makeCall(phoneNum) {
  native.makeCall(phoneNum)
}

/**
 * @author 
 * @date 2017/11/23
 * @description 支付页面（调用原生）
 *
 */
export function openPayment(response) {
  return new Promise((resolve, reject) => {
    native.openPayment(response, res => {
      resolve(res)
    })
  })
}

/**
 * @author 
 * @date 2017/12/15
 * @description 检查网络状态（调用原生）
 *
 */
export function checkNetWorkStatus() {
  return new Promise((resolve, reject) => {
    native.checkNetWorkStatus(res => {
      resolve(res)
    })
  })
}
