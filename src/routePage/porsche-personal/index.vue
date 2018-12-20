<template lang="html">
  <div class="porsche-personal">
      <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
        <div class="personal-top">
          <div class="personal-topimg">
            <img class="cover"  style="width: 100%;;height:100%"  :src="topimg" alt="">
          </div>
            <div class="personal-top-nr">
                <div class="personal-nrimg">
                    <img class="cover" @click="updateuserimg"  style="width: 100%"  :src="userimg != null && userimg != ''?PORSCHE_HOST+userimg:require('../../common/image/180126.jpg')" alt="">
                    <i v-if="showuserImg" class="iconfont icon-xiangji1 icon-xiangji"><input @change="userimgUp" id="fileUpload" type="file" accept="image/*" name="file" title="未选择任何图片"/></i>
                    <img v-if="!showuserImg" @click="updateuserimg" style="position: absolute;margin-left: 20px;top: 65px;" width="23px" height="23px"  :src="require('../../common/image/appimg/app-gerenzhongx.png')" alt="">
                </div>
                <h3 class="personal-top-nrh3">{{this.username}}</h3>
                <h5 class="personal-top-nrh5">{{this.usertel}}</h5>
            </div>
            <!-- <div class="personal-top-nrxj">
              <i  class="iconfont icon-xiangjiupdate icon-xiangji"><input @change="userimgUp" id="fileUpload" type="file" accept="image/*" name="file"/></i>
            </div> -->
        </div>
        <div class="personal-bottom">
              <div class="personal-bottom-nr">
                  <div class="personal-bottom-nrleft">
                      <ul>
                          <li  class="hide-sm"><a :class="{'active':this.personalcenterRight == true}" @click="getPersonalcenter()">个人资料</a></li>
                          <li ><a :class="{'active':this.footstepsRight == true}" @click="getFootsteps()">我的足迹</a></li>
                          <li ><a :class="{'active':this.mypostRight == true}" @click="getMypost()">参与活动</a></li>
                          <li ><a :class="{'active':this.messageRight == true}" @click="getMessage()">消息中心<span class="badge" v-if="this.messagecount > 0">{{this.messagecount}}</span></a></li>
                          <li ><a :class="{'active':this.participateRight == true}" @click="getParticipate()">我的发帖</a></li>
                      </ul>
                  </div>
                  <div class="personal-bottom-nrright">
                    <div class="bottom-nrdata">
                        <Personalcenter @updata-user="updatauser" v-if="personalcenterRight" @hide-edit="updatePersonalcenter" :personalcenterData="personalcenterData"></Personalcenter>
                        <Footsteps  v-if="footstepsRight" :footstepsData="footstepsData" :footstepsDataupvote="footstepsDataupvote"></Footsteps>
                        <Mypost v-if="mypostRight" :mypostData="mypostData"></Mypost>
                        <Message  @message-count="mcount" v-if="messageRight" :messageData="messageData"></Message>
                        <Participate @participate-restore="participatenr"   v-if="participateRight" :participateDelete="participateDelete" :participateSend="participateSend"></Participate>
                    </div>
                  </div>
                  <div class="clear"></div>
              </div>
        </div>
  </div>
</template>

