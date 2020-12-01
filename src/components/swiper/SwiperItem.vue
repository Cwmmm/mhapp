<template>
  <div class="swiper-item-container">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.swiper-item-container {
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  transition: all 500ms ease-in-out;
}
</style>
