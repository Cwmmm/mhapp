/* eslint-disable prettier/prettier */
<template>
  <header>
    <div class="top">
      <div class="wrap">
        <div class="logo">
          <img src="../assets/ac_logo.png" alt="" style="margin-left:50px">
        </div>
        <div class="search">
          <v-search></v-search>
        </div>
        <div class="other"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="wrap">
        <ul class="navbar">
          <li>首页</li>
          <li>日漫</li>
          <li>韩漫</li>
          <li>排行榜</li>
          <li>个人中心</li>
        </ul>
        <div class="acenter">
          作者中心
        </div>
      </div>
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
  background: cadetblue;
}
.bottom {
  height: 60px;
  background-color: coral;
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
}
.search {
  height: 95px;
  align-self: flex-end;
  flex: 3;
}
.other {
  flex: 1;
}
.navbar {
  height: 100%;
}
.navbar li {
  font-size: 18px;
  font-weight: 500;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8);
  cursor: pointer;
  color: white;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  width: 85px;
  height: 60px;
  margin-left: 40px;
  // box-sizing: content-box;
}
.navbar li:hover {
  border-bottom: 5px solid #eee;
  background-color: rgb(206, 103, 66);
}
.acenter {
  cursor: pointer;
  background-color: #393939;
  display: table-cell;
  width: 100px;
  line-height: 36px;
  text-align: center;
  vertical-align: middle;
  border-radius: 3px;
  color: #FCE5BB;
}
</style>
