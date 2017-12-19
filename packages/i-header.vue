<template>
  <div>
    <div v-if="isIphoneX" :style="{height:source!='timeline'?'74px':'50px'}"></div>
    <div class="i-header-box" :style="styleNew">
      <div :style="{ 'height': '40px' }" v-if="iosfixed"></div>
      <div class="i-header">
        <div class="i-header-main">
          <text v-if="title" class="i-header-title" @click="_centerClick($event)">{{title}}</text>
          <slot name="middle"></slot>
        </div>
        <div class="i-header-left" @onclick="_leftClick($event)">
          <i-icon @onclick="_leftClick($event)" v-if="leftItem.icon||leftItem.icons" :name="leftItem.icon||leftItem.icons" :size="leftItem.iconSize" :color="leftItem.iconColor" :padding="leftItem.iconPadding" :margin="leftItem.iconMargin" pr="20px"></i-icon>
          <text @click="_leftClick($event)" v-if="leftItem.text" class="i-header-text">{{leftItem.text}}</text>
          <slot name="left"></slot>
        </div>
        <div class="i-header-right"  @onclick="_rightClick($event)">
          <i-icon @onclick="_rightClick($event)" v-if="rightItem.icon||rightItem.icons" :name="rightItem.icon||rightItem.icons" :size="rightItem.iconSize" :color="rightItem.iconColor" pl="15px"></i-icon>
          <text @click="_rightClick($event)" v-if="rightItem.text" class="i-header-text">{{rightItem.text}}</text>
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .i-header-box {
    flex-direction: column;
    background-color: #ffffff;
  }

  .i-header {
    flex: 1;
    padding-left: 30px;
    padding-right: 30px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .i-header-left {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
  }

  .i-header-right {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 30px;
    top: 0;
    bottom: 0;
  }

  .i-header-main {
    justify-content: center;
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    flex-direction: row;
  }

  .i-header-title {
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #323232;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    lines: 1;
    text-overflow: ellipsis;
    font-weight: 600;
  }

  .i-header-text {
    font-size: 32px;
    color: #323232;
    text-align: center;
    lines: 1;
  }

  .i-header-icon {
    width: 48px;
    height: 48px;
  }

  .i-header-icon-next {
    width: 48px;
    height: 48px;
    margin-right: 30px;
  }
</style>

<script>
  var defaultItem = {
    icon: '',
    icons: '',
    text: '',
    iconSize: '45px',
    iconColor: '#323232'
  }
  module.exports = {
    data: function() {
      return {}
    },
    components: {
      'i-icon': require('./i-icon.vue')
    },
    props: {
      styleEx: {},
      title: {
        type: String,
        default: ''
      },
      leftItem: {
        type: Object,
        default: function() {
          return defaultItem
        }
      },
      rightItem: {
        type: Object,
        default: function() {
          return defaultItem
        }
      },
      ios: {
        type: Boolean,
        default: true
      },
      height: {
        default: '128px'
      },
      source: {
        default: ''
      }
    },
    data: function() {
      return {
        heightNew: '0px',
        styleNew: {},
        style: {
          'background-color': '#ffffff'
        }
      }
    },
    computed: {
      iosfixed: function() {
        var ios = false
        if (!this.ios) {
          ios = false
        } else {
          // 头部位置适配
          var env = weex.config.env.platform.toLowerCase()
          switch (env) {
            case 'ios':
              ios = true
              break
            case 'android':
              ios = false
              break
            case 'web':
              ios = false
              break
            default:
              ios = false
          }
        }
        return ios
      }
    },
    methods: {
      _leftClick: function($event) {
        this.$emit('leftClick', $event)
      },
      _rightClick: function($event) {
        this.$emit('rightClick', $event)
      },
      _centerClick: function($event) {
        this.$emit('centerClick', $event)
      }
    },
    created: function() {
      this.heightNew = this.height
      var env = weex.config.env.platform.toLowerCase()
      if (!this.iosfixed || env === 'android') {
        this.heightNew = '88px'
      }
      this.styleNew = Object.assign({}, { 'height': this.heightNew }, this.style, this.styleEx)
    }
  }
</script>
