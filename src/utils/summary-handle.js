import constants from './../constants/constants'
import { getFindFlightRequest } from './../utils/request-adapter'

const Base64 = require('js-base64').Base64

function ibase64() {
  function utf16to8(str) {
    let out = ''
    let i = ''
    let len = ''
    let c = ''
    len = str.length
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
    }
    return out;
  }


  function utf8to16(str) {
    let out = ''
    let i = 0
    let len = str.length
    let c = ''
    let char2 = ''
    let char3 = ''

    while (i < len) {
      c = str.charCodeAt(i++);
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += str.charAt(i - 1);
          break
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
          break
        default: break
      }
    }
    return out;
  }

  return {
    encode: function (s) {
      return Base64.encode(utf16to8(s))
    },
    decode: function (s) {
      return utf8to16(Base64.decode(s))
    },
    toJson: function(s) {
      return JSON.parse(this.decode(s))
    },
    toStr: function(s) {
      return this.encode(JSON.stringify(s))
    },
    toJsonWithURI: function(s) {
      return JSON.parse(window.decodeURI(this.decode(s)))
    },
    toStrWithURI: function(s) {
      return this.encode(window.encodeURI(JSON.stringify(s)))
    }
  }
}

function getGreenwichTimeStamp() {
  let dt = new Date()
  dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset()); // 当前时间(分钟) + 时区偏移(分钟)
  // console.log("格林尼治时间戳: ", dt.getTime());
  // console.log("用本地时间格式显示: ", dt.toLocaleString());
  return dt.getTime();
}

/**
 * @author 
 * @date 2017/11/14
 * @description 拼接第三方订购的url
 * @return string url
 */

export function thirdBooking(query, priceResult, item) {
  let tripSP = priceResult.trip.split('/')
  let findFlightQuery = query
  let flightItems = tripSP[0].split('-')
  findFlightQuery.multiple = {}
  console.log('-----')
  console.log(findFlightQuery)
  findFlightQuery.multiple.depCity = []
  findFlightQuery.multiple.arrCity = []
  findFlightQuery.depCity = {
    c: flightItems[0],
    t: 'A'
  };

  findFlightQuery.arrCity = {
    c: flightItems[1],
    t: 'A'
  };
  var req = getFindFlightRequest(findFlightQuery);
  req.targeCode = item.otaCode
  req.fid = item.productId


  req.timestamp = getGreenwichTimeStamp()
  let metaBookerOpenUrl = constants.apiGatewayHost + '/api-meta-booker-open'
  let url = metaBookerOpenUrl + '/redirectBooking?jsonFlightsRequest=' + ibase64().encode(JSON.stringify(req))
  return url
}

export function XXX() {}