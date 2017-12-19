<template>
  <div class="i-list" :style="styleNew" @click="_textClick">
    <div class="i-list-left" v-if="leftIcon ||leftText" :style="{width: leftWidth+'px'}">
      <i-icon v-if="leftIcon" :name="leftIcon" :size="leftIconSize" :color="leftIconColor" class="pdr10"></i-icon>
      <text v-if="leftText" class="i-list-text txt-all">{{leftText}}</text>
    </div>
    <div class="i-list-main" :style="{height: height+'px'}">
      <input ref="input" class="item-input" :style="{color: color}" v-if="typeNew==='input'&&inputType==='tel'" :placeholder="placeholder" v-model.trim="valueNew" @focus="onfocus($event)" @blur="onblur($event)" @input="oninput($event)" :autofocus="autofocusNew" type="tel" maxlength ="11"/>
      <input ref="input" class="item-input" :style="{color: color}" v-if="typeNew==='input'&&inputType==='email'" :placeholder="placeholder" v-model.trim="valueNew" @focus="onfocus($event)" @blur="onblur($event)" @input="oninput($event)" :autofocus="autofocusNew" type="email" :maxlength ="maxLength"/>
      <input ref="input" class="item-input" :style="{color: color}" v-if="typeNew==='input'&&inputType==='text'" :placeholder="placeholder" v-model.trim="valueNew" @focus="onfocus($event)" @blur="onblur($event)" @input="oninput($event)" :autofocus="autofocusNew" type="text" :maxlength ="maxLength"/>
      <text class="item-input" :style="{color: '#464646'}" v-if="typeNew==='text'">{{valueNew}}</text>
    </div>
    <div class="i-list-right" v-if="(alwaysShow||valueNew!=='')&&(rightIcon ||rightText)" @click="_rightClick">
      <i-icon v-if="rightIcon" :name="rightIcon" :size="rightIconSize" :color="rightIconColor" @onclick="_rightClick" padding="20px" margin="-20px"></i-icon>
      <text v-if="rightText" class="i-list-text txt-alr" @click="_rightClick">{{rightText}}</text>
    </div>
  </div>
</template>


<script>
const modal = weex.requireModule('modal')

module.exports = {
  props: {
    typeNew: {
      default: 'input'
    },
    inputType: {
      default: 'text'
    },
    styleEx: {},
    leftIcon: {
      default: ''
    },
    leftWidth: {
      default: 100
    },
    leftText: {
      default: ''
    },
    leftIconSize: {
      default: ''
    },
    leftIconColor: {
      default: ''
    },
    rightIcon: {
      default: '' // icon-toggle-minus
    },
    rightText: '',
    rightIconSize: {
      default: '35px'
    },
    rightIconColor: {
      default: '#FF7846'
    },
    height: {
      default: 40
    },
    placeholder: {
      default: ''
    },
    value: {
      default: ''
    },
    alwaysShow: {
      default: false
    },
    maxLength: {
      default: 200 // 默认最多200字节
    }
  },
  data: function() {
    return {
      isErr: false,
      styleNew: {},
      valueNew: '',
      style: {
        'background-color': '#ffffff'
      },
      color: '#464646'
    }
  },
  created() {
    this.styleNew = Object.assign({}, this.style, this.styleEx)
    this.valueNew = this.value
  },
  components: {
    'i-icon': require('./i-icon.vue')
  },
  methods: {
    // 获得输入焦点
    'onfocus': function(event) {
      // this.isErr = false
      this.$emit('focus', event, this.leftText)
    },
    // 失去输入焦点
    'onblur': function(event) {
      this.$emit('blur', event.value, this.leftText)
    },
    // 输入值更改
    'oninput': function(event) {
      if (this.platform === 'android') {
        setTimeout(() => {
          this.isErr = false
        }, 1000)
      } else {
        this.isErr = false
      }
      this.valueNew = event.value
      this.$emit('input', event.value, this.leftText)
    },
    // 清除输入值/其他操作
    '_rightClick': function(event) {
      if (this.typeNew === 'input') {
        this.valueNew = ''
      }
      this.$emit('rightClick', this.leftText)
    },
    '_textClick': function(event) {
      this.$emit('textClick')
    },
    setErr() {
      this.isErr = true
      this.$refs.input.focus()
      // setTimeout(() => {
      //   this.isErr = false
      // }, 3000)
    },
    delErr() {
      this.isErr = false
    },
    blur() {
      this.$refs.input.blur()
    }
  },
  watch: {
    'value': function(newVal) {
      this.valueNew = newVal
    },
    'isErr': function(newVal) {
      if (newVal) {
        this.color = '#FF8C00'
      } else {
        this.color = '#464646'
      }
    }
  }
}
</script>

<style scoped>
.i-list {
  flex-direction: row;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom-color: #D3D2D2;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  align-items: center;
}

.i-list-text {
  font-family: PingFangSC-Regular;
  font-size: 30px;
  color: #323232;
  line-height: 34px;
  lines: 1;
}

.txt-all {
  text-align: left;
}

.txt-alr {
  color: #9B9B9B;
  text-align: right;
}

.i-list-left {
  width: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.i-list-main {
  justify-content: flex-start;
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
}

.i-list-right {
  width: 100px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.pdl10 {
  padding-left: 10px;
}

.pdr10 {
  padding-right: 10px;
}

.item-input {
  flex: 1;
  height: 42px;
  placeholder-color: #999999;
  font-family: PingFangSC-Light;
  font-size: 30px;
  /* color: #464646; */
  line-height: 34px;
  lines: 1;
  text-overflow: ellipsis;
}

</style>

