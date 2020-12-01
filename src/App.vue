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
  }
};
</script>
<style lang="less">
body,
html {
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #2d2d2d;
  cursor: pointer;
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
