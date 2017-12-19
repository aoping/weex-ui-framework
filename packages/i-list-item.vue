<template>
  <div class="i-list" @click="_onClick" :style="styleNew">
    <div class="i-list-left" v-if="leftIcon ||leftText"  @click="leftClick">
      <i-icon v-if="leftIcon" :name="leftIcon" :size="leftIconSize" :color="leftIconColor" @onclick="leftClick"></i-icon>
      <text  v-if="leftText" class="i-list-text txt-all">{{leftText}}</text>
    </div>
    <div class="i-list-main"  :style="{height: height+'px','padding-right': paddingRight+'px'}">
      <slot name="middle"></slot>
    </div>
    <div class="i-list-right" :style="{width: rightWidth + 'px'}" v-if="rightIcon ||rightText" @click="rightClick">
      <i-icon v-if="rightIcon" :name="rightIcon" :size="rightIconSize" :color="rightIconColor" @onclick="rightClick"></i-icon>
      <text  v-if="rightText" class="i-list-text txt-alr">{{rightText}}</text>
    </div>
  </div>
</template>


<script>
  module.exports = {
    props: {
      styleEx: {},
      leftIcon: '',
      leftText: '',
      leftIconSize: '',
      leftIconColor: '',
      rightIcon: '',
      rightText: '',
      rightIconSize: '',
      rightIconColor: '',
      height: {
        default: 70
      },
      rightWidth: {
        default: 100
      },
      paddingRight: {
        default: 10
      },
      listPaddingTop: {
        default: 30
      },
      listPaddingBottom: {
        default: 30
      },
    },
    data: function() {
      return {
        styleNew: {},
        style: {
          'background-color': '#ffffff'
        }
      }
    },
    components: {
      'i-icon': require('./i-icon.vue')
    },
    methods: {
      _onClick: function($event) {
        this.$emit('onClick', $event)
      },
      rightClick($event) {
        this.$emit('rightClick', $event)
      },
      leftClick($event) {
        this.$emit('leftClick', $event)
      }
    },
    created: function() {
      this.styleNew = Object.assign({}, { paddingTop: this.listPaddingTop + 'px', paddingBottom: this.listPaddingBottom + 'px' }, this.style, this.styleEx)
    }
  }
</script>

<style scoped>
  .i-list {
    flex-direction: row;
    /* padding-top: 30px;
    padding-bottom: 30px; */
    border-bottom-color: #D3D2D2;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    align-items: center;
    margin-bottom: 1px;
  }


  .i-list-text {
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #323232;
    line-height: 34px;
    lines: 1;
  }

  .txt-all{
    text-align: left;
  }

  .txt-alr{
    color: #9B9B9B;
    text-align: right;
  }
  .i-list-left {
    min-height: 70px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .i-list-main {
    overflow: hidden;
    justify-content: flex-start;
    flex: 1;
    padding-left: 20px;
    padding-right: 10px;
    flex-direction: row;
  }

  .i-list-right {
    width: 100px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .pdl10 {
    padding-left: 10px;
  }

  .pdr10 {
    padding-right: 10px;
  }
</style>

