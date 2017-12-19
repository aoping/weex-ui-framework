<template>
  <text :class="['btn', 'btn-' + (disabled?'disabled':type), shadow ? 'shadow-' + type : '']"
        :style="{'border-radius':radius, 'font-size': size, 'height': height, 'line-height': height, 'font-weight': weight}"
        @longpress="_longpress($event)"
        @click="_click($event)">{{value}}
  </text>
</template>

<style lang="sass">
@import "./src/assets/styles/common";

.btn {
  text-align: center;
  padding-left: $nb20;
  padding-right: $nb20;
}

//type
.btn-primary {
  opacity: 1;
  background-color: #00BEDC;
  background-image: linear-gradient(to right, rgba(40, 200, 220, 1), rgba(50, 150, 210, 1));
  color: $color_white;
}

.btn-primary:active {
  color: rgba(255, 255, 255, 0.5);
}

.btn-orange {
  opacity: 1;
  background-color: rgba(255, 133, 50, 1);
  background-image: linear-gradient(to right, rgba(255, 133, 50, 1), rgba(255, 82, 0, 1));
  color: $color_white;
}

.btn-orange:active {
  color: rgba(255, 255, 255, 0.5);
}

.btn-outline {
  color: #646464;
  border-style: solid;
  border-width: 1px;
  border-color: #9B9B9B;
}

.btn-outline:active {
  color: $color_white;
  background-color: #D2D2D2;
  border-style: none;
  border-width: 0px;
  border-color: transparent;
}

.btn-grey {
  opacity: 1;
  background-color: #F0F0F0;
  color: #464646;
}

.btn-grey:active {
  color: rgba(70, 70, 70, 0.5);
}

.btn-glass {
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: $color_white;
  color: $color_white;
}

.btn-glass:active {
  background-color: rgba(255, 255, 255, 0.20);
}

.btn-glass-disabled {
  opacity: 0.5;
  background-color: rgba(255, 255, 255, 0.20);
  border-width: 0px;
  border-style: none;
  border-color: transparent;
  color: rgba(255, 255, 255, 0.5);
}

.btn-success {
  opacity: 1;
  background-color: $color_success;
  color: $color_white;
}

.btn-success:active {
  background-color: $color_success_active;
}

.btn-info {
  background-color: $color_light_primary;
}

.btn-info:active {
  background-color: $color_primary;
}

.btn-warning {
  background-color: $color_warning;
  color: $color_white;
}

.btn-warning:active {
  background-color: $color_warning_active;
}

.btn-danger {
  background-color: $color_danger;
  color: $color_white;
}

.btn-danger:active {
  background-color: $color_danger_active;
}

.btn-disabled {
  opacity: 0.5;
  background-color: #00BEDC;
  background-image: linear-gradient(to right, rgba(40, 200, 220, 1), rgba(50, 150, 210, 1));
  color: rgba(255, 255, 255, 0.5);
}

.btn-default {
  background-color: $color_default;
  border-width: 1px;
  border-style: solid;
  border-color: $color_default_active;
}

.btn-default:active {
  background-color: $color_default_active;
}

// shadow type
.shadow-primary {
  box-shadow: 0px 8px 15px rgba(20, 130, 220, 0.3);
}

.shadow-default {
  box-shadow: 0px 8px 15px rgba(20, 130, 220, 0.3);
}

</style>

<script>
  module.exports = {
    props: {
      'type': { default: 'default' },
      'value': { default: 'Button' },
      'disabled': { default: false },
      'radius': { default: '0px' },
      'shadow': { default: false },
      'size': { default: '34px' },
      'height': { default: '100px' },
      'weight': { default: 'normal' }
    },
    methods: {
      '_click': function (e) {
        if (!this.disabled) {
          this.$emit('onclick', e)
        }
      },
      '_longpress': function (e) {
        if (!this.disabled) {
          this.$emit('onlongpress', e)
        }
      }
    }
  }
</script>
