<template>
  <div>
    <keep-alive>
      <router-view style="flex:1"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import router from './router'

  export default {
    router,
    created: function() {}
  }
</script>

