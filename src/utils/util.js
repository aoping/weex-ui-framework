/*
 * @Author: aoping
 * @Date: 2017-09-11 10:59:13
 * @Last Modified by: aoping
 * @Last Modified time: 2017-09-11 11:09:46
 */

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，func 才会执行
 * @export
 * @param {any} func 请求关联函数，实际应用需要调用的函数
 * @param {any} delay 空闲时间，单位毫秒
 * @returns 返回客户调用函数
 */
export function debounce (func, delay) {
  let timer = void 0
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 查找数组某元素位置
 * @export
 * @param {any} array
 * @param {any} predicate
 * @returns
 */
export function iFindIndex (array, predicate) {
  var length = array.length
  for (let index = 0; index >= 0 && index < length; index++) {
    if (predicate(array[index], index, array)) return index
  }
  return -1
}
