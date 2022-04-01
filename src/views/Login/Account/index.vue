<template>
  <!-- 密码登录 -->
  <div class="account-login-main">
    <!-- 账户名输入框 -->
    <div class="account-input-container">
      <input class="account-input" type="tel" maxlength="11" placeholder="手机/金狐ID" v-model="account">
    </div>
    <!-- 密码输入框 -->
    <div class="password-input-container">
      <input class="password-input" :type="ifCiphertext?'password':'text'" placeholder="密码" v-model="password">
      <div class="toggle-button-container" :class="ifCiphertext?'off':'on'" @click="toggleCiphertext">
        <div class="inner-circle"></div>
        <span class="inner-text-left">abc&nbsp;</span>
        <span class="inner-text-right">···</span>
      </div>
    </div>
    <!-- 图形验证码输入框 -->
    <div class="captcha-input-container">
      <input class="captcha-input" type="text" maxlength="4" placeholder="验证码" v-model="captcha">
      <img class="captcha-toggle" src="./images/captcha.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      account: '',
      password: '',
      captcha: '',
      ifCiphertext: true,
    }
  },
  methods: {
    //密码的明文或密文切换
    toggleCiphertext() {
      this.ifCiphertext = !this.ifCiphertext
    },
    /*登录时判断（应该由后端人员编写api接口并处理），此时所有表单数据均已符合逻辑，但是否正确填写仍需进一步判断*/
    accountLogin(a, p, c) {
      if ('17601355494' == a && '12345678' == p && 'wk3v' == c) {
        localStorage.setItem("token", "f9f6df26-90a7-11ec-9f87-525400fdffcd")
        return {code: 200}
      } else if ('8888' == a && '12345678' == p && 'wk3v' == c) {
        localStorage.setItem("token", "ea80d399-90a7-11ec-9f87-525400fdffcd")
        return {code: 200}
      } else if ('wk3v' != c) {
        this.$parent.tipBox('验证码输入有误，请核对后重试')
        return {code: 400}
      } else {
        this.$parent.tipBox('账号或密码输入有误，请重试')
        return {code: 400}
      }
    },
  },
}
</script>

<style scoped lang="less">
.account-login-main {
  .account-input-container, .password-input-container, .captcha-input-container {
    background: #FFFFFF;
    height: 48px;
    font-size: 14px;
    margin-bottom: 1em;
  }

  .account-input, .password-input, .captcha-input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    outline: 0;
    font-weight: 400;
    font-size: 14px;

    &:focus {
      border: 1px solid #684E94;
      transform: scale(1.1);
      transition: transform .3s;
    }
  }


  .password-input-container {
    position: relative;

    .toggle-button-container {
      position: absolute;
      right: 10%;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      border: 1px solid #DDDDDD;
      border-radius: 10px;
      transition: background-color 0.3s, border-color 0.3s;
      padding: 0 5px;
      color: #FFFFFF;
      background: #FFFFFF;
      height: 20px;
      line-height: 20px;

      .inner-circle {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 27px;
        height: 27px;
        border: 1px solid #DDDDDD;
        box-sizing: border-box;
        border-radius: 50%;
        background: #FFFFFF;
        transition: transform .3s;
      }

      &.off {
        .inner-text-left {
          color: #FFFFFF;
        }

        .inner-text-right {
          color: black;
        }
      }

      &.on {
        background: #684E94;
        border-color: #684E94;

        .inner-text-right {
          color: #684E94;
        }

        .inner-circle {
          transform: translate(100%, -50%);
        }
      }
    }
  }

  .captcha-input-container {
    position: relative;

    .captcha-toggle {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
  }
}
</style>
