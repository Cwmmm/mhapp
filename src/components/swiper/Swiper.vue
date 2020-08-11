<template>
  <section class="swiper" @mouseover="pause" @mouseout="play">
    <div class="nav">
      <i class="left_icon"
        ><svg
          @click="back"
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
      <i class="right_icon"
        ><svg
          @click="forward"
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
    <ul class="item_wrap">
      <li
        class="swiper_item"
        v-for="(item, index) in bannerInfo"
        :key="item.index"
        :class="setClass(index)"
        :style="{ background: 'url(' + item.cover_image_url + ')' }"
      ></li>
    </ul>
  </section>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      timer: null
    };
  },
  props: {
    direction: {
      default: "forward",
      require: true
    },
    autoPlay: {
      default: true
    },
    interval: {
      default: 3000
    },
    speed: {
      default: 500
    },
    bannerInfo: {
      required: true,
      type: Array
    }
  },
  mounted() {
    // this.play();
  },
  methods: {
    //播放
    play() {
      this.pause();
      this.timer = setInterval(() => {
        this.forward();
      }, this.interval);
    },
    //暂停
    pause() {
      clearInterval(this.timer);
    },
    //设置class
    setClass(index) {
      let next =
        this.currentIndex === this.bannerInfo.length - 1
          ? 0
          : this.currentIndex + 1;
      let pre =
        this.currentIndex === 0
          ? this.bannerInfo.length - 1
          : this.currentIndex - 1;
      switch (index) {
        case this.currentIndex:
          return "active";
        case next:
          return "next";
        case pre:
          return "prev";
        default:
          return "";
      }
    },
    //后退
    back() {
      setTimeout(() => {
        this.currentIndex =
          this.currentIndex === 0
            ? this.bannerInfo.length - 1
            : this.currentIndex - 1;
      }, 500);
    },
    //前进
    forward() {
      this.currentIndex = ++this.currentIndex % this.bannerInfo.length;
    }
  }
};
</script>
<style lang="less" scoped>
.swiper {
  width: 100vw;
  height: 23vw;
  min-width: 1200px;
  min-height: 276px;
  background-color: #95a5a6;
  position: relative;
}
.swiper_item {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 44.5%;
  height: 90%;
  z-index: 2;
  transition: all 500ms ease-in-out;
  background-size: cover !important;
  background-position: center !important;
}
.prev {
  transform: translate(-153%, -50%);
  z-index: 98;
}
.next {
  transform: translate(53%, -50%);
  z-index: 97;
}
.active {
  z-index: 99;
  height: 92%;
}
// nav
.left_icon,
.right_icon,
.dots {
  z-index: 99;
}
.left_icon {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.right_icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.left_icon:hover,
.right_icon:hover {
  fill: orange;
}

// swiper item样式
.item_wrap {
  margin: 0;
  padding: 0 10px 10px 10px;
  width: 100%;
  height: 100%;
  position: relative;
}


</style>
