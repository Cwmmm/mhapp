<template>
  <div class="comic">
    <v-header :all="false"></v-header>
    <ul class="labelNav">
      <span class="title"> 全部分类 </span>
      <router-link
        :to="'/tag/' + item.tag_id"
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
    <div class="banner"></div>
    <article v-if="comicInfo">
      <div class="cover">
        <img :src="this.comicInfo.cover_image_url" alt="" />
      </div>
      <div class="comicInfo" v-if="this.comicInfo">
        <div class="info">
          <span class="title">{{ this.comicInfo.title }}</span>
          <ul class="comicDetail">
            <li><span>作者</span> {{ this.comicInfo.user.nickname }}</li>
            <li><span>类型</span> {{ this.comicInfo.category }}</li>
            <li><span>状态</span> {{ this.comicInfo.user.nickname }}</li>
            <li><span>热度</span> {{ this.comicInfo.view_count }}</li>
            <h3>简介</h3>
            <p>{{ this.comicInfo.description }}</p>
            <div class="btn">
              <router-link
                tag="button"
                :to="{
                  path:
                    '/reader/' + chapterInfo[chapterInfo.length - 1].chapter_id,
                  query: { comicId: comicInfo.id }
                }"
              >
                开始阅读</router-link
              >
              <button @click="collect" :class="{ collected: iscollect }">
                {{ iscollect ? "已收藏" : "点击收藏" }}
              </button>
            </div>
          </ul>
        </div>
        <div class="comments">
          <div class="title">
            <span>评论</span>
          </div>
          <div class="inputareaWrap">
            <textarea></textarea>
            <button>发表评论</button>
          </div>
          <ul class="commentator">
            <li
              class="commentItem"
              v-for="(item, index) in this.comments"
              :key="index"
            >
              <span
                ><img class="uhead" :src="item.user_id.cover_img" alt=""
              /></span>
              <span class="uname"> {{ item.user_id.name }} </span>
              <span>·</span>
              <span class="ctime"> 2019/10/9</span>
              <p class="content">{{ item.content }}</p>
              <!-- <button>回复</button> -->
            </li>
          </ul>
          <ul class="commentator none" v-show="this.comments">
            暂无评论
          </ul>
        </div>
      </div>

      <div class="chapter">
        <div class="title">
          <span>全部免费章节</span>
        </div>
        <ul class="chapterList">
          <router-link
            tag="li"
            :to="{
              path: '/reader/' + item.chapter_id,
              query: { comicId: comicInfo.id }
            }"
            class="chapterItem"
            v-for="(item, index) in this.chapterInfo"
            :key="item.chapter_id"
          >
            <span class="title">
              <strong> 第{{ index + 1 }}话: </strong>
              {{ item.title }}
            </span>
            <span class="free">FREE</span>
          </router-link>
        </ul>
      </div>
    </article>
    <v-footer></v-footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { comic, allComment, collect, userInfo } from "@/config/API";
import { local } from "@/config/API/base";
import { convart } from "@/utils";
import { message } from "ant-design-vue";
export default {
  components: {
    "v-header": Header,
    "v-footer": Footer
  },
  data() {
    return {
      local: local,
      comicInfo: null,
      chapterInfo: [],
      tags: null,
      comments: [],
      iscollect: null
    };
  },
  methods: {
    collect: function() {
      if (this._utils.getLocalStorage("userInfo")) {
        collect(this.$route.params.id).then(() => {
          console.log(this.$route.params.id);
          userInfo().then(({ data }) => {
            console.log(data);
            this._utils.setLocalStorage("userInfo", JSON.stringify(data));
            this.iscollect = data.collect.some(e => e == this.$route.params.id);
          });
        });
      } else {
        this.iscollect = false;
        message.info("请登陆后再试！");
      }
    }
  },
  async created() {
    const data = await comic(this.$route.params.id);
    this.comicInfo = data.comic;
    this.comicInfo.view_count = convart(this.comicInfo.view_count, 2);
    this.comicInfo.category = this.comicInfo.category.join("/");
    data.chapters.reverse();
    this.chapterInfo = data.chapters;
    const comments = await allComment();
    this.comments = comments.data;
    //获取收藏状态
    const userInfo = JSON.parse(this._utils.getLocalStorage("userInfo"));
    if (userInfo) {
      this.iscollect = userInfo.collect.some(e => e == this.$route.params.id);
    } else {
      this.iscollect = false;
    }
    //tags
    this.tags = JSON.parse(this._utils.getLocalStorage("tags")).tags.splice(
      0,
      15
    );
  }
};

//分割数组
// function sliceArray(arr, length) {
//   const newArr = [];
//   for (let i = 0; i < Math.ceil(arr.length / length); i++) {
//     newArr.push(arr.slice(i * length, i * length + 20));
//   }
//   return newArr;
// }
</script>

<style lang="less" scoped>
// label导航
.labelNav {
  border-bottom: 2px solid #222222;
  width: 1068px;
  height: 48px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
    line-height: 17px;
    height: 28px;
    padding: 7px 12px 4px 12px;
  }
  .lastLi {
    .icon {
      width: 19px;
      fill: #3f3f3f;
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
.banner {
  width: 1068px;
  height: 200px;
  background-color: black;
  margin: 24px auto;
}
article {
  overflow: hidden;
  width: 1068px;
  margin: 24px auto;
  background-color: #fff;
  box-shadow: 0 0 5px #95a5a6;
  .cover {
    float: left;
    height: 350px;
    width: 696px;
    background-size: cover !important;
    background-position: bottom;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .comicInfo {
    overflow: hidden;
    width: 372px;
    padding: 0 24px;
    float: right;
    .info {
      padding-bottom: 24px;
      .title {
        margin: 24px 0;
        display: inline-block;
        padding: 0 10px;
        font-size: 28px;
        font-weight: 500;
        background-color: black;
        color: #fff;
      }
      .comicDetail {
        p {
          font-size: 15px;
          text-indent: 30px;
          line-height: 25px;
        }
        li {
          padding: 10px 0;
          font-size: 15px;
          span {
            display: inline-block;
            width: 100px;
            font-weight: 700;
            color: #2d2d2d;
          }
        }
        h3 {
          font-size: 15px;
          font-weight: 700;
        }
        .btn {
          button {
            .btn(@width:114px, @height:47px);
            margin-right: 10px;
          }
        }
      }
    }
  }
  .chapter {
    width: 696px;
    padding-top: 375px;
    div.title {
      .emphasize-title-wrap(@width:696px);
      margin-bottom: 0;
    }
    .chapterItem {
      height: 61px;
      border-bottom: 1px solid @light-color;
      padding: 20px;
      transition: all 300ms linear;
      &:hover {
        background-color: black;
        color: #fff;
      }
      .title {
        margin-left: 60px;
        font-size: 15px;
        strong {
          font-weight: 1000;
          padding-right: 10px;
        }
      }
      .free {
        font-size: 13px;
        font-weight: 700;
        background-color: @hover-color;
        padding: 0 3px;
        margin-left: 20px;
      }
    }
  }
  .comments {
    width: 100%;
    .title {
      .emphasize-title-wrap(@width:100%);
    }
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
      font-size: 18px;
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
  .collected {
    background-color: @focus-color!important;
  }
}
</style>
