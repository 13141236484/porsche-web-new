<template lang="html">
  <div class="porsche-home">
    <div class="news-textNR">
      <div class="poppc-texts">
          <img  width="100%" :src="require('../../common/image/sytexts.png')" alt="">
      </div>
    </div>
    <div class="news-pc">
        <div class="news-logo-poppc" v-if="showxin">
          <div v-if="poppcshows" class="poppc-show" @click="poppcshow()">
            <img  width="100%" :src="require('../../common/image/pcimg/pop-img.png')" alt="">
          </div>
            <div v-if="poppcshowthes" class="poppc-showthe">
              <div class="poppc-showthe-text">
                <div @click="poppcshowten()" class="hiddthe"></div>
                <p>欢迎加入挚享汇，您有一份礼品还未领取，请去个人中心填写联系信息。</p>
                <span class="ui-btn btn-arrow"><router-link  :to="{ path: '/personal/personalcenter' }" >查看</router-link></span>
              </div>
              <img width="100%" :src="require('../../common/image/pcimg/pop-pcs.png')" alt="">
            </div>
      </div>
    </div>
    <div class="news-app" >
      <div v-if="showxin">
        <div class="popapp-nr" v-if="poppcshowthes">
          <div class="popapp-showthe-text">
            <p>欢迎加入挚享汇，您有一份礼品还未领取，请去个人中心填写联系信息。</p>
            <span class="ui-btn btn-arrow"><router-link  :to="{ path: '/personal/personalcenter' }" >查看</router-link></span>
          </div>
          <img width="100%" :src="require('../../common/image/appimg/pop-apps.png')" alt="">
          <div @click="poppcshowten()" class="apphiddthe"></div>
        </div>
        <div class="news-logo-popapp" v-if="poppcshows" @click="poppcshow()">
            <img width="100px" :src="require('../../common/image/appimg/pop-img.png')" alt="">
      </div>
    </div>
      <div class="news-textNRapp">
        <div class="poppc-textsapp">
          <img width="70%" :src="require('../../common/image/sytexts.png')" alt="">
        </div>
      </div>
    </div>
      <carousel :setswiperstyle='setswiperstyle'></carousel>
      <div class="btns">
        <router-link  :to="{ path: '/enjoyFm' }" ><i class="ui-icon1 ui-icon"><img :src="require('../../common/image/ui-icon-2.png')" alt=""><!-- <span class="badge">29</span> --></i>挚享者说</router-link>
        <router-link  :to="{ path: '/enjoyActivity' }" ><i class="ui-icon2 ui-icon"><img :src="require('../../common/image/ui-icon-1.png')" alt=""></i>挚享 FM</router-link>
        <router-link  :to="{ path: '/offline' }" ><i class="ui-icon3 ui-icon"><img :src="require('../../common/image/ui-icon-3.png')" alt=""></i>精彩活动</router-link>
        <router-link  :to="{ path: '/drive' }" ><i class="ui-icon4 ui-icon"><img :src="require('../../common/image/ui-icon-4.png')" alt=""></i>极致驾客</router-link>
        <router-link  :to="{ path: '/reserve' }" ><i class="ui-icon5 ui-icon"><img :src="require('../../common/image/ui-icon-6.png')" alt=""></i>预约试驾</router-link>
        <!--<router-link  :to="{ path: '/personal/personalcenter' }" ><i class="ui-icon5 ui-icon"><img :src="require('../../common/image/ui-icon-5.png')" alt=""></i>个人中心</router-link>-->
      </div>



  </div>
</template>

