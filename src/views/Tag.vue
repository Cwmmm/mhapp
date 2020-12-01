<template>
  <div class="tag">
    <v-header id="top"></v-header>
    <div class="container">
      <div class="nav">
        <!-- 已选 -->
        <ul class="labelNav" v-if="selectedSort">
          <span class="title"> 已选 </span>
          <li class="navLi">
            {{ selectedTag.title }}
          </li>
          <li class="navLi">
            {{ selectedProgress.description }}
          </li>
          <li class="navLi">
            {{ selectedSort.title }}
          </li>
        </ul>
        <!-- 题材分类 -->
        <ul class="labelNav" v-if="selectedTag">
          <span class="title"> 题材 </span>
          <li
            class="navLi"
            v-for="item in tags"
            :key="item.tag_id"
            @click="reSort(item)"
            :class="{ focus: selectedTag.tag_id == item.tag_id }"
          >
            {{ item.title }}
          </li>
        </ul>
        <!-- 跟新状况 -->
        <ul class="labelNav" v-if="selectedProgress">
          <span class="title"> 进度 </span>
          <li
            class="navLi"
            v-for="item in updateStatus"
            :key="item.code"
            @click="reSort(item)"
            :class="{ focus: selectedProgress.code == item.code }"
          >
            {{ item.description }}
          </li>
        </ul>
        <!-- 排序 -->
        <ul class="labelNav" v-if="selectedSort">
          <span class="title"> 排序 </span>
          <li
            class="navLi"
            @click="reSort(item)"
            v-for="item in sortby"
            :key="item.hotid"
            :class="{ focus: selectedSort.hotid == item.hotid }"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="tag-content" v-if="sortedComic">
        <div class="empty" v-show="sortedComic.length == 0">没有了嗷~~</div>
        <div class="cardList">
          <li v-for="item in sortedComic[sliceIndex]" :key="item.id">
            <v-card :data="item"></v-card>
          </li>
        </div>
        <div class="sort-page" v-show="sortedComic.length > 1">
          <a href="#top" @click="sliceIndex = 0">首页</a>
          <a href="#top" @click="sliceIndex--" v-show="sliceIndex != 0"
            >上一页</a
          >
          <a
            href="#top"
            :class="{ focus: index == sliceIndex }"
            v-for="(item, index) in sortedComic"
            :key="index"
            @click="sliceIndex = index"
          >
            {{ index }}
          </a>
          <a
            href="#top"
            @click="sliceIndex++"
            v-show="sliceIndex != sortedComic.length - 1"
          >
            下一页
          </a>
          <a @click="sliceIndex = sortedComic.length - 1" href="#top">尾页</a>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import { allComic } from "@/config/API";
import { arrSlice } from "@/utils";
export default {
  components: {
    "v-header": Header,
    "v-footer": Footer,
    "v-card": Card
  },
  data() {
    return {
      sortby: [
        {
          hotid: 0,
          title: "全部"
        },
        {
          hotid: 1,
          title: "最火热"
        },
        {
          hotid: 2,
          title: "最新上架"
        }
      ],
      sliceIndex: 0,
      selected: null,
      tags: [],
      updateStatus: [],
      sortedComic: null,
      allComic: null,
      selectedTag: null,
      selectedProgress: null,
      selectedSort: null
    };
  },
  methods: {
    //对comic列表进行重新排序
    reSort: function(condition = {}) {
      if (condition.tag_id || condition.tag_id == 0) {
        this.selectedTag = condition;
      } else if (condition.code) {
        this.selectedProgress = condition;
      } else if (condition.hotid || condition.hotid == 0) {
        this.selectedSort = condition;
      }
      //根据条件重新排序
      let tempComicList = this.allComic;
      //排序sort
      switch (this.selectedSort.hotid) {
        case 0:
          break;
        case 1:
          tempComicList.sort((a, b) => {
            return b.likes_count - a.likes_count;
          });
          break;
        case 2:
          tempComicList.sort((a, b) => {
            return (
              new Date(b.created_at.match(/^.{10}/)[0]) -
              new Date(a.created_at.match(/^.{10}/)[0])
            );
          });
          break;
      }
      if (this.selectedProgress.code != 1) {
        tempComicList = tempComicList.filter(comic => {
          if (comic.update_status == this.selectedProgress.code) {
            return comic;
          }
        });
      }
      //排序tag
      if (this.selectedTag.tag_id != 0) {
        tempComicList = tempComicList.filter(comic => {
          if (comic.tag_id[0] == this.selectedTag.tag_id) {
            return comic;
          }
        });
      }
      this.sortedComic = arrSlice(tempComicList, 30);
      this.sliceIndex = 0;
    }
  },
  async mounted() {
    const { tags, updateStatus } = JSON.parse(
      this._utils.getLocalStorage("tags")
    );
    this.tags = tags;
    this.updateStatus = updateStatus;
    await allComic().then(res => {
      this.allComic = res;
      this.sortedComic = arrSlice(res, 30);
    });

    if (this.$route.params.id) {
      this.tags.forEach(obj => {
        if (obj.tag_id == this.$route.params.id) {
          this.selectedTag = obj;
        }
      });
    } else {
      this.tags.forEach(obj => {
        if (obj.tag_id == 0) {
          this.selectedTag = obj;
        }
      });
    }
    this.selectedProgress = this.updateStatus[0];
    this.selectedSort = this.sortby[0];
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1116px;
  margin: 0 auto;
  padding-bottom: 41px;
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
      margin: 10px 24px;
      box-sizing: border-box;
      width: 175.2px;
      height: 296px;
    }
  }
}
.nav {
  margin: 40px 0;
  // label导航
  .labelNav {
    border-bottom: 2px solid #222222;
    width: 1068px;
    margin: 20px auto;
    display: flex;
    // justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    span {
      color: #fff;
      display: inline-block;
      line-height: 17px;
      height: 28px;
      padding: 7px 12px 4px 12px;
      background-color: black;
    }
    li {
      display: inline-block;
      line-height: 28px;
      height: 28px;
      padding: 0 12px;
      vertical-align: middle;
    }
    .focus {
      background-color: @focus-color;
    }
    .navLi {
      &:hover {
        color: #138d75;
      }
    }
  }
}
.sort-page {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