<script scoped>
import Personalcenter from '@/routePage/porsche-personal/personalcenter.vue';
import Footsteps from '@/routePage/porsche-personal/footsteps.vue';
import Mypost from '@/routePage/porsche-personal/mypost.vue';
import Participate from '@/routePage/porsche-personal/participate.vue';
import Message from '@/routePage/porsche-personal/message.vue';
import {PORSCHE_HOST} from '../../common/js/host';
export default {
  components: {
    Personalcenter,
    Footsteps,
    Mypost,
    Participate,
    Message
  },
  data() {
    return {
      PORSCHE_HOST,
      showuserImg:false,
      mypostData: [],
      footstepsData: [],
      footstepsDataupvote:[],
      participateDelete: [],
      participateSend: [],
      messageData: [],
      messagecount:0,
      personalcenterData: {
        "province_id":"",
        "city_id":"",
        "uuid": "",
        "nickname": "",
        "username": "",
        "gender": "",
        "tel": "13964334432",
        "province": null,
        "city": null,
        "district": "",
        "detail_address": "",
        "email": "",
        "purchase_willing": "",
        "interest": '',
        "avatar": null,
        "car_name": [],
        "car_id":[],
        "have_car": "",
        //"car_brand": "",
        "interest_pic":[],
        //"car_model": "",
          "brand_model":[],

      },
      participateRight: false,
      messageRight: false,
      personalcenterRight: false,
      mypostRight: false,
      footstepsRight: false,
      userimg: '',
      username: '',
      topimg: '',
      usertel: '',
      personallist: [{
          id: "1",
          zan: "23",
          title: "Porsche Photofairs Shanghai | 去看看你没见过的",
          dec: "分享自保时捷挚享汇会员艾米丽",
          img: require('../../common/image/pcimg/rqsd-bg.jpg')
        },
        {
          id: "2",
          zan: "67",
          title: "这一次，刷新你对保时捷的认知",
          dec: "分享自保时捷挚享汇会员蒋欣",
          img: require('../../common/image/pcimg/rqsd-bg.jpg')
        },
        {
          id: "3",
          zan: "23",
          title: "Shanghai | 去看看你没见过的",
          dec: "分享自保时捷挚员艾米丽",
          img: require('../../common/image/pcimg/rqsd-bg.jpg')
        },
        {
          id: "4",
          zan: "5",
          title: "Porsche Photofairs Shanghai",
          dec: "分享自保时捷挚享汇会员艾米丽",
          img: require('../../common/image/pcimg/rqsd-bg.jpg')
        },
        {
          id: "5",
          zan: "34",
          title: "Porsche Photofair | 去看看你没见过的",
          dec: "分享自保时捷挚享汇会员艾米丽",
          img: require('../../common/image/pcimg/rqsd-bg.jpg')
        }
      ]
    }
  },
  methods: {
      back(){
          let _this = this;
          _this.$router.push('/home');
      },
    participatenr(){
      this.getParticipate()
    },
    updateuserimg(){
      this.getPersonalcenter()
    },
    userimgUp(e){
      self=this;
      let file = e.target.files[0];
      let reader = new window.FileReader()
      reader.readAsDataURL(file)

      reader.onload = function (e) {
        //计算图片的宽高比例大小
        let data = e.target.result;
        let image = new Image();
        image.src=data;
        image.onload=function(){
            self.userimg = data
            console.log(self.imgSrc)
            self.filepath(file)
        }
      }
    },
    filepath(file){
      console.log(file)
      let _this = this;
      let formData = new FormData();
      formData.append('file', file);
      $.ajax({
              type: 'post',
              cache: false,
              processData: false,
              contentType: false,
              data: formData,
              url: PORSCHE_HOST+'/fileupload',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  console.log("file"+res.data.picture_path);
                  _this.userimg = res.data.picture_path
                  if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                    alert(res.message);
                    return false;
                  }
              },
              error: function (res) {
                  console.log("网络连接错误ss!")
              }
          });
    },
    mcount (ins){
      this.messagecount = ins
    },
    updatauser(){
      this.showuserImg = true
    },
    show() {
      if (document.body.offsetWidth > 750) {
        this.topimg = require('../../common/image/pcimg/gr-bg.jpg');
      } else {
        this.topimg = require('../../common/image/pcimg/gr-bg.jpg');
      }
    },
    getPersonalcenter() {
      let _this = this;
      _this.showuserImg = false
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST+'/member/user/info',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {

            _this.footstepsRight = false
            _this.mypostRight = false
            _this.participateRight = false
            _this.messageRight = false
            // _this.personalcenterData = res.data
              _this.personalcenterData.city_id = res.data.city_id
            // _this.personalcenterData.car = res.data.car_id.split(',')
            _this.personalcenterData.car = res.data.car
            _this.personalcenterData.province_id = res.data.province_id
            _this.personalcenterData.nickname = res.data.nickname
            _this.personalcenterData.username = res.data.username
            _this.personalcenterData.gender = res.data.gender
            _this.personalcenterData.tel = res.data.tel
            _this.personalcenterData.surname = res.data.surname
            _this.personalcenterData.firstname = res.data.firstname
            _this.personalcenterData.province = res.data.province
            _this.personalcenterData.city = res.data.city
            _this.personalcenterData.district = res.data.district
            _this.personalcenterData.detail_address = res.data.detail_address
            _this.personalcenterData.email = res.data.email
            _this.personalcenterData.purchase_willing = res.data.purchase_willing
            _this.personalcenterData.interest = res.data.interest
            _this.personalcenterData.avatar = res.data.avatar
            _this.personalcenterData.car_name = res.data.car_name
            _this.personalcenterData.have_car = res.data.have_car
            //_this.personalcenterData.car_brand = res.data.car_brand
            //_this.personalcenterData.car_model = res.data.car_model
            _this.personalcenterData.interest_pic = res.data.interest_pic
              _this.personalcenterData.brand_model = res.data.brand_model
            // console.log(_this.personalcenterData)
            console.log(JSON.stringify("9999"+_this.personalcenterData.car))
            _this.username = res.data.username
            _this.usertel = res.data.tel
            _this.userimg = res.data.avatar
            localStorage.setItem("avatar",res.data.avatar)
            setTimeout(()=>{
              _this.personalcenterRight = true
            },100)
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
    updatePersonalcenter(updatedata) {
      let _this = this;
      updatedata.avatar =  _this.userimg

      console.log('yu' +JSON.stringify(updatedata))
      $.ajax({
        type: 'post',
        data: updatedata,
        url: PORSCHE_HOST+'/member/user/info/update',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.showuserImg = false
            _this.getPersonalcenter();
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
    getFootsteps() {
      let _this = this;
      _this.showuserImg = false
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST+'/member/user/browse',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.footstepsData = res.data.visit
            _this.footstepsDataupvote = res.data.upvote
            _this.footstepsRight = true
            _this.mypostRight = false
            _this.personalcenterRight = false
            _this.participateRight = false
            _this.messageRight = false
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
    getMypost() {
      let _this = this;
      _this.showuserImg = false
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST+'/member/user/activity/list',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.mypostData = res.data
            _this.mypostRight = true
            _this.footstepsRight = false
            _this.personalcenterRight = false
            _this.participateRight = false
            _this.messageRight = false
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
    getMessage() {
      let _this = this;
      _this.showuserImg = false
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST+'/member/user/notification/list',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.messageData = res.data.rows
            _this.messageRight = true
            _this.mypostRight = false
            _this.footstepsRight = false
            _this.personalcenterRight = false
            _this.participateRight = false
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
    getParticipate() {
      let _this = this;
      _this.showuserImg = false
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST+'/member/user/post/list',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.participateDelete = res.data.delete
            _this.participateSend = res.data.send
            _this.participateRight = true
            _this.mypostRight = false
            _this.footstepsRight = false
            _this.personalcenterRight = false
            _this.messageRight = false
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
    getMessagecount() {
      let _this = this;
      _this.showuserImg = false
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST+'/member/user/message',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {
            console.log("count"+res.data)
            _this.messagecount = res.data
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
    if(this.$route.params.num == 'personalcenter'){
      this.getPersonalcenter()
    } else if(this.$route.params.num == 'participate') {
      this.getParticipate()
    }
    this.show();
    this.getMessagecount()
    console.log("sssssss" + JSON.stringify(this.personalcenterData))


  },
  // created() {
  //     this.personalcenterData = this.personalcenterData
  // }
}
</script>

<style scoped>
.active {
  color: #000!important;
}
#fileUpload{
  position: absolute;
  left: 0;
  top:0px;
  opacity: 0;
  height: 90px;
  width: 90px;
    cursor: pointer;
}

.icon-xiangji1 {
  position: absolute;
  color: #fff;
  font-size: 35px;
  top: 2px;
  width: 90px;
  height: 90px;
  border-radius: 90px;
  overflow: hidden;
  display: inline-block;
  display: flex;
  background: #00000066;
  align-items: center;
  justify-content: center;
}
.icon-xiangjiupdate {
  color: #fff;
  font-size: 30px;
  width: 30px;
  height: 30px;
  overflow: hidden;
  display: inline-block;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-xiangjiupdate:before {
  position: absolute;
  color: #fff;
  font-size: 30px!important;
}
.icon-xiangji:before {
  /*position: absolute;*/
  color: #fff;
  font-size: 35px;
}
ul {
  margin-bottom: 0!important;
}

.bottom-nrdata {
  margin-left: 200px;
}

.personal-bottom-nrright {
  float: left;
  width: 100%;
  margin-left: -200px;
}

.personal-bottom-nrleft a:hover {
  color: #000;
}

.personal-bottom-nrleft a .badge {
  width: 16px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  background-color: #d5001c;
  color: #fff;
  display: inline-block;
  border-radius: 100%;
  font-size: 10px;
  margin-left: 2px;
  margin-top: -4px;
  vertical-align: text-top;
}

.personal-bottom-nrleft a {
  text-align: center;
  width: 100%;
  display: inline-block;
  color: #818181;
  height: 80px;
  line-height: 80px;
  background-color: #ededed;
  border-bottom: 1px solid #dcdcdc;
  cursor: pointer;
  font-size: 16px;
}

.personal-bottom-nrleft {
  float: left;
  width: 200px;
  z-index: 2;
  background-color: #f6f6f6;
  position: relative;
}

.porsche-personal {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 86%;
}

.personal-top-nrh5 {
  color: #fff;
  font-size: 16px;
  margin-top: 10px;
}

.nrimgs {
  width: 90px;
  height: 90px;
}

.personal-bottom-list {
  display: flex;
  justify-content: center;
  align-items: center;
}

.personal-top-nrh3 {
  color: #fff;
  font-size: 34px;
  margin-top: 10px;
}

.personal-nrimg {
  width: 90px;
  height: 90px;
  border-radius: 90px;
  overflow: hidden;
  display: inline-block;
  border: 2px solid #fff;
}

.personal-top-nr {
  position: absolute;
  text-align: center;
  top: 60px;
  width: 100%;
}

.personal-top-nrxj {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.personal-topimg {
  position: relative;
  height: 250px;
}

.personal-top {
  position: relative;
  /*height: 250px;*/
}

.cover {
  object-fit: cover;
    cursor: pointer;
}

.clear {
  clear: both;
}

@media (max-width: 768px) {
  .personal-topimg {
    height: 150px;
  }
  .porsche-personal {
    width: 100%;
  }
  .personal-top-nr {
    position: relative;
    margin-top: -45px;
    top: 0px;
    margin-bottom: 20px;
  }
  .personal-top-nrh3 {
    color: #000;
    font-size: 26px;
  }
  .personal-top-nrh5 {
    color: #000;
    font-size: 16px;
  }
  .personal-bottom-nrleft a {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    border: 1px solid #dcdcdc;
  }
  .personal-bottom-nrleft {
    float: none;
    width: auto;
    padding-bottom: 0;
    margin-bottom: 0;
  }
  .hide-sm {
    display: none;
  }
  .personal-bottom-nrleft ul {
    display: flex;
  }

  .personal-bottom-nrleft ul li {
    flex: 1;
  }
  .personal-bottom-nrright {
    float: none;
    margin-left: 0px;
  }
  .bottom-nrdata {
    margin-left: 0px;
  }
}
</style>
