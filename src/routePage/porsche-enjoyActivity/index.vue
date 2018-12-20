<template lang="html">
  <div class="porsche-enjoyActivity">
      <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
      <div class="enjoyActivity-fm">
        <div class="enjoyActivity-fmhead">
              <h2 class="enjoyActivity-fmhead-title"><span class="fmhead-title-h2">挚</span>享 FM</h2>
              <div class="enjoyActivity-fmhead-list">
                  <select v-model="timeval" @change="getfmlist()">
                    <option value="">按月搜索</option>
                    <option v-for="list in timelist" :value="list">{{soutimedata(list)}}</option>
                  </select>
              </div>
          </div>
        </div>

        <div class="enjoyActivity-fmnr" v-for="(fm,key) in fmList">
            <div class="enjoyActivity-fmnr-left">
                <div class="fmnr-left-tile">
                  <p v-if="fm.start_time != null && fm.start_time != 0 || fm.end_time">{{timedata(fm.start_time)}}&nbsp;-&nbsp;{{timedata(fm.end_time)}}</p>
                  <p >{{fm.city == null ?'全国':fm.city}}</p>
                  <h3>{{fm.title}}</h3>
                  <router-link  :to="{ path: 'article/'+fm.uuid }" class="ui-btn btn-arrow" >{{secind(fm.second_type)}}</router-link>
                </div>
            </div>
            <div class="enjoyActivity-fmnr-right">
                <router-link  :to="{ path: 'article/'+fm.uuid }" class="main-image" href="#">
                  <img style="max-width: 100%;" :src="PORSCHE_HOST+fm.picture_path" alt="">
                </router-link>
                <div class="visible-sm item-info">
								<p>{{fm.title}}</p>
  							<span class="ui-btn btn-arrow">
                  <router-link  :to="{ path: 'article/'+fm.uuid }" >
  								{{secind(fm.second_type)}}
                </router-link>
  							</span>
							</div>
            </div>
            <div class="fmnr-right-content">
                <div class="right-content">
                  <p v-if="fm.start_time != null && fm.start_time != 0 || fm.end_time"><span>{{timedata(fm.start_time)}}&nbsp;-&nbsp;{{timedata(fm.end_time)}}</span>
                  <span>{{fm.address}}</span></p>
                    <span v-if="fm.second_type != 'CONTENT'" class="right-content-sqcy"><strong style="color:#000">{{fm.join_count}}</strong>&nbsp;申请参与</span>
                    <span  v-if="fm.second_type == 'CONTENT'" class="right-content-sqcy"><strong style="color:#000">{{fm.visit_count}}</strong>&nbsp;浏览</span>
                </div>
            </div>

        </div>
      </div>

</template>

<script scoped>
import {PORSCHE_HOST} from '../../common/js/host';
import moment from 'moment';
export default {
  components: {
    moment,
  },
  data(){
    return {
        fmList:[],
        timelist:[],
        timeval:'',
        PORSCHE_HOST,
        secondtype:{
          "ACTIVITY":"活动详情",
          "REVIEW":"活动回顾",
          "CONTENT":"内容详情",

        }
      }
  },
  methods:{
      back(){
          let _this = this;
          _this.$router.push('/home');
      },
    secind(sec){
      return this.secondtype[sec];
    },
    timedata(time){
    return  new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
    },
    soutimedata(time){

    return  new Date(time).getFullYear() + '年' + (new Date(time).getMonth() + 1) + '月'
    },
    gettime(){
      let _this = this;
      $.ajax({
              type: 'post',
              url: PORSCHE_HOST+'/member/fm/month',
              beforeSend: function(XMLHttpRequest,settings){
               console.log("aaaa");
               console.log(settings);
              },
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  if(res.code === "1001") {
                    console.log(res.data)
                        _this.timelist = res.data
                  }
                  if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                    alert(res.message);
                    return false;
                  }
              },
              error: function (res, xhr) {
                  console.log("网络连接错误!")
              }
          });
    },
    getfmlist(){
      let _this = this;
      let firstDate = "";
      let lastDate = ""
      if(_this.timeval !== ""){
        let datas = new Date(_this.timeval).getFullYear() + '-' + (new Date(_this.timeval).getMonth() + 1)
        let d = moment(datas,"YYYY-MM");
         firstDate=new Date(d.startOf("month")).getTime();
         lastDate=new Date(d.endOf("month")).getTime();
      }
        // alert("firstDate"+firstDate+"------"+"lastDate"+lastDate)
      $.ajax({
              type: 'post',
              data:{
                startDate:firstDate,
                endDate:lastDate
              },
              url: PORSCHE_HOST+'/member/fm/list',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  if(res.code === "1001") {
                    console.log(res.data)
                        _this.fmList = res.data
                  }
                  if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                    alert(res.message);
                    return false;
                  }
              },
              error: function (res, a, b) {
                  console.log("网络连接错误!")
                  // alert('网络'+a+":"+b);
              }
          });
    }
  },
  mounted(){
    this.gettime()
    this.getfmlist()
  }
}
</script>

