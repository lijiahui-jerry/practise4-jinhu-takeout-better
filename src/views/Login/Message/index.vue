<template>
  <!-- 短信登录 -->
  <div class="login-with-message">
    <!-- 手机号输入框 -->
    <div class="phone-input">
      <input type="tel" maxlength="11" placeholder="手机号" v-model="phoneNumber">
      <button :disabled="!ifPhoneCorrect||countDown!=0" class="captcha-get" @click="getCaptchaForLogin()">
        {{ captchaContent() }}
      </button>
    </div>
    <!-- 验证码输入框 -->
    <div class="captcha-input">
      <input ref="captchaInput" type="tel" maxlength="6" placeholder="验证码" v-model="captcha">
    </div>
    <!-- 提示 -->
    <div class="caution">
      <p>未注册的手机号，登录时将自动注册</p>
      <span @click="toggleReadArgument"><input type="checkbox" :checked="ifReadArgument">请勾选并阅读</span>
      <a class="argument">《用户服务协议》</a>
    </div>
  </div>

</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      phoneNumber: '',
      captcha: '',
      ifReadArgument: false,
      countDown: 0,
    }
  },
  methods: {
    //切换用户协议的同意与否
    toggleReadArgument() {
      this.ifReadArgument = !this.ifReadArgument
    },
    //获取验证码
    getCaptchaForLogin() {
      let phone = this.phoneNumber
      this.$store.dispatch("getCaptcha", {phone})

      if (0 == this.countDown) {
        //倒计时的时间
        this.countDown = 30
        const timer = setInterval(() => {
          this.countDown--
          if (this.countDown <= 0) {
            clearInterval(timer)
            this.countDown = 0
          }
        }, 1000)
        this.$refs.captchaInput.focus()
      }
    },
    //.captcha的显示内容
    captchaContent() {
      return this.countDown > 0 ? `已发送(${this.countDown}s)` : '获取验证码'
    },
    /*登录时对手机号和验证码进行判断（应该由后端人员编写api接口并处理），此时所有表单数据均已符合逻辑，但是否正确填写仍需进一步判断*/
    //messageLogin(p,c){
    //  if('17601355494'==p && '123456'==c){
    //    localStorage.setItem("userId","1")
    //    return {code:200}
    //  }else if('18888888888'==p && '888888'==c){
    //    localStorage.setItem("userId","8888")
    //    return {code:200}
    //  }else{
    //    this.$parent.tipBox('验证码输入有误，请核对后重试')
    //    return {code:300}
    //  }
    //},
  },
  computed: {
    //判断手机号是否合法
    ifPhoneCorrect() {
      return /^1\d{10}$/.test(this.phoneNumber)
    },
  },
}
</script>

<style scoped lang="less">
.login-with-message {
  input {
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

  .phone-input {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #FFFFFF;

    //获取验证码按钮
    .captcha-get {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      border: 0;
      font-size: 14px;
      background: transparent;
      color: #684E94;

      &[disabled] {
        color: #E4E4E4;
      }
    }
  }

  .captcha-input {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #FFFFFF;
  }

  //账号自动注册提醒
  .caution {
    margin-top: 12px;
    color: #999999;
    font-size: 14px;
    line-height: 1.5em;

    //用户协议前的checkbox
    & > span > input[type='checkbox'] {
      width: 11px;
      height: 11px;
    }

    //用户协议
    .argument {
      display: inline-block;
      color: red;
    }
  }
}


</style>
