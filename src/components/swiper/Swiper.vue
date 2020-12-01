<template>
  <div class="swiper-container" @mouseover="pause()" @mouseout="play()">
    <div class="viewport">
      <slot @click="to"></slot>
    </div>
    <div class="arrows">
      <div class="left-icon-wrapper">
        <i class="left-icon"
          ><svg
            @click="prev"
            data-v-30200aa2=""
            t="1594284517192"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2679"
            width="50"
            height="50"
            class="icon"
          >
            <path
              data-v-30200aa2=""
              d="M363.840919 472.978737C336.938714 497.358861 337.301807 537.486138 364.730379 561.486138L673.951902 832.05497C682.818816 839.813519 696.296418 838.915012 704.05497 830.048098 711.813519 821.181184 710.915012 807.703582 702.048098 799.94503L392.826577 529.376198C384.59578 522.174253 384.502227 511.835287 392.492414 504.59418L702.325747 223.807723C711.056111 215.895829 711.719614 202.404616 703.807723 193.674252 695.895829 184.943889 682.404617 184.280386 673.674253 192.192278L363.840919 472.978737Z"
              p-id="2680"
            ></path></svg
        ></i>
      </div>
      <div class="right-icon-wrapper">
        <i class="right-icon"
          ><svg
            @click="next()"
            data-v-30200aa2=""
            t="1594284535099"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2802"
            class="icon"
            width="50"
            height="50"
          >
            <path
              data-v-30200aa2=""
              d="M642.174253 504.59418C650.164439 511.835287 650.070886 522.174253 641.84009 529.376198L332.618569 799.94503C323.751654 807.703582 322.853148 821.181184 330.611697 830.048098 338.370249 838.915012 351.847851 839.813519 360.714765 832.05497L669.936288 561.486138C697.36486 537.486138 697.727953 497.358861 670.825747 472.978737L360.992414 192.192278C352.26205 184.280386 338.770837 184.943889 330.858944 193.674252 322.947053 202.404616 323.610556 215.895829 332.340919 223.807723L642.174253 504.59418Z"
              p-id="2803"
            ></path></svg
        ></i>
      </div>
    </div>
    <div class="dots">
      <div
        class="jump-item"
        v-for="(item, index) in children"
        :key="index"
        :class="{ active: currentIndex == index, dot: true }"
        @click="go(index)"
      ></div>
    </div>
  </div>
</template>
<script>
import { throttle } from "@/utils";
export default {
  data() {
    return {
      children: [],
      currentIndex: 0,
      timer: null
    };
  },
  props: {
    //方向
    direction: {
      default: "next"
    },
    //自动播放
    autoPlay: {
      default: true
    },
    //
    interval: {
      default: 3000
    }
  },
  mounted() {
    this.children = this.$children;
    this.setClass();
    if (this.autoPlay) this.play();
  },
  methods: {
    to: function() {
      console.log("ppp");
    },
    play() {
      this.timer = setInterval(() => {
        this.next();
      }, this.interval);
    },
    pause() {
      clearInterval(this.timer);
    },
    //清除类名
    clearClass() {
      this.$children.forEach(ele => {
        ele.$el.classList.remove("active", "prev", "next");
      });
    },
    //设置类名
    setClass() {
      this.clearClass();
      let next =
        this.currentIndex + 1 > this.$children.length - 1
          ? 0
          : this.currentIndex + 1;
      let prev =
        this.currentIndex - 1 < 0
          ? this.$children.length - 1
          : this.currentIndex - 1;
      this.$children[this.currentIndex].$el.classList.add("active");
      this.$children[next].$el.classList.add("next");
      this.$children[prev].$el.classList.add("prev");
    },
    //上一个
    prev: throttle(function() {
      this.currentIndex =
        this.currentIndex - 1 < 0
          ? this.$children.length - 1
          : this.currentIndex - 1;
      this.setClass();
    }, 500),

    //下一个
    next: throttle(function() {
      this.currentIndex =
        this.currentIndex + 1 > this.$children.length - 1
          ? 0
          : this.currentIndex + 1;
      this.setClass();
    }, 500),
    go(index) {
      this.currentIndex = index;
      this.setClass();
    }
  }
};
</script>
<style lang="less" scoped>
.swiper-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .viewport {
    .active {
      display: block;
      z-index: 99;
    }
    .prev {
      display: block;
      transform: translateX(-100%);
      z-index: 98;
    }
    .next {
      display: block;
      transform: translateX(100%);
      z-index: 98;
    }
  }
  .arrows {
    z-index: 999;
    position: absolute;
    width: 100%;
    height: 100%;
    // display: none;
    .left-icon-wrapper,
    .right-icon-wrapper {
      height: 100px;
      width: 30px;
      position: absolute;
      background-color: rgb(185, 185, 185);
    }
    .left-icon-wrapper {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .right-icon-wrapper {
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .left-icon,
    .right-icon {
      fill: #fff;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      :hover {
        fill: @hover-color;
      }
      .icon {
        width: 30px;
      }
    }
  }
  .dots {
    position: absolute;
    bottom: 10px;
    z-index: 999;
    width: 150px;
    height: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    .dot {
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background-color: #fff;
    }
    .active {
      background-color: red;
    }
  }
}
</style>
