/**
 * @author aoping
 * @date 2017/06/19
 * @description 获取静态资源地址
 */

let baseUrl = '' // 静态资源
let apiGatewayHost = '' // 接口

const env = weex.config.env.appEnv

switch (env) {
  case 'dev':
    baseUrl = '' // 静态资源
    apiGatewayHost = '' // 接口
    break
  case 'sit':
    baseUrl = '' // 静态资源
    apiGatewayHost = '' // 接口
    break
  case 'uat':
    baseUrl = '' // 静态资源
    apiGatewayHost = '' // 接口
    break
  case 'prod':
    baseUrl = '' // 静态资源
    apiGatewayHost = '' // 接口
    break
  default:
    baseUrl = '' // 静态资源
    apiGatewayHost = '' // 接口
    break
}

function getSource(type, name) {
  return baseUrl + 'FLIGHTSHYBRIDAPP/' + type + '/' + name
}

function airlineLogoSrc(code) {
  code = code.toLowerCase()
  return baseUrl + 'APP/images/airline_logo/2x/24x24/' + code + '.png'
}

function otaLogoSrc (code) {
  code = code.toLowerCase()
  return baseUrl + 'APP/images/ota_logo/2x/ota_' + code + '.png'
}

export default {
  baseUrl,
  getSource,
  airlineLogoSrc,
  otaLogoSrc,
  apiGatewayHost
}
