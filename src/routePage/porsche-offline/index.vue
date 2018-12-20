<template >
  <div class="parsche-offline">
      <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
    <div class="parsche-offline-top">
      <div class="parsche-offline-nr">
          <div class="parsche-offline-navigation">
              <div v-show="calendarSHow" class="Vue-event-calendar" style="">
                  <vue-event-calendar
                          :title="title"
                          :events="demoEvents"
                          @day-changed="dayChange">
                  </vue-event-calendar>
              </div>
            <ul>
              <li>
                  <router-link :to="{ path: '/offline' }" class="navigation1"></router-link>
                <span @click="tooffline()">活动招募</span>
              </li>
              <li>
                <router-link :to="{ path: '/offlinehui' }" class="navigation2"></router-link>
                <span @click="toofflinehui()">精彩集锦</span>
              </li>

            </ul>
              <div class="block dataBox" @click="databoxShow">
                  <!--<el-date-picker-->
                          <!--v-model="date_time"  @change="getofflinelistA()">-->
                  <!--</el-date-picker>-->
              </div>
              <div class="screen-box">
                  <span class="applicants-map"></span>
                  <span class="screen-change">
                      <!--<select name="" id="" v-model="city_name" placeholder="请选择"  class="sereen-select" @change="getofflinelistA()">
                          <option  v-for="item in cityKind" :key="item.value" :label="item.label" :value="item.value">
                        </option>
                      </select>-->
                        <div class="sereen-select cityBox" >
                           <!-- <span class="pc-select">
                                <span class="pc-select-nr">
                                  <span class="pc-select-nrtext" @click="showsheng()">{{this.city !=null ? this.city:'选择城市'}}</span>
                                  <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                                </span>
                                <span class="span-select  span-select-nr1" v-if="showshengul">
                                   <span class="span-select-nr">
                                   <ol>
                                       <li @click="alllist()">全部城市</li>
                                     <li :value="list.pronvince_id" :class="{'results-xz':list.pronvince_id == province_id}"  @click="citydatapc(list.pronvince_id,list.province_name)" v-for="list in provincelistdata">{{list.province_name}}</li>
                                   </ol>
                                  </span>
                                </span>
                            </span>-->

                            <span class="pc-select">
                                <span class="pc-select-nr">
                                  <span class="pc-select-nrtext" @click="showsheng()">{{this.city !=null ? this.city:'全部城市'}}</span>
                                  <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                                </span>
                                <span class="span-select  span-select-nr1" v-if="showshengul">
                                   <span class="span-select-nr">
                                   <ol>
                                       <li  @click="cityvalue(allcity)">全部城市</li>
                                      <li :value="lists" v-for="lists in citylist"  @click="cityvalue(lists)">{{lists}}</li>
                                   </ol>
                                  </span>
                                </span>
                            </span>
                        </div>
                      <!-- <div class="city-select">
                           <span class="pc-select">
                            --<span class="pc-select-nr">
                                <span class="pc-select-nrtext" @click="showshi()">{{this.city !=null ? this.city:'选择城市'}}</span>
                                <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                              </span>
                             <span class="span-select  span-select-nr1" v-if="showshiul">
                               <span class="span-select-nr">
                               <ol>
                                    <li>选择城市</li>
                                    <li @click="chenshipc(list.city_id,list.city_name)"  :value="list.city_id" v-for="list in citylistdata">{{list.city_name}}</li>
                                 </ol>
                               </span>
                             </span>
                          </span>
                      </div>-->
                      <div class="sereen-select cityBox" >
                            <span class="pc-select">
                                <span class="pc-select-nr">
                                  <span class="pc-select-nrtext" @click="showactive()">{{this.citykind !=null ?this.citykind:'所有活动'}}</span>
                                  <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                                </span>
                                <span class="span-select  span-select-nr1" v-if="showactives">
                                   <span class="span-select-nr">
                                   <ol>
                                     <li :value="item.value"  @click="activevalue(item.value,item.label)" v-for="item in activeKind">{{item.label}}</li>
                                   </ol>
                                  </span>
                                </span>
                            </span>
                        </div>
                      <!--<select v-model="active_type" class="sereen-select" @change="getofflinelistA()" placeholder="请选择" id="activeSel">
                          <option value="changeActive">请选择活动类型</option>
                        <option  v-for="item in activeKind" :key="item.value" :label="item.label" :value="item.value"></option>
                      </select>-->

                  </span>
              </div>
              <div class="clear"></div>
            <div class="parsche-offline-lb">
              <div class="swiper-slide"  v-for="list in offlinelist">
              <div class="swiper-slide-offlineimg">
                <img class="cover" width="100%" height="100%" :src="PORSCHE_HOST+list.picture_path" alt="">
              </div>
              <div class="swiper-slide-title">
                  <div class="slide-title">
                    <div class="slide-title-nr">
                      <div class="slide-title-left">
                        <h3>{{list.title}}</h3>
                      </div>
                      <div class="clear"></div>
                    </div>
                    </div>
              </div>
              <div class="swiper-slide-applicants">
                  <div class="slide-applicants">
                      <div class="slide-applicants-left">
                       <div class="applicants-left-a">
                           <div>
                               <h5>{{timedata(list.start_time)}}&nbsp;-&nbsp;{{timedata(list.end_time)}}</h5>
                               <h5 v-if="list.sponsor != ''">主办方:{{list.sponsor}}</h5>
                           </div>
                           <div>
                              <h5 v-if="list.city != ''">{{list.active}} - {{list.city}}</h5>
                              <h5 v-if="list.start_registration_time != 0 && list.end_registration_time != 0 && list.registration != '报名已结束'">报名时间:{{timedata(list.start_registration_time)}}&nbsp;-&nbsp;{{timedata(list.end_registration_time)}}</h5>
                               <h5 v-if="list.start_registration_time != 0 && list.end_registration_time != 0 && list.registration == '报名已结束'" style="color: #dadada;">报名时间:{{timedata(list.start_registration_time)}}&nbsp;-&nbsp;{{timedata(list.end_registration_time)}}</h5>
                           </div>
                        </div>
                        <div class="applicants-left-b">
                            <h5>{{timedata(list.start_time)}}&nbsp;-&nbsp;{{timedata(list.end_time)}}</h5>
                            <h5 v-if="list.city != ''">{{list.active}} - {{list.city}}</h5>
                            <h5 v-if="list.sponsor != ''">主办方:{{list.sponsor}}</h5>
                            <h5 v-if="list.start_registration_time != 0 && list.end_registration_time != 0 && list.registration != '报名已结束'">报名时间:{{timedata(list.start_registration_time)}}&nbsp;-&nbsp;{{timedata(list.end_registration_time)}}</h5>
                            <h5 v-if="list.start_registration_time != 0 && list.end_registration_time != 0 && list.registration == '报名已结束'" style="color: #dcdcdc;">报名时间:{{timedata(list.start_registration_time)}}&nbsp;-&nbsp;{{timedata(list.end_registration_time)}}</h5>
                        </div>
                      </div>
                      <div class="slide-applicants-right">
                        <div class="applicants-right-a">
                            <div class="applicants-right-number">
                                <!--:src="require('../../common/image/xinY.png')"-->
                              <span style="width: 25px;height: 25px;display: inline-block"><img :src="likeimg"  style="width:100%" alt=""></span>
                              <span><span class="number-data">{{list.upvote_count+list.visit_count}}</span><span>&nbsp;人</span></span>
                            </div>
                        </div>
                        <div class="applicants-right-b">
                            <router-link v-if="list.registration == '正在报名'" :to="{ path: '/recruit/'+list.uuid }" class="ui-btns btn-arrows but-col">正在报名</router-link>
                            <router-link v-if="list.registration == '感兴趣'" :to="{ path: '/recruit/'+list.uuid }" class="ui-btns btn-arrows but-col">感兴趣</router-link>
                            <router-link v-if="list.registration == '报名已结束'" :to="{ path: '/recruit/'+list.uuid }" class="ui-btns btn-arrows but-col">查看详情</router-link>

                        </div>
                      </div>
                      <div class="clear"></div>
                  </div>
              </div>
            </div>
          </div>

      </div>

    <div v-if="noCon" class="noconBox"> {{nocontent}}</div>
    </div>
    </div>


    <!--<div class="parsche-offline-bottom">
          <div class="offline-bottom">
            <router-link  :to="{ path: '/dealer' }" class="bottom-a">经销商查询</router-link>
            <router-link  :to="{ path: '/testdrive' }"class="bottom-a">试驾申请</router-link>
          </div>
    </div>-->
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import {PORSCHE_HOST} from '../../common/js/host';
export default {
  components:{
  },
  data(){
    return{
        PORSCHE_HOST,
        offlinelist:[],
        mySwiper:{},
        applicants:'',
        date_time:'',
        city_name:"",
        active_type:'',
        activeKind:[
            {
                value:"allactive",
                label:"所有活动"
            },
            {
                value:"onlineactive",
                label:"线上活动"
            },
            {
                value:"offlineactive",
                label:"线下活动"
            },
            {
                value:"onapplyactive",
                label:"正在报名活动"
            }
        ],
      title: '',
        likeimg:'',
      demoEvents: [],
      calendarSHow: false,
        showshiul:false,
        showshengul:false,
        provincelistdata: [],
        citylistdata: [],
        province_id:"",
        province:null,
        city:null,
        showactives:false,
        citykind:null,
        noCon:false,
        nocontent:"",
        time1:"",
        citylist:[],
        allcity:"全部城市",
        currentPage:1,
        offset:0,
        count:10,
        IsBottom:false,
    }
  },
  methods:{
    // 日历插件显示
    databoxShow () {
      this.calendarSHow = !this.calendarSHow
    },
    dayChange (day) {
      let _this = this;
      let date = new Date(day.date);
      _this.time1 = date.getTime();
      _this.offset = 0;
      _this.currentPage = 1;
      _this.getofflinelistA();
    },
      back(){
          let _this = this;
          _this.$router.push('/home');
      },
    tooffline (){
      this.$router.push("/offline")
    },
    toofflinehui (){
      this.$router.push("/offlinehui")
    },
    timedata(time){
        return  new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
    },
    getofflinelistA(){
      let _this = this;
      $.ajax({
          type: 'post',
          data: {
              date_time:_this.time1 ? _this.time1 : '',
              city_name:_this.city_name ? _this.city_name : '',
              active_type:_this.active_type ? _this.active_type : '',
              offset:_this.offset,
              count:_this.count,
          },
          url: PORSCHE_HOST+'/member/offline/process/list',
          success: function (res) {
              _this.calendarSHow = false
            if(res.code === "1004") {
                _this.$router.push('/login');
                return ;
            }
            if(res.code === "1001") {
                if(res.data == "" && _this.offset == 0){
                    _this.noCon = true;
                    _this.nocontent = "暂无活动，敬请期待!"
                    _this.offlinelist = res.data
                }else {
                    _this.currentPage = _this.currentPage+1;
                    _this.noCon = false;
                    if(_this.offset == 0){
                        _this.offlinelist = res.data
                        _this.IsBottom = true;
                    }else {
                        _this.offlinelist = _this.offlinelist.concat(res.data)
                        _this.IsBottom = true;
                    }
                }
                for (var i = 0; i< res.time.length; i ++) {
                    const timeArr = {date: res.time[i], title: '活动'}
                    _this.demoEvents.push(timeArr)
                }
                for (var j = 0; j< res.addressData.length; j ++) {
                     _this.citylist = res.addressData;
                }
            }
              if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                alert(res.message);
                return false;
              }
          },
          error: function (res,xhr) {
              console.log("网络连接错误!")
          }
      });
    },
      loadMore(){
          this.count =10
          console.log(this.currentPage)
          console.log(this.count)
          this.offset = (parseInt(this.currentPage) - 1) * this.count
          this.getofflinelistA();
      },
      showactive(){
        this.showactives = !this.showactives
      },
      activevalue(actype,names){
          this.offset = 0;
          this.currentPage = 1
          this.active_type = actype;
          this.citykind = names
          if(this.active_type == "changeActive"){
              this.active_type = "";
          }
          this.showactives = false;
          this.getofflinelistA()

      },
      cityvalue(cityname){
          this.offset = 0;
          this.currentPage = 1
          this.city_name = cityname;
          this.city = cityname;
          if(this.city_name == "全部城市"){
              this.city_name = "";
          }
          this.showshengul = false
          this.getofflinelistA()


      },
      showsheng(){
          this.showshengul = !this.showshengul
          /*this.showshiul = false*/
          /*this.showshi()*/
      },
     /* showshi(){
          this.showshiul = !this.showshiul
          this.showshengul = true
      },*/
      /*provincedata() {
          let _this = this;
          $.ajax({
              type: 'post',
              url: PORSCHE_HOST + '/member/user/province',
              success: function(res) {

                  if (res.code === "1004") {
                      _this.$router.push('/login');
                      return;
                  }
                  if (res.code === "1001") {
                      console.log(res.data)
                      _this.provincelistdata = res.data
                  }
                  if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
                      alert(res.message);
                      return false;
                  }
              }
          })
      },
      citydatapc(province_id,name) {
          let _this = this;
          $.ajax({
              type: 'post',
              data: {
                  province_id: province_id
              },
              url: PORSCHE_HOST + '/member/user/city',
              success: function(res) {
                  console.log(res)
                  console.log(11)
                  if (res.code === "1004") {
                      _this.$router.push('/login');
                      return;
                  }
                  if (res.code === "1001") {
                      console.log(res.data)
                      _this.citylistdata = res.data
                      _this.province_id = province_id
                      _this.province = name
                      _this.city = "选择城市"
                      /!*_this.showshengul = false*!/
                      _this.showshiul = true

                  }
                  if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
                      alert(res.message);
                      return false;
                  }
              }
          })
      },
      chenshipc(id,name){
          console.log(id+"---"+name)
          this.city_id = id
          this.city = name
          this.showshengul = false
          this.showshiul = false
          this.city_name = name
          this.getofflinelistA()
      },*/
      show() {
          if (document.body.offsetWidth > 750) {
              this.likeimg = require('../../common/image/pcimg/likeimg.png');
          } else {
              this.likeimg = require('../../common/image/appimg/likeimg.png');
          }
      },
  },
  mounted(){
      this.getofflinelistA();
      this.show();
      /*this.provincedata()*/
      let _this = this
      $(window).scroll(function() {
          if ($(document).scrollTop()+1 >= $(document).height() - $(window).height()) {
              console.log($(document).height() - $(window).height())
              //isBottom = true;
              if(_this.IsBottom){
                  _this.IsBottom = false;
                  // console.log(212313)
                  _this.loadMore()
              }

          }
      });
  },
  created() {
  }
}
</script>

