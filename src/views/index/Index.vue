/* eslint-disable vue/no-unused-components */
<template>
  <div id="index">
    <v-header></v-header>
    <div class="container">
      <div class="topwrap">
        <!-- 轮播图 -->
        <div class="banner">
          <swiper v-if="bannerInfo" @click="to('123')">
            <swiperItem v-for="item in bannerInfo" :key="item.id">
              <div class="img-wrapper">
                <img :src="item.cover_image_url" alt="" />
              </div>
            </swiperItem>
          </swiper>
        </div>
        <!-- 漫画榜 -->
        <div class="rank">
          <div class="title">
            <span>国漫榜</span>
          </div>
          <div class="boxWrapper">
            <div class="textBox" v-for="(item, index) in rank" :key="index">
              <div class="imgWrap">
                <i>{{ index + 1 }}</i>
                <img :src="item.vertical_image_url" alt="" />
              </div>
              <div class="info">
                <router-link tag="h3" :to="/comic/ + item.id">{{
                  item.title
                }}</router-link>
                <div>
                  <span> {{ item.user.nickname }}</span>
                  <span>-</span>
                  <span> {{ item.category }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="homeMayLike">
          <div class="title">
            <span>推荐</span>
          </div>
          <div class="cardWrapper">
            <div class="cardItem" v-for="item in suggests" :key="item.id">
              <card :data="item"></card>
            </div>
          </div>
        </div>
      </div>
      <!-- 分类导航 -->
      <ul class="labelNav">
        <span class="title"> 全部分类 </span>
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
      <!-- 分类推荐 -->
      <div class="navContainer">
        <div class="navWrapper">
          <section
            v-for="(item, index) in this.classify"
            :key="index"
            class="secWrapper"
            :id="'section' + index"
          >
            <div class="comicTitle">
              <span>{{ item.title }}</span>
              <router-link tag="span" to="/tag/0"></router-link>
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
        <div class="dailyUpdate">
          <div class="title">
            <span>最近更新</span>
          </div>
          <div class="boxWrapper">
            <div class="textBox" v-for="(item, index) in rank" :key="index">
              <div class="imgWrap">
                <img :src="item.vertical_image_url" alt="" />
              </div>
              <div class="info">
                <router-link tag="h3" :to="/comic/ + item.id">{{
                  item.title
                }}</router-link>
                <div>
                  <span> {{ item.user.nickname }}</span>
                  <span>-</span>
                  <span>{{ item.category }}</span>
                </div>
                <div class="update-time">
                  最近更新: {{ item.latest_comic_title }}
                </div>
              </div>
            </div>
          </div>
          <div class="comments">
            <div class="title">
              <span>留言</span>
            </div>
            <div class="inputareaWrap">
              <textarea v-model="messageContent"></textarea>
              <button @click="subMessage()">发表评论</button>
            </div>
            <ul class="commentator" v-if="comments">
              <li
                class="commentItem"
                v-for="(item, index) in comments"
                :key="index"
              >
                <span><img class="uhead" :src="item.cover_img" alt=""/></span>
                <span class="uname"> {{ item.name }} </span>
                <span>·</span>
                <span class="ctime"> {{ item.create_time.slice(0, 10) }}</span>
                <p class="content">{{ item.content }}</p>
              </li>
            </ul>
            <ul class="commentator none" v-if="!comments">
              暂无留言
            </ul>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import swiper from "@/components/swiper/Swiper";
import swiperItem from "@/components/swiper/SwiperItem";
import card from "@/components/Card";
import { banner, suggest, messageList, leaveMessage, tag } from "@/config/API";
import { message } from "ant-design-vue";

export default {
  data() {
    return {
      bannerInfo: null,
      tags: null,
      suggests: null,
      rank: null,
      classify: null,
      comments: null,
      messageContent: ""
    };
  },
  components: {
    "v-header": Header,
    "v-footer": Footer,
    swiper,
    swiperItem,
    card
  },
  methods: {
    subMessage: async function() {
      const userInfo = JSON.parse(this._utils.getLocalStorage("userInfo"));
      if (userInfo) {
        if (this.messageContent != "") {
          const res = await leaveMessage(
            this.messageContent,
            userInfo.cover_img,
            userInfo.name
          );
          if (res.messageList) {
            res.messageList.reverse();
            this.comments = res.messageList.slice(0, 8);
          }
        } else {
          message.warning("请输入内容再发送！");
        }
      } else {
        message.info("请登陆后再试！");
      }
    }
  },
  mounted() {
    //获取轮播图数据
    banner().then(res => {
      this.bannerInfo = res;
    });
    //获取分类推荐
    suggest().then(res => {
      this.suggests = res.suggests.slice(0, 8);
      this.rank = res.rank.slice(0, 7);
      this.rank.forEach(one => {
        one.category = one.category.join("/");
      });
      this.classify = res.classify.slice(0, 5);
    });
    //获取留言
    messageList().then(res => {
      res.messageList.reverse();
      this.comments = res.messageList.slice(0, 8);
    });

    //获取分类
    tag().then(res => {
      this.tags = res.tags.slice(0, 15);
      this._utils.setLocalStorage("tags", JSON.stringify(res));
    });
  }
};
</script>

<style lang="less" scoped>
//右侧盒包装
.boxWrapper() {
  .textBox {
    padding-bottom: 26px;
    .imgWrap {
      float: left;
      width: 100px;
      height: 70px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
      }
      i {
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        color: #fff;
        background-color: #7a7a7a;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .info {
      width: 100%;
      height: 70px;
      margin-left: 116px;
      h3 {
        color: @main-color;
        font-size: 1rem;
        width: 100%;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
          color: @hover-color;
        }
      }
      div {
        display: flex;
        span {
          color: #777777;
          font-size: 13px;
        }
        span:nth-of-type(1) {
          max-width: 108px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: "";
          color: #d55;
        }
        span:nth-of-type(2) {
          padding: 0 3px;
        }
      }
      .update-time {
        padding-top: 8px;
        color: #777777;
      }
    }
  }
}

