/* eslint-disable vue/no-unused-components */
<template>
  <div id="index">
    <v-header></v-header>
    <v-sider></v-sider>
    <div class="container">
      <div class="banner">
        <v-indexbar></v-indexbar>
        <ul>
          <li>恋爱</li>
          <li>古风</li>
          <li>校园</li>
        </ul>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sider from "@/components/Sidebar";
import Indexbar from "@/components/Indexbar";
import { homepage } from "@/config/API";
export default {
  name: "index",
  components: {
    "v-header": Header,
    "v-footer": Footer,
    "v-sider": Sider,
    "v-indexbar": Indexbar
  },
  created() {
    homepage.hotSearch().then(({ data }) => {
      console.log(data.data);
    });
    homepage.banner().then(({ data }) => {
      console.log(data.data);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 1400px;
}
.banner {
  height: 450px;
  background-color: red;
}
</style>
