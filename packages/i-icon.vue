<template>
  <text @click="_click($event)" class="iconfont"
        :style="{
          'color': color,
          'fontSize': size,
          'font-family': 'iconfont',
          'margin-left': left||margin,
          'margin-right': right||margin,
          'margin-top': top||margin,
          'margin-bottom': bottom||margin,
          'padding-top': pt||padding,
          'padding-bottom': pb||padding,
          'padding-left': pl||padding,
          'padding-right': pr||padding
        }">{{getFontName}}</text>
</template>

<script>
  // 引入he模块，使用它解决weex-template-compiler在编译阶段进行decode
  var he = require('he')

  module.exports = {
    created: function () {
      // 此url可以是指向本地字体图标文件路径 也可以直接用阿里巴巴字体图标库的的字体图标地址 ,比如'https://at.alicdn.com/t/font_3ppcziztn5wpcik9.ttf'
      var bundleUrl = weex.config.bundleUrl
      var url = bundleUrl.split('/').slice(0, -2).join('/')
      url += '/font/iconfont.ttf'
      // web指向路径为/dist/web/font
      if (weex.config.env.platform === 'Web') {
        url = '../dist/web/font/iconfont.ttf'
      } else if (weex.config.env.platform === 'android') {
        url = 'local:///dist/weex/font/iconfont.ttf'
      } else if (weex.config.env.platform === 'iOS') {
        // url = bundleUrl.substring(0, bundleUrl.lastIndexOf('bundlejs/') + 9) + 'weex/font/iconfont.ttf'
        url = bundleUrl.substring(0, bundleUrl.lastIndexOf('weex/') + 5) + 'font/iconfont.ttf'
      }
      // url = '//at.alicdn.com/t/font_tkl25trqizkqehfr.ttf'
      var domModule = weex.requireModule('dom')
      domModule.addRule('fontFace', {
        'fontFamily': 'iconfont',
        'src': 'url(\'' + url + '\')'
      })
    },
    data: function () {
      return {
        iconItems: {
          'icon-passenger': '&#xe642;',
          'icon-term-select': '&#xe640;',
          'icon-term-no-select': '&#xe63f;',
          'icon-passenger-select': '&#xe63e;',
          'icon-passenger-no-select': '&#xe63d;',
          'icon-zh-en-btn': '&#xe63c;',
          'icon-en-zh-btn': '&#xe63b;',
          'icon-phone-service-circle': '&#xe63a;',
          'icon-online-service-circle': '&#xe639;',
          'icon-cancel-circle': '&#xe638;',
          'icon-check-circle': '&#xe637;',
          'icon-success-circle': '&#xe636;',
          'icon-search-note': '&#xe635;',
          'icon-trash-o': '&#xea3e;',
          'icon-plus-circle-o': '&#xe634;',
          'icon-minus-circle-o': '&#xe633;',
          'icon-exclamation-circle': '&#xe632;',
          'icon-question-circle': '&#xe631;',
          'icon-circle-o': '&#xe630;',
          'icon-single-transform': '&#xe62f;',
          'icon-caret-down': '&#xe62e;',
          'icon-caret-up': '&#xe62c;',
          'icon-edit': '&#xe685;',
          'icon-plus': '&#xe62b;',
          'icon-credit-card-alt': '&#xe641;',
          'icon-apple': '&#xe62a;',
          'icon-exclamation-triangle': '&#xe602;',
          'icon-minus': '&#xe629;',
          'icon-user-circle-o': '&#xe62d;',
          'icon-qq': '&#xe627;',
          'icon-arrow-left': '&#xe626;',
          'icon-angle-left': '&#xe625;',
          'icon-transform': '&#xe624;',
          'icon-arrow-right': '&#xe623;',
          'icon-angle-right': '&#xe622;',
          'icon-eye': '&#xe621;',
          'icon-eye-close': '&#xe620;',
          'icon-check-circle-o': '&#xe61f;',
          'icon-wechat': '&#xe61e;',
          'icon-angle-down': '&#xe61d;',
          'icon-search': '&#xe61c;',
          'icon-angle-up': '&#xe61b;',
          'icon-indent': '&#xe61a;',
          'icon-skip': '&#xe619;',
          'icon-close': '&#xe618;',
          'icon-CNY': '&#xe617;',
          'icon-list': '&#xe616;',
          'icon-service': '&#xe615;',
          'icon-user': '&#xe614;',
          'icon-angle-circle-left': '&#xe613;',
          'icon-receipt': '&#xe612;',
          'icon-airplane': '&#xe611;',
          'icon-share': '&#xe610;',
          'icon-exclamation': '&#xe60f;',
          'icon-map-marker': '&#xe60e;',
          'icon-check': '&#xe60d;',
          'icon-arrow-left-grey': '&#xe60c;',
          'icon-arrow-right-grey': '&#xe60b;',
          'icon-angle-down-grey': '&#xe60a;',
          'icon-angle-right-grey': '&#xe609;',
          'icon-angle-up-grey': '&#xe608;',
          'icon-angle-left-grey': '&#xe607;',
          'icon-member': '&#xe605;',
          'icon-filter': '&#xe600;',
          'icon-sort-desc': '&#xe684;',
          'icon-toggle-on': '&#xe74d;',
          'icon-toggle-off': '&#xe74c;',
        }
      }
    },
    props: {
      name: {
        type: String
      },
      color: {
        type: String,
        default: '#323232'
      },
      size: {
        type: String,
        default: '40px'
      },
      padding: {
        default: '10px'
      },
      margin: {
        default: '-10px'
      },
      top: {},
      bottom: {},
      left: {},
      right: {},
      pt: {},
      pb: {},
      pl: {},
      pr: {}
    },
    computed: {
      // 匹配对应的字体图标的unicode
      getFontName: function () {
        if (this.name) {
          return he.decode(this.iconItems[this.name])
        } else {
          return ''
        }
      }
    },
    methods: {
      '_click': function ($event) {
        this.$emit('onclick', $event)
      }
    }
  }
</script>
