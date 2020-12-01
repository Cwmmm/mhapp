<template>
  <div class="reader">
    <v-header></v-header>
    <div class="container">
      <div class="crumb" v-if="comicInfo">
        <router-link tag="span" to="/">首页</router-link>
        <span> > </span>
        <router-link tag="span" :to="'/comic/' + this.comicInfo.id">{{
          this.comicInfo.title
        }}</router-link>
        <span> > </span>
        <span> {{ this.thisChapter }} </span>
      </div>
      <p>该资源爬取自互联网.</p>
      <div class="loading" v-show="!imgList">
        正在爬取数据...
      </div>
      <ul class="imgList">
        <li class="imgItem" v-for="url in this.imgList" :key="url">
          <img :data-src="url" class="lazy-image" alt="" />
        </li>
      </ul>
    </div>

    <div :class="{ catelog: true, hide: showNav }">
      <button @click="changeNav">目录</button>
      <ul class="chapterList">
        <router-link
          tag="li"
          :to="{
            path: '/reader/' + item.chapter_id,
            query: { comicId: $route.query.comicId }
          }"
          v-for="item in chapterList"
          :key="item.chapter_id"
          :class="{ currentchap: item.chapter_id == $route.params.id }"
        >
          {{ item.title }}
        </router-link>
      </ul>
      <div class="total">共{{ chapterList.length }}话免费章节</div>
    </div>
    <button class="navBtn" @click="changeNav">
      <em>&lt;</em>
    </button>
    <div :class="{ hide: showNav }" class="nav">
      <ul class="wrap">
        <li @click="swicher('prev')">&lt;上一话</li>
        <li @click="swicher('next')">下一话&gt;</li>
        <li @click="collect" :class="{ collected: iscollect }">
          {{ iscollect ? "已收藏" : "点击收藏" }}
        </li>
        <li @click="like" :class="{ liked: islike }">
          {{ islike ? "已点赞" : "点赞" }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { lazyLoad } from "@/utils";
import {
  chapterDetail,
  imgList,
  addRecord,
  userInfo,
  collect,
  like
} from "@/config/API";
import { message } from "ant-design-vue";
export default {
  components: {
    "v-header": Header
  },
  data() {
    return {
      imgList: null,
      chapterList: [],
      comicInfo: null,
      showNav: true,
      iscollect: null,
      islike: null
    };
  },

  computed: {
    thisChapter() {
      const thisChapter = this.chapterList.find(
        ele => ele.chapter_id == this.$route.params.id
      );
      return thisChapter.title;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    const list = await imgList(this.$route.params.id);
    this.imgList = list.imgList;
    console.log(to);
    if (userInfo) {
      await addRecord(
        this.comicInfo.id,
        to.params.id,
        this.comicInfo.title,
        this.thisChapter
      );
      userInfo().then(res => {
        this._utils.setLocalStorage("userInfo", JSON.stringify(res.data));
      });
    }
    document.documentElement.scrollTop = 0;
    next();
  },
  watch: {},
  methods: {
    collect: function() {
      if (this._utils.getLocalStorage("userInfo")) {
        collect(this.$route.query.comicId).then(() => {
          userInfo().then(({ data }) => {
            this._utils.setLocalStorage("userInfo", JSON.stringify(data));
            this.iscollect = data.collect.some(
              e => e == this.$route.query.comicId
            );
          });
        });
      } else {
        this.iscollect = false;
        message.info("请登陆后再试！");
      }
    },
    like: function() {
      if (this._utils.getLocalStorage("userInfo")) {
        like(this.$route.query.comicId).then(() => {
          userInfo().then(({ data }) => {
            this._utils.setLocalStorage("userInfo", JSON.stringify(data));
            this.islike = data.like.some(e => e == this.$route.query.comicId);
          });
        });
      } else {
        this.islike = false;
        message.info("请登陆后再试！");
      }
    },
    //更换章节
    async to(cId) {
      this.imgList = null;
      this.$router.push({
        path: "/reader/" + cId,
        query: { comicId: this.$route.query.comicId }
      });
    },
    changeNav() {
      document.querySelector(".chapterList").scrollTop =
        this.chapterList.indexOf(this.$route.params.id) * 40;
      this.showNav = !this.showNav;
    },
    swicher(keyword) {
      const index = this.chapterList.findIndex(
        ele => ele.chapter_id == this.$route.params.id
      );
      if (keyword == "prev") {
        if (this.chapterList[index - 1]) {
          this.to(this.chapterList[index - 1].chapter_id);
        } else {
          message.info("前面没有了嗷！");
        }
      } else if (keyword == "next") {
        if (this.chapterList[index + 1]) {
          this.to(this.chapterList[index + 1].chapter_id);
        } else {
          message.info("后面没有了嗷！");
        }
      }
    },
    addCollection() {
      return;
    }
  },
  async created() {
    const info = await chapterDetail(
      this.$route.query.comicId,
      this.$route.params.id
    );

    this.comicInfo = info.comicInfo;
    info.chapterList.reverse();
    this.chapterList = info.chapterList;

    const list = await imgList(this.$route.params.id);
    this.imgList = list.imgList;

    const userInfoData = JSON.parse(this._utils.getLocalStorage("userInfo"));
    if (userInfoData) {
      await addRecord(
        this.comicInfo.id,
        this.$route.params.id,
        this.comicInfo.title,
        this.thisChapter
      );
      userInfo().then(res => {
        this._utils.setLocalStorage("userInfo", JSON.stringify(res.data));
      });
    }
    if (userInfoData) {
      this.iscollect = userInfoData.collect.some(
        e => e == this.$route.query.comicId
      );
    } else {
      this.iscollect = false;
    }
    if (userInfoData) {
      this.islike = userInfoData.like.some(e => e == this.$route.query.comicId);
    } else {
      this.islike = false;
    }
  },
  updated() {
    lazyLoad(".lazy-image");
  }
};
</script>
<style lang="less" scoped>
.reader {
  .container {
    min-height: 90vh;
    width: 1068px;
    margin: 0 auto;
    font-size: 18px;
    position: relative;
    .crumb {
      padding: 24px 0;
      text-align: center;
    }
    p {
      margin-bottom: 24px;
      text-align: center;
    }
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(87, 87, 187, 0.445);
    }
    .imgList {
      width: 100%;
      text-align: center;
      .imgItem {
        .lazy-image {
          display: inline-block;
          width: 564px;
          height: 300px;
          background: url("../assets/loading.gif") no-repeat;
          background-size: cover;
        }
      }
    }
  }
  //目录
  .catelog {
    position: fixed;
    right: 0;
    top: 30%;
    width: 350px;
    background-color: #f1f3f2;
    // background-color: black;
    transition: 300ms all linear;
    .chapterList {
      max-height: 540px;
      overflow: scroll;
      padding: 10px;
      li {
        font-size: 16px;
        padding: 7px;
      }
      .currentchap {
        color: red;
      }
    }
    button {
      .btn(@width:30px, @height: 70px);
      position: absolute;
      left: -30px;
      top: 0;
    }
    .total {
      height: 40px;
      color: #fff;
      background-color: @btn-color;
      text-align: center;
      padding-top: 9px;
      font-size: 15px;
    }
  }
  //底部导航栏按钮
  .navBtn {
    z-index: 99;
    outline: none;
    border: 0;
    position: fixed;
    right: 0px;
    bottom: 10px;
    width: 35px;
    height: 35px;
    background-color: black;
    color: #fff;
    font-size: 25px;
    transition: 300ms all linear;
    &:hover {
      background-color: @hover-color;
    }
    &:active {
      background-color: @focus-color;
    }
    em {
      display: block;
      width: 100%;
      height: 100%;
      transform: translateY(-3px);
    }
  }
  .radio {
    border-radius: 23px 0 0 23px;
  }

  //底部导航栏

  .nav {
    position: fixed;
    right: 35px;
    bottom: 10px;
    color: #fff;
    height: 35px;
    font-size: 16px;
    transition: 300ms all linear;
    .collected {
      color: @focus-color;
    }
    .liked {
      color: @author-color;
    }
    li {
      &:first-child {
        border-radius: 23px 0 0 23px;
        padding-left: 20px;
      }
      background-color: @btn-color;
      &:hover {
        background-color: @hover-color;
      }
      &:active {
        background-color: @focus-color;
      }
      vertical-align: middle;
      line-height: 35px;
      display: inline-block;
      padding: 0 10px;
    }
  }
  .hide {
    transform: translateX(100%);
  }
}
</style>
