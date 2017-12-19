<template>
  <div>
    <blurView :style="{height: rootHeight+'px', width: '750px', 'background-color':'rgba(0, 0, 0, 0.2)'}" class="mask" v-if="platform !== 'web'"></blurView>
    <div class="i-actionsheet" :style="{'opacity': opacity, height: rootHeight+'px'}" @click="layoutClick"></div>
    <div v-if="show" class="i-actionsheet-box"  @click="stopPropagation" ref="actionsheetSlot">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.i-actionsheet {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  flex-direction: column;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2)
}
.mask{
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
}
.i-mask {
  width: 750px;
  background-color: #000000;
}
.i-actionsheet-box {
  width: 750px;
  background-color: white;
  position: fixed;
  bottom: 0;
  z-index:1;
}
</style>

<script>
  const animation = weex.requireModule('animation')

  module.exports = {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      opacity: {
        default: '0.8'
      },
      height: { // 要偏移的高度
        type: Number,
        required: true
      }
    },
    data() {
      return {
        animationHeight: this.height
      }
    },
    created() {
      this.rootHeight = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - this.height - 100 // actionsheet至少有100px

      if (weex.config.env.platform.toUpperCase() === 'ANDROID') {
        this.rootHeight -= 40
      }
    },
    mounted() {
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
        var el = _this.$refs.actionsheetSlot
        var translate = 'translate(0px, -' + (_this.animationHeight) + 'px)'
        _this.animationFn(el, translate, 'ease-in-out')
      },
      // 点击mask遮罩层
      'layoutClick': function () {
        var _this = this
        var el = this.$refs.actionsheetSlot
        var translate = 'translate(0px, ' + (_this.animationHeight) + 'px)'
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
