<template>
  <div class="i-slider-bar">
    <i-mask v-if="show" @onclick="layoutClick"></i-mask>
    <div v-if="show" class="i-slider-bar-box" :class="['i-'+type+'-slider-bar-box']" v-on:swipe="onSwipe($event)" ref="navbar">
      <!--<text class="bui-slider-title">{{type=='left' ? '左':'右'}}侧滑动栏题</text>-->
      <i-icon v-if="closeButton" name="icon-angle-left" @onclick="layoutClick"></i-icon>
      <div class="i-slider-content">
        <scroller>
          <slot>
          </slot>
        </scroller>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .i-slider-bar {}

  .i-slider-bar-box {
    position: fixed;
    width: 750px;
    top: 0px;
    bottom: 0px;
    background-color: white;
    padding: 30px;
    flex-direction: column;
  }

  .i-left-slider-bar-box {
    left: -750px;
  }

  .i-right-slider-bar-box {
    right: -750px;
  }

  .i-slider-title {
    margin-top: 50px;
    text-align: center;
  }

  .i-slider-content {
    margin-top: 50px;
    flex-direction: column;
    flex: 1;
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
      type: {
        type: String,
        default: 'left'
      },
      closeButton: {
        type: Boolean,
        default: false
      }
    },
    components: {
      'i-mask': require('./i-mask.vue'),
      'i-icon': require('./i-icon.vue')
    },
    methods: {
      // 动画操作
      animationFn(el, translate, timing, fn) {
        animation.transition(el, {
          styles: {
            transform: translate,
            transformOrigin: 'center center'
          },
          duration: 400, // ms
          timingFunction: timing,
          delay: 0 // ms
        }, function () {
          fn && fn()
        })
      },
      // 打开左侧滑动栏
      'openBar': function () {
        var navbar = this.$refs['navbar']
        if (this.type === 'left') {
          this.animationFn(navbar, 'translate(750px, 0)', 'ease-in-out')
        } else {
          this.animationFn(navbar, 'translate(-750px, 0)', 'ease-in-out')
        }
      },
      // 点击mask遮罩层
      'layoutClick': function () {
        var _this = this
        var navbar = this.$refs['navbar']

        switch (this.type) {
          case 'left':
            this.animationFn(navbar, 'translate(-750px, 0px)', 'ease-in', function () {
              _this.$emit('close')
            })
            break
          case 'right':
            this.animationFn(navbar, 'translate(750px, 0px)', 'ease-in', function () {
              _this.$emit('close')
            })
            break
          default:
            console.log('6666')
        }
      },
      // 手势
      'onSwipe': function (event) {
        switch (this.type) {
          case 'left':
            if (event.direction === 'left') {
              this.layoutClick()
            }
            break
          case 'right':
            if (event.direction === 'right') {
              this.layoutClick()
            }
            break
          default:
            console.log('手势无效')
        }
      }
    }
  }
</script>
