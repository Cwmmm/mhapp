<template>
  <div class="sign">
    <div class="nav">
      <router-link to="login" tag="div" class="a_login"> Log In </router-link>
      <router-link to="signup" tag="div" class="a_signup">
        Sign Up
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    console.log(this.$route);
  }
};
</script>
<style lang="less" scoped>
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
      padding: 15px;
      text-align: center;
      cursor: pointer;
      &:nth-of-type(1) {
        background-color: #73c6b5;
      }
      &:nth-of-type(2) {
        background-color: #bdc3c7;
      }
      &:hover {
        background-color: #44b29d;
      }
    }
  }
}
</style>