<style scoped>
    .sheng {
        overflow: inherit!important;
    }
    .cityBox{
        position: relative;
    }
    .city-select{
        position: absolute;
        left: 51.8%;
        top: 95px;
        z-index: 111;
        width: 200px;
    }
    .span-select {
        /* position: absolute;*/
        width: 100px;
        width: 100%;
        display: block;
        height: 240px;
    }
    .span-select-nr {
        background-color: #fff;
        border: 1px solid #aaa;
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 100%;
        z-index: 1051;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
        border-top: 0px;
        overflow: hidden;
    }
    .span-select-nr ol{
        max-height:240px;
        overflow-y: scroll!important;
    }
    .city-select .span-select{
        height: 233px !important;
    }
    .city-select  .span-select-nr ol{
        height: 233px !important;
    }
    .span-select-nr ol li{
        height: 26px!important;
        line-height: 26px!important;
        border-bottom: 0px !important;
        padding: 6px;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-select: none;
        color: #000;
    }
    .span-select-nr ol li:hover{
        background-color: #950014!important;
        color: #fff;
    }
    .select2-selection__arrow b {
        border-color: #888 transparent transparent;
        border-style: solid;
        border-width: 5px 4px 0;
        height: 0;
        left: 50%;
        margin-left: -4px;
        margin-top: -2px;
        position: absolute;
        top: 50%;
        width: 0;
    }
    .select2-selection__arrow {
        height: 26px;
        position: absolute;
        top: 1px;
        right: 1px;
        width: 20px;
    }
    .pc-select-nrtext {
        display: block;
        padding-left: 0px;
        padding-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 28px;
        text-indent: 10px;
    }
    .pc-select {
        box-sizing: border-box;
        display: inline-block;
        margin: 0;
        /*position: relative;*/
        vertical-align: middle;
        width: 100%;
    }
    .pc-select-nr {
        box-sizing: border-box;
        cursor: pointer;
        display: block;
        height: 28px;
    }
    .dataBox {
        content: "";
        background:url('../../common/image/rili1.png')  no-repeat;
        background-size: 80% 80%;
        width: 25px;
        height: 32px;
        display: flex;
        position: absolute;
        padding: 4px 10px 4px 0px;
        cursor:pointer;
    }


