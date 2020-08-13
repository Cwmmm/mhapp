<template>
  <div class="sign">
    <div class="nav">
      <router-link to="login" tag="div"> 登录 </router-link>
      <router-link to="signup" tag="div">
        注册
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped>
.router-link-active {
  background-color: #73c6b5 !important;
}
.sign {
  width: 600px;
  margin: 50px auto;
  background-color: #e6e6e6;
  padding: 45px;
  .nav {
    padding-bottom: 40px;
    width: 100%;

    div {
      display: inline-block;
      width: 50%;
      height: 53px;
      font-size: 20px;
      color: #3f3f3f;
      padding: 12px;
      text-align: center;
      cursor: pointer;
      div {
        background-color: #bdc3c7;
      }
      &:hover {
        background-color: #44b29d;
      }
    }
  }
}
</style>
