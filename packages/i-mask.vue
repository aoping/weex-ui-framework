<template>
  <div class="i-mask" :style="{'opacity': opacity}" @click="_click">
    <blurView class="mask"></blurView>
  </div>
</template>

<style scoped>
  .mask{
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
  }
  .i-mask {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: #000000;
    opacity: 0.3;
  }
</style>

<script>
module.exports = {
  props: {
    'opacity': { default: '0.2' }
  },
  methods: {
    '_click': function() {
      this.$emit('onclick')
    }
  }
}
</script>
