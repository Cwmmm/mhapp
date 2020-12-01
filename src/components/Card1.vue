<template>
  <div class="card">
    <router-link
      class="bg"
      :to="'/comic/' + data.id"
      tag="div"
      :style="{ background: 'url(' + data.vertical_image_url + ')' }"
    >
      <div class="category">
        <span> {{ data.category[0] }} </span>
        <span> {{ data.category[1] }} </span>
      </div>
    </router-link>
    <router-link class="itemTitle" tag="div" :to="'/comic/' + data.id">
      {{ data.title }}</router-link
    >
    <div class="bot">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { convart } from "@/utils";
export default {
  computed: {
    likeCount() {
      return `${convart(this.data.likes_count, 0)}+`;
    }
  },
  props: {
    data: {
      type: Object,
      require: true
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  height: 100%;
  // padding: 0 24px 24px 0;
  overflow: hidden;
  .bg {
    &:hover::before {
      content: "";
      height: 100%;
      width: 100%;
      display: block;
      background-color: rgba(255, 255, 255, 0.2);
    }
    height: 80%;
    position: relative;
    background-size: cover !important;
    .category {
      height: 20px;
      width: 100%;
      position: absolute;
      bottom: 0;
      overflow: hidden;
      span {
        cursor: pointer;
        font-size: 13px;
        margin-right: 10px;
        background-color: rgba(139, 160, 180, 0.465);
      }
    }
  }
  .itemTitle {
    &:hover {
      color: #dc7633;
    }
    span {
      float: right;
    }
    cursor: pointer;
    width: 100%;
    height: 30px;
    padding: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bot {
    width: 100%;
    overflow: hidden;
    font-size: 13px;
    color: #a9b7b8;
    .Ahthor {
      display: inline-block;
      width: 80px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .likeCount {
      float: right;
    }
  }
}
</style>
