<template>
  <div class="tags">
    {{ this.$route.params.id }}
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route);
  }
};
</script>
