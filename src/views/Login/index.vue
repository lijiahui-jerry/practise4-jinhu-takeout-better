<template>
  <!-- 登录页面 -->
  <div class="login-main">
    <!-- 表单验证提示 -->
    <Tip :tips="tips" v-if="showTips" @closeTip="closeTip"></Tip>
    <!-- 左上角路由回退按钮 -->
    <div class="login-back-container" @click="$router.back()">
      <i class="iconfont icon-fanhui login-back-btn"></i>
    </div>
    <!-- 页面顶部标题 -->
    <div class="login-title">金狐外卖</div>
    <div class="row login-type">
      <div class="col-xs-2"></div>
      <div class="col-xs-4 login-with-msg" :class="phoneLogin?'on':''" @click="toggleLoginType(true)">短信登录</div>
      <div class="col-xs-4 login-with-pwd" :class="!phoneLogin?'on':''" @click="toggleLoginType(false)">密码登录</div>
      <div class="col-xs-2"></div>
    </div>
    <div class="login-form" v-if="phoneLogin" :class="!firstFlag?'out':''">
      <Message ref="childMessage"></Message>
    </div>
    <div class="login-form" v-else :class="!firstFlag?'in':''">
      <Account ref="childAccount"></Account>
    </div>
    <div class="login-footer">
      <div class="login-footer-submit" @click="submitLoginInformation()">登录</div>
      <div class="login-footer-about-us">关于我们</div>
    </div>
  </div>
</template>

<script>
/*
* 调试日记  2022年3月19日
* 1. 如果css在自认为没写错的情况下，多次刷新尝试后还不生效，很有可能是挂错元素了。
*/
import Message from "./Message"
import Account from "./Account"
import Tip from "@/components/Tip"

export default {
  name: "Login",
  components: {Message, Account, Tip},
  data() {
    return {
      phoneLogin: true,
      tips: '',
      showTips: false,
      firstFlag: true
    }
  },
  methods: {
    //切换登录的方式
    toggleLoginType(flag) {
      //这里不能简单地对当前状态取反来实现，因为点击同一个登录方式两次时，简单取反方式会触发切换，但实际上不能让它切换
      //this.phoneLogin=!this.phoneLogin
      this.firstFlag = false

      if (flag != this.phoneLogin) this.phoneLogin = flag
    },
    //提示内容函数
    tipBox(t) {
      this.showTips = true
      this.tips = t
    },
    //提交登录所需的信息
    async submitLoginInformation() {
      let phone = this.$refs.childMessage.phoneNumber
      let code = this.$refs.childMessage.captcha
      let ifReadArgument = this.$refs.childMessage.ifReadArgument
      //表单合法性验证
      if (this.phoneLogin) {
        //短信验证码登录
        if (phone.length < 11) {
          this.tipBox('请正确输入手机号')
        } else if (0 == code.length) {
          this.tipBox('请输入验证码')
        } else if (6 != code.length) {
          this.tipBox('请正确输入6位验证码')
        } else if (!ifReadArgument) {
          this.tipBox('请勾选同意协议')
        } else {
          //异步登录：等待dispatch返回的promise，根据promise进行相应操作。
          try {
            await this.$store.dispatch('getLogin', {phone, code})
            this.$router.push('/me')
          } catch (e) {
            this.tipBox(e.message)
          }
        }
      } else {
        //密码登录
        const {account, password, captcha} = this.$refs.childAccount
        if (password.length < 8) {
          this.tipBox('密码至少为8位')
        } else if (0 == captcha.length) {
          this.tipBox('请输入验证码')
        } else if (4 != captcha.length) {
          this.tipBox('请正确输入4位验证码')
        } else {
          if (200 == this.$refs.childAccount.accountLogin(account, password, captcha).code) this.$router.push('/me')
        }
      }
    },
    closeTip() {
      this.showTips = false
      this.tips = ''
    },
  },
}
</script>

<style scoped lang="less">
@keyframes my-flip-out {
  0% {
    transform: rotateY(-90deg);
  }
  100% {
    transform: rotateY(0);
  }
}

@keyframes my-flip-in {
  0% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0);
  }
}

.login-main {
  margin: 0 auto;

  .login-back-container {
    padding: 10px;

    .login-back-btn {
      font-size: 40px;
      color: #999999;
    }
  }

  //金狐外卖标题
  .login-title {
    font-size: 40px;
    line-height: 1em;
    font-weight: 800;
    color: #684E94;
    text-align: center;
  }

  .login-type {
    text-align: center;
    margin: 10px 0;

    .login-with-msg, .login-with-pwd {
      padding-top: 10px;
      padding-bottom: 5px;

      &.on {
        border-bottom: 2px solid #684E94;
      }
    }
  }

  .login-form {
    width: 80%;
    margin: 0 auto;

    &.out {
      animation: my-flip-out .3s;
    }

    &.in {
      animation: my-flip-in .3s;
    }
  }

  .login-footer {
    width: 100%;
    margin-top: 15px;
    font-size: 14px;
    color: #999999;

    .login-footer-submit {
      width: 50%;
      height: 42px;
      line-height: 42px;
      margin: 8px auto;
      border-radius: 5px;
      background: #684E94;
      color: #FFFFFF;
      text-align: center;
      font-size: 18px;
      border: none;
    }

    .login-footer-about-us {
      width: 100%;
      font-size: 12px;
      text-align: center;
      color: #D5C0CF;
    }
  }
}
</style>
