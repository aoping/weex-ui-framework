/**
 * Created by dengjingwen on 17/6/29.
 */
import Vue from 'vue'
import weex from 'weex-vue-render'
import detail from '../../../src/views/HotelResultDetail.vue'
import fetchMock from 'fetch-mock'
import config from './../config'

Vue.use(config)

describe('hotelDeatil.vue', () => {
  beforeEach(function () {
    Vue.use(config)
    const Constructor = Vue.extend(detail)
    const vm = new Constructor().$mount()
  })

  it('should get hotelId', () => {
    Vue.use(config)
    fetchMock.get(/api-hotel\/detail/g, {
      'responseType': 'hotel-detail',
      'code': 200,
      'subCode': '1',
      'msg': 'SUCCESS',
      'data': {
        'hotelID': '51470',
        'agodaHotelID': '73409',
        'nameChn': '广州白云机场铂尔曼大酒店',
        'nameEng': 'Pullman Guangzhou Baiyun Airport',
        'lat': 23.39251,
        'lng': 113.29858,
        'star': 5,
        'intro': '<p><b>酒店位置</b> <br />广州白云机场铂尔曼大酒店地处广州花都，位于马鞍山公园和花都广场附近。 该 4.5 星级酒店位于花都区体育中心和花都盘古王庙地区。</p><p><b>客房</b> <br />有 460 间空调客房提供迷你吧和平板电视；您定能在旅途中找到家的舒适。免费的有线和无线上网帮助您与朋友保持联系；此外客房还提供卫星节目，以满足您的娱乐需求。独立浴室提供免费洗浴用品和吹风机。便利设施包括保险箱和书桌；如有需要，还可提供熨斗/熨板。</p><p><b>休闲、SPA、高端服务设施</b> <br />享受按摩、身体护理和面部护理，慰劳一下自己。您可以充分利用健身俱乐部、室外游泳池和桑拿等度假设施。此酒店还提供免费无线上网、礼宾服务和礼品店/报摊。</p><p><b>餐饮</b> <br />您可以选择这家酒店的 3 间餐厅，随便吃一点；也可以呆在房间里，享受24 小时客房送餐服务。欢迎光临酒吧/酒廊，点一杯喜欢的饮品，畅饮一番。</p><p><b>商务及其他服务设施</b> <br />特色服务/设施包括商务中心、快速入住和快速退房。计划在广州举办活动？这家酒店拥有 1600 平方米（17222 平方英尺）的空间，包括会议场地和会议室。</p>',
        'introEng': ' include a business center express check-in and express check-out. Planning an event in Guangzhou? This hotel has 17222 square feet (1600 square meters) of space consisting of conference space and meeting rooms.</p>',
        'city': 'CAN',
        'address': '广州市花都区新白云国际机场出发大厅12号门对面，步行15秒',
        'addressEng': 'Baiyun International Airport Renhe Town',
        'images': [
          {
            'title': null,
            'url': 'http://pix1.agoda.net/hotelimages/734/73409/73409_16021003200039751688.jpg?s=312x'
          },
          {
            'title': null,
            'url': 'http://pix2.agoda.net/hotelimages/734/73409/73409_15060516500028705244.jpg?s=312x'
          },
          {
            'title': null,
            'url': 'http://pix5.agoda.net/hotelimages/734/73409/73409_15072814100033177341.jpg?s=312x'
          },
          {
            'title': null,
            'url': 'http://pix3.agoda.net/hotelimages/734/73409/73409_15072814100033177342.jpg?s=312x'
          },
          {
            'title': null,
            'url': 'http://pix5.agoda.net/hotelimages/734/73409/73409_15072814100033177355.jpg?s=312x'
          }
        ],
        'facilities': [

        ],
        'roomFacilities': [

        ],
        'policies': [

        ],
        'phone': '+86 20 360 68 866',
        'refPrice': 0,
        'score': 85
      }
    })
    const Constructor = Vue.extend(detail)
    const vm = new Constructor().$mount()

    vm.$nextTick(() => {
      expect(vm.hotelData).to.equal('51470')
    })
  })
})
