<template>
  <div class="info">
    <h2>个人信息</h2>
    <div class="head-img">
      <h3>头像</h3>
      <img :src="userInfo.cover_img" alt="头像" />
      <button class="btn" @click="headSelectActive = true">更换</button>
      <div class="shade" v-show="headSelectActive">
        <div class="select">
          <h3>头像选择</h3>
          <ul>
            <li
              v-for="item in imgList"
              :key="item.id"
              @click="imgActive = item.id"
              :class="{ selected: imgActive == item.id }"
            >
              <img :src="item.url" alt="" />
            </li>
          </ul>
          <div class="bot">
            <button @click="changeHead">确定</button>
            <button @click="headSelectActive = false">取消</button>
          </div>
        </div>
      </div>
    </div>
    <h3>用户名</h3>
    <input type="text" v-model="userInfo.name" />
    <button @click="changeName" class="btn">UPDATE</button>
    <h3>邮箱</h3>
    <input type="text" :value="userInfo.mail" disabled />
    <h3>密码</h3>
    <input type="password" v-model="userInfo.password" />
    <button @click="changePsd" class="btn">UPDATE</button>
  </div>
</template>
<script>
import {
  allHeadImg,
  changeHeadImg,
  userInfo,
  changeNickName,
  changePsd
} from "@/config/API";
import { message } from "ant-design-vue";
export default {
  data() {
    return {
      headSelectActive: false,
      imgActive: null,
      userInfo: null,
      imgList: null
    };
  },
  methods: {
    changeHead: async function() {
      const msg = await changeHeadImg(this.imgList[this.imgActive].url);
      message.success(msg.msg);
      const res = await userInfo();
      this.userInfo = res.data;
      this._utils.setLocalStorage("userInfo", JSON.stringify(res.data));
      this.headSelectActive = false;
    },
    changeName: async function() {
      const res = await changeNickName(this.userInfo.name);
      message.success(res.msg);
      this._utils.setLocalStorage("userInfo", JSON.stringify(this.userInfo));
      setTimeout(() => {
        this.$router.go(0);
      }, 500);
    },
    changePsd: async function() {
      await changePsd(this.userInfo.password);
      this._utils.removeAll();
      message.success("密码修改成功,请重新登陆！");
      setTimeout(() => {
        this.$router.push("/sign/login");
      }, 500);
      // ths.to;
    }
  },
  async created() {
    this.userInfo = JSON.parse(this._utils.getLocalStorage("userInfo"));
    const res = await allHeadImg();
    this.imgList = res.imgs;
    console.log(this.imgList.imgs);
  }
};
</script>
<style lang="less" scoped>
.info {
  margin-left: 200px;
  padding: 50px 100px 50px 30px;
  .head-img {
    padding: 10px 0;
    img {
      width: 100px;
      height: 100px;
    }
    .shade {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      background-color: rgba(0, 0, 0, 0.3);
      .select {
        width: 30%;
        height: 50%;
        background-color: #eee;
        position: absolute;
        top: 50%;
        min-width: 740px;
        left: 50%;
        transform: translate(-50%, -50%);
        h3 {
          text-align: center;
          background-color: #fff;
          margin: 0;
        }
        ul {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          li {
            &:hover {
              border: 2px solid @author-color;
            }

            margin: 10px;
            img {
              width: 100px;
              height: 100px;
            }
          }
          .selected {
            border: 2px solid @author-color;
          }
        }
        .bot {
          width: 100%;
          height: 20%;
          position: absolute;
          bottom: 0;
          overflow: hidden;
          display: flex;
          justify-content: space-around;
          align-items: center;
          button {
            .btn(@width:100px, @height:35px);
          }
        }
      }
    }
  }
  h2 {
    margin: 24px 0;
    padding: 0 10px;
    font-size: 28px;
    font-weight: 500;
    background-color: black;
    color: #fff;
  }
  h3 {
    font-size: 21px;
    padding: 10px 0;
  }
  p {
    border-bottom: 1px solid @light-color;
  }
  input {
    margin-bottom: 10px;
    border: 0;
    background-color: #fff;
    border-bottom: 1px solid @light-color;
    width: 100%;
    font-size: 18px;
    padding: 10px 0;
    outline: none;
  }
  .btn {
    float: right;
    transform: translateY(-47px);
    .btn(@width:65px, @height:26px);
  }
}
</style>
