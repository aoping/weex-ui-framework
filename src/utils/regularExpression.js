/**
 * @author zoro
 * @date 2017/07/1
 * @description 时间操作
 */

/* eslint linebreak-style: [0] */
// 对用户姓名验证 只能输入中文或拼音，不能使用特殊符号、数字等；1-30个字符 英文中间可以夹杂空格
// 对电话验证 11位数字，第1位必须为1，第2位必须为34578中的一个，总长度等于11
// 对邮箱验证 X@XX（无限制）.XX（2-3位）

export function testName (data) {
  if (data.replace(/\s/g, '').length == 0 || !(/^[a-zA-Z ]{1,30}$/.test(data) || /^[\u4e00-\u9fa5]{0,30}$/.test(data))) {
    return false
  } else {
    return true
  }
}

export function testPhone (data) {
  if (/^1[34578]\d{9}$/.test(data) && data) {
    return true
  } else {
    return false
  }
}

export function testEmail (data) {
  if (/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(data) && data) {
    return true
  } else {
    return false
  }
}
