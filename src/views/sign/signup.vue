<template>
  <div :class="{ login: true, hidden: isHidden }" @keyup.Enter="checkData">
    <div class="hidden"></div>
    <h2>免费注册</h2>
    <div class="inputWrap">
      <label :class="{ active: nameActive, leftTip: true }"
        >用户名<span class="required">*</span></label
      >
      <label class="rightTip" v-show="nameShow"
        ><span class="required">*</span>
        用户名格式错误,请输入5~10位中文/字母/数字/下划线</label
      >
      <input type="text" v-model="name" @blur="checkName" />
    </div>
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
    <button @click="checkData">点击注册</button>
  </div>
</template>
<script>
import { message } from "ant-design-vue";
import { rigist } from "@/config/API";
export default {
  data() {
    return {
      isHidden: false,
      name: "",
      mail: null,
      password: null,
      nameActive: false,
      mailActive: false,
      psdActive: false,
      nameShow: false,
      mailShow: false,
      psdShow: false
    };
  },
  methods: {
    async checkData() {
      if (!(this.nameShow && this.mailShow && this.psdShow)) {
        rigist(this.mail, this.name, this.password)
          .then(() => {
            message.success("注册成功");
            const that = this;
            setTimeout(function() {
              that.$router.replace("/sign/login");
            }, 2000);
          })
          .catch(() => {
            this.name = null;
            this.mail = null;
            this.password = null;
          });
      } else {
        message.warn("格式错误,请重新输入", 1);
      }
    },
    checkName() {
      if (!/^[\w\u4e00-\u9fa5]{5,10}$/.test(this.name)) {
        this.nameShow = true;
      } else {
        this.nameShow = false;
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
    name: function(newName) {
      if (newName != "") {
        this.nameActive = true;
      } else {
        this.nameActive = false;
      }
    },
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
      border: @title-border;
    }
  }
  button {
    width: 100%;
    height: 50px;
    background-color: @btn-color;
    font-size: 20px;
    color: #fff;
    border: none;
    outline: none;
    &:active {
      background-color: #44b29d;
    }
  }
}
</style>
