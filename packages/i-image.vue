<template>
  <image v-bind:src="imagePath" v-bind:placeholder="placeholderPath" v-bind:style="{'border-radius':radius, 'width': width, 'height': height}" v-bind:resize="resize" @click="_click($event)" @load="_load()">
  </image>
</template>

<script>
module.exports = {
  computed: {
    imagePath() {
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
    },
    placeholderPath() {
      var bundleUrl = weex.config.bundleUrl
      var url = bundleUrl.split('/').slice(0, -2).join('/')
      if (this.placeholder !== '') {
        if (this.placeholder.indexOf('http') >= 0) {
          return this.placeholder
        }
        if (weex.config.env.platform === 'Web') {
          url = '../dist/web'
        } else if (weex.config.env.platform === 'android') {
          url = 'file:///android_asset/dist/weex'
        } else if (weex.config.env.platform === 'iOS') {
          // url = bundleUrl.substring(0, bundleUrl.lastIndexOf('bundlejs/') + 9) + 'weex'
          url = bundleUrl.substring(0, bundleUrl.lastIndexOf('weex/') + 5)
        }
        return url + this.placeholder
      }
      return ''
    }
  },
  props: {
    width: { default: '0px' },
    height: { default: '0px' },
    src: {
      type: String
    },
    resize: {
      type: String,
      default: 'stretch'
    },
    placeholder: {
      type: String,
      default: ''
    },
    radius: {
      default: '0px'
    }
  },
  data() {
    return {}
  },
  methods: {
    _click(event) {
      this.$emit('onclick', event)
    },
    _load() {
      this.$emit('load')
    }
  }
}
</script>
