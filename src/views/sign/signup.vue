<template>
  <div class="login">
    <h2>Sign Up For Free</h2>
    <input type="text" placeholder="用户名" />
    <input type="text" placeholder="邮箱地址" />
    <input type="text" placeholder="密码" />
    <button>注册</button>
  </div>
</template>
<script>
export default {
  created() {
    console.log(this.$route.params.name);
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  // height: 30px;
  color: #3f3f3f;

  h2 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 40px;
    text-align: center;
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
  }
  button {
    width: 100%;
    height: 50px;
    background-color: #73c6b5;
    font-size: 20px;
    color: #3f3f3f;

    border: none;
    outline: none;
  }
}
</style>
