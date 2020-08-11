<template>
  <div class="comic">
    <v-header></v-header>
    <div class="container">
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
          <router-link to="/tag/0" tag="li" class="navLi lastLi"
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
      <div class="bg"></div>
      <article>
        <div class="comicInfo" v-if="this.comicInfo">
          <div class="title">{{ this.comicInfo.title }}</div>
          <div
            class="cover"
            :style="{
              background: 'url(' + this.comicInfo.vertical_image_url + ')'
            }"
          ></div>
          <div class="comicDetail">
            <p>
              作者: <em> {{ this.comicInfo.user.nickname }}</em>
            </p>
            <p>
              <span
                >状态:<em> {{ this.comicInfo.update_status }} </em>
              </span>
              <span
                >话数: <em> {{ this.comicInfo.comic_count }} </em>
              </span>
            </p>
            <p>
              简介: <em> {{ this.comicInfo.description }} </em>
            </p>
            <p>
              标签:
              <span
                v-for="(item, index) in this.comicInfo.category"
                :key="index"
              >
                {{ item }}
              </span>
            </p>
            <span>热度xxx</span>
            <div class="btn">
              <span>开始阅读</span>
              <span>收藏</span>
            </div>
          </div>
        </div>
        <div class="chapterNav">
          <h2>漫画列表</h2>
          <div class="chapterList">
            <div
              class="chapterItem"
              v-for="item in this.chapterInfo"
              :key="item.chapter_id"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="comments">
          评论
        </div>
      </article>
    </div>
    <v-sider></v-sider>
    <v-footer></v-footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sider from "@/components/Sidebar";
import { comic } from "@/config/API";
export default {
  components: {
    "v-header": Header,
    "v-footer": Footer,
    "v-sider": Sider
  },
  data() {
    return {
      comicInfo: null,
      chapterInfo: [],
      tags: null
    };
  },
  async mounted() {
    this.$store.state.tags.then(({ data }) => {
      this.tags = data.slice(0, 15);
    });
    const { data } = await comic(this.$route.params.id);
    this.comicInfo = data.comic;
    this.chapterInfo = data.chapters;
  }
};
</script>

<style lang="less" scoped>
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

.bg {
  width: 100%;
  height: 430px;
  background-color: cadetblue;
}
.container {
  article {
    position: relative;
    top: -300px;
    width: 1200px;
    margin: 0 auto;
    background-color: #eeeeee;
    .comicInfo {
      height: 350px;
      border: 1px solid gold;
      position: relative;
      .cover {
        position: absolute;
        top: -60px;
        left: 40px;
        height: 310px;
        width: 240px;
        background-size: cover !important;
        border-radius: 5px;
      }
      .title {
        position: absolute;
        top: -50px;
        left: 320px;
        font-size: 28px;
        font-weight: 500;
      }
      .comicDetail {
        margin-left: 280px;
        padding: 40px;
        .btn {
          span {
            cursor: pointer;
            display: inline-block;
            font-size: 18px;
            padding: 10px;
            text-align: center;
            border: 1px solid gainsboro;
            border-radius: 3px;
            width: 114px;
            height: 47px;
            margin-left: 10px;
            background-color: #73c6b5;
            &:hover {
              background-color: #44b29d;
            }
          }
        }
      }
    }
    .chapterNav {
      height: 343px;
      margin-bottom: 45px;
    }
    .comments {
      margin: 0 auto;
      width: 850px;
      height: 500px;
      border: 1px solid gray;
      margin-bottom: 45px;
    }
  }
}
</style>
