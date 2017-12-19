<template>
  <div :ref="tabId" :class="[iosfix ? 'tabbar-item-box':'']">
    <slot></slot>
  </div>
</template>

<style>
  .tabbar-item-box {
    flex: 1;
    width: 750px;
  }
</style>

<script>
  module.exports = {
    data: function () {
      return {
        iosfix: false
      }
    },
    watch: {},
    props: {
      tabId: {},
      currentTab: {}
    },
    methods: {},
    created: function () {
      var env = weex.config.env.platform.toLowerCase()
      if (env === 'ios' || env === 'web') {
        this.iosfix = true
      }
    }
  }
</script>
