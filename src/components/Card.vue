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
      <span class="Ahthor"> {{ data.user.nickname }}</span>
      <span class="likeCount"> {{ this.likeCount }} </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // likeCount: null,
    };
  },
  computed: {
    likeCount() {
      if (this.data.likes_count.length > 5) {
        return `万+`;
      } else if (this.data.likes_count > 9999) {
        return "99万+";
      } else {
        return this.data.likes_count;
      }
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
  width: 144px;
  overflow: hidden;
  .bg {
    &:hover::before {
      content: "";
      display: block;
      height: 192px;
      width: 144px;
      background-color: rgba(255, 255, 255, 0.2);
    }
    width: 144px;
    height: 192px;
    position: relative;
    background-size: cover !important;
    border-radius: 2px;
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
    cursor: pointer;
    width: 100%;
    height: 30px;
    padding: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bot {
    height: 15px;
    width: 100%;
    overflow: hidden;
    font-size: 13px;
    color: #a9b7b8;
    padding-left: 5px;
    padding-right: 5px;
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
