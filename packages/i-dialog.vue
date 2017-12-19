<template>
  <div class="i-dialog-layout">
    <i-mask v-if="show" @onclick="_maskClick" :opacity="opacity"></i-mask>
    <div class="i-dialog" v-if="show" :style="{'height': height, 'top': top,'left': left,'right': right, 'border-radius':radius}">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .i-dialog-layout {
  }

  .i-dialog {
    position: fixed;
    background-color: white;
    flex: 1;
    z-index: 99;
  }
</style>

<script>
  module.exports = {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      opacity: {
        default: '0.8'
      },
      height: {
        default: '790px'
      },
      top: {
        default: '270px'
      },
      left: {
        default: '75px'
      },
      right: {
        default: '75px'
      },
      radius: {
        default: '10px'
      }
    },
    components: {
      'i-mask': require('./i-mask.vue')
    },
    methods: {
      '_maskClick': function () {
        this.$emit('close')
      }
    }
  }
</script>
