<template>
  <div :style="getContainerStyle()">
    <div  v-for="(item,index) in tabItems" :style="getItemStyle(item)" @click="itemClick($event,item,index)">
      <i-icon v-if="item.icon" :name="item.icon" :color="(!item.iconColor? normalColor:item.iconColor)" @onclick="itemClick($event,item,index)" :size="(!item.iconSize?iconSize:item.iconSize)"></i-icon>
      <text v-if="item.title" :style="getTitleStyle(item)" @click="itemClick($event,item,index)">{{ $t(item.title) }}</text>
      <div v-if="item.isShowRedPoint" class="red-point"></div>
    </div>
    <div :class="['line', lineType+'-line']" ref="line" :style="{width: lineWidth+'px'}"></div>
  </div>
</template>

<style lang="sass" src="../../assets/styles/line.scss"></style>
<style scoped>
  .line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 8px;
    border-radius: 100px;
  }

  .red-point {
    position: absolute;
    right: 32px;
    top: 10px;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    background-color: #FF4646;
  }
</style>

<script>
const animation = weex.requireModule('animation')
module.exports = {
  props: {
    tabItems: { default: [] },
    currentTab: { default: '' },
    height: { default: '60px' },
    iconSize: { default: '45px' },
    titleSize: { default: '30px' },
    titleWeight: { default: 'normal' },
    background: { default: '#ffffff' },
    selectedBackground: { default: '#ffffff' },
    normalColor: { default: '#464646' },
    selectedColor: { default: '#4ca4fe' },
    selectedFontWeight: { default: 'bold' },
    lineType: { default: 'primary' },
    lineWidthNum: { type: Number, default: 0 },
    containerStyle: { type: Object, default: () => { } },
    itemStyle: { type: Object, default: () => { } },
    showSelectedLine: { default: 'false' }
  },
  data() {
    return {
      lineWidth: 0,
      activeIndex: 0
    }
  },
  watch: {
    currentTab() {
      for (var i = 0; i < this.tabItems.length; i++) {
        var item = this.tabItems[i]
        if (item.tabId === this.currentTab) {
          this.$set(this.tabItems[i], 'titleColor', this.selectedColor)
          this.$set(this.tabItems[i], 'iconColor', this.selectedColor)
          this.$set(this.tabItems[i], 'background', this.selectedBackground)
          this.$set(this.tabItems[i], 'titleWeight', this.selectedFontWeight)
        } else {
          this.$set(this.tabItems[i], 'titleColor', this.normalColor)
          this.$set(this.tabItems[i], 'iconColor', this.normalColor)
          this.$set(this.tabItems[i], 'background', this.background)
          this.$set(this.tabItems[i], 'titleWeight', this.titleWeight)
        }
      }
      this.activeIndex = this.tabItems.map(tab => tab.tabId).indexOf(this.currentTab) || 0
      this.animateLine()
    }
  },
  methods: {
    // tabbar扩展样式
    'getContainerStyle': function() {
      // 合并样式
      var style = { 'flex-direction': 'row', 'height': this.height }
      style = Object.assign(style, this.containerStyle)
      return style
    },
    // item扩展样式
    'getItemStyle': function(item) {
      // 底部border
      var borderBottomColor = ''
      // 如果显示底部border
      if (this.showSelectedLine) {
        borderBottomColor = (!item.borderBottomColor ? this.background : item.borderBottomColor)
      } else {
        borderBottomColor = (!item.background ? this.background : item.background)
      }

      // 合并样式
      var style = {
        'flex': 1,
        'align-items': 'center',
        'justify-content': 'center',
        'backgroundColor': (!item.background ? this.background : item.background)
      }
      style = Object.assign(style, this.itemStyle)
      return style
    },
    // 文本样式
    'getTitleStyle': function(item) {
      var style = {
        'color': (!item.titleColor ? this.normalColor : item.titleColor),
        'font-size': (!item.titleSize ? this.titleSize : item.titleSize),
        'font-weight': (!item.titleWeight ? this.titleWeight : item.titleWeight),
      }
      return style
    },
    'itemClick': function(e, item, index) {
      for (var i = 0; i < this.tabItems.length; i++) {
        if (index === i) {
          this.$set(this.tabItems[i], 'titleColor', this.selectedColor)
          this.$set(this.tabItems[i], 'iconColor', this.selectedColor)
          this.$set(this.tabItems[i], 'background', this.selectedBackground)
          this.$set(this.tabItems[i], 'titleWeight', this.selectedFontWeight)
        } else {
          this.$set(this.tabItems[i], 'titleColor', this.normalColor)
          this.$set(this.tabItems[i], 'iconColor', this.normalColor)
          this.$set(this.tabItems[i], 'background', this.background)
          this.$set(this.tabItems[i], 'titleWeight', this.titleWeight)
        }
      }
      this.$emit('itemClick', e, item.tabId, index)
    },
    animateLine() {
      var translateX = 0
      if (this.lineWidthNum <= 0) {
        translateX = this.activeIndex * this.lineWidth
      } else {
        translateX = (0.5 + this.activeIndex) * (750 / this.tabItems.length) - 0.5 * this.lineWidth
      }
      animation.transition(this.$refs.line, {
        duration: 200,
        timingFunction: 'ease-in-out',
        styles: {
          transform: `translateX(${translateX}px)`
        }
      })
    }
  },
  mounted() {
    if (this.lineWidthNum <= 0) {
      this.lineWidth = 750 / this.tabItems.length
    } else {
      this.lineWidth = this.lineWidthNum
    }
    this.animateLine()
  },
  created() {
    var index = 0
    // 指定默认加载第一个tab内容
    if (!this.currentTab) {
      this.currentTab = this.tabItems[0].tabId
      this.$set(this.tabItems[0], 'titleColor', this.selectedColor)
      this.$set(this.tabItems[0], 'iconColor', this.selectedColor)
      this.$set(this.tabItems[0], 'background', this.selectedBackground)
      this.$set(this.tabItems[0], 'titleWeight', this.selectedFontWeight)
    } else {
      // 指定激活哪个tab内容
      for (var i = 0; i < this.tabItems.length; i++) {
        var item = this.tabItems[i]
        if (item.tabId === this.currentTab) {
          this.$set(this.tabItems[i], 'titleColor', this.selectedColor)
          this.$set(this.tabItems[i], 'iconColor', this.selectedColor)
          this.$set(this.tabItems[i], 'background', this.selectedBackground)
          this.$set(this.tabItems[i], 'titleWeight', this.selectedFontWeight)
          index = i
        }
      }
    }
    this.$emit('load', this.currentTab, index)
  }
}
</script>
