import enumTypes from './../constants/enum-types.constant'
import query from './../constants/config'

export function getSearchDefaultQuery () {
  return {
    type: enumTypes.SearchTypeEnum.FindFlights,
    tripType: enumTypes.TripTypeEnum.RoundTrip,
    cabinType: enumTypes.CabinTypeEnum.Economy,
    depCity: null,
    arrCity: null,
    depDate: null,
    returnDate: null,
    segments: [{
      depCity: null,
      arrCity: null,
      date: ''
    }, {
      depCity: null,
      arrCity: null,
      date: ''
    }],
    multiple: {
      depStr: '',
      arrStr: '',
      depCity: [],
      arrCity: [],
      depShow: false,
      arrShow: false
    },
    isDomesticCabinType: 0,
    lang: query.lang
    // TODO:currency:$scope.query.currency
  }
}

export function getCreateSessionRequest (query, needDesc) {
  const request = {
    lang: query.lang, //  语言代码
    enableMagic: true,
    magicEnabled: true,
    queryObj: {
      tripType: query.tripType,
      item: [],
      passengerInfo: [],
      cabinType: query.cabinType === 'BusinessAndFirst' ? 'Business/First' : query.cabinType,
      isDomesticCabinType: 0,
      cabinAlert: true
    }
  }
  let objectDepart = ''
  let objectArrival = ''
  let objectDepartDate = ''
  let objectArrivalDate = ''
  let dlen = ''

  if (query.tripType === enumTypes.TripTypeEnum.MultiCity) {
    query.segments.forEach((item) => {
      if (!item.depCity.i && !item.depCity.i) {
        request.queryObj.isDomesticCabinType = 1
      }

      request.queryObj.item.push({
        from: { c: item.depCity.c, t: item.depCity.t },
        to: { c: item.arrCity.c, t: item.arrCity.t },
        date: item.date.replace(/-/g, '')
      })
    })
  } else {
    if (!query.multiple || (query.multiple.depCity.length < 2 && query.multiple.arrCity.length < 2)) {
      objectDepart = query.depCity
      objectArrival = query.arrCity
      queryObjectAdapter(objectDepart, objectArrival)
    } else {
      if (query.multiple.depCity.length > 1) {
        objectDepart = query.multiple.depCity
        objectArrival = query.arrCity
        dlen = objectDepart.length

        for (let i = 0; i < dlen; i++) {
          queryObjectAdapter(objectDepart[i], objectArrival)
        }
      } else if (query.multiple.arrCity.length > 1) {
        objectDepart = query.depCity
        objectArrival = query.multiple.arrCity
        dlen = objectArrival.length

        for (let i = 0; i < dlen; i++) {
          queryObjectAdapter(objectDepart, objectArrival[i])
        }
      }
    }

    function queryObjectAdapter(queryDepart, queryArrival, queryDate) {
      if (!queryDate) {
        objectDepartDate = query.depDate
        objectArrivalDate = query.returnDate
      }

      if (!queryDepart.i && !queryArrival.i) {
        request.queryObj.isDomesticCabinType = 1
      }

      request.queryObj.item.push({
        from: needDesc ? queryDepart : { c: queryDepart.c, t: queryDepart.t },
        to: needDesc ? queryArrival : { c: queryArrival.c, t: queryArrival.t },
        date: objectDepartDate.replace(/-/g, '')
      })
      switch (query.tripType) {
        case enumTypes.TripTypeEnum.RoundTrip:
          request.queryObj.item.push({
            from: needDesc ? queryArrival : { c: queryArrival.c, t: queryArrival.t },
            to: needDesc ? queryDepart : { c: queryDepart.c, t: queryDepart.t },
            date: objectArrivalDate.replace(/-/g, '')
          })
          break
        case enumTypes.TripTypeEnum.MultiCity:
          /* TODO:var dLen = query.segments.length
            for (var i = 0 i < dLen i++) {
            var segment = query.segments[i]
            objectDepart = segment.depCity,
            objectArrival = segment.arrCity,
            objectDepartDate = segment.date
            queryObjectAdapter(objectDepart, objectArrival, objectDepartDate)
            } */
          break
        default:
          break
      }
    }
  }
  return request
}

export function getSingleFlightsRequest (query) {
  return {
    currency: query.currency,
    lang: query.lang,
    sorters: query.sorters,
    filters: query.filters,
    pageNumber: query.pageNumber,
    pageSize: query.pageSize,
    sessionId: query.sessionId,
    voyage: query.voyage
  }
}

export function getSingleFlightsByFukRequest (query, fukMessage) {
  return {
    currency: query.currency,
    lang: query.lang,
    sorters: query.sorters,
    filters: query.filters,
    pageNumber: query.pageNumber,
    pageSize: query.pageSize,
    sessionId: query.sessionId,
    voyage: query.voyage,
    voyageInfo: fukMessage
  }
}

export function getSeparatedFlightsByFukRequest (query, fukMessage) {
  return {
    currency: query.currency,
    lang: query.lang,
    sorters: query.sorters,
    filters: query.filters,
    pageNumber: query.pageNumber,
    pageSize: query.pageSize,
    sessionId: query.sessionId,
    voyageInfo: fukMessage
  }
}

export function getPriceRequest (query, groupIdList) {
  return {
    lang: query.lang,
    currency: query.currency,
    fsk: groupIdList[0],
    enableMagic: true,
    magicEnabled: true,
    fskList: groupIdList
  }
}

