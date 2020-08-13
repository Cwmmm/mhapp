/* eslint-disable vue/no-unused-components */
<template>
  <div id="index">
    <v-header></v-header>
    <v-sider></v-sider>

    <div class="container">
      <!-- 轮播图 -->
      <div class="banner">
        <swiper :bannerInfo="this.bannerInfo" v-if="this.bannerInfo"></swiper>
      </div>
      <div class="labelWrap" v-if="this.tags">
        <ul class="labelNav">
          <router-link
            :to="'tag/' + item.tag_id"
            v-for="item in this.tags"
            :key="item.tag_id"
            tag="li"
            class="navLi"
            >{{ item.title }}</router-link
          >
          <router-link to="tag/0" tag="li" class="navLi lastLi"
            ><svg
              t="1596683586993"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2208"
            >
              <path
                d="M142.08 791.17824H51.98336c-16.56832 0-30.0288 13.47072-30.0288 30.09536 0 16.62976 13.46048 30.11072 30.0288 30.11072H142.08c16.56832 0 30.0288-13.48608 30.0288-30.11072 0.00512-16.62464-13.46048-30.09536-30.0288-30.09536z m829.93664 0H352.29696a30.07488 30.07488 0 0 0-30.03904 30.09536c0 16.62976 13.4656 30.11072 30.03904 30.11072h619.71968c16.5632 0 30.0288-13.48608 30.0288-30.11072 0.00512-16.62464-13.4656-30.09536-30.0288-30.09536zM142.08 481.8944H51.98336c-16.56832 0-30.0288 13.48096-30.0288 30.1056s13.46048 30.10048 30.0288 30.10048H142.08c16.56832 0 30.0288-13.47584 30.0288-30.10048 0.00512-16.62464-13.46048-30.1056-30.0288-30.1056z m829.93664 0H352.29696c-16.57344 0-30.03904 13.48096-30.03904 30.1056s13.4656 30.10048 30.03904 30.10048h619.71968c16.5632 0 30.0288-13.47584 30.0288-30.10048 0.00512-16.62464-13.4656-30.1056-30.0288-30.1056zM142.08 172.6208H51.98336c-16.56832 0-30.0288 13.48096-30.0288 30.1056 0 16.61952 13.46048 30.10048 30.0288 30.10048H142.08c16.56832 0 30.0288-13.47584 30.0288-30.10048 0.00512-16.62464-13.46048-30.1056-30.0288-30.1056z m210.21696 60.20608h619.71456c16.56832 0 30.03392-13.48096 30.03392-30.10048s-13.4656-30.1056-30.03392-30.1056H352.29696c-16.56832 0-30.03392 13.48608-30.03392 30.1056s13.46048 30.10048 30.03392 30.10048z"
                p-id="2209"
              ></path></svg
          ></router-link>
        </ul>
      </div>
      <!-- 推荐&&排行榜 -->
      <div class="homeMayLike">
        <div class="commend">
          <h2>我推荐的你还敢不看?!</h2>
          <div class="cardWrapper">
            <card v-for="item in suggests" :key="item.id" :data="item"></card>
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
                v-for="comic in item.comics"
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
import card from "@/components/Card";
import { banner, suggest, userInfo } from "@/config/API";

export default {
  data() {
    return {
      bannerInfo: null,
      tags: null,
      suggests: null,
      rank: null,
      classify: null,
      userInfo: null
    };
  },
  components: {
    "v-header": Header,
    "v-footer": Footer,
    "v-sider": Sider,
    swiper,
    card
  },
  mounted() {
    userInfo();
    this.$store.state.tags.then(({ data }) => {
      this.tags = data.slice(0, 15);
    });
    banner().then(({ data }) => {
      this.bannerInfo = data.banners;
    });
    suggest().then(({ data }) => {
      this.suggests = data.suggests;
      this.rank = data.rank;
      this.classify = data.classify.slice(0, 5);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  overflow: hidden;
  background-color: #e6e6e6;
  position: relative;
  color: #3f3f3f;
}

// label导航
.labelWrap {
  height: 46px;
  // background-color: #95a5a6;
  .labelNav {
    border-bottom: 1px solid #bdc3c7;
    cursor: pointer;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    font-size: 15px;
    .lastLi {
      height: 26px;
      .icon {
        width: 26px;
        fill: #d35400;
        &:hover {
          fill: #138d75;
        }
      }
    }
    .navLi {
      &:hover {
        color: #138d75;
      }
    }
  }
}

//homelike
.homeMayLike {
  height: 600px;
  width: 1200px;
  margin: 0 auto;
  .commend {
    width: 750px;
    height: 508px;
    float: left;
    h2 {
      font-weight: 500;
      font-size: 24px;
    }
    .cardWrapper {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
    }
  }
  .popularity {
    width: 400px;
    height: 100%;
    float: left;
    margin-left: 50px;
    h2 {
      background-color: #e6e6e6;
      font-size: 24px;
      font-weight: 500;
    }
    .boxWrapper {
      :nth-child(-n + 3) {
        i {
          color: rgb(245, 166, 35);
        }
      }
      .textBox {
        border-left: 1px solid #bdc3c7;
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
