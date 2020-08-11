<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      render: false
    };
  },
  created() {
    this.$store.commit("inputTags");
  }
};
</script>
<style lang="less">
body,
html {
  margin: 0;
  padding: 0;
  font-size: 15px;
  color: #3f3f3f;
}

a {
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

ul {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
</style>
