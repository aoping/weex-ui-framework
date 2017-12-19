<template>
  <div class="loading">
    <i-image class="img" width="100px" height="100px" src="/images/listLoading.gif"></i-image>
  </div>
</template>
<script>
  export default {
    components: {
      'i-image': require('components/common/i-image.vue')
    }
  }
</script>
<style scoped>
  .loading {
    position: fixed;
    width: 750px;
    height: 1334px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    text-align: center;
  }
  .img{
    position: absolute;
    left: 375px;
    top: 467px;
    margin-left: -50px;
    margin-top: -50px;
  }
</style>
