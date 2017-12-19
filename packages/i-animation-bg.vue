<template>
   <div>
     <bgAnimation class="bg-primary" :style="{width: '750px', height: height+'px'}" v-if="platform === 'ios' ">
       <slot></slot>
     </bgAnimation>
     <div v-if="platform === 'android' ">
       <bgAnimation class="bg-primary" :style="{width: '750px', height: height+'px'}" ></bgAnimation>
       <slot></slot>
     </div>
     <div class="bg-primary" :style="{width: '750px', height: height+'px'}" v-if="platform === 'web'">
       <slot></slot>
     </div>
   </div>
</template>
<style scoped>
.bg-primary {
  background-image: linear-gradient(to bottom right, rgba(36, 198, 220, 1), rgba(81, 74, 157, 1));
}
</style>
<script>
    export default{
      computed: {
        height() {
          return 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight
        }
      }
    }
</script>
