<template>
  <div class="i-toast-layout" v-if="show">
    <div class="i-toast" ref="root" :style="{'top': top+'px'}">
      <div class="i-toast-content">
        <text class="toast-content-text" :style="{'justify-content':justifyContent}">{{content}}</text>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .i-toast-layout {
  }

  .i-toast {
    position: fixed;
    background-color: rgba(70,70,70,0.80);
    border-radius: 8px;
    border-radius: 10px;
    top: 617px;
    left: 75px;
    right: 75px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .i-toast-content{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .toast-content-text{
    flex: 1;
    text-align: center;
    font-family: PingFangSC-Light;
    font-size: 30px;
    color: #ffffff;
  }
</style>

<script>
  const dom = weex.requireModule('dom')
  module.exports = {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      opacity: {
        default: '0.8'
      },
      content: {
        default: ''
      },
      justifyContent: {
        default: 'center'
      }
    },
    data() {
      return {
        top: 617
      }
    },
    computed: {
    },
    components: {
    },
    methods: {
    },
    watch: {
      // 'show': function(newVal) {
      //   if (newVal) {
      //     this.$nextTick(e => {
      //       const result = dom.getComponentRect(this.$refs.root, option => {
      //         this.top = (750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - option.size.height) / 2
      //       })
      //     })
      //   }
      // }
    }
  }
</script>
