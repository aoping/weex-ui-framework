/**
 * @Author   : walid
 * @Data     : 2017-03-20  18:32
 * @Describe : 封装weex实例对象
 */

function isIOS () {
  return weex.config.env ? weex.config.env.platform === 'iOS' : false
}

function isWeb () {
  return weex.config.env.platform === 'Web'
}

function getDeviceInfo () {
  const env = weex.config.env
  const deviceWidth = env.deviceWidth
  const deviceHeight = env.deviceHeight
  return {
    deviceWidth: deviceWidth,
    deviceHeight: deviceHeight
  }
}

export default {
  isIOS, isWeb, getDeviceInfo
}
