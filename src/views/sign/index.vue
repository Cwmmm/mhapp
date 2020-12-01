<template>
  <div class="sign">
    <div class="nav">
      <router-link to="login" tag="div" class="login-btn"> 登录 </router-link>
      <router-link to="signup" tag="div" class="rigist-btn">
        注册
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped>
.router-link-active {
  background-color: @btn-color !important;
}
.sign {
  width: 600px;
  margin: 50px auto;
  padding: 45px;
  background-color: @navbg-color;
  .nav {
    padding-bottom: 40px;
    width: 100%;
    div {
      display: inline-block;
      width: 50%;
      height: 53px;
      font-size: 20px;
      color: #fff;
      padding: 12px;
      text-align: center;
      cursor: pointer;
      background-color: #e6e6e6;
      &:hover {
        background-color: @hover-color;
      }
    }
  }
}
</style>
