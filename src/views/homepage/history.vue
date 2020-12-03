<template>
  <div class="history">
    <h2>浏览记录</h2>
    <div class="tag-content" v-if="readingList">
      <div class="empty" v-show="readingList.length == 0">没有了嗷~~</div>
      <div class="cardList">
        <li v-for="item in readingList[sliceIndex]" :key="item.chapter_id">
          <v-card :data="item.comic_info.comic">
            <router-link
              tag="span"
              :to="{
                path: '/reader/' + item.chapter_id,
                query: { comicId: item.comic_id }
              }"
              >阅读至：{{ item.chapter_title }}</router-link
            >
          </v-card>
        </li>
      </div>
    </div>
    <div class="sort-page" v-show="readingList.length > 1">
      <a @click="sliceIndex = 0">首页</a>
      <a @click="sliceIndex--" v-show="sliceIndex != 0">上一页</a>
      <a
        :class="{ focus: index == sliceIndex }"
        v-for="(item, index) in readingList"
        :key="index"
        @click="sliceIndex = index"
      >
        {{ index }}
      </a>
      <a @click="sliceIndex++" v-show="sliceIndex != readingList.length - 1">
        下一页
      </a>
      <a @click="sliceIndex = readingList.length - 1">尾页</a>
    </div>
  </div>
</template>
<script>
import { comic } from "@/config/API";
import card from "@/components/Card1";
import { arrSlice } from "@/utils";
export default {
  methods: {
    title: function(item) {
      item.comic_info.chapters.forEach(e => {
        if (e.chapter_id == item.chapter_id) {
          console.log(e.title);
          return e.title;
        }
      });
    }
  },
  data() {
    return {
      readingList: [],
      sliceIndex: 0
    };
  },
  components: {
    "v-card": card
  },
  async mounted() {
    const { reading_record } = JSON.parse(
      this._utils.getLocalStorage("userInfo")
    );
    const ps = reading_record.map(one => {
      return comic(one.comic_id);
    });
    Promise.all(ps)
      .then(res => {
        const sort = res.map((one, index) => {
          reading_record[index]["comic_info"] = one;
          return reading_record[index];
        });
        this.readingList = arrSlice(sort, 8);
      })
      .then(() => {
        this.readingList[0].forEach(item => {
          item.comic_info.chapters.forEach(e => {
            if (e.chapter_id == item.chapter_id) {
              item.chapter_title = e.title;
            }
          });
        });
      });
  }
};
</script>
<style lang="less" scoped>
.history {
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
      justify-content: flex-start;
      flex-wrap: wrap;
      .card {
        margin-right: 6px;
        box-sizing: border-box;
        width: 175.2px;
        height: 296px;
        span {
          white-space: nowrap;
          &:hover {
            color: #dc7633;
          }
        }
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
