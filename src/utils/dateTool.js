/**
 * @author
 * @date 2017/07/26
 * @description 日期增减
 * 格式：addDate('2017-01-11', -1)
 * @return YYYY-MM-DD
 */
export function addDate(date, days) {
  if (!date) {
    return
  }

  var d = (typeof date === 'string') ? new Date(date.replace(/-/g, '/')) : new Date(date.toString())
  d.setDate(d.getDate() + days)
  var month = d.getMonth() + 1
  var day = d.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  var val = d.getFullYear() + '-' + month + '-' + day
  return val
}

/**
 * @author
 * @date 2017/08/30
 * @description 日期转换为分钟
 * 格式：dataStrToMin('2014-09-05 15:40')
 * @return MM
 */
export function dateStrToMin (str) {
  if (!str) return
  var sp = str.split(' '),
    dp = sp[0].split('-'),
    tp = sp[1].split(':')

  return Math.floor(new Date(dp[0], Number(dp[1]) - 1, dp[2], tp[0], tp[1]).getTime() / (60 * 1000))
}

/* eslint linebreak-style: [0] */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// format(new Date(), 'yyyy-MM-dd hh:mm:ss.S') ==> 2017-07-02 08:09:04.423
// format(new Date(), 'yyyy-M-d h:m:s.S')      ==> 2017-7-2 8:9:4.18
export function format(date, fmt) {
  var d = (typeof date === 'string') ? new Date(date) : date
  var o = {
    'M+': d.getMonth() + 1, // 月份
    'd+': d.getDate(), // 日
    'h+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
    'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
    'S': d.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
