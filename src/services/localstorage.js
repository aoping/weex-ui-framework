/*
 * @Author: aoping
 * @Date: 2017-09-07 11:32:06
 * @Last Modified by: aoping
 * @Last Modified time: 2017-10-24 14:49:40
 */
import { setItem, getItem, removeItem } from '../utils/modules/storage'
import { iFindIndex } from '../utils/util'

const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')

let SEARCHHISTORY_MAX_LEN = 5
let CITYHISTORY_MAX_LEN = 5

// 数据storage
const storageName = {
  SEARCHCONDITION: 'searchCondition', // 搜索条件
  SEARCHHISTORY: 'searchHistory', // 搜索历史
  CHECKDATE: 'checkdate', // 选择的行程日期
  DEPCITY: 'depCity', // 出发城市
  ARRCITY: 'arrCity', // 到达城市
  INTERNATIONALCITYHISTORY: 'internationalCityHistory', // 国际城市历史记录
  MAINLANDCITYHISTORY: 'mainlandCityHistory', // 国内城市历史记录
  STEPLIST: 'stepList', // 航段列表
  TOKEN: 'token', // member token
  GUID: 'guid', // member guid
  USERBASICINFO: 'userBasicInfo',
  MEMBERLOGINED: 'memberLogined',
  MEMBEREXPIRES: 'expires_in',
  REFRESHTOKEN: 'refresh_token',
  FLIGHTCONTACT: 'flightContact', // 选择的联系人
  FLIGHTPASSENGERS: 'flightPassengers', // 选择的乘机人
  TEMPFLIGHTPASSENGERS: 'tempFlightPassengers', // 暂存选择的乘机人
  PRODUCTID: 'productId',
  AVALIABLECOUPONS: 'avaliableCoupons', // 可用优惠券
  SELECTEDCOUPON: 'selectedCoupon', // 选择的优惠券
  BOOKINGITEMS: 'bookingItems', // 航班的所有供应商
  FINDFLIGHTSPRICE: 'findFlightsPrice', // 航班的所有供应商
  BOOKINGITEM: 'bookingItem', // 所选供应商
  GENERATEFORM: 'generateForm', // 验价表单
  CREATEDPASSENGERS: 'createdPassengers', // 新乘机人
  PRICEVERIFICATION: 'priceVerification' // 验价
}


let storageNeedClear = [] // 需要清理的缓存

function clearStorage () {
  storageNeedClear.forEach(item => {
    removeItem(item)
  })
}

