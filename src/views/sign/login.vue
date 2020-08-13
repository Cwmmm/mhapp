<template>
  <div :class="{ login: true }" @keyup.Enter="checkData">
    <div class="hidden"></div>
    <h2>登录</h2>
    <div class="inputWrap">
      <label :class="{ active: mailActive }"
        >邮箱地址<span class="required">*</span></label
      >
      <label class="rightTip" v-show="mailShow"
        ><span class="required">*</span>邮箱格式错误,请输入xxx@xxx.com</label
      >
      <input type="mail" v-model="mail" @blur="checkMail" />
    </div>
    <div class="inputWrap">
      <label :class="{ active: psdActive }"
        >密码<span class="required">*</span></label
      >
      <label class="rightTip" v-show="psdShow"
        ><span class="required">*</span>
        密码格式错误,请输入6~16位数字母/数字/下划线</label
      >
      <input type="password" v-model="password" @blur="checkPsd" />
    </div>
    <button @click="checkData">点击登录</button>
  </div>
</template>
<script>
import { message } from "ant-design-vue";
import { login } from "@/config/API";
import { setLocalStorage } from "@/config/utils";
export default {
  data() {
    return {
      mail: null,
      password: null,
      mailActive: false,
      psdActive: false,
      mailShow: false,
      psdShow: false
    };
  },
  methods: {
    checkData() {
      if (!(this.mailShow && this.psdShow)) {
        login(this.mail, this.password).then(res => {
          message.success(res.data.msg);
          setLocalStorage("token", res.data.data);
          this.$store.commit("changeLogin", true);
          this.$router.replace("/");
        });
      } else {
        message.warn("格式错误,请重新输入");
      }
    },
    checkMail() {
      if (
        !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          this.mail
        )
      ) {
        this.mailShow = true;
      } else {
        this.mailShow = false;
      }
    },
    checkPsd() {
      if (!/^\w{6,16}$/.test(this.password)) {
        this.psdShow = true;
      } else {
        this.psdShow = false;
      }
    }
  },
  watch: {
    mail: function(newName) {
      if (newName != "") {
        this.mailActive = true;
      } else {
        this.mailActive = false;
      }
    },
    password: function(newName) {
      if (newName != "") {
        this.psdActive = true;
      } else {
        this.psdActive = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.hidden {
  pointer-events: none;
}
.login {
  width: 100%;
  color: #3f3f3f;
  h2 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 40px;
    text-align: center;
  }
  .inputWrap {
    position: relative;
    font-size: 17px;
    label {
      pointer-events: none;
      position: absolute;
      top: 10px;
      margin: 0 10px;
      color: #727272;
      transition: all 0.25s ease;
      .required {
        color: #1ab188;
        padding-left: 5px;
        padding-right: 5px;
      }
    }
    label.rightTip {
      top: 50px;
      right: 0;
      span {
        color: #ec7062;
      }
    }
    label.active {
      transform: translateY(40px);
      font-size: 15px;
      color: #727171;
      .required {
        display: none;
      }
    }
  }
  input {
    display: inline-block;
    width: 100%;
    height: 41px;
    margin-bottom: 50px;
    outline: none;
    background-color: #bdc3c7;
    font-size: 17px;
    color: #3f3f3f;
    border: none;
    padding-left: 10px;
    &:focus {
      border: 1px solid #44b29d;
    }
  }
  button {
    width: 100%;
    height: 50px;
    background-color: #73c6b5;
    font-size: 20px;
    color: #3f3f3f;
    border: none;
    outline: none;
    &:active {
      background-color: #44b29d;
    }
  }
}
</style>
