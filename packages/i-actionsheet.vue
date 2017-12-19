<template>
  <div class="i-actionsheet">
    <i-mask v-if="show" @onclick="layoutClick" :opacity="opacity"></i-mask>
    <div v-if="show" class="i-actionsheet-box" :style="{'bottom': '-'+height+'px'}" ref="actionsheetBox" @click="stopPropagation">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .i-actionsheet {}

  .i-actionsheet-box {
    position: fixed;
    left: 0px;
    right: 0px;
    flex-direction: column;
    overflow: hidden;
    z-index: 99;
  }
</style>

<script>
  var animation = weex.requireModule('animation')
  module.exports = {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      opacity: {
        default: '0.2'
      },
      height: {
        type: Number,
        required: true
      }
    },
    components: {
      'i-mask': require('./i-mask.vue')
    },
    methods: {
      // 动画操作
      animationFn: function (el, translate, timing, fn) {
        animation.transition(el, {
          styles: {
            transform: translate,
            transformOrigin: 'center center'
          },
          duration: 300, // ms
          timingFunction: timing,
          delay: 0 // ms
        }, function () {
          fn && fn()
        })
      },
      // 打开上拉菜单
      'open': function () {
        var _this = this
        var el = _this.$refs.actionsheetBox
        var translate = 'translate(0px, -' + (_this.height) + 'px)'
        _this.animationFn(el, translate, 'ease-in-out')
      },
      // 点击mask遮罩层
      'layoutClick': function () {
        var _this = this
        var el = this.$refs.actionsheetBox
        var translate = 'translate(0px, ' + (_this.height) + 'px)'
        _this.animationFn(el, translate, 'ease-in', function () {
          _this.$emit('close')
        })
      },
      'stopPropagation': function () {
        return false
      }
    }
  }
</script>