function insertArray(arr, val, compare, maxLen) {
  const index = iFindIndex(arr, compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function setCity(query, _storageName_cityhistory, _storageName_city) {
  setItem(_storageName_city, JSON.stringify(query))

  storage.getItem(_storageName_cityhistory, function(result) {
    let sResult = result.data !== 'undefined' ? result.data : '[]'
    let cityHistory = JSON.parse(sResult)
    insertArray(cityHistory, query, (item) => {
      return item.c === query.c
    }, CITYHISTORY_MAX_LEN)
    setItem(_storageName_cityhistory, JSON.stringify(cityHistory))
  })
}

// export {storageName, setItem, getItem, removeItem, clearStorage}

export function setSearchCondition(query) {
  setItem(storageName.SEARCHCONDITION, JSON.stringify(query))
  storage.getItem(storageName.SEARCHHISTORY, function(result) {
    let sResult = result.data !== 'undefined' ? result.data : '[]'
    let searchHistory = JSON.parse(sResult)
    insertArray(searchHistory, query, (item) => {
      return item.timestamp === query.timestamp
    }, SEARCHHISTORY_MAX_LEN)
    setItem(storageName.SEARCHHISTORY, JSON.stringify(searchHistory))
  })
}

export function getSearchCondition (callback) {
  return getItem(storageName.SEARCHCONDITION)
}

export function setSearchHistory(query) {
  setItem(storageName.SEARCHHISTORY, JSON.stringify(query))
}

export function getSearchHistory(callback) {
  return getItem(storageName.SEARCHHISTORY)
}

export function setCheckdate (query) {
  setItem(storageName.CHECKDATE, JSON.stringify(query))
}

export function getCheckdate (callback) {
  return getItem(storageName.CHECKDATE)
}

export function removeCheckdate (callback) {
  removeItem(storageName.CHECKDATE)
}

export function setStepList (query) {
  setItem(storageName.STEPLIST, JSON.stringify(query))
}

export function getStepList (callback) {
  return getItem(storageName.STEPLIST)
}

export function setProductId (id) {
  setItem(storageName.PRODUCTID, JSON.stringify(id))
}

export function getProductId () {
  return getItem(storageName.PRODUCTID)
}

export function setDepCity (query) {
  let _storageName_cityhistory = query.i ? storageName.INTERNATIONALCITYHISTORY : storageName.MAINLANDCITYHISTORY
  let _storageName_city = storageName.DEPCITY
  setCity(query, _storageName_cityhistory, _storageName_city)
}

export function getDepCity (callback) {
  return getItem(storageName.DEPCITY)
}

export function setArrCity (query) {
  let _storageName_cityhistory = query.i ? storageName.INTERNATIONALCITYHISTORY : storageName.MAINLANDCITYHISTORY
  let _storageName_city = storageName.ARRCITY
  setCity(query, _storageName_cityhistory, _storageName_city)
}

export function getArrCity (callback) {
  return getItem(storageName.ARRCITY)
}

export function getCityHistory (i, callback) {
  let _storageName_cityhistory = i ? storageName.INTERNATIONALCITYHISTORY : storageName.MAINLANDCITYHISTORY
  return getItem(_storageName_cityhistory)
}

// member storage
export function setMemberLogined(logined) {
  setItem(storageName.MEMBERLOGINED, JSON.stringify(logined))
}

export function getMemberLogined(callback) {
  return getItem(storageName.MEMBERLOGINED)
}

export function setMemberToken(token) {
  setItem(storageName.TOKEN, JSON.stringify(token))
}

export function getMemberToken(callback) {
  return getItem(storageName.TOKEN)
}

export function setMemberGuid(guid) {
  setItem(storageName.GUID, JSON.stringify(guid))
}

export function getMemberGuid(callback) {
  return getItem(storageName.GUID)
}

export function getMemberGuid2() {
  storage.getItem(storageName.GUID, event => {
    return event.result === 'success' ? event.data : ''
  })
}

export function setUserBasicInfo(data) {
  setItem(storageName.USERBASICINFO, JSON.stringify(data))
}

export function getUserBasicInfo(callback) {
  return getItem(storageName.USERBASICINFO)
}

export function setMemberExpires(data) {
  setItem(storageName.MEMBEREXPIRES, JSON.stringify(new Date().getTime() + data * 1000))
}

export function getMemberExpires(callback) {
  return getItem(storageName.MEMBEREXPIRES)
}

export function setMemberRefreshToken(data) {
  setItem(storageName.REFRESHTOKEN, JSON.stringify(data))
}

export function getMemberRefreshToken(callback) {
  return getItem(storageName.REFRESHTOKEN)
}

export function setFlightContact(data) {
  setItem(storageName.FLIGHTCONTACT, JSON.stringify(data))
}

export function getFlightContact(callback) {
  return getItem(storageName.FLIGHTCONTACT)
}

export function removeFlightContact(data) {
  removeItem(storageName.FLIGHTCONTACT)
}

export function setFlightPassengers(data) {
  setItem(storageName.FLIGHTPASSENGERS, JSON.stringify(data))
}

export function getFlightPassengers(callback) {
  return getItem(storageName.FLIGHTPASSENGERS)
}

export function removeFlightPassengers(data) {
  removeItem(storageName.FLIGHTPASSENGERS)
}

export function setTempFlightPassengers(data) {
  setItem(storageName.TEMPFLIGHTPASSENGERS, JSON.stringify(data))
}

export function getTempFlightPassengers(callback) {
  return getItem(storageName.TEMPFLIGHTPASSENGERS)
}

export function removeTempFlightPassengers(data) {
  removeItem(storageName.TEMPFLIGHTPASSENGERS)
}

export function setAvaliableCoupons(data) {
  setItem(storageName.AVALIABLECOUPONS, JSON.stringify(data))
}

export function getAvaliableCoupons(callback) {
  return getItem(storageName.AVALIABLECOUPONS)
}

export function removeAvaliableCoupons(data) {
  removeItem(storageName.AVALIABLECOUPONS)
}

export function setSelectedCoupon(data) {
  setItem(storageName.SELECTEDCOUPON, JSON.stringify(data))
}

export function getSelectedCoupon(callback) {
  return getItem(storageName.SELECTEDCOUPON)
}

export function removeSelectedCoupon(data) {
  removeItem(storageName.SELECTEDCOUPON)
}

export function setBookingItems(data) {
  setItem(storageName.BOOKINGITEMS, JSON.stringify(data))
}

export function getBookingItems(callback) {
  return getItem(storageName.BOOKINGITEMS)
}

export function removeBookingItems(data) {
  removeItem(storageName.BOOKINGITEMS)
}

export function setFindFlightsPrice(data) {
  setItem(storageName.FINDFLIGHTSPRICE, JSON.stringify(data))
}

export function getFindFlightsPrice(callback) {
  return getItem(storageName.FINDFLIGHTSPRICE)
}

export function removeFindFlightsPrice(data) {
  removeItem(storageName.FINDFLIGHTSPRICE)
}

export function setBookingItem(data) {
  setItem(storageName.BOOKINGITEM, JSON.stringify(data))
}

export function getBookingItem(callback) {
  return getItem(storageName.BOOKINGITEM)
}

export function removeBookingItem(data) {
  removeItem(storageName.BOOKINGITEM)
}


export function setGenerateForm(data) {
  setItem(storageName.GENERATEFORM, JSON.stringify(data))
}

export function getGenerateForm(callback) {
  return getItem(storageName.GENERATEFORM)
}

export function removeGenerateForm(data) {
  removeItem(storageName.GENERATEFORM)
}

export function setCreatedPassengers(data) {
  setItem(storageName.CREATEDPASSENGERS, JSON.stringify(data))
}

export function getCreatedPassengers(callback) {
  return getItem(storageName.CREATEDPASSENGERS)
}

export function removeCreatedPassengers(data) {
  removeItem(storageName.CREATEDPASSENGERS)
}

export function setPriceVerification(data) {
  setItem(storageName.PRICEVERIFICATION, JSON.stringify(data))
}

export function getPriceVerification(callback) {
  return getItem(storageName.PRICEVERIFICATION)
}

export function removePriceVerification(data) {
  removeItem(storageName.PRICEVERIFICATION)
}
