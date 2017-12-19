<template>
  <div class="root" :class="['bg-'+ type]"  @viewappear="viewappear">
    <div v-if="ios" :style="{width: '750px', height: '40px'}"></div>
    <div class="wrapper" :style="{width: '750px', height: ios ? '1294px' : height+'px'}">
      <slot></slot>
    </div>
    <!--兼容iPhoneX-->
    <div class="iphonex-bottom-fixed" v-if="isIphoneX"></div>
    <div class="iphonex-bottom-padding" v-if="isIphoneX"></div>
  </div>
</template>

<style scoped>
  .root {
    width: 750px;
    /* height: 1334px; */
    display: flex;
    flex-direction: column;
  }

  .wrapper {
    width: 750px;
  }

  .bg-default {
    background-color: #ffffff;
  }

  .bg-gray {
    background-color: rgba(240,240,240,1);
  }

  .bg-primary {
    background-image: linear-gradient(to bottom right, rgba(36, 198, 220, 1), rgba(81, 74, 157, 1));
  }
  /*iphonex适配*/
  .iphonex-bottom-fixed{
    height: 66px;
    width: 750px;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: rgba(220,220,220,1);
  }
  .iphonex-bottom-padding{
    height: 66px;
    width: 750px;
  }
</style>

<script>
  export default {
    data() {
      return {
        ios: weex.config.env.platform === 'iOS'
      }
    },
    props: {
      'type': { default: 'default' }
    },
    computed: {
      height() {
        return 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight
      }
    },
    methods: {
      viewappear() {
        this.$emit('viewappear')
      }
    }
  }
</script>
