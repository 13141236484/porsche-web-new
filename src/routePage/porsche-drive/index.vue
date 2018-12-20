<template lang="html">
  <div class="porsche-drive">
      <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
        <div class="drive-top">
            <!-- <img class="cover"  style="width: 100%;"  :src="topimg" alt=""> -->
            <!-- <div class="swiper-container3">
              <div class="swiper-wrapper">
                <div  class="swiper-slide swiper-slide-drive" v-for="drive in drivelist">
                  <router-link  :to="{ path: 'dealerarticle/'+drive.uuid }" style="display: block;">
                  <img class="cover show-hei" width="100%"  :src="PORSCHE_HOST+drive.picture_path" alt="">
                  <div class="drive-top-nr">
                      <div class="drive-nrimg" >
                          <img class="cover"  style="width: 100%;height:100%"  :src="drive.avatar != null && drive.avatar != ''?PORSCHE_HOST+drive.avatar:require('../../common/image/180126.jpg')" alt="">
                      </div>
                      <h3 class="drive-top-nrh3">{{drive.nickname}}</h3>
                      <h2 class="drive-top-nrh2"><i class="iconfont icon-26yinhao icon-yinhao"></i>{{drive.title}}<i class="iconfont icon-quotesUp-copy icon-quotesUp"></i></h2>
                  </div>
                </router-link>
                </div>
              </div>
            </div> -->
            <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
              <swiper-slide  v-for="drive in drivelist">
                <router-link class="swiper-slide-drive"  :to="{ path: 'dealerarticle/'+drive.uuid }" style="display: block;">
                <img class="cover show-hei" width="100%"  :src="PORSCHE_HOST+drive.picture_path" alt="">
                <div class="drive-top-nr">
                    <div class="drive-nrimg" >
                        <img class="cover"  style="width: 100%;height:100%"  :src="drive.avatar != null && drive.avatar != ''?PORSCHE_HOST+drive.avatar:require('../../common/image/180126.jpg')" alt="">
                    </div>
                    <h3 class="drive-top-nrh3">{{drive.nickname}}</h3>
                    <h2 class="drive-top-nrh2"><i class="iconfont icon-26yinhao icon-yinhao"></i>{{drive.title}}<i class="iconfont icon-quotesUp-copy icon-quotesUp"></i></h2>
                </div>
              </router-link>
              <div class="swiper-slide-title">
                          <div class="slide-title">
                            <div class="slide-title-nr">
                              <div class="slide-title-left">
                                <h3>{{drive.title}}</h3>
                              </div>
                              <div class="slide-title-right">
                                <router-link :to="{ path: 'dealerarticle/'+drive.uuid }" class="ui-btn btn-arrow">查看详情</router-link>
                              </div>
                              <div class="clear"></div>
                            </div>
                            </div>
                      </div>
              </swiper-slide>
          </swiper>
        </div>
        <div class="drive-bottom">
          <div class="drive-bottom-list">
                <div class="drive-bottom-nr" v-for="drive in drivelist">
                <router-link style="display: block;" :to="{ path: 'dealerarticle/'+drive.uuid }">
                    <div class="drive-nrimg">
                          <img class="cover"  style="width: 100%;"  :src="drive.avatar != null && drive.avatar != ''?PORSCHE_HOST+drive.avatar:require('../../common/image/180126.jpg')" alt="">
                      </div>
                      <h3 class="drive-bottom-nrh3">{{drive.nickname.substring(0,8)}}</h3>
                </router-link>

                </div>
                <div class="drive-bottom-nr">
                  <el-button type="text" @click="open2">

                      <div class="drive-nrimgs">
                          <img class="cover nrimgs"  :src="require('../../common/image/pcimg/sqjr.jpg')" alt="">
                      </div>
                      <h3 class="drive-bottom-nrh3">申请加入</h3>
                  </el-button>
                </div>
              </div>
        </div>
  </div>
</template>

