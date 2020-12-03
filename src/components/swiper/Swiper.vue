<template>
  <div
    class="swiper-container"
    :style="{
      width: width ? width + 'px' : '100%',
      height: height ? height + 'px' : '100%'
    }"
    @mouseover="pause()"
    @mouseout="autoplay == 'true' ? play() : ''"
  >
    <!-- 轮播图片 -->
    <div class="viewport">
      <slot></slot>
    </div>
    <!-- 箭头 -->
    <div class="arrows">
      <div class="icon-wrapper left-icon-wrapper">
        <svg
          @click="prev"
          data-v-30200aa2
          t="1594284517192"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2679"
          class="icon"
        >
          <path
            data-v-30200aa2
            d="M363.840919 472.978737C336.938714 497.358861 337.301807 537.486138 364.730379 561.486138L673.951902 832.05497C682.818816 839.813519 696.296418 838.915012 704.05497 830.048098 711.813519 821.181184 710.915012 807.703582 702.048098 799.94503L392.826577 529.376198C384.59578 522.174253 384.502227 511.835287 392.492414 504.59418L702.325747 223.807723C711.056111 215.895829 711.719614 202.404616 703.807723 193.674252 695.895829 184.943889 682.404617 184.280386 673.674253 192.192278L363.840919 472.978737Z"
            p-id="2680"
          />
        </svg>
      </div>
      <div class="icon-wrapper right-icon-wrapper">
        <svg
          @click="next()"
          data-v-30200aa2
          t="1594284535099"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2802"
          class="icon"
        >
          <path
            data-v-30200aa2
            d="M642.174253 504.59418C650.164439 511.835287 650.070886 522.174253 641.84009 529.376198L332.618569 799.94503C323.751654 807.703582 322.853148 821.181184 330.611697 830.048098 338.370249 838.915012 351.847851 839.813519 360.714765 832.05497L669.936288 561.486138C697.36486 537.486138 697.727953 497.358861 670.825747 472.978737L360.992414 192.192278C352.26205 184.280386 338.770837 184.943889 330.858944 193.674252 322.947053 202.404616 323.610556 215.895829 332.340919 223.807723L642.174253 504.59418Z"
            p-id="2803"
          />
        </svg>
      </div>
    </div>
    <!-- 底部圆点 -->
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
export default {
  data() {
    return {
      children: [],
      currentIndex: 0,
      timer: null,
      motion: true
    };
  },
  props: {
    //宽度
    width: { type: String },
    //高度
    height: { type: String },
    //方向
    direction: {
      default: "next"
    },
    //自动播放
    autoplay: {
      default: false
    },
    //延时
    interval: {
      default: 3000
    }
  },
  mounted() {
    this.children = this.$children;
    this.setClass();
    if (this.autoplay == "true") {
      this.play();
    }
  },
  methods: {
    play() {
      if (this.direction == "prev") {
        this.timer = setInterval(() => {
          this.prev();
        }, this.interval);
      } else {
        this.timer = setInterval(() => {
          this.next();
        }, this.interval);
      }
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
    //节流
    throttle: function() {
      setTimeout(() => {
        this.motion = true;
      }, 500);
    },
    //上一个
    prev: function() {
      if (this.motion) {
        this.currentIndex =
          this.currentIndex - 1 < 0
            ? this.$children.length - 1
            : this.currentIndex - 1;
        this.setClass();
        this.motion = false;
        this.throttle();
      }
    },
    //下一个
    next: function() {
      if (this.motion) {
        this.currentIndex =
          this.currentIndex + 1 > this.$children.length - 1
            ? 0
            : this.currentIndex + 1;
        this.setClass();
        this.motion = false;
        this.throttle();
      }
    },
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
  background-color: #eee;
  overflow: hidden;
  //轮播图
  .viewport {
    .active {
      display: block;
      z-index: 99;
      transition: all 500ms ease-in-out;
    }
    .prev {
      display: block;
      transform: translateX(-100%);
      z-index: 98;
      transition: all 500ms ease-in-out;
    }
    .next {
      display: block;
      transform: translateX(100%);
      z-index: 98;
      transition: all 500ms ease-in-out;
    }
  }
  //箭头
  .arrows {
    .icon-wrapper {
      z-index: 99;
      height: 25%;
      width: 4%;
      position: absolute;
      background-color: rgba(153, 153, 153, 0.5);
      top: 50%;
      transform: translateY(-50%);
      &:hover {
        background-color: rgba(153, 153, 153, 0.7);
        .icon {
          fill: #44b29d;
        }
      }
    }
    .left-icon-wrapper {
      left: 0;
    }
    .right-icon-wrapper {
      right: 0;
    }
    .icon {
      height: 45%;
      fill: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  //底部圆点
  .dots {
    z-index: 99;
    width: 30%;
    position: absolute;
    bottom: 2%;
    left: 50%;
    transform: translateX(-50%);
    height: 1.5%;
    display: flex;
    justify-content: space-between;
    .dot {
      border-radius: 1px;
      margin: 0 1.5%;
      transition: 500ms linear all;
      flex: 0.8;
      background-color: rgba(255, 255, 255, 0.5);
    }
    .active {
      flex: 1.5;
      background-color: #44b29d;
    }
  }
}
</style>
