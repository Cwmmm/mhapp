<template>
  <section>
    <div class="bar">
      <input
        type="text"
        class="s_inp"
        v-model="searchValue"
        @keyup.enter="search"
      />
      <button class="s_icon" @click="search()">
        <svg
          t="1596624777227"
          class="icon-search"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3723"
        >
          <path
            d="M797.525333 752.266667c62.069333-72.736 97.28-165.002667 97.28-262.186667C894.816 266.528 713.621333 85.333333 490.08 85.333333 266.538667 85.333333 85.333333 266.538667 85.333333 490.069333 85.333333 713.610667 266.538667 894.826667 490.069333 894.826667a404.693333 404.693333 0 0 0 118.208-17.546667 32 32 0 0 0-18.666666-61.216 340.693333 340.693333 0 0 1-99.541334 14.762667C301.888 830.816 149.333333 678.261333 149.333333 490.069333 149.333333 301.888 301.888 149.333333 490.069333 149.333333 678.261333 149.333333 830.826667 301.888 830.826667 490.069333c0 89.28-35.381333 173.696-97.141334 237.322667a36.992 36.992 0 0 0 0.384 51.925333l149.973334 149.973334a32 32 0 0 0 45.258666-45.248L797.525333 752.266667z"
            p-id="3724"
          ></path>
        </svg>
      </button>
    </div>
    <ul class="s_hot">
      <router-link
        :to="'/comic/' + item.id"
        tag="li"
        v-for="item in hotInfo"
        :key="item.id"
      >
        {{ item.title }}</router-link
      >
    </ul>
  </section>
</template>
<script>
import { hotSearch } from "@/config/API";
export default {
  data() {
    return {
      hotInfo: [],
      searchValue: null,
      result: null
    };
  },
  mounted() {
    hotSearch().then(({ data }) => {
      this.hotInfo = data;
    });
  },
  methods: {
    search() {
      console.log(this.searchValue);
    }
  }
};
</script>
<style lang="less" scoped>
section {
  width: 456px;
  margin: 0 auto;
}
.bar {
  border: 3px solid rgb(216, 214, 214);
  border-radius: 2px;
  position: relative;
  input {
    border: 0;
    outline: none;
  }
}
.s_inp {
  height: 40px;
  width: 380px;
}
.s_icon {
  border: none;
  background-color: #666;
  height: 40px;
  width: 70px;
  float: right;
  vertical-align: middle;
  font-size: 0;
  position: relative;
  &:active,
  &:focus {
    outline: 0;
  }
  &:active:hover {
    content: "123";
    position: absolute;
    display: block;
    right: 0;
    top: 0;
    height: 40px;
    width: 70px;
    background-color: #44b29d;
  }
  &:hover {
    background-color: #48c9b0;
  }
  .icon-search {
    width: 50%;
    fill: #b1b4b9;
  }
}
.s_hot li {
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    color: #fa966e;
    text-decoration: underline;
  }
}
.s_hot {
  margin-top: 10px;
  padding-left: 0;
  color: #717171;
  font-size: 13px;
}
</style>