<script scoped>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import {
  PORSCHE_HOST
} from '../../common/js/host';
import {isIeExplore} from '../../lib/utils'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption:{
        direction: 'horizontal',
        loop: false,
        autoplay: 6000,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        pagination : '.swiper-pagination',
        autoplayDisableOnInteraction : false,
      },
      messages:"",
      PORSCHE_HOST,
      drivelist: [],
      userimg: require('../../common/image/pcimg/mxjk-tx.png'),
      username: '于志鹏',
      topimg: '',
    }
  },
  methods: {
      back(){
          let _this = this;
          _this.$router.push('/home');
      },
    open2() {
      let _this = this
       this.$confirm('确定要申请成为极致驾客吗？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning',
         beforeClose: (action, instance, done) => {
           if (action === 'confirm') {
             done();
             _this.getapplication()
           } else {
            done();
           }
         },
       }).then(() => {
        //  this.$message({
        //    type: 'success',
        //    message: _this.messages
        //  });
       }).catch(() => {
        //  this.$message({
        //    type: 'info',
        //    message: '取消申请'
        //  });
       });
     },
    getdrivelist() {
      let _this = this;
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST + '/member/driver/list',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.drivelist = res.data
            // let mySwiper = new Swiper('.swiper-container3', {
            //   direction: 'horizontal',
            //   loop: true,
            //   autoplay: 6000,
            //   autoplayDisableOnInteraction : false,
            // })
            _this.imgonload(_this.drivelist)
          }

          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
    },
    imgonload(mulitImg){
              let _this = this;
             let img = [];
             let flag = 0;
             let imgTotal = mulitImg.length;
             for(let i = 0 ; i < imgTotal ; i++){
                img[i] = new Image()
                img[i].src = PORSCHE_HOST+mulitImg[i].picture_path
                img[i].onload = function(){
                   //第i张图片加载完成
                  //  alert("第i张图片加载完成")
                   flag++
                   let l_height = $(window).height();
                   let zongapp_height = parseInt(l_height) - parseInt(55+90);
                   let zongpc_height = parseInt(l_height) - parseInt(131+134);
                   if (document.body.offsetWidth > 750) {
                     if(isIeExplore()===11){
                       $(".swiper-slide-drive .show-hei").height(zongpc_height*1.8)
                     }else {
                       $(".swiper-slide-drive .show-hei").height(zongpc_height)
                     }

                     this.topimg = require('../../common/image/pcimg/mxjk-bg.jpg');

                   } else {
                     $(".swiper-slide-drive .show-hei").height(zongapp_height)
                     this.topimg = require('../../common/image/appimg/mxjk-bg.jpg');
                   }
                   if( flag == imgTotal ){
                    //  alert("全部加载完成")
                      //全部加载完成
                   }
                }
             }
             _this.shadowtList = mulitImg;
      },
    getapplication() {
      let _this = this;
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST + '/member/driver/apply',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          console.log(res.code)
          if (res.code === "1001") {
            // console.log(res.message)
            // alert(res.message);
            // _this.messages = res.message
            setTimeout(function(){
              _this.$alert('感谢您对挚享汇长期的支持与热爱，管理员已收到您的极致申请，将在综合评定后与您联系...', '提示', {
                confirmButtonText: '确定',
              });
            },1000)

      }
          if (res.code === "1010") {
            // alert(res.message);
              _this.messages = res.message
              setTimeout(function(){
                _this.$alert('您已发送申请，若审核通过，将有管理员与您取得联系', '提示', {
                  confirmButtonText: '确定',
                });
              },1000)
            return false;
          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
    },

  },
  mounted() {
    let _this = this
    this.getdrivelist()
  },
  created() {
    // this.getdrivelist()
  }
}
</script>

<style scoped>
.swiper-slide-drive img {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  /*width: 450px;*/
  /*max-width: 1900px;*/
  height: auto;
}

/*.swiper-slide-drive {
  background: #000;
}*/

.nrimgs {
  width: 70px;
  height: 70px;
}

.drive-bottom-nr {
  text-align: center;
  margin-left: 2%;
  margin-right: 2%;
    cursor: pointer;
}
.icon-yinhao {
  position: relative;
    top: -10px;
    font-size: 26px;
    right: 10px;
}
.icon-quotesUp {
  position: relative;
    top: 10px;
    font-size: 26px;
    left: 10px;
}
.drive-bottom-list {
  display: flex;
  justify-content: center;
  align-items: center;
}

.drive-bottom {
  background-color:rgba(255,255,255,0.5);
  margin: 10px auto;
  /*position: absolute;
  width: 100%;
  bottom: 0;
  z-index:9999999 */
}

.drive-bottom-nrh3 {
  color: #000;
  font-size: 16px;
  margin-top: 5px;
  width: 65px;
}

.drive-top-nrh3 {
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
  text-shadow: -2px 5px 12px rgba(0,0,0,.66);
}

.drive-top-nrh2 {
  color: #fff;
  font-size: 20px;
  margin-top: 20px;
  text-shadow: -2px 5px 12px rgba(0,0,0,.66);
}

.drive-nrimg {
  width: 70px;
  height: 70px;
  border-radius: 70px;
  overflow: hidden;
  display: inline-block;
}

.drive-nrimgs {
  width: 70px;
  height: 70px;
  overflow: hidden;
  display: inline-block;
}

.drive-top-nr {
  position: absolute;
  text-align: center;
  top: 20px;
  width: 100%;
  z-index: 9;
    cursor: pointer;
}

.drive-top {
  position: relative;
}

.swiper-slide-title {
    position: relative;
    /*bottom: 0px;
    background: #0000006b;
    width: 100%;*/
}
.slide-title  {
    /*padding: 15px 30px;*/
    position: absolute;
    top: -55px;
    background: #000000;
    background-color: rgba(0,0,0,.3);
    width: 100%;
}
.slide-title-nr {
    padding: 15px 30px;
}
.slide-title-left {
    float: left;
}
.slide-title-right {
    float: right;
}
.slide-title h3 {
    font-size: 20px;
    color: #fff;
    height: 25px;
    line-height: 25px;
}
.ui-btn {
    color: #fff;
    width: 110px;
    text-align: center;
    height: 25px;
    line-height: 25px;
    background: #9a0000;
    display: inline-block;
    font-size:20px;
    cursor: pointer;
    border: 0 none;
    padding: 0;
    position: relative;
}
.ui-btn {
    background: transparent!important;
}
.btn-arrow:after {
    content: "";
    border: 5px solid transparent;
    width: 0;
    height: 0;
    display: inline-block;
    border-left-color: #ff0909;
    position: absolute;
    right: 0px;
    top: 50%;
    margin-top: -5px;
}
.cover {
  object-fit: cover;
}

.clear {
  clear: both;
}

@media (max-width: 768px) {
  .drive-bottom {
    margin: 0px 0px;
  }
  .drive-nrimg {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
  .drive-nrimgs {
    width: 50px;
    height: 50px;
  }
    .slide-title-nr {
        padding: 15px 10px;
    }
    .slide-title-left h3 {
        font-size: 14px;
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

    }
    .btn-arrow {
        font-size: 12px;
    }
    .ui-btn {
        width: 90px;
        background: #ffffff00!important;
    }
  .nrimgs {
    width: 50px;
    height: 50px;
  }
  .drive-bottom-nrh3 {
    font-size: 12px;
    width: 48px;
  }
  .swiper-slide-drive img {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    width: 100%;
  }
  .drive-top-nrh2 {
    font-size: 16px;
  }
}
</style>