export function getTimelineParams (query, stepIndex) {
  if (query.tripType === enumTypes.TripTypeEnum.MultiCity) {
    let tripSegments = []

    query.segments.forEach((item) => {
      tripSegments.push(`${item.depCity.c.toLowerCase()}-${item.arrCity.c.toLowerCase()}_${item.date}*`)
    })

    return {
      tripSegments: tripSegments.join(''),
      type: query.type ? query.type.toString() : '',
      tripType: query.tripType,
      cabinType: query.cabinType,
      stepIndex: stepIndex ? stepIndex : 0,
      isDomesticCabinType: parseInt(query.isDomesticCabinType) ? parseInt(query.isDomesticCabinType) : 0,
      lang: query.lang
    }
  } else {
    let depCity = query.depCity ? query.depCity.c.toLowerCase() : null,
      arrCity = query.arrCity ? query.arrCity.c.toLowerCase() : null,
      depDate = query.depDate,
      returnDate = query.returnDate ? query.returnDate : ''

    if (query.multiple && query.multiple.depCity.length > 0) {
      depCity = ''
      for (let i = 0, len = query.multiple.depCity.length; i < len; i++) {
        depCity += query.multiple.depCity[i].c.toLowerCase()
        if (i + 1 !== len) {
          depCity += ','
        }
      }
    } else if (query.multiple && query.multiple.arrCity.length > 0) {
      arrCity = ''
      for (let i = 0, len = query.multiple.arrCity.length; i < len; i++) {
        arrCity += query.multiple.arrCity[i].c.toLowerCase()
        if (i + 1 !== len) {
          arrCity += ','
        }
      }
    }
    // for date space
    if (depDate) {
      depDate = depDate.trim()
    }
    if (returnDate) {
      returnDate = returnDate.trim()
    }

    return {
      tripSegments: `${depCity}-${arrCity}_${depDate}*${returnDate}`,
      type: query.type ? query.type.toString() : '',
      tripType: query.tripType,
      cabinType: query.cabinType,
      stepIndex: stepIndex ? stepIndex : 0,
      isDomesticCabinType: parseInt(query.isDomesticCabinType) ? parseInt(query.isDomesticCabinType) : 0,
      lang: query.lang
      // TODO:currency:query.currency
    }
  }
}

export function getFindFlightRequest(query, needDesc) {
  let request = {
    lang: query.lang, // 语言代码
    timestamp: query.timestamp, // query.timestamp || new Date().getTime(),	//时间戳,
    currency: query.currency, // 币种代码
    queryObj: {
      tripType: query.tripType,
      item: [],
      passengerInfo: [],
      cabinType: query.cabinType,
      isDomesticCabinType: 0
    }
  }


  if (query.tripType === enumTypes.TripTypeEnum.MultiCity) {
    query.segments.forEach((item) => {
      if (!item.depCity.i && !item.depCity.i) {
        request.queryObj.isDomesticCabinType = 1;
      }

      request.queryObj.item.push({
        from: { c: item.depCity.c, t: item.depCity.t },
        to: { c: item.arrCity.c, t: item.arrCity.t },
        date: item.date.replace(/-/g, '')
      })
    })
  } else {
    let objectDepart = ''
    let objectArrival = ''
    let objectDepartDate = ''
    let objectArrivalDate = ''

    if (!query.multiple || (query.multiple.depCity.length < 2 && query.multiple.arrCity.length < 2)) {
      objectDepart = query.depCity;
      objectArrival = query.arrCity;
      queryObjectAdapter(objectDepart, objectArrival);
    } else {
      var dlen;
      if (query.multiple.depCity.length > 1) {
        objectDepart = query.multiple.depCity;
        objectArrival = query.arrCity;
        dlen = objectDepart.length;

        for (let i = 0; i < dlen; i++) {
          queryObjectAdapter(objectDepart[i], objectArrival);
        }
      } else if (query.multiple.arrCity.length > 1) {
        objectDepart = query.depCity;
        objectArrival = query.multiple.arrCity;
        dlen = objectArrival.length;

        for (var i = 0; i < dlen; i++) {
          queryObjectAdapter(objectDepart, objectArrival[i]);
        }
      }
    }

    function queryObjectAdapter(queryDepart, queryArrival, queryDate) {
      if (!queryDate) {
        objectDepartDate = query.depDate;
        objectArrivalDate = query.returnDate;
      }

      if (!queryDepart.i && !queryArrival.i) {
        request.queryObj.isDomesticCabinType = 1;
      }

      request.queryObj.item.push({
        from: needDesc ? queryDepart : { c: queryDepart.c, t: queryDepart.t },
        to: needDesc ? queryArrival : { c: queryArrival.c, t: queryArrival.t },
        date: objectDepartDate.replace(/-/g, '')
      })

      switch (query.tripType) {
        case enumTypes.TripTypeEnum.RoundTrip:
          request.queryObj.item.push({
            from: needDesc ? queryArrival : { c: queryArrival.c, t: queryArrival.t },
            to: needDesc ? queryDepart : { c: queryDepart.c, t: queryDepart.t },
            date: objectArrivalDate.replace(/-/g, '')
          })
          break;
        case enumTypes.TripTypeEnum.MultiCity:
          /* TODO:var dLen = query.segments.length;
            for (var i = 0; i < dLen; i++) {
            var segment = query.segments[i];
            objectDepart = segment.depCity,
            objectArrival = segment.arrCity,
            objectDepartDate = segment.date;
            queryObjectAdapter(objectDepart, objectArrival, objectDepartDate);
            }; */
          break;
        default: break
      }
    }
  }

  return request;
}
