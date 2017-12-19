import { flight } from './api'
import { get, post } from './common-services'

const Base64 = require('js-base64').Base64

/**
 * 查找热门城市
 */
export function getHotCitys (req) {
  return post(flight.getHotCitys, req, false)
}

/**
 * 查询机场
 * @key string 'can'
 * @lang string 'ZH'
 */
export function getHotFlights (key, lang, timestamp) {
  const url = `${flight.getHotFlights}?lang=${Base64.encode(lang)}&text=${Base64.encode(key)}&timestamp=${timestamp}`
  return get(url)
}

/**
 * 查询机场
 * @key string 'can'
 * @lang string 'ZH'
 */
export function findLangAirport (code, lang) {
  const url = `${flight.findLangAirport}/${code}/${lang.toUpperCase()}`
  return get(url)
}

/**
 * 查询附近城市
 * @req {
    "lgt": 113.11,
    "lat": 23.05,
    "lang": "ZH",
    "timestamp": 1486957334502,
    "type":"AIRPORT",
    "largeCityOnly": true
  }
  @res {
    "resultCode":200,
    "code": "CAN",
    "name": "广州",
    "countryName": "中国",
    "countryCode": "CN"
  }
 */
export function findNearest (req) {
  return post(flight.findNearest, req, false)
}

/**
 * 创建航班查询Session
 * @req Object
 * {
    "lang": "ZH",
    "magicEnabled": true,
    "queryObj": {
      "tripType": "RT",
      "item": [
        {
          "from": {
            "c": "TYO",
            "t": "C"
          },
          "to": {
            "c": "SIN",
            "t": "C"
          },
          "date": "20170516"
        },
        {
          "from": {
            "c": "SIN",
            "t": "C"
          },
          "to": {
            "c": "TYO",
            "t": "C"
          },
          "date": "20170520"
        }
      ],
      "passengerInfo": [],
      "cabinType": "Economy",
      "cabinAlert": true
    }
  }
 */
export function createSession (req) {
  return post(flight.createSession, req, false)
}

/**
 * 获取各航段数据,例如,请求双程的数据,去程和返程数据同时返回
 * @req Object
 * {
    "currency": "CNY",
    "lang": "ZH",
    "sorters": [
      {
        "sortType":"flightTime",
        "sortOrder":"asc",
        "voyage":0
      },
      {
        "sortType":"departureTime",
        "sortOrder":"asc",
        "voyage":1
      }
    ],
    "filters": [
      {
        "key": "airline",
        "values":[],
        "voyage":0
      },
      {
        "key": "stops",
        "values":["0", "1", "2"],
        "voyage":0
      }
    ],
    "pageNumber":1,
    "pageSize":2,
    "sessionId": "c27e1daf-3d39-44bc-8388-feaae99954c0"
  }
 */
export function separatedPolling (req) {
  return post(flight.separatedPolling, req, false)
}

/**
 * 获取单航段数据,如果是往返航程,需要请求两次
 * @req Object
 * {
    "currency": "CNY",
    "lang": "ZH",
    "sorters": [

    ],
    "filters": [

    ],
    "pageNumber":1,
    "pageSize":2,
    "sessionId": "2b2082b9-f318-40a7-bc6a-e10071bb62dd",
    "voyage":0
  }
 */
export function singlePolling (req) {
  return post(flight.singlePolling, req, false)
}

/**
 * 根据选中航班,获取对应的返程数据
 * @req Object
 * {
    "currency": "CNY",
    "lang": "ZH",
    "sorters": [

    ],
    "filters": [

    ],
    "pageNumber":1,
    "pageSize":50,
    "sessionId": "c27e1daf-3d39-44bc-8388-feaae99954c0",
    "voyage":1,
    "voyageInfo": [
      {
        "voyage": 0,
        "fuk": "FUK/HND-SIN/20170516/SQ631"
      }
    ]
  }
 */
export function singlePollingByFuk (req) {
  return post(flight.singlePollingByFuk, req, false)
}

/**
 * 根据fsk进行查价
 * @req Object
 * {
    "fskList": [],  [idList]
    "fsk": "d09c3ddd2d407e1db53faaf26041d520::Economy", [id]
    "magicEnabled": true,
    "currency": "CNY",
    "lang":"ZH"
  }
 */
export function findFlightsPrice (req) {
  return post(flight.findFlightsPrice, req, false)
}

/**
 * 获取轮播图的内容
 */
export function getSliderContent () {
  const url = flight.getSliderContent
  return get(url)
}