.img-wrapper {
  img {
    height: 100%;
    width: 100%;
  }
}

.container {
  background-color: #fff;
  color: #3f3f3f;
  .topwrap {
    overflow: hidden;
    width: 1116px;
    margin: 24px auto;
    margin-bottom: 0;
    .banner {
      float: left;
      padding: 0 24px;
      width: 744px;
      height: 350px;
      overflow: hidden;
    }
    .homeMayLike {
      margin-top: 350px;
      width: 100%;
      padding: 24px;
      padding-bottom: 0;
      div.title {
        .emphasize-title-wrap(@width: 696px);
      }
      .cardWrapper {
        width: 100%;
        height: 600px;
        .cardItem {
          width: 213.6px;
          height: 297px;
          padding-right: 24px;
          float: left;
          overflow: hidden;
        }
        .cardItem:nth-of-type(2) {
          margin: 0 39px;
        }
      }
    }
    .rank {
      z-index: 99;
      padding: 0 24px;
      float: right;
      width: 372px;
      div.title {
        .emphasize-title-wrap(@width: 100%);
      }
      .boxWrapper {
        .boxWrapper();
      }
    }
  }
}

// label导航
.labelNav {
  .labelNav();
}
.comments {
  width: 100%;
  // .title {
  //   .emphasize-title-wrap(@width:100%);
  // }
  .inputareaWrap {
    margin-bottom: 24px;
    textarea {
      width: 100%;
      height: 100px;
      outline: none;
      border: 1px solid @title-border;
      background-color: #f4f4f4;
      font-size: 16px;
      &:focus {
        border: 1px solid @title-border;
      }
    }
    button {
      .btn(@width:100%, @height:39px);
    }
  }
  .none {
    text-align: center;
  }
  .commentator {
    .commentItem {
      padding-bottom: 24px;
      .uhead {
        float: left;
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      span {
        padding-right: 10px;
        font-weight: 700;
      }
      .ctime {
        font-weight: normal;
        color: @light-color;
      }
      .content {
        font-size: 15px;
        margin-top: 20px;
        margin-left: 50px;
      }
      button {
        float: right;
        .btn (@width:50px, @height:25px);
      }
    }
  }
}
//navwrapper
.navContainer {
  width: 1116px;
  margin: 0 auto;
  overflow: hidden;
  .dailyUpdate {
    padding: 0 24px;
    float: right;
    width: 372px;
    div.title {
      height: 61px;
      padding: 15px 0;
      span:nth-of-type(1) {
        float: left;
        font-size: 24px;
        transform: translateY(-4px);
      }
    }
    .boxWrapper {
      .boxWrapper();
    }
  }
  .navWrapper {
    width: 744px;
    padding: 0 24px;
    float: left;
    .secWrapper {
      height: 525px;
      margin-bottom: 50px;
      .comicTitle {
        height: 61px;
        padding: 15px 0;
        span:nth-of-type(1) {
          float: left;
          font-size: 24px;
          transform: translateY(-4px);
        }
        span:nth-of-type(2) {
          padding: 3px;
          float: right;
          font-size: 24px;
          height: 30px;
          width: 30px;
          border: 1px solid #222222;
          position: relative;
          &::before {
            content: ">";
            position: absolute;
            font-size: 30px;
            top: -10px;
            left: 5px;
          }
          &:hover {
            background-color: #138d75;
            border: 0;
          }
        }
      }
      .cardWrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        border-bottom: 2px solid #222222;
        .comicCard {
          background-color: #fff;
          // padding-bottom: 24px;
          margin-bottom: 24px;
          overflow: hidden;
          width: 324px;
          height: 233px;
          .comicPic {
            width: 324px;
            height: 160px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .comicInfo {
            // padding: 8px 16px 0px 16px;
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
}
</style>