<script>
import Carousel from '@/basecom/carousel.vue';
import {PORSCHE_HOST} from '../../common/js/host';
export default {
  components: {
    Carousel,
  },
  data() {
    return {
      colorSizeOption:{
        barWidth:10,
        barMarginRight:0
      },
      dialogVisible:false,
      poppcshows:false,
      poppcshowthes:true,
      types: 'home',
      showxin:false,
      setswiperstyle: {
        width: "",
        height: "",
        img: [],
        sta:"home"
      },
    }
  },
  methods: {
    poppcshow(){
      this.poppcshows  = false
      this.poppcshowthes = true
    },
    poppcshowten(){
      this.poppcshows  = true
      this.poppcshowthes = false
    },
    showtip() {
      let _this = this;
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST+'/member/message/tip',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if(res.code === "1013") {
                _this.showxin = true
          }
          if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
    },
    setswiper() {
      let l_height = $(window).height();
      let zongapp_height = parseInt(l_height) - parseInt(55);
      let zongpc_height = parseInt(l_height) - parseInt(131);
      if (document.body.offsetWidth > 750) {
        // this.setswiperstyle.img = {
        //     1:require('../../common/image/pcimg/bg1.jpg'),
        //     2:require('../../common/image/pcimg/bg2.jpg'),
        //     3:require('../../common/image/pcimg/bg3.jpg'),
        // };
        this.setswiperstyle.height = zongpc_height + 'px';
      } else {
        // this.setswiperstyle.img = {
        //   1:require('../../common/image/appimg/kv1.jpg'),
        //   2:require('../../common/image/appimg/kv2.jpg'),
        //   3:require('../../common/image/appimg/kv3.jpg'),
        // }
        this.setswiperstyle.height = zongapp_height + 'px';

      }
    },
    homeImg() {
      let self = this;
      $.ajax({
        type: 'post',
        data: {
          type: self.types,
        },
        url: PORSCHE_HOST+'/member/home',
        success: function(res) {
          if(res.code === "1004") {
              self.$router.push('/login');
              return ;
          }
          self.setswiperstyle.img = res.data;
          console.log(self.setswiperstyle.img)
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
      console.log(self.setswiperstyle.img)


    }
  },
  mounted() {
    let self = this;
    this.homeImg();
    this.showtip()
    this.setswiper();
    window.onresize = function() {
      self.setswiper();
    }
  },
}
</script>

<style scoped>
.btn-arrow:after {
    content: "";
    border: 5px solid transparent;
    width: 0;
    height: 0;
    display: inline-block;
    border-left-color: #fff;
    position: absolute;
    right: 5px;
    top: 50%;
    margin-top: -5px;
}
.ui-btn:hover{
  background: #d5001e!important;
}
 .ui-btn {
  position: absolute;
  right: 15px;
  bottom: 10px;
  margin-top: -9px;
  font-size: 10px;
  border-radius: 65px;
  width: 60px!important;
  height: 18px!important;
  line-height: 18px;
  color: #fff;
   text-align: center;
   height: 28px;
   background: #000!important;
   display: inline-block;
   cursor: pointer;
   border: 0 none;
   padding: 0;

}
.hiddthe {
  width: 60px;
  height: 57px;
}
.poppc-texts {
  position: absolute;
  z-index: 999
}
.poppc-showthe-text {
  position: absolute;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.poppc-showthe-text p{
  display: inline-block;
  color: #fff;
  width: 290px;
  height:57px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
}
.poppc-showthe {
  position: relative;

}
.popapp-nr {
  /*height: 100px;*/
  /*background-image: url('../../common/image/appimg/pop-s.png') ;*/
  /*background-repeat: no-repeat;*/
  /*background:linear-gradient(to right,#8f6559, #7d506c,#754c70,#684f77,#5d5779,#585b7b,#71798f,#727a90); /* 标准的语法（必须放在最后） */
}

.news-logo-popapp {
  display: block;
}

.news-logo-popapp {
  width: 94px;
  position: relative;
  margin-right: auto;
  margin-left: auto;
}

.news-app {
  position: absolute;
  z-index: 999;
  width: 100%;
  display: none;
}
.news-pc {
  position: absolute;
  z-index: 999;
  right: 5%;
  top: 170px;
  display: block;
}
.news-textNR {
  /*position: absolute;
  width: 100%;
  z-index: 999;
  display: block;
  top: 220px;
  left: calc(50% - 130px);*/
  position: relative;
  width: 100%;
  z-index: 999;
  display: block;
  text-align: center;
  width: 260px;
  margin-left: auto;
  margin-right: auto;
  top: 110px;
}

.porsche-home .btns {
  text-align: center;
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  display: none;
}

.porsche-home >.btns > a {
  background: url('../../common/image/shuapp.png') 100% no-repeat;
  display: inline-block;
  color: #fff;
  width: 18%;
  cursor: pointer;
  font-size: 12px;
}

.porsche-home a i {
  /*font-size: 50px;*/
  display: block;
  margin: 0 auto 10px;
  padding: 5px 0px;
}








/*.ui-icon-game:before {
  content: "\F105";
}*/

.porsche-home .badge {
  position: absolute;
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  background-color: #9a0000;
  color: #fff;
  display: inline-block;
  border-radius: 100%;
  font-size: 10px;
  margin-left: 2px;
  margin-top: -4px;
  vertical-align: text-top;
}

@media (max-width: 768px) {
  .news-textNR {
    display: none;
  }
  .news-textNRapp {
    position: absolute;
    z-index: 999;
    width: 100%;
    margin-top: 15%;
  }
  .poppc-textsapp {
    text-align: center;
    width: 260px;
    margin-left: auto;
    margin-right: auto;
  }
  .porsche-home .btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    z-index: 9;
  }
  .porsche-home .btns a {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: auto;
    display: block;
  }
  .ui-icon {
    height: 30px;
    display: block;
  }

  .ui-icon1 img {
    width: 35px;
    height: 30px;
  }

  .ui-icon2 img {
    width: 33px;
    height: 28px;
  }

  .ui-icon3 img {
    width: 35px;
    height: 25px;
  }

  .ui-icon4 img {
    width: 30px;
    height: 34px;
  }

  .ui-icon5 img {
    width: 33px;
    height: 33px;
  }
  .news-app {
    display: block;
  }
  .news-pc {
    display: none;
  }
  .popapp-showthe-text {
    position: absolute;
    padding-left: 17%;
    padding-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .popapp-showthe-text p{
    display: inline-block;
    color: #fff;
    width: 100%;
    height:auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    line-height: 18px;
  }
  .apphiddthe {
    position: relative;
    width: 50px;
    height: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
    z-index: 99999;
  }
  .ui-btn {
    bottom: unset;
    margin-top: 10px;
  }
}
</style>