.parsche-offline-lb {
  overflow: hidden;
}

.swiper-container2B {
  display: none;
}
.swiper-slide-offlineimg {
  width: auto;
  height: 550px;
}


.offline-bottom .bottom-a:first-child {
  margin-right: 20px;
}
.offline-bottom .bottom-a:last-child{
  margin-left: 20px;
}

.bottom-a {
  text-align: center;
  width: 145px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  font-size: 14px;
  display: inline-block;
  border: 1px solid #fff;
  letter-spacing: 2px;
}
.parsche-offline-bottom {
  background: #15577e;
  padding:25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.applicants-right-number {
  margin-bottom: 5px;
}
.number-data {
  font-size: 28px!important;
  color: #000;
}
.applicants-right-a {
  margin-right: 15px;
}


.slide-applicants-right {
  float: right;
  display: flex;
    text-align: right;
}
.slide-applicants {
  padding: 15px 0px;
}

.applicants-left-b{
    display: none;
}

.applicants-left-a h5{
  font-size: 14px;
  color: #000;
  line-height: 18px;
    float: left;
}
.applicants-left-a h5:nth-child(2n+1){
    margin-right: 20px;
}
.slide-applicants-left {
  float: left;
  display: flex;
}
.slide-title-nr {
  padding: 15px 30px;
}
.swiper-slide-applicants {
  position: relative;
}
.swiper-slide-applicants h2 {
  font-size: 24px;
  color: #000;
  text-align: center;
  margin: 20px;
  margin-bottom: 50px;
}
.clear {
  clear: both;
}
.slide-title  {
  /*padding: 15px 30px;*/
  position: absolute;
  top: -55px;
  background: #000000;
  background-color: rgba(0,0,0,.3);
  width: 100%;
}
.slide-title-left {
  float: left;
}

.slide-title h3 {
  font-size: 20px;
  color: #fff;
  height: 25px;
  line-height: 25px;
}
.applicants-map {
 /*position: absolute;
    left: 0px;*/
    width: 6%;
    float: left;
}
.applicants-map:before {
    content: "";
    background:url('../../common/image/pcimg/xxhd-map.png') 100% no-repeat;
    width: 25px;
    height: 32px;
    display: flex;
    position: relative;
    padding: 4px 10px 4px 0px;
}
.screen-change{
 /* position: absolute;
    left: 45px;
    width: 100%;*/
    margin-top: 4px;
    width: 94%;
    float: left;
}
.screen-box{
    height: 40px;
    line-height: 40px;
    width: 100%;
}
.sereen-select{
    width: 48.6%;
    height: 30px;
    line-height: 30px;
    background: #fff;
    border: 1px solid #000;

}
.sereen-select:first-child{
    float: left;
    margin-right: 2%;
}
.sereen-select:last-child{
    float: right;
}
.btn-arrows:after {
    content: "";
    border: 5px solid transparent;
    width: 0;
    height: 0;
    display: inline-block;
    border-left-color: #fff;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -5px;

}
.ui-btns {
  color: #fff;
  width: 150px;
  font-size: 18px;
  text-align: center;
  height: 36px;
  line-height: 38px;
  background: #9a0000;
  display: inline-block;
  cursor: pointer;
  border: 0 none;
  padding: 0;
  position: relative;
}


.swiper-slide-title {
  position: relative;
  /*bottom: 0px;
  background: #0000006b;
  width: 100%;*/
}
.cover{
  object-fit: cover;
}
.parsche-offline-top {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 86%;
}
.parsche-offline-nr {
  background: #fff;
  width: 100%;
}
.parsche-offline-btn {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.offline-verification-texttel {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.offline-verification-texttel label{
  width: 70px;
  border: 1px solid #b7b7b7;
  height: 30px;
  line-height: 30px;
  border-right: 0px;
  padding: 1px 10px;
  font-size: 14px;
  color: #796e6e;
}
.offline-verification-texttel input{
  border: 1px solid #b7b7b7;
  height: 30px;
  font-size: 15px;
  color: #796e6e;
  padding-left: 10px;
}
.offline-verification-texth3 {
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin: 20px 0px;
  text-align: center;
}
.offline-verification-texth3 h3 {
  margin: 5px 0px;
}
.parsche-offline-navigation {
  width: 100%;
  /*overflow: hidden;*/
  height: auto;
  position: relative;
}
.parsche-offline-navigation ul{
  display: flex;
  margin: 0px!important;
    cursor: pointer;
    background: #eff0f1;
}

.parsche-offline-navigation ul li{
  width: 46.5%;
  height: 55px;
  line-height: 55px;
  text-align: center;
    cursor: pointer;
}
.parsche-offline-navigation ul li a{
  display: block;
    cursor: pointer;
}
.swiper-pagination {
  display: none;
}
.parsche-offline-navigation ul li span{
  position: relative;
  top: -55px;
  color: #fff;
    cursor: pointer;
}

.parsche-offline-navigation ul li:last-child span{
  position: relative;
  top: -55px;
  color: #000;
    cursor: pointer;
}

.navigation1 {
  border-bottom: 55px solid #950014;
  border-right: 20px solid #950014;
  border-left: 55px solid #950014;

}
.navigation2 {
  border-top: 55px solid #eff0f1;
  border-right: 55px solid #eff0f1;
  border-left: 55px solid #eff0f1;
}
.slide-applicants {
  /*margin-bottom: 10px;*/
}

    .noconBox{
        min-height: 450px;
        text-align: center;
        line-height: 450px;
    }
@media (max-width: 768px) {

    .applicants-left-a{
        display: none;
    }
    .applicants-left-b{
        display: block;
    }
    .applicants-left-b h5{
        font-size: 14px;
        color: #000;
        line-height: 18px;
    }

    .parsche-offline-navigation ul li{
        width: 42%;
        height: 55px;
        line-height: 55px;
        text-align: center;
    }
  .offline-bottom .bottom-a:first-child {
    margin-right: 5px;
  }
  .parsche-offline-top {
    width: 100%;
  }
  .slide-applicants {
    /*margin-bottom: 30px;*/
    }
  .offline-bottom .bottom-a:last-child{
    margin-left: 5px;
  }
  .bottom-a {
    width: 130px;
  }
  .slide-title {
    /*display: none;*/

  }
  .slide-title-nr {
      padding: 15px 10px;
  }
  .slide-title-left h3 {
    font-size: 14px;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

  .slide-applicants-left{
    display: block;
    /*max-width:170px;*/
    overflow: hidden;
      width: 60%;
  }
   .slide-applicants-right {
    display: block;
       width: 40%;
  }

  .swiper-slide-offlineimg {
    width: auto;
    height: 250px;
  }
  .applicants-right-a {
    margin-bottom: 10px;
    margin-right: 0px;
  }

  .swiper-pagination {
    display: block;
  }

  .ui-btns {
    height: 30px;
    line-height: 30px;
    width: 120px;
    font-size: 16px;
  }
  .swiper-slide-applicants {
    margin: 0 15px;
  }
  .swiper-slide-applicants h2 {
    font-size: 18px;
    color: #000;
    text-align: center;
    margin: 20px;
    margin-bottom: 50px;
  }
    .applicants-map {
        display: inline-block;
        float: left;
    }
    .applicants-map {
        /*position: absolute;*/
        width: 14%;
        float: left;
        /*left: 0px;*/
    }
    .applicants-map:before {
        content: "";
        background:url('../../common/image/pcimg/xxhd-map.png') 100% no-repeat;
        width: 25px;
        height: 32px;
        display: flex;
        position: relative;
        padding: 4px 10px 4px 0px;
    }
    .screen-change{
       /* position: absolute;
        left: 10%;*/
        width: 86%;
        float: left;
    }
    .screen-box{
        height: 40px;
        line-height: 40px;
        width: 100%;
    }
    .sereen-select{
        width: 45%;
        height: 30px;
        line-height: 30px;
        background: #fff;
        float: left !important;
    }
    .sereen-select:first-child{
        margin-right: 2%;
    }

    .cityBox{
        position: relative;
    }
    .city-select{
        position: absolute;
        left: 50.4%;
        top: 95px;
        z-index: 111;
        width: 120px;
    }
    .span-select {
        /* position: absolute;*/
        width: 100px;
        width: 100%;
        display: block;
        height: 240px;
    }
    .span-select-nr {
        background-color: #fff;
        border: 1px solid #aaa;
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 100%;
        z-index: 1051;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
        border-top: 0px;
        overflow: hidden;
    }
    .span-select-nr ol{
        max-height:240px;
        overflow-y: scroll!important;
    }
    .city-select .span-select{
        height: 233px !important;
    }
    .city-select  .span-select-nr ol{
        height: 233px !important;
    }
    .span-select-nr ol li{
        height: 26px!important;
        line-height: 26px!important;
        border-bottom: 0px !important;
        padding: 6px;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-select: none;
        color: #000;
    }
    .span-select-nr ol li:hover{
        background-color: #950014!important;
        color: #fff;
    }
    .select2-selection__arrow b {
        border-color: #888 transparent transparent;
        border-style: solid;
        border-width: 5px 4px 0;
        height: 0;
        left: 50%;
        margin-left: -4px;
        margin-top: -2px;
        position: absolute;
        top: 50%;
        width: 0;
    }
    .select2-selection__arrow {
        height: 26px;
        position: absolute;
        top: 1px;
        right: 1px;
        width: 20px;
    }
    .pc-select-nrtext {
        display: block;
        padding-left: 0px;
        padding-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 28px;
        text-indent: 10px;
    }
    .pc-select {
        box-sizing: border-box;
        display: inline-block;
        margin: 0;
        /*position: relative;*/
        vertical-align: middle;
        width: 100%;
    }
    .pc-select-nr {
        box-sizing: border-box;
        cursor: pointer;
        display: block;
        height: 28px;
    }
    .dataBox {
        content: "";
        background:url('../../common/image/rili1.png')  no-repeat;
        background-size: 80% 80%;
        width: 25px;
        height: 32px;
        display: flex;
        position: absolute;
        padding: 4px 10px 4px 0px;
        cursor:pointer;
    }

    .span-select-nr ol::-webkit-scrollbar{/*滚动条整体样式*/
        width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 2px;
    }
    .span-select-nr ol::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
        border-radius: 2px;
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .span-select-nr ol::-webkit-scrollbar-track{/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
    .noconBox{
        min-height: 300px;
        text-align: center;
        line-height: 300px;
    }
}
</style>
