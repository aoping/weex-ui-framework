const stream = weex.requireModule('stream')
const timeoutDuration = 60000 // 60秒

const defaultConfig = {
  method: 'GET',
  type: 'json',
  timeout: timeoutDuration,
  headers: {}
}

function Stream (config) {
  this.options = config
}

Stream.prototype.setResponseType = function (type) {
  this.options.type = type
}

Stream.prototype.setHeaders = function (headers) {
  this.options.headers = headers
}

/**
 * @param
 * url: String   request url
 * progressCallback: ?Function  A progress callback.
 * This callback will be invoked before request finished.
 * @return
 * promise
 */
Stream.prototype.get = function (url, progressCallback) {
  let rejObj = { obj: '', msg: '' }
  return new Promise((resolve, reject) => {
    const options = Object.assign({}, this.options, { url: url, method: 'GET' })
    // 超时拒绝请求
    var t = setTimeout(() => {
      rejObj.msg = 'timeout'
      reject(rejObj)
    }, timeoutDuration)
    stream.fetch(options, (response) => {
      if (response.ok) {
        let res = response.data
        if (!res.resultCode || res.resultCode >= 200 && res.resultCode <= 300 || Array.isArray(res) || res.resultCode === 418 || res.resultCode === 509) {
          resolve(res)
        } else {
          rejObj.msg = 'server_error'
          reject(res)
        }
      } else {
        rejObj.msg = 'server_error'
        reject(res)
      }
      clearTimeout(t)
    }, progressCallback || (() => {}))
  })
}

/**
 * @param
 * url: String   request url
 * data: Object  request object
 * progressCallback: ?Function  A progress callback.
 * This callback will be invoked before request finished.
 * @return
 * promise
 */
Stream.prototype.post = function (url, data, progressCallback) {
  let rejObj = { obj: '', msg: '' }
  return new Promise((resolve, reject) => {
    const options = Object.assign({}, this.options, { url: url, method: 'POST', body: data })
    // 超时拒绝请求
    var t = setTimeout(() => {
      rejObj.msg = 'timeout'
      reject(rejObj)
    }, timeoutDuration)
    stream.fetch(options, (response) => {
      if (response.ok) {
        let res = response.data
        if (!res.resultCode || res.resultCode >= 200 && res.resultCode <= 300 || res.resultCode === 418 || res.resultCode === 509) { // 509验价没有座了
          resolve(res)
        } else {
          rejObj.msg = 'server_error'
          reject(res)
        }
      } else {
        rejObj.msg = 'server_error'
        reject(res)
      }
      clearTimeout(t)
    }, progressCallback || (() => {}))
  })
}

/**
 * @param
 * url: String   request url
 * progressCallback: ?Function  A progress callback.
 * This callback will be invoked before request finished.
 * @return
 * promise
 */
Stream.prototype.delete = function (url, progressCallback) {
  let rejObj = { obj: '', msg: '' }
  return new Promise((resolve, reject) => {
    const options = Object.assign({}, this.options, { url: url, method: 'DELETE' })
    // 超时15秒拒绝请求
    var t = setTimeout(() => {
      rejObj.msg = 'timeout'
      reject(rejObj)
    }, timeoutDuration)
    stream.fetch(options, (response) => {
      if (response.ok) {
        let res = response.data
        if (!res.resultCode || res.resultCode === 200) {
          resolve(res)
        } else {
          rejObj.msg = 'server_error'
          reject(rejObj)
        }
      } else {
        rejObj.msg = 'server_error'
        reject(rejObj)
      }
      clearTimeout(t)
    }, progressCallback || (() => {}))
  })
}


export default new Stream(defaultConfig)
