<template>
  <i-root>
    <i-image width="260px" height="260px" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg" ref="testEl"></i-image>
    <div class="flex-row" style="flex-direction: row">
      <i-image src="/images/minus-green-44.png" width="44px" height="44px"></i-image>
      <i-image src="/images/plus-gray-44.png" width="44px" height="44px"></i-image>
    </div>
    <i-button radius="10px" type="outline" value="图片翻转" shadow="true" style="margin-top: 20px" @onclick="rotate"></i-button>
    <i-button radius="10px" value="弹出对话框" shadow="true" style="margin-top: 20px" @onclick="open"></i-button>
    <i-button radius="10px" type="primary" value="Go!" shadow="true" @onclick="jump" style="margin-top: 20px"></i-button>
    <text>{{'2017-09-27' | dateToWeek(lang)}}</text>
    <text>{{platform}}</text>

    <i-dialog  @close="maskClick" :show="showDialog">
      <div class="dialog-content">
        <i-icon name="icon-close" @onclick="maskClick" size="34px"></i-icon>
        <scroller style="height: 690px">
          <i-button radius="10px" type="primary" value="用户中心" shadow="true" @onclick="toMemberHome" style="margin-top: 20px"></i-button>
          <i-button radius="10px" type="primary" value="用户中心-未登录" shadow="true" @onclick="toMemberHomeNoLogin" style="margin-top: 20px"></i-button>
          <i-button radius="10px" type="primary" value="用户登录" shadow="true" @onclick="toMemberLogin" style="margin-top: 20px"></i-button>
          <i-button radius="10px" type="primary" value="用户注册" shadow="true" @onclick="toMemberRegister" style="margin-top: 20px"></i-button>
          <i-button radius="10px" type="primary" value="设置密码" shadow="true" @onclick="toMemberSetPwd" style="margin-top: 20px"></i-button>
          <i-button radius="10px" type="primary" value="忘记密码" shadow="true" @onclick="toMemberResetPwd" style="margin-top: 20px"></i-button>
          <i-button radius="10px" type="primary" value="订单详情" shadow="true" @onclick="toOrderDetail" style="margin-top: 20px"></i-button>
          <i-button radius="10px" type="primary" value="绑定手机" shadow="true" @onclick="toChangePhone" style="margin-top: 20px"></i-button>
          <i-button radius="10px" type="primary" value="个人中心" shadow="true" @onclick="toProfile" style="margin-top: 20px"></i-button>
          <i-button radius="10px" type="primary" value="测试页面" shadow="true" @onclick="toTest" style="margin-top: 20px"></i-button>
        </scroller>
      </div>
    </i-dialog>
  </i-root>
</template>

<style lang="sass" src="../assets/styles/main.scss"></style>
<style scoped>
  .dialog-content {
    padding: 30px;
  }
</style>

<script>
  const animation = weex.requireModule('animation')
  var frontFlag = true

  export default {
    data() {
      return {
        showDialog: false,
      }
    },
    components: {
      'i-root': require('packages/i-root.vue'),
      'i-icon': require('packages/i-icon.vue'),
      'i-image': require('packages/i-image.vue'),
      'i-dialog': require('packages/i-dialog.vue'),
      'i-button': require('packages/i-button.vue')
    },
    methods: {
      jump() {
        this.router.push({
          page: this.routerPage.flights
        })
      },
      open() {
        this.showDialog = true
      },
      maskClick() {
        this.showDialog = false
      },
      toMemberHome() {
        this.router.push({
          page: this.routerPage.member
        })
      },
      toMemberHomeNoLogin() {
        this.router.push({
          page: this.routerPage.memberHomeNoLogin
        })
      },
      toMemberLogin() {
        this.router.push({
          page: this.routerPage.memberLogin
        })
      },
      toMemberRegister() {
        this.router.push({
          page: this.routerPage.memberRegister
        })
      },
      toMemberSetPwd() {
        this.router.push({
          page: this.routerPage.memberSetPwd
        })
      },
      toMemberResetPwd() {
        this.router.push({
          page: this.routerPage.memberResetPwd
        })
      },
      toOrderDetail() {
        this.router.push({
          page: this.routerPage.orderDetails
        })
      },
      toChangePhone() {
        this.router.push({
          page: this.routerPage.memberChangePhone
        })
      },
      toProfile() {
        this.router.push({
          page: this.routerPage.memberProfile
        })
      },
      toTest() {
        this.router.push({
          page: this.routerPage.nativeAPITest
        })
      },
      rotate() {
        if (frontFlag) {
          this.animateRotateY('testEl', 180)
        } else {
          this.animateRotateY('testEl', 0)
        }
        frontFlag = !frontFlag
      },
      animateRotateY(el, rotateY, time) {
        var ref = this.$refs[el]
        animation.transition(ref, {
          duration: time || 800,
          timingFunction: 'ease-in-out',
          styles: {
            transform: `rotateY(${rotateY}deg)`,
          }
        })
      }
    },
    created() {
      console.log(this.$lodash.isEmpty() ? 'Lodash everywhere!' : 'Uh oh..')
      this.addPopBackListener()
    }
  }
</script>
