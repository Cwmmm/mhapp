<template>
  <div class="rank">
    <v-header></v-header>
    <div class="container">
      <div class="rankNavBar">
        <ul class="rankNavList">
          <li
            class="rankNavItem"
            v-for="(item, index) in rankNavTag"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="listContainer">
        <ul
          class="rankList"
          v-for="(arrItem, arrindex) in allComic"
          :key="arrindex"
        >
          <h2>{{ rankNavTag[arrindex + 1] }}</h2>
          <li
            class="rankListItem"
            v-for="(item, index) in arrItem"
            :key="item.comic_id"
          >
            <div class="line">
              <span class="index">{{ index + 1 }}</span>
              <span class="title">{{ item.title }}</span>
              <span class="author">{{ item.user.nickname }}</span>
            </div>
            <div class="hoverCard">
              <div
                class="cardWrap"
                :style="{ background: 'url(' + item.vertical_image_url + ')' }"
              >
                <span>{{ item.category[0] }}</span>
                <span>{{ item.category[1] }}</span>
              </div>
              <router-link tag="h3" :to="'/comic/' + item.id">
                <em>{{ index + 1 }}</em
                >{{ item.title }}</router-link
              >

              <span class="nickname">{{ item.user.nickname }}</span>
              <p>{{ item.description }}</p>
              <span
                class="lastTitle
              "
                >{{ item.latest_comic_title }}</span
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allComic } from "@/config/API";
import { arrSlice } from "@/utils";
export default {
  components: {
    "v-header": Header,
    "v-footer": Footer
  },
  data() {
    return {
      allComic: null,
      rankNavTag: [
        "全部",
        "少女榜",
        "青女榜",
        "少年榜",
        "青年榜",
        "人气榜",
        "新作榜",
        "畅销榜",
        "日漫榜",
        "韩漫榜"
      ]
    };
  },

  async mounted() {
    await allComic().then(res => {
      this.allComic = arrSlice(res, 10).slice(0, 9);
    });
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1068px;
  margin: 0 auto;
  padding-bottom: 41px;
  .rankNavBar {
    margin: 40px 0;
    border-bottom: 1px solid @light-color;
    .rankNavList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 20px;
      .rankNavItem {
        &:hover {
          color: @focus-color;
        }
      }
    }
  }
  .listContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    h2 {
      margin-bottom: 20px;
      padding: 0 10px;
    }
    .rankList {
      width: 33%;
      margin-bottom: 20px;

      .rankListItem {
        &:hover {
          .line {
            display: none;
          }
          .hoverCard {
            display: block;
          }
        }
        padding: 10px;
        width: 100%;
        display: inline-block;
        line-height: 40px;
        vertical-align: middle;
        &:nth-child(2n + 1) {
          background-color: rgba(238, 238, 238, 0.2);
        }
        .hoverCard {
          height: 160px;
          width: 100%;
          overflow: hidden;
          display: none;
          &:hover {
            box-shadow: 2px 2px 2px #eee;
          }
          .cardWrap {
            float: left;
            width: 118px;
            height: 160px;
            overflow: hidden;
            position: relative;
            background-size: cover !important;
            position: relative;
            margin-right: 10px;
            &:hover {
              border: 1px solid @light-color;
            }
            span {
              color: #fff;
              font-size: 12px;
              position: absolute;
              bottom: 0;
              display: inline-block;
              line-height: 16px;
              text-align: center;
              vertical-align: middle;
              width: 30px;
              background-color: rgba(0, 0, 0, 0.5);
              border-radius: 2px;
            }
            span:nth-of-type(2) {
              left: 35px;
            }
          }
          h3 {
            line-height: 100%;
            font-weight: 700;
            margin: 0;
            &:hover {
              color: @hover-color;
            }
            em {
              color: @focus-color;
            }
            span {
              line-height: 100%;
              text-align: center;
              color: #eee;
              background-color: red;
              vertical-align: middle;
            }
          }
          p {
            // width: 100%;
            line-height: 20px;
            height: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0;
            margin-top: 10px;
          }
          .lastTitle {
            color: #333;
          }
          .nickname {
            color: orange;
          }
        }
        .index {
          color: rgba(255, 166, 0, 0.562);
          padding-right: 20px;
        }
        .title {
          font-size: 16px;
          display: inline-block;
          width: 200px;
          white-space: nowrap;
          overflow: convert;
          text-overflow: ellipsis;
        }
        .author {
          display: inline-block;
          text-align: right;
          float: right;
          width: 80px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
