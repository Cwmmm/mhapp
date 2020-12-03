<template>
  <div class="swiper-item-container" @click="event()">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["event"]
};
</script>
<style lang="less" scoped>
.swiper-item-container {
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}
</style>
