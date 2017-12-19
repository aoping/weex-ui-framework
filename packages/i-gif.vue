<template>
  <gifView v-if="platform === 'android'" :src="'dist/weex'+src" :style="{'width': width, 'height': height}"></gifView>
  <image v-else :src="gifPath" :style="{'width': width, 'height': height}"></image>
</template>

<script>
  module.exports = {
    data() {
      return {}
    },
    props: {
      width: { default: '30px' },
      height: { default: '30px' },
      src: {
        type: String
      }
    },
    computed: {
      gifPath() {
        var bundleUrl = weex.config.bundleUrl
        var url = bundleUrl.split('/').slice(0, -2).join('/')
        if (this.src.indexOf('http') >= 0) {
          return this.src
        }
        if (weex.config.env.platform === 'Web') {
          url = '../dist/web'
        } else if (weex.config.env.platform === 'android') {
          url = 'file:///android_asset/dist/weex'
        } else if (weex.config.env.platform === 'iOS') {
          // url = bundleUrl.substring(0, bundleUrl.lastIndexOf('bundlejs/') + 9) + 'weex'
          url = bundleUrl.substring(0, bundleUrl.lastIndexOf('weex/') + 5)
        }
        return url + this.src
      }
    }
  }
</script>
