/*
* @Author: aoping
* @Date: 2017-09-07 11:31:57
 * @Last Modified by: aoping
 * @Last Modified time: 2017-09-18 15:37:59
*/

const storage = weex.requireModule('storage')

export function setItem (key, value) {
  return new Promise((resolve, reject) => {
    if (!key) {
      reject('key is empty ！！！')
      return
    }
    storage.setItem(key, value, event => {
      event.result === 'success' ? resolve() : reject()
    })
  })
}

export function getItem (key) {
  return new Promise((resolve, reject) => {
    if (!key) {
      reject('key is empty ！！！')
      return
    }
    storage.getItem(key, event => {
      event.result === 'success' ? resolve(event.data) : resolve('')
    })
  })
}

export function removeItem (key) {
  return new Promise((resolve, reject) => {
    if (!key) {
      reject('key is empty ！！！')
      return
    }
    storage.removeItem(key, event => {
      event.result === 'success' ? resolve() : reject('删除失败~')
    })
  })
}

export function length () {
  return new Promise((resolve, reject) => {
    storage.length(event => {
      event.result === 'success' ? resolve(event.data) : reject('获取长度失败~')
    })
  })
}

export function getAllKeys () {
  return new Promise((resolve, reject) => {
    storage.getAllKeys(event => {
      event.result === 'success' ? resolve('props: ' + event.data.join(', ')) : reject('获取所有key失败~')
    })
  })
}
