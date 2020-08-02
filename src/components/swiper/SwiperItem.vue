<template>
  <section class="item_wrap">
    
  </section>
</template>
<script>
export default {};
</script>

<style lang="less" scoped>
// .item_wrap {
//   width: 744px;
//   height: 388px;
// }
.center {
  width: 744px;
  height: 388px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
  z-index: 999;
}
.left {
  width: 700px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  background-color: #eee;
}
.right {
  width: 700px;
  height: 350px;
  position: absolute;
  top: 50%;
  right: 0;
  background-color: #eee;
  transform: translate(0, -50%);
}
</style>