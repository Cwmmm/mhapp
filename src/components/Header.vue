/* eslint-disable prettier/prettier */
<template>
  <header>
    <div class="top">
      <div class="wrap">
        <router-link tag="div" class="logo" to="/">
          <img src="../assets/logo.png" alt="" />
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
            ></path>
          </svg>
        </router-link>
        <router-link to="/" tag="li">日漫</router-link>
        <router-link to="/" tag="li">韩漫</router-link>
        <router-link to="/rank" tag="li">排行榜</router-link>
        <router-link to="/personalCenter" tag="li">个人中心</router-link>
        <li class="right" v-if="false">头像</li>
        <router-link to="/sign/login" tag="li" class="right">登录</router-link>
        <router-link to="/sign/rigist" tag="li">注册</router-link>
      </ul>
    </div>
  </header>
</template>
<script>
import Searchbar from "./Searchbar";
export default {
  components: {
    "v-search": Searchbar
  }
};
</script>

<style lang="less" scoped>
header {
  width: 100vw;
  background-color: #eeeeee;
}

.top {
  height: 130px;
  background-color: #e6e6e6;
}
.bottom {
  height: 46px;
  background-color: #bdc3c7;
  .navbar {
    padding: 0;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .right {
      margin-left: auto;
      // align-self: start;
      // justify-self: end;
    }
    .indexIcon {
      width: 25px;
      fill: #3f3f3f;
      &:hover {
        fill: #138d75;
      }
    }
    li {
      cursor: pointer;
      margin-right: 26px;
      &:hover {
        color: #138d75;
      }
    }
  }
}
.wrap {
  height: 100%;
  width: 1200px;
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