<style scoped>
.fmnr-left-tile p {
  color: #b3b3b3;
  font-size: 16px;
}
.btn-arrow:after {
    content: "";
    border: 3px solid transparent;
    width: 0;
    height: 0;
    display: inline-block;
    border-left-color: #fff;
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -2px;
}
.ui-btn {
  color: #fff;
  width: 130px;
  text-align: center;
  height: 28px;
  line-height: 28px;
  background: #313639;
  display: inline-block;
  cursor: pointer;
  border: 0 none;
  padding: 0;
  position: relative;
}
.right-content {
  display: none;
}
.enjoyActivity-fmnr-right .item-info {
  display: none;
}
.fmnr-left-tile h3 {
  font-size: 22px;
  line-height: 28px;
  margin-right: 15px;
  color: #000;
  margin-bottom: 60px;
  letter-spacing: 2px;

}
.fmnr-left-tile {
  margin-top: 50px;
}
.enjoyActivity-fmnr {
  width: auto;
  padding: 20px;
  display: flex;
  margin-top: 30px;
}
.enjoyActivity-fmnr-left {
  width: 28%;
}
.enjoyActivity-fmnr-right {
  width: 76%;
  position: relative;
}
.fmhead-title-h2 {
  padding-bottom: 20px;
  border-bottom: 2px solid #000;
}
.enjoyActivity-fmhead-list select {
    width: 90px;
    height: 23px;
    font-size: 12px;
    border: 1px solid #e6e6e6;
    padding-left: 5px;
    outline: none;
}
.porsche-enjoyActivity {
    width: 86%;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
    margin-top: 30px;
}
.enjoyActivity-fm {
  width: auto;
  padding: 20px;
}
.enjoyActivity-fmhead-title {
  display: inline-block;
  width: 30%;
  font-size: 28px;
  text-align: left;
  color: #000;
}
.enjoyActivity-fmhead-list {
  display: inline-block;
  text-align: right;
  width: 68%;
}
.ui-btn:hover {
  background: #d5001c!important;
}
@media (max-width: 768px) {
  .ui-btn {
    background: transparent!important;
  }
  .porsche-enjoyActivity {
      width: 100%;
  }
  .enjoyActivity-fmnr-right .item-info {
    display: block!important;
  }
  .porsche-enjoyActivity {
    margin-top: 20px;
  }
  .enjoyActivity-fmhead-title {
    font-size: 20px;
  }
  .enjoyActivity-fmnr-left {
    display: none;
  }
  .enjoyActivity-fmnr-right {
    width: 100%;
  }
  .enjoyActivity-fmnr {
    margin-top: 0px;
    display: block;
  }
  .enjoyActivity-fmnr-right .item-info {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 20px;
  }
   .enjoyActivity-fmnr-right .item-info p {
    margin: 0 80px 0 0!important;
    text-shadow: -2px 5px 12px rgba(0,0,0,.66);
    color: #fff;
  }
  .enjoyActivity-fmnr-right .ui-btn {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -9px;
    font-size: 10px;
    width: 65px;
    height: 18px;
    line-height: 18px;
  }
  .btn-arrow:after {
      position: static;
      margin-left: 2px;
      border-left-color:#d5001e;
  }
  .main-image {
    display: block;
}
  .visible-sm {
      display: block;
  }
  .right-content {
    display: flex;
    margin-top: 10px;
  }
  .right-content span{
    font-size: 12px;
  }
  .right-content p{
    width: 80%;
  }
  .right-content-sqcy {
    position: absolute;
    right: 15px;
  }
}
</style>
