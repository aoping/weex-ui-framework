/**
 * Created by dengjingwen on 17/6/29.
 */
import Vue from 'vue'
import weex from 'weex-vue-render'
import RoomChoose from '../../../src/views/RoomChoose.vue'

describe('RoomChoose.vue', () => {
  beforeEach(function () {

  })
  it('should render correct text', () => {
    const Constructor = Vue.extend(RoomChoose)
    const vm = new Constructor().$mount()
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.room-num').textContent)
                .to.equal(1)
      expect(vm.$el.querySelector('.adult-num').textContent)
                .to.equal(2)
      expect(vm.$el.querySelector('.child-num').textContent)
                .to.equal(0)
    })
  })
  it('should calculate numbers', () => {
    const Constructor = Vue.extend(RoomChoose)
    const vm = new Constructor().$mount()
    vm.updateRoom(1)
    expect(vm.formData.room).to.equal(2)
    vm.updateAdult(-1)
    expect(vm.formData.adult).to.equal(1)
  })

  it('should show age options', () => {
    const Constructor = Vue.extend(RoomChoose)
    const vm = new Constructor().$mount()
    vm.updateChild(1)
    expect(vm.formData.child).to.equal(1)
    expect(vm.formData.childAge[0]).to.equal('<1')
  })
  it('alert age selected option', () => {
    const Constructor = Vue.extend(RoomChoose)
    const vm = new Constructor().$mount()
    vm.openPicker(0)
    vm.pickAge(9)
    expect(vm.formData.childAge[0]).to.equal(9)
  })
})
