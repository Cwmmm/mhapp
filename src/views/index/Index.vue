/* eslint-disable vue/no-unused-components */
<template>
  <div id="index">
    <v-header></v-header>
    <v-sider v-if="null"></v-sider>

    <div class="container">
      <!-- 轮播图 -->
      <div class="banner">
        <swiper :bannerInfo="this.bannerInfo" v-if="this.bannerInfo"></swiper>
      </div>
      <ul class="labelNav">
        <router-link
          :to="'tag/' + item.tag_id"
          v-for="item in this.tags"
          :key="item.tag_id"
          tag="li"
          class="navLi"
          >{{ item.title }}</router-link
        >
        <router-link to="tag/0" tag="li" class="navLi">全部</router-link>
      </ul>
      <!-- 推荐&&排行榜 -->
      <div class="homeMayLike">
        <div class="recommend">
          <h2>这漫画令我上头!</h2>
          <div class="cardWrap">
            <div class="card" v-for="item in suggests" :key="item.id">
              <router-link
                :to="'comic/' + item.id"
                tag="li"
                :style="{
                  'background-image': 'url(' + item.vertical_image_url + ')'
                }"
                class="cardLi"
              >
                <span v-if="item.category.length >= 1">
                  {{ item.category[0] }}
                </span>
                <span v-if="item.category.length >= 1">
                  {{ item.category[1] }}
                </span>
                <span class="cardTitle">
                  {{ item.title }}
                </span>
              </router-link>
              <div class="bot">
                <span> {{ item.user.nickname }}</span>
                <span> {{ item.likes_count }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="popularity">
          <h2>国漫榜</h2>
          <div class="boxWrapper">
            <div class="textBox" v-for="(item, index) in rank" :key="item.id">
              <i>{{ index }}</i>
              <span>{{ item.title }}</span>
              <span> 更新至 {{ item.latest_comic_title }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 分类推荐 -->
      <div class="navWrapper">
        <nav class="contentNav">
          <!-- //导航 -->
        </nav>
        <div class="sectionGroup">
          <section
            v-for="(item, index) in this.classify"
            :key="index"
            class="secWrapper"
            :id="'section' + index"
          >
            <div class="comicTitle">
              {{ item.title }}
            </div>
            <div class="cardWrapper">
              <router-link
                :to="'/comic/' + comic.id"
                v-for="comic in item.comicArr"
                :key="comic.id"
                tag="ul"
                class="comicCard"
              >
                <div class="comicPic">
                  <img :src="comic.cover_image_url" alt="" />
                </div>
                <div class="comicInfo">
                  <span> {{ comic.title }}</span>
                  <span> {{ comic.description }}</span>
                </div>
              </router-link>
            </div>
          </section>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sider from "@/components/Sidebar";
import swiper from "@/components/swiper/Swiper";
import { comic } from "@/config/API";
export default {
  data() {
    return {
      bannerInfo: null,
      tags: null,
      suggests: null,
      rank: null,
      classify: null
    };
  },
  components: {
    "v-header": Header,
    "v-footer": Footer,
    "v-sider": Sider,
    swiper
  },
  mounted() {
    comic.banner().then(({ data }) => {
      this.bannerInfo = data.banners;
      this.tags = data.tags.slice(0, 15);
    });
    comic.suggest().then(({ data }) => {
      this.suggests = data.suggests;
      this.rank = data.rank;
      this.classify = data.classify.slice(0, 5);
      console.log(this.classify[0].comicArr.length);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  overflow: hidden;
  background-color: #eee;
  position: relative;
}
// 轮播图
.banner {
  height: 450px;
}
// label导航
.labelNav {
  :hover {
    color: red;
  }
  cursor: pointer;
  width: 1200px;
  margin: 10px auto;
  padding: 0;
  background-color: cadetblue;
  .navLi {
    display: inline-block;
    margin-right: 30px;
  }
}
//homelike
.homeMayLike {
  height: 600px;
  width: 1200px;
  margin: 0 auto;
  .recommend {
    width: 750px;
    height: 100%;
    float: left;
    .cardWrap {
      width: 100%;
      height: 450px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .card {
        width: 144px;
        height: 250px;
        .cardLi {
          height: 192px;
          border-radius: 5px;
          background-size: cover;
          background-position: center;
        }
        .bot {
          span:nth-child(1) {
            color: red;
          }
          span:nth-child(2) {
            color: blue;
          }
        }
      }
    }
  }
  .popularity {
    width: 400px;
    height: 100%;
    float: left;
    margin-left: 50px;
    .boxWrapper {
      :nth-child(-n + 3) {
        i {
          color: rgb(245, 166, 35);
        }
      }
      .textBox {
        padding-bottom: 16px;
        i {
          padding-right: 15px;
        }
        span:nth-child(2) {
          max-width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span:nth-child(3) {
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          float: right;
        }
      }
    }
  }
}

//navwrapper
.navWrapper {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  //定位
  .contentNav {
    position: fixed;
    bottom: 200px;
    left: 50%;
    z-index: 54;
    margin-left: -680px;
    width: 52px;
    //ul
  }
  .secWrapper {
    height: 525px;
    margin-bottom: 50px;
    .comicTitle {
      height: 25px;
      font-size: 25px;
    }
    .cardWrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      .comicCard {
        background-color: #fff;
        padding: 0;
        border-radius: 10px;
        overflow: hidden;
        width: 272px;
        height: 220px;
        .comicPic {
          img {
            width: 272px;
            height: 153px;
          }
        }
        .comicInfo {
          padding: 8px 16px 0px 16px;
          span {
            display: inline-block;
            width: 100%;
            height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          span:nth-of-type(1) {
            color: #333333;
          }
          span:nth-of-type(2) {
            color: #666666;
            font-size: 14px;
          }
        }
      }
      .comicCard:hover {
        box-shadow: 2px 3px 2px rgb(155, 154, 154);
      }
    }
  }
}
</style>
