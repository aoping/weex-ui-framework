/**
 * @author walid
 * @date 2017/02/21
 * @description 字符串操作
 */

/* eslint linebreak-style: [0] */
export default function indexOfArray (array, obj) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      return i
    }
  }
  return -1
}
