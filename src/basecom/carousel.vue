<template>
<div class="swiper-container1">
  <!-- <div class="swiper-wrapper swiper-no-swiping">
    <div v-if="showpc" @click="alertTO(setswiperstyle.sta)"  class="swiper-slide pc" v-for="img in setswiperstyle.img" :style="setswiperstyle" ><img :style="imgcls"  :src="PORSCHE_HOST+img.picture_path"></div>
    <div v-if="showapp" @click="alertTO(setswiperstyle.sta)" class="swiper-slide app" v-for="img in setswiperstyle.img" :style="setswiperstyle" ><img :style="imgcls"  :src="PORSCHE_HOST+img.picture_path_app"></div>
  </div> -->
  <swiper :options="swiperOption" ref="mySwiper">
  <!-- slides -->
    <swiper-slide  v-if="showpc" @click="alertTO(setswiperstyle.sta)"  v-for="img in setswiperstyle.img" :style="setswiperstyle">
      <img :style="imgcls"  :src="PORSCHE_HOST+img.picture_path">
    </swiper-slide>
    <swiper-slide  v-if="showapp" @click="alertTO(setswiperstyle.sta)"  v-for="img in setswiperstyle.img" :style="setswiperstyle">
      <img :style="imgcls"  :src="PORSCHE_HOST+img.picture_path_app">
    </swiper-slide>
</swiper>
   <div class="swiper-pagination"  slot="pagination"></div>
</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import {PORSCHE_HOST} from '../common/js/host';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    setswiperstyle: {
      width: "",
      height: "",
      img: [],
      sta:"",
    },
  },
  data() {
    return {
      swiperOption:{
          pagination : '.swiper-pagination',
          effect: 'fade',
          direction: 'horizontal',
          loop: false,
          autoplay: 6000,
      },
      iewidth:false,
      showapp: false,
      showpc: false,
      PORSCHE_HOST,
      imgcls:{},
    };
  },

  methods: {
    alertTO(sta){
      if(sta === "login" ){
        this.$alert('请先注册成为会员，浏览更多挚享汇专属活动', '提示', {
          confirmButtonText: '确定',
        });
      }
    },
  },
  mounted() {
    // setTimeout(function(){
      // let mySwiper = new Swiper('.swiper-container1', {
      //   pagination : '.swiper-pagination',
      //   effect: 'fade',
      //   direction: 'horizontal',
      //   loop: true,
      //   autoplay: 6000,
      //
      // })
    // },2000)
    var d = {
      PC: {
        width: 1604,
        height: 621,
        ratio: 1604 / 621
      },
      MOBILE: {
        width: 640,
        height: 853,
        ratio: 640 / 853
      }
    };
    var t = $(".swiper-slide"),
    e = $(".ui-head");//头部
    var i = $(window).width(),
      o = $(window).height() - e.height(),
      u = i / o;

    if (document.body.offsetWidth > 750) {
      this.showpc = true
      t.css({
        width: i,
        height: o
      });
        this.imgcls = {
          "height": o+"px",
          "width": o * d.PC.ratio+"px",
          "left": -(o * d.PC.ratio - i) / 2+"px",
          "top": "0px"
      }
    } else {
      this.showapp = true
      // this.imgcls = {
      //   "height": o+"px",
      //   "width": o * d.MOBILE.ratio+"px",
      //   "left":"0px",
      //   "top": "0px"
      // }
    }
    if(document.all){
      this.iewidth = true
    }else{
      this.iewidth = false
    }

  },
  // created() {
  //   let mySwiper = new Swiper('.swiper-container1', {
  //     effect: 'fade',
  //     direction: 'horizontal',
  //     loop: true,
  //     autoplay: 3000,
  //   })
  // }

}
</script>

<style scoped>
.swiper-pagination {
  width: 100%;
  position: absolute;
  bottom: 10px;
}

.swiper-slide-offlineimg {
  width: 100%;
  height: 550px;
}
.swiper-slide{
  opacity: 0;
}
.swiper-slide:nth-child(1){
  opacity: 1;
}
.swiper-slide img {
  width: 100%;
  /*height: 100%;
  object-fit: cover;
  overflow: hidden;*/
  position: absolute;
    max-width: none;

}
.iewidth {
  width: auto;
}
.width {
  width: 100%!important;
}

@media (max-width: 768px) {
  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
    position: relative;
      max-width: none;

  }
}
</style>
