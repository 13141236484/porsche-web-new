<template lang="html">
  <div class="porsche-enjoyFm-emotion">
      <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
        <div class="enjoyFmemotion-top">
          <div class="top-text">
          　  <h3>挚爱模型</h3>
              <p>集齐保时捷所有的车模是一种怎样的体验</p>
          　</div>
            <img class="cover" id="enjoyFmshare-top-nrimgid" style="width: 100%;"  :src="topimg" alt="">
        </div>
        <div class="enjoyFmemotion-bottom">
          <div class="enjoyFmemotion-bottom-shadow">
            <router-link  :to="{ path: '/upload/'+this.type}" >
              <h3><span  @mouseenter="enter1" @mouseleave="leave1">我要分享 <img   :src="this.messages" alt=""></span></h3>
            </router-link>
          </div>
          <div class="enjoyFmemotion-bottom-nr">
            <router-link  :to="{ path: '/modulelist/'+list.uuid }" v-for="(list,index) in emotionList" :key="index">
            <div class="enjoyFmemotion-bottom-shadowlist" >
                  <div class="enjoyFmemotion-bottom-nrleft">
                      <div class="enjoyFmemotion-left-top">
                          <h5 v-if="list.stay_at_top == 1" style="font-weight: bold"><span style="color: rgb(213,0,28);padding-right: 3px;">【推荐】</span> {{list.title}}</h5>
                          <h5 v-if="list.stay_at_top != 1">{{list.title}}</h5>
                      </div>
                      <div class="enjoyFmemotion-left-bottom" style="overflow: hidden;">
                        <span style="padding-right:3px;border-right:2px solid #e0e0e0;">分享自会员&nbsp;{{list.nickname}}</span>
                        <span>{{timedata(list.created_time)}}</span>
                      </div>
                  </div>
                  <div class="enjoyFmemotion-bottom-nrright">
                      <div class="enjoyFmemotion-nrrightimg">
                          <em class="emotion-span"><span><i class="iconfont icon-xiangqu"></i>&nbsp;{{list.upvote_count}}</span>&nbsp;赞</em>
                          <img class="cover" id="enjoyFmshare-top-nrimgid" style="width: 100%;height:100%"  :src="PORSCHE_HOST+list.picture_path.split(',')[0]" alt="">
                      </div>
                  </div>
          </div>
        </router-link>
          <div class="clear"></div>
        </div>
        </div>
  </div>
</template>

<script scoped>
import {PORSCHE_HOST} from '../../common/js/host';
export default {
  components: {

  },
  data() {
    return {
      currentPage:1,
      offset:0,
      count:10,
      messages :require('../../common/image/fenx3.png'),
      PORSCHE_HOST,
      type:'MODELSTREET',
      topimg: '',
      emotionList: [],
        IsBottom:false
    }
  },
  methods: {
      back(){
          let _this = this;
          _this.$router.push('/enjoyFm');
      },
    enter1(){
        this.messages = require('../../common/image/fenx3-1.png');
    },
    leave1(){
        this.messages = require('../../common/image/fenx3.png');
    },
    show() {
      if (document.body.offsetWidth > 750) {
        this.topimg = require('../../common/image/pcimg/mxja.jpg');
      } else {
        this.topimg = require('../../common/image/appimg/mxja.jpg');
      }
    },
    timedata(time){
      return  new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
    },
    getemotionlist(){
      let _this = this;
      $.ajax({
              type: 'post',
              data:{
                type:"modelstreet",
                  offset:_this.offset,
                  count:_this.count,
              },
              url: PORSCHE_HOST+'/member/show/list',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                if(res.code === "1001") {
                /*  console.log(res.data)
                    _this.emotionList =  res.data*/

                    _this.currentPage = _this.currentPage +1
                    if(_this.offset == 0){
                        _this.emotionList = res.data
                        _this.IsBottom = true;
                    } else {
                        _this.emotionList = _this.emotionList.concat(res.data)
                        _this.IsBottom = true;
                    }

                }
                  if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                    alert(res.message);
                    return false;
                  }
              },
              error: function (res) {
                  console.log("网络连接错误!")
              }
          });
    },
    loadMore(){
        this.count = 10
        this.offset = (parseInt(this.currentPage) - 1) * this.count
        // alert(this.offset)
        this.getemotionlist();
    },
  },
  mounted() {
    this.getemotionlist();
    this.show();
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
  destroyed(){
    $(window).unbind('scroll')
  }
}
</script>

