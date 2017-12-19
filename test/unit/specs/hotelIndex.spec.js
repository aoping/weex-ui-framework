/**
 * Created by dengjingwen on 17/6/27.
 */
import Vue from 'vue'
import weex from 'weex-vue-render'
import Index from '../../../src/views/HotelIndex.vue'
import fetchMock from 'fetch-mock'

describe('hotelIndex.vue', () => {
  beforeEach(function () {

  })
  it('should render correct components', () => {
    const Constructor = Vue.extend(Index)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.icon-text .active').textContent)
                .to.equal('酒店')
    })
  })
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Index)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.location').textContent)
                .to.equal('广州')
    })
  })

  it('calculate nights number', () => {
    const Constructor = Vue.extend(Index)
    const vm = new Constructor().$mount()
    vm.calculateNight()
    expect(vm.nights).to.equal(0)
  })
})
