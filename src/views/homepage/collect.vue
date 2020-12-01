<template>
  <div class="collect">
    <h2>我的收藏</h2>
    <div class="tag-content" v-if="collectList">
      <div class="empty" v-show="collectList.length == 0">没有了嗷~~</div>
      <div class="cardList">
        <li v-for="item in collectList[sliceIndex]" :key="item.id">
          <v-card :data="item"></v-card>
        </li>
      </div>
    </div>
    <div class="sort-page" v-show="collectList.length > 1">
      <a @click="sliceIndex = 0">首页</a>
      <a @click="sliceIndex--" v-show="sliceIndex != 0">上一页</a>
      <a
        :class="{ focus: index == sliceIndex }"
        v-for="(item, index) in collectList"
        :key="index"
        @click="sliceIndex = index"
      >
        {{ index }}
      </a>
      <a @click="sliceIndex++" v-show="sliceIndex != collectList.length - 1">
        下一页
      </a>
      <a @click="sliceIndex = collectList.length - 1">尾页</a>
    </div>
  </div>
</template>
<script>
import { comic } from "@/config/API";
import card from "@/components/Card";
import { arrSlice } from "@/utils";
export default {
  data() {
    return {
      collectList: [],
      sliceIndex: 0
    };
  },
  components: {
    "v-card": card
  },
  async mounted() {
    const uInfo = JSON.parse(this._utils.getLocalStorage("userInfo"));
    const ps = uInfo.collect.map(one => {
      return comic(one);
    });
    Promise.all(ps).then(res => {
      const sort = res.map(one => {
        return one.comic;
      });
      this.collectList = arrSlice(sort, 8);
      console.log(this.collectList);
    });
    // await allComic().then(({ data }) => {
    //   this.allComic = data;
    //   this.sortedComic = arrSlice(data, 30);
    // });
  }
};
</script>
<style lang="less" scoped>
.collect {
  margin-left: 200px;
  padding: 50px 100px 50px 30px;
  h2 {
    margin: 24px 0;
    padding: 0 10px;
    font-size: 28px;
    font-weight: 500;
    background-color: black;
    color: #fff;
  }
  .tag-content {
    min-height: 500px;
    position: relative;
    .empty {
      width: 100%;
      display: inline-block;
      text-align: center;
    }
    .cardList {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .card {
        box-sizing: border-box;
        width: 175.2px;
        height: 296px;
      }
    }
  }
}
.sort-page {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-25%);
  white-space: nowrap;

  a {
    color: #333;
    display: inline-block;
    height: 26px;
    line-height: 26px;
    vertical-align: middle;
    text-align: center;
    min-width: 26px;
    border: 1px solid @btn-color;
    margin: 10px;
  }
  .focus {
    border: none;
    color: @author-color;
  }
}
</style>
