import { dateStrToMin } from './dateTool'
import { getCreateSessionRequest } from './request-adapter'
import enumTypes from './../constants/enum-types.constant'

function cityTranslate (query, depOrArr, mode, stepIndex) {
  var tempStr = ''

  if (!query) {
    return ''
  }

  if (query.tripType === 'OW' || query.tripType === 'RT') {
    if (query.multiple && query.multiple[depOrArr] && query.multiple[depOrArr].length > 1) {
      forEach(query.multiple[depOrArr], function(city, index) {
        tempStr += mkCityStr(city, mode) + ', '
      })

      tempStr = tempStr.slice(0, -2)
    } else {
      tempStr = mkCityStr(query[depOrArr], mode)
    }
  } else if (query.tripType === 'CT') {
    var segLen = query.segments.length

    if (depOrArr === 'depCity') {
      if (angular.isNumber(stepIndex)) {
        tempStr = mkCityStr(query.segments[stepIndex].depCity, mode)
      } else {
        tempStr = mkCityStr(query.segments[0].depCity, mode)
      }
    } else {
      if (angular.isNumber(stepIndex)) {
        tempStr = mkCityStr(query.segments[stepIndex].arrCity, mode)
      } else {
        tempStr = mkCityStr(query.segments[segLen - 1].arrCity, mode)
      }
    }
  }

  return tempStr
}

function mkCityStr(cityObj, mode) {
  if (!cityObj) {
    return '--'
  }

  if (mode === 'name') {
    return cityObj.d
  } else if (mode === 'nameCode') {
    return $t('filter-city-translate', {
      city: cityObj.d,
      cityCode: cityObj.c
    })
  } else {
    return cityObj.c
  }
}


export function getStepListTimeline (query) {
  var stepList = [],
    request = getCreateSessionRequest(query, true)

  let stepNum = request.queryObj.tripType === 'OW' ? 1 : (request.queryObj.tripType === 'RT' ? 2 : request.queryObj.item.length)

  for (var i = 0; i < stepNum; i++) {
    var stepItem = {}

    if (query.tripType === enumTypes.TripTypeEnum.MultiCity) {
      stepItem.departCity = cityTranslate(query, 'depCity', 'name', i)
      stepItem.arrivalCity = cityTranslate(query, 'arrCity', 'name', i)
      stepItem.departCityC = cityTranslate(query, 'depCity', 'code', i)
      stepItem.arrivalCityC = cityTranslate(query, 'arrCity', 'code', i)
      stepItem.date = query.segments[i].date
    } else {
      // 20150210wzh:多城市s
      if (!i) {
        stepItem.departCity = cityTranslate(query, 'depCity', 'name', i)
        stepItem.arrivalCity = cityTranslate(query, 'arrCity', 'name', i)
        stepItem.departCityC = cityTranslate(query, 'depCity', 'code', i)
        stepItem.arrivalCityC = cityTranslate(query, 'arrCity', 'code', i)
        stepItem.date = query.depDate
      } else {
        stepItem.departCity = cityTranslate(query, 'arrCity', 'name', i)
        stepItem.arrivalCity = cityTranslate(query, 'depCity', 'name', i)
        stepItem.departCityC = cityTranslate(query, 'arrCity', 'code', i)
        stepItem.arrivalCityC = cityTranslate(query, 'depCity', 'code', i)
        stepItem.date = query.returnDate
      }
      // 20150210wzh:多城市e
    }

    stepItem.sortType = [
      { content: '最便宜', selected: true, sorter: { sortType: 'price', sortOrder: 'asc', voyage: 1 } },
      { content: '最快', selected: false, sorter: { sortType: 'flightTime', sortOrder: 'asc', voyage: 1 } },
      { content: '最早出发', selected: false, sorter: { sortType: 'departureTime', sortOrder: 'asc', voyage: 1 } },
      { content: '最晚出发', selected: false, sorter: { sortType: 'departureTime', sortOrder: 'des', voyage: 1 } }
    ]
    stepItem.filterType = {
      departureTime: [
        {
          code: 'dt1',
          filter: {
            key: 'depTime',
            value: '00:00-06:00'
          },
          isSelected: false
        },
        {
          code: 'dt2',
          filter: {
            key: 'depTime',
            value: '06:00-12:00'
          },
          isSelected: false
        },
        {
          code: 'dt3',
          filter: {
            key: 'depTime',
            value: '12:00-18:00'
          },
          isSelected: false
        },
        {
          code: 'dt4',
          filter: {
            key: 'depTime',
            value: '18:00-24:00'
          },
          isSelected: false
        }
      ],
      arriveTime: [
        {
          code: 'at1',
          filter: {
            key: 'arrTime',
            value: '00:00-06:00'
          },
          isSelected: false
        },
        {
          code: 'at2',
          filter: {
            key: 'arrTime',
            value: '06:00-12:00'
          },
          isSelected: false
        },
        {
          code: 'at3',
          filter: {
            key: 'arrTime',
            value: '12:00-18:00'
          },
          isSelected: false
        },
        {
          code: 'at4',
          filter: {
            key: 'arrTime',
            value: '18:00-24:00'
          },
          isSelected: false
        }
      ],
      airlines: [],
      airports: {
        org: [],
        dst: [],
        transfer: []
      },
      departureNoLimit: true,
      arriveNoLimit: true,
      airlinesNoLimit: true,
      airportsNoLimit: true
    }
    stepItem.selectedItem = null
    stepList.push(stepItem)
  }
  return stepList
}

