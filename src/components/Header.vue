/* eslint-disable prettier/prettier */
<template>
  <header>
    <div class="top" v-if="all">
      <div class="wrap">
        <router-link tag="div" class="logo" to="/">
          <img src="../assets/logo.png" alt />
        </router-link>
        <div class="search">
          <v-search></v-search>
        </div>
        <div class="other"></div>
      </div>
    </div>
    <div class="bottom">
      <ul class="navbar">
        <router-link to="/" tag="li">
          <svg
            t="1596682775433"
            class="indexIcon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2759"
          >
            <path
              d="M569.8048 21.2736a82.0736 82.0736 0 0 0-110.2848 0L13.568 444.7232a41.1392 41.1392 0 0 0 55.0912 61.1072l7.0912-6.7328V941.056a82.2784 82.2784 0 0 0 82.2784 82.3808h239.4368v-247.7056a57.9328 57.9328 0 0 1 57.9584-58.0096h112.6656a57.9328 57.9328 0 0 1 57.9584 58.0096v247.7056h245.12a82.2784 82.2784 0 0 0 82.304-82.3808V504.4992c18.2784 16.5376 44.2112 15.2832 59.4176-1.664a41.1392 41.1392 0 0 0-2.9696-58.112L569.8048 21.2992z"
              p-id="2760"
            />
          </svg>
        </router-link>
        <router-link to="/" tag="li">日漫</router-link>
        <router-link to="/" tag="li">韩漫</router-link>
        <router-link to="/rank" tag="li">排行榜</router-link>
        <router-link to="/homepage" tag="li">个人中心</router-link>
        <div class="search-bar" v-if="!all">
          <input type="text" name id />
          <button>
            <svg
              t="1596624777227"
              class="icon-search"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3723"
            >
              <path
                d="M797.525333 752.266667c62.069333-72.736 97.28-165.002667 97.28-262.186667C894.816 266.528 713.621333 85.333333 490.08 85.333333 266.538667 85.333333 85.333333 266.538667 85.333333 490.069333 85.333333 713.610667 266.538667 894.826667 490.069333 894.826667a404.693333 404.693333 0 0 0 118.208-17.546667 32 32 0 0 0-18.666666-61.216 340.693333 340.693333 0 0 1-99.541334 14.762667C301.888 830.816 149.333333 678.261333 149.333333 490.069333 149.333333 301.888 301.888 149.333333 490.069333 149.333333 678.261333 149.333333 830.826667 301.888 830.826667 490.069333c0 89.28-35.381333 173.696-97.141334 237.322667a36.992 36.992 0 0 0 0.384 51.925333l149.973334 149.973334a32 32 0 0 0 45.258666-45.248L797.525333 752.266667z"
                p-id="3724"
              />
            </svg>
          </button>
        </div>
        <div class="profile right" v-if="userInfo">
          <span
            class="his"
            @mouseover="hisListActive = true"
            @mouseout="hisListActive = false"
          >
            历史记录
            <ul v-show="hisListActive"></ul>
          </span>
          <span
            class="collect"
            @mouseover="collectListActive = true"
            @mouseout="collectListActive = false"
          >
            我的收藏
            <ul v-show="collectListActive"></ul>
          </span>
          <span class="user">
            <img :src="userInfo.cover_img" alt />
            <span>{{ userInfo.name }}</span>
          </span>
          <span @click="quit" class="quit">退出</span>
        </div>
        <li class="right" v-if="false">头像</li>
        <router-link
          to="/sign/login"
          tag="li"
          class="right"
          v-if="!this.isLogin"
          >登录</router-link
        >
        <router-link to="/sign/rigist" tag="li" v-if="!this.isLogin"
          >注册</router-link
        >
      </ul>
    </div>
  </header>
</template>
<script>
import Searchbar from "./Searchbar";
export default {
  components: {
    "v-search": Searchbar
  },
  props: {
    all: { default: true, type: Boolean }
  },
  data() {
    return {
      isLogin: false,
      userInfo: null,
      hisListActive: false,
      collectListActive: false
    };
  },
  computed: {
    scrollTop: function() {
      return document.documentElement.scrollTop;
    }
  },
  methods: {
    quit: function() {
      this._utils.removeAll();
      this.$router.push("/sign/login");
    }
  },
  mounted() {
    console.log(this.all);
    //判断登录状态
    if (this._utils.getLocalStorage("token")) {
      this.isLogin = true;
    }
    this.userInfo = JSON.parse(this._utils.getLocalStorage("userInfo"));
    console.log(this.userInfo);
  }
};
</script>

<style lang="less" scoped>
.profile {
  .his,
  .collect {
    position: relative;
    width: 200px;
    height: 50px;
    ul {
      z-index: 999;
      position: absolute;
      left: -25px;
      bottom: -100px;
      box-shadow: 0 3px 2px #e3e3e3;
      background-color: #fff;
    }
  }
  .quit {
    color: @light-color;
    font-weight: normal;
  }

  span {
    color: #2d2d2d;
    font-weight: 700;
    margin-left: 20px;
    &:hover {
      color: #138d75;
    }
  }
  .user {
    span {
      margin-left: 10px;
    }
    img {
      height: 35px;
    }
  }
}
.search-bar {
  input {
    border: 0;
    outline: none;
    height: 30px;
    width: 300px;
    background: none;
    border-bottom: 1px solid #222222;
    margin-left: 20px;
  }
  button {
    border: none;
    background-color: #222222;
    height: 30px;
    width: 60px;
    float: right;
    vertical-align: middle;
    font-size: 0;
    position: relative;
    &:active,
    &:focus {
      outline: 0;
    }
    &:active:hover {
      background-color: #44b29d;
    }
    &:hover {
      background-color: #48c9b0;
    }
    .icon-search {
      width: 50%;
      fill: #fff;
    }
  }
}
header {
  width: 100vw;
  background-color: #eeeeee;
}
.top {
  height: 130px;
  background-color: #fff;
}
.bottom {
  position: sticky;
  width: 100%;
  top: 0;
  height: 48px;
  background-color: #f1f3f2;
  box-shadow: 0 4px 3px #e3e3e3;
  .navbar {
    padding: 0;
    height: 100%;
    width: 1068px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .right {
      margin-left: auto;
    }
    .indexIcon {
      width: 19px;
      transform: translateY(3px);
      fill: #2d2d2d;
      &:hover {
        fill: #138d75;
      }
    }
    li {
      color: #2d2d2d;
      font-weight: 700;
      margin-right: 26px;
      &:hover {
        color: #138d75;
      }
    }
  }
}
.wrap {
  height: 100%;
  width: 1068px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  flex: 1;
  img {
    width: 100%;
  }
}
.search {
  height: 95px;
  align-self: flex-end;
  flex: 3;
}
.other {
  flex: 1;
}
</style>