<style scoped>
.top-text {
  position: absolute;
  width: 100%;
  text-align: center;
  margin-top: 50px;
  color: #fff;
}
.top-text h3 {
  font-size: 20px;
  /*margin-bottom: 15px;*/
    position: relative;
    width: 100px;
    margin: 0 auto 15px;
}
.top-text h3::before{
  content: "";
  height: 1px;
  width: 35px;
  background-color: #fff;
  position: absolute;
  top: 10px;
  margin-left: -50px;


}
.top-text h3::after {
  content: "";
  height: 1px;
  width: 35px;
  background-color: #fff;
  position: absolute;
  top: 10px;
  margin-left: 15px;
}
.top-text p {
  font-size: 14px;
  letter-spacing: 1px;
}
.enjoyFmemotion-bottom-nr a {
  display: flex;
}
.enjoyFmemotion-left-top {
  position: relative;
  height: 80px;
  margin-top: 10px;
}
.enjoyFmemotion-left-top h5{
  font-size: 16px;
  color: #000;
}
.enjoyFmemotion-left-bottom span{
  font-size: 14px;
  color: #403f45;
}

.cover{
  object-fit: cover;
}
.enjoyFmemotion-nrrightimg {
  height: 110px;
  width: 160px;
  margin-left: auto;
    position:relative;
    cursor: pointer;
}
.enjoyFmemotion-bottom-nrleft {
  float: left;
  width: 60%;
}
.enjoyFmemotion-bottom-nrright {
  float: right;
  width: 38%;
}
.clear {
  clear: both;
}
.enjoyFmemotion-bottom-shadowlist {
  height: 110px;
  width: 100%;
  position: relative;
  border-top: 1px solid #cfcfcf;
  /*border-bottom: 2px solid #cfcfcf;*/
}
/*.enjoyFmemotion-bottom-shadowlist:last-child {
  border-bottom: 2px solid #cfcfcf;
}*/
.enjoyFmemotion-bottom {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 86%;
}
.enjoyFmemotion-bottom-shadow h3 span:hover {
  color: #d5001c
}
.enjoyFmemotion-bottom-shadow img {
  width: 30px;
  position: relative;
  top: 2px;
}
.enjoyFmemotion-bottom-shadow h3 {
  font-size: 20px;
  color: #000;
  text-align: right;
  padding: 10px 0px;
    cursor: pointer;
}
.enjoyFmemotion-left-bottom {
  position: relative;
}
@media (max-width: 768px) {
  .enjoyFmemotion-bottom-nrleft {
    width: 65%;
  }
  .enjoyFmemotion-bottom {
    width: 100%;
  }
  .enjoyFmemotion-bottom-nrright {
    width: 34%;
  }
  .enjoyFmemotion-left-top h5{
    font-size: 14px;
    line-height: 18px;
    padding-left: 10px;
    width: 190px;
  }
  .enjoyFmemotion-left-bottom span{
    font-size: 12px;
    padding-left: 3px;
  }

  .enjoyFmemotion-bottom-shadowlist {
    height: 80px;
    /*padding-left: 10px;*/
  }
  .enjoyFmemotion-nrrightimg {
    height: 80px;
    width: 108px;
  }
  .enjoyFmemotion-left-top {
    height: 55px;
    overflow:hidden;
    margin-top: 5px;
  }
  .emotion-span {
      position: absolute;
      left: -60px;
      bottom: 4px;
  }
  .enjoyFmemotion-bottom-shadow h3 {
    font-size: 16px;
    margin-right: 10px;
  }
  .top-text {
    margin-top: 25px;
  }
  .top-text h3{
    font-size: 16px;
  }
  .top-text p{
    font-size: 12px;
  }
}
</style>
