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
            <p class="tag">
              标签:
              <span
                v-for="(item, index) in this.comicInfo.category"
                :key="index"
              >
                {{ item }}
              </span>
            </p>
            <div class="hot">
              <svg
                t="1597325194201"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3781"
              >
                <path
                  d="M423.477333 938.666667S45.045333 855.424 214.186667 442.282667c0 0 38.4 45.909333 33.12 68 0 0 30.101333-104.277333 95.072-166.570667C398.165333 290.186667 454.848 139.712 402.570667 85.333333c0 0 258.933333 54.378667 287.754666 326.378667 0 0 33.12-86.666667 101.12-95.232 0 0-20.906667 47.616 0 119.04 0 0 214.485333 367.146667-155.157333 491.242667 0 0 110.805333-125.813333-124.181333-341.717334 0 0-55.402667 115.626667-88.533334 156.373334-0.096 0.106667-92.522667 103.722667-0.096 197.248z"
                  p-id="3782"
                ></path>
              </svg>
              <span>{{ this.comicInfo.view_count }}</span>
              <svg
                t="1597325160777"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3651"
              >
                <path
                  d="M621.674667 408.021333c16.618667-74.24 28.224-127.936 34.837333-161.194666C673.152 163.093333 629.941333 85.333333 544.298667 85.333333c-77.226667 0-116.010667 38.378667-138.88 115.093334l-0.586667 2.24c-13.728 62.058667-34.72 110.165333-62.506667 144.586666a158.261333 158.261333 0 0 1-119.733333 58.965334l-21.909333 0.469333C148.437333 407.808 106.666667 450.816 106.666667 503.498667V821.333333c0 64.8 52.106667 117.333333 116.394666 117.333334h412.522667c84.736 0 160.373333-53.568 189.12-133.92l85.696-239.584c21.802667-60.96-9.536-128.202667-70.005333-150.186667a115.552 115.552 0 0 0-39.488-6.954667H621.674667z"
                  p-id="3652"
                ></path>
              </svg>
              <span>{{ this.comicInfo.likes_count }}</span>
            </div>
            <div class="btn">
              <span>开始阅读</span>
              <span>收藏</span>
            </div>
          </div>
        </div>
        <div class="chapterNav">
          <div class="navTitle">
            <h2>漫画列表</h2>
            <div class="listSort"><span>升序</span><span></span>降序</div>
          </div>
          <ul>
            <li>全部免费漫画</li>
            <li>上次看到:</li>
            <li>最新章节:</li>
            <li>1-50</li>
            <li>最近</li>
            <li>全部</li>
          </ul>
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
  background-color: #95a5a6;
}
.container {
  background-color: #e6e6e6;
  article {
    position: relative;
    top: -300px;
    width: 1200px;
    margin: 0 auto;
    background-color: #d5dbdb;
    box-shadow: 0 0 5px #95a5a6;
    .comicInfo {
      height: 320px;

      position: relative;
      .cover {
        position: absolute;
        top: -60px;
        left: 40px;
        height: 310px;
        width: 240px;
        background-size: cover !important;
        border-radius: 5px;
        border: 1px solid #95a5a6;
      }
      .title {
        position: absolute;
        top: -50px;
        left: 315px;
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
    .comicDetail {
      height: 100%;
      p {
        font-size: 15px;
        span {
          margin-right: 20px;
        }
        &.tag {
          margin-bottom: 40px;
          span {
            text-align: center;
            margin: 0 10px;
            background-color: rgba(139, 160, 180, 0.465);
          }
        }

        em {
          font-weight: 600;
        }
      }
      .hot {
        height: 47px;
        width: 200px;
        float: right;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .icon {
          margin-left: 20px;
          fill: gray;
          height: 30px;
          &:hover {
            fill: #44b29d;
          }
        }
        span {
          font-size: 20px;
          width: 50px;
          overflow: hidden;
          display: inline-block;
        }
        // background-color: #fff;
      }
    }

    .chapterNav {
      height: 380px;
      margin-bottom: 45px;
      .chapterList {
        height: 350px;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
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
