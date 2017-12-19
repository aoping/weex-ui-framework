/**
 * @author
 * @date 2017/09/07
 * @description 校验手机号码
 * @return Boolean
 */
export function checkPhoneNum(value) {
  var phoneReg = /^1(3|4|5|7|8)\d{9}$/
  if (phoneReg.test(value)) {
    return true
  } else {
    return false
  }
}
/**
 * @author
 * @date 2017/09/07
 * @description 校验4位动态码
 * @return Boolean
 */
export function checkCodeNum(value) {
  var codeReg = /\d{4}$/
  if (codeReg.test(value)) {
    return true
  } else {
    return false
  }
}
/**
 * @author
 * @date 2017/09/07
 * @description 校验Email
 * @return Boolean
 */
export function checkEmail(value) {
  var emailReg = /(^[\w.\-]+@(?:[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,3}$)/
  if (emailReg.test(value)) {
    return true
  } else {
    return false
  }
}/**
 * @author
 * @date 2017/09/07
 * @description 校验Email或手机号码
 * @return Boolean
 */
export function checkEmailPhone(value) {
  var emailReg = /(^[\w.\-]+@(?:[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,3}$)|(^[1][34578][0-9]{9}$)/
  if (emailReg.test(value)) {
    return true
  } else {
    return false
  }
}
/**
 * @author
 * @date 2017/09/07
 * @description 校验密码
 * @return Boolean
 */
export function checkPasswordText(value) {
  var passwordReg = /^[^\s\u4E00-\u9FA5]{8,16}$/
  if (passwordReg.test(value)) {
    return true
  } else {
    return false
  }
}

/**
 * @author
 * @date 2017/10/24
 * @description 校验昵称(至少输入1个中文/2个英文字符(停用)(使用：字符长度1-16),不支持空格和emoji)
 * @return Boolean
 */
export function checkNickname(value) {
  // var tmpStr = value
  // var cLength = tmpStr.replace(/[^\x00-\xff]/g, 'aa').length
  var strReg = /^[^\s]{1,16}$/
  var emojiReg = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
  if (strReg.test(value) && !emojiReg.test(value)) {
    return true
  } else {
    return false
  }
}

/**
 * 校验姓名
 * 20个中文字符（40个英文字符），超出则不能继续输入；不支持数字、空格、标点符号和表情
 */
export function checkName(value) {
  var tmpStr = value
  var Reg = /^[a-zA-Z\u4e00-\u9fa5]{1,40}$/
  var cLength = tmpStr.replace(/[^\x00-\xff]/g, 'aa').length
  if (Reg.test(value) && cLength <= 40 && cLength > 0) {
    return true
  } else {
    return false
  }
}

/**
 * 校验中文姓名
 * 20个中文字符
 */
export function checkNameZH(value) {
  var zhRreg = /^[\u4e00-\u9fa5]{1,20}$/
  if (zhRreg.test(value)) {
    return true
  } else {
    return false
  }
}

/**
 * 校验英文姓名
 * 40个英文字符
 */
export function checkNameEN(value) {
  var enReg = /^[a-zA-Z]{1,40}$/
  if (enReg.test(value)) {
    return true
  } else {
    return false
  }
}

/**
 * 校验其他证件
 * 5-15位数字/英文字符，超过15位不能输入，不支持输入特殊符号（标点符号、空格、表情）
 */
export function checkCredential(value) {
  var reg = /^[0-9a-zA-Z]{5,15}$/
  if (reg.test(value)) {
    return true
  } else {
    return false
  }
}

/**
 * 校验身份证
 *
 */
export function checkID(ID) {
  if (typeof ID !== 'string') return '非法字符串'
  var city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
  var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2))
  var d = new Date(birthday)
  var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
  var currentTime = new Date().getTime()
  var time = d.getTime()
  var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  var sum = 0
  var i
  var residue

  if (!/^\d{17}(\d|x)$/i.test(ID)) return false // '非法身份证'
  if (city[ID.substr(0, 2)] === undefined) return false // '非法地区'
  if (time >= currentTime || birthday !== newBirthday) return false // '非法生日'
  for (i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i]
  }
  residue = arrCh[sum % 11]
  if (residue !== ID.substr(17, 1)) return false // '非法身份证哦'
  return {
    city: city[ID.substr(0, 2)],
    birthday: birthday,
    gender: ID.substr(16, 1) % 2 ? 'MALE' : 'FEMALE'
  }
}

