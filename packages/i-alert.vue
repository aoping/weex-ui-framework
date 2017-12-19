<template>
  <div class="i-dialog-layout" v-if="show">
    <i-mask v-if="show" @onclick="_maskClick" :opacity="opacity"></i-mask>
    <div class="i-dialog" ref="root" :style="styleNew" >
      <div class="i-dialog-title" v-if="title!==''">
          <text class="dialog-title-text">{{title}}</text>
      </div>
      <slot name="header"></slot>
      <scroller v-if="content" class="i-dialog-content":style="{height: scrollerHeight+'px'}">
        <div class="i-dialog-content":style="{minHeight: scrollerHeight+'px'}">
          <text class="dialog-content-text" v-if="content" :style="contentStyle">{{content}}</text>
        </div>
      </scroller>
      <slot></slot>
      <div class="i-dialog-footer" v-if="buttons.length>0">
        <text class="btn" :class="['btn-'+btn.type]" :style="{'margin-left':index!==0?'20px':'0'}" v-for="(btn, index) in buttons" @click="_click(btn.text)" :key="index" >{{btn.text}}</text>
      </div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
  .i-dialog-layout {
  }

  .i-dialog {
    position: fixed;
    background-color: #ffffff;
    border-radius: 10px;
    top: 300px;
    left: 50px;
    right: 50px;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 20px;
    padding-bottom: 50px;
  }

  .i-dialog-title {
    justify-content: flex-start;
    height: 80px;
    margin-bottom: 30px;
  }

  .dialog-title-text {
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #FF7846;
    line-height: 80px;
  }

  .i-dialog-content{
    width: 570px;
    min-height: 220px;
    max-height: 900px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: scroll;
  }

  .dialog-content-text{
    flex: 1;
    text-align: center;
    font-family: PingFangSC-Light;
    font-size: 30px;
    color: #464646;
  }

  .i-dialog-footer {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 80px;
    margin-top: 30px;
  }

  .btn{
    flex: 1;
    height: 80px;
    text-align: center;
    font-family: SourceHanSansCN-Bold;
    font-size: 30px;
    line-height: 80px;
    border-radius: 10px;
  }

  .btn-default{
    color: #FFFFFF;
    background-image: linear-gradient(-90deg, #28C8DC, #3296D2);
  }
  .btn-white{
    color: #464646;
    border-width: 2px;
    border-style: solid;
    border-color: #979797;
  }

  .dialog-action-text:active {
    color: #000000;
  }

  .scroller{
    width: 650px;
    min-height: 100px;
    max-height: 900px;
  }
</style>

<script>
  const dom = weex.requireModule('dom')
  module.exports = {
    created() {
      this.styleNew = Object.assign({}, this.styleEx, {
        'top': this.top + 'px'
      })
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      opacity: {
        default: '0.6'
      },
      title: {
        default: ''
      },
      content: {
        default: ''
      },
      buttons: {
        type: Array,
        default: function() {
          return []
        }
      },
      contentStyle: {
        type: Object,
        default: function() {
          return {}
        }
      },
      styleEx: {},
      height: {
        default: 220
      },
      top: {
        default: 300
      }
    },
    data() {
      return {
        styleNew: {}
      }
    },
    computed: {
      scrollerHeight() {
        return this.height > 800 ? 800 : this.height
      }
    },
    components: {
      'i-mask': require('./i-mask.vue')
    },
    methods: {
      _click(text) {
        this.$emit('btnClick', text)
      },
      _maskClick() {
        this.$emit('close')
      },
      footerButtonStyle(index) {
        if (this.getButtons.length === 2 && index === 0) return 'btn-white'
        return 'btn-default'
      }
    },
    watch: {
      // 居中显示
      // 'show': function(newVal) {
      //   if (newVal) {
      //     this.$nextTick(e => {
      //       const result = dom.getComponentRect(this.$refs.root, option => {
      //         if (option.size.height !== 0) {
      //           this.top = (750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - option.size.height) / 2
      //         } else this.top = 300
      //         this.styleNew = Object.assign({}, this.top, this.styleEx, {
      //           'top': this.top + 'px'
      //         })
      //       })
      //     })
      //   }
      // }
    }
  }
</script>