export function segmentAdapter (steps) {
  if (!steps) {
    return
  }
  steps.forEach((step) => {
    console.log('step')
    for (let i = 0, len = step.flightList.length; i < len; i++) {
      let resultSegments = []
      const segmentLen = step.flightList[i].segments.length
      // 航段适配
      step.flightList[i].segments.forEach(function (_filterSegment, index) {
        // 设置航段长度和类型
        let flightSegment = Object.assign({}, _filterSegment)
        flightSegment.type = 'flight'
        resultSegments.push(flightSegment)

        // 设置经停段
        if (index !== segmentLen - 1) {
          var nextSegment = step.flightList[i].segments[index + 1]
          resultSegments.push({
            type: 'stop',
            name: flightSegment.dstAirportCode === nextSegment.orgAirportCode ? flightSegment.dstAirportName : flightSegment.dstAirportName + '/' + nextSegment.orgAirportName,
            ctName: flightSegment.dstCityCode === nextSegment.orgCityCode ? flightSegment.dstCityName : flightSegment.dstCityName + '/' + nextSegment.orgCityName,
            code: flightSegment.dstAirportCode === nextSegment.orgAirportCode ? flightSegment.dstAirportCode : flightSegment.dstAirportCode + '/' + nextSegment.orgAirportCode,
            changeAirport: flightSegment.dstAirportCode === nextSegment.orgAirportCode ? false : true,
            ctCode: flightSegment.dstCityCode === nextSegment.orgCityCode ? flightSegment.dstCityCode : flightSegment.dstCityCode + '/' + nextSegment.orgCityCode,
            ft: dateStrToMin(nextSegment.startTime) - dateStrToMin(flightSegment.endTime)
          })
        }
      })
      step.flightList[i].segments = resultSegments
    }
  })
}

export function segmentFilter (stepList, flightData) {
  stepList.filterType.airlines = compare(stepList.filterType.airlines, flightData.airlines)
  stepList.filterType.airports.org = compare(stepList.filterType.airports.org, flightData.airport.org)
  stepList.filterType.airports.dst = compare(stepList.filterType.airports.dst, flightData.airport.dst)
  stepList.filterType.airports.transfer = compare(stepList.filterType.airports.transfer, flightData.airport.transfer)
}

function compare (oldArr, newArr) {
  for (let i = 0; i < newArr.length; i++) {
    newArr[i].isSelected = false
    for (let j = 0; j < oldArr.length; j++) {
      if (newArr[i].code === oldArr[j].code) {
        newArr[i].isSelected = oldArr[j].isSelected
      }
    }
  }
  return newArr
}
