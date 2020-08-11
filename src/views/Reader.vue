<template>
  <div class="reader">
    {{ this.$route.params.id }}
    <div class="top">顶部</div>
    <div class="bottom">底部</div>
  </div>
</template>
<style lang="less" scoped>
.top {
  height: 50px;
  position: fixed;
  top: 0;
}
.bottom {
  height: 50px;
  position: fixed;
  bottom: 0;
}
</style>
