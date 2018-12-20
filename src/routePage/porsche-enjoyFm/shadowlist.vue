<template lang="html">
      <div class="porsche-enjoyFm-shadowlist">
          <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
          <div class="enjoyFm-box" v-if="showlist">
        <div class="enjoyFmshare-top">
            <div class="enjoyFmshare-top-nr">
                    <swiper :options="swiperOption" ref="mySwiper" style="position: static;">
                    <!-- slides -->
                      <swiper-slide  v-for="(list,index) in this.shadowlist.content">
                          <!--<img class="cover" :style="{height:heightNr+'px'}" id="enjoyFmshare-top-nrimgid" style="width: 100%;"  :src="list.imgpic" alt="">-->
                          <img class="cover" id="enjoyFmshare-top-nrimgid" style="width: 100%;"  :src="list.imgpic" alt="">
                         <!-- <div class="enjoyFmshare-top-nrp">
                              <div class="top-nrpxinx">
                                <div class="top-nrpxinxtext">
                                  <p>{{shadowlist.title}}</p>
                                </div>

                              </div>
                          </div>-->
                      </swiper-slide>
                      <!-- Optional controls -->
                        <div class="swiper-pagination"  slot="pagination"></div>
                        <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
                        <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
                  </swiper>
                </div>
                <div class="app-top-nrpxinx-nr">
                    <div class="app-top-con">
                        <div class="app-top-conbox">
                            <div class="app-top-nrpxinx-img">
                                <div class="app-nrpxinx-img">
                                    <img class="cover"  id="app-enjoyFmshare-top-snrimgid" style="width: 100%;height:100%"  :src="shadowlist.avatar != null && shadowlist.avatar != '' ?PORSCHE_HOST+shadowlist.avatar:require('../../common/image/180126.jpg')" alt="">
                                </div>
                                <div class="app-nrpxinx-name">
                                    <span>{{shadowlist.nickname}}</span>
                                </div>
                            </div>
                            <div class="app-top-nrpxinx-pingandzan">
                                <div class="order-box">
                                    <div class="order-list">
                                        <p>
                                            <span class="order-pre order-span" @click="preposts()">上一篇</span>
                                            <span class="order-next order-span" @click="nextposts()">下一篇</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="app-top-nrpxinx-zan">
                                    <div class="app-top-nrpxinx-ping button-a">
                                        <a @click="appSeteupvote_count()">
                                            <span v-if="shadowlist.upvotestatus == 'Y'" class="iconfont icon-xin xinxin"></span>
                                            <span v-if="shadowlist.upvotestatus == 'N'" class="iconfont icon-xiangqu"></span>
                                            <span ><span>{{shadowlist.upvote_count}}&nbsp;&nbsp;</span>赞</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div  class="body-text">
                    <div class="body-text-content">{{shadowlist.title}}</div>
                    <div v-html="shadowlist.body_text" class="body-text-content"></div>
                </div>
                <div class="app-order-box">
                    <div class="app-order-list">
                        <p>
                            <span class="app-order-pre order-span" @click="preposts()">上一篇</span>
                            <span class="app-order-next order-span" @click="nextposts()">下一篇</span>
                        </p>
                    </div>
                </div>
            </div>
      <!-- </div> -->
        <div class="enjoyFmshare-bottom">
          <div class="enjoyFmshare-bottom-nr">
            <div class="enjoyFmshare-bottom-nrimg">
                <img  class="cover bottom-nrimg" style="width: 100%;"  :src="require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-1.jpg')" alt="">
            </div>
              <div class="enjoyFmshare-bottom-nrimg" v-for="topmin in topimglist">
                <a href="#">
                  <img  class="cover bottom-nrimg" style="width: 100%;"  :src="topmin.img" alt="">
                </a>
              </div>
              <div class="clear"></div>
          </div>
        </div>
            <div class="clear"></div>
      </div>
        <Comment class="lsts"  :typedata="typedata" :articleId="articleId"></Comment>
      </div>

    </template>

    <script scoped>
    import {PORSCHE_HOST} from '../../common/js/host';
    import Comment from '@/basecom/comment.vue';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
      components: {
        Comment,
        swiper,
        swiperSlide
      },
      data(){
        return {
          swiperOption:{
            direction: 'horizontal',
            loop: false,
            autoplay: 6000,
            prevButton:'.swiper-button-prev',
            nextButton:'.swiper-button-next',
            pagination : '.swiper-pagination',
            autoplayDisableOnInteraction : false,
              paginationClickable: true,
          },
          heightNr:0,
          typedata:'PROJECTION',
          showlist:true,
          showcomments:false,
          PORSCHE_HOST,
            articleList:[],
          num:'',
          articleId:'',
          topdata:{
            id:"1",
            img:'',
            zan:20,
            toptext:'一个经典的设计会得到百年的传承，每一辆保时捷都是一件艺术品。每一位保时捷粉丝也都是最专业的摄影师。分享你为保时捷拍过的“写真”，分享你眼中的挚爱。',

          },
          topimg:'',
          toptext:'一个经典的设计会得到百年的传承，每一辆保时捷都是一件艺术品。每一位保时捷粉丝也都是最专业的摄影师。分享你为保时捷拍过的“写真”，分享你眼中的挚爱。',
          topimglist:[
            // {
            //   id:"1",
            //   img:require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-1.jpg'),
            //
            // },
            {
              id:"2",
              img:require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-2.jpg'),

            },
            {
              id:"3",
              img:require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-2.jpg'),

            },
            {
              id:"4",
              img:require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-2.jpg'),

            },
            {
              id:"5",
              img:require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-2.jpg'),
            },
            {
              id:"6",
              img:require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-2.jpg'),

            },
            {
              id:"7",
              img:require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-2.jpg'),

            },
            {
              id:"8",
              img:require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-2.jpg'),

            }
          ],
          shadowlist:
                {
                  upvotestatus:'N',
                  upvote_count:'11',
                  avatar:'',
                  id:"1",
                  zan:"23",
                  title:"每一次的追逐，不是跟风，而是热爱",
                  content:[],
                  nickname:"乔先生",
                  picture_path:'',
                  body_text: ''

                }
          }
      },
      methods:{
          back(){
              let _this = this;
              _this.$router.push('/shadow');
          },
        // showcomment (){
        //   this.showlist = false
        //   this.showcomments = true
        // },
        showPc(){
          let l_height = $(window).height();
          // document.getElementById('enjoyFmshare-top-nrimgid').onload=function(){
            let zongpc_height = parseInt(l_height) - parseInt(131);
            this.heightNr = zongpc_height
            // $("#enjoyFmshare-top-nrimgid").height(zongpc_height);
          // };
        },
        showApp(){
          let l_height = $(window).height();
          // document.getElementById('enjoyFmshare-top-nrimgid').onload=function(){
            let zongapp_height = parseInt(l_height) - parseInt(55);
              this.heightNr = zongapp_height
            // $(".porsche-enjoyFm-shadow").height(zongapp_height);
            // $("#enjoyFmshare-top-nrimgid").height(zongapp_height);
          // };
        },
        show(){
          let nrimg_width = $(".enjoyFmshare-bottom-nrimg img").width();

          $(".enjoyFmshare-bottom-nrimg img").height(nrimg_width);
          if (document.body.offsetWidth > 750) {
            this.topdata.img = require('../../common/image/pcimg/gy2-bg.jpg');
            this.showPc();
          }
          else {
            this.topdata.img = require('../../common/image/appimg/gy2-bg.png');
            this.showApp();
          }
        },

        getshadowData(){
          let _this = this;
            _this.getNum()
          $.ajax({
                  type: 'post',
                  data:{
                    article_id:this.num,
                      type:"PROJECTION",
                  },
                  url: PORSCHE_HOST+'/member/show/detail',
                  success: function (res) {
                    if(res.code === "1004") {
                        _this.$router.push('/login');
                        return ;
                    }
                    if(res.code === "1001") {
                      console.log(res)
                          _this.shadowlist.id = res.data.article.id
                          _this.shadowlist.picture_path = res.data.article.picture_path
                          _this.shadowlist.avatar = res.data.article.avatar
                          _this.shadowlist.title = res.data.article.title
                          _this.shadowlist.body_text = res.data.article.body_text
                          let content = JSON.parse(res.data.article.content)
                          _this.shadowlist.applicants = res.data.article.applycount
                          _this.shadowlist.nickname = res.data.article.nickname
                          _this.shadowlist.upvote_count = res.data.article.upvote_count
                          _this.shadowlist.upvotestatus = res.data.upvote_status
                          console.log("shadowlist---"+JSON.stringify(_this.shadowlist))
                          let array_shadowimg = [];
                          for (let i=0;i< content.length;i++){
                            let object_shadowimg = {
                              "content":content[i].content,
                              "imgpic":PORSCHE_HOST+content[i].imgpic,
                            }
                            array_shadowimg.push(object_shadowimg)
                          }
                            console.log(array_shadowimg)
                            _this.imgonload(array_shadowimg)
                          // _this.show();


                        _this.articleList =  res.data2;
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
          preposts(){
              let _this = this;
              let uuid;
              this.num = this.$route.params.num

              for(var i=0;i<_this.articleList.length;i++){
                  if(_this.articleList[i].uuid.indexOf(this.num) != -1){
                      if(i==0){
                          alert("这已经是第一篇啦!")
                          return false;
                      }else{
                          uuid = _this.articleList[i-1].uuid;
                      }
                  }
              }
              _this.$router.push({path: '/shadowlist/' + uuid});
          },
          nextposts(){
              let _this = this;
              let uuid;
              this.num = this.$route.params.num
              for(var i=0;i<_this.articleList.length;i++){
                  if(_this.articleList[i].uuid.indexOf(this.num) != -1){
                      if(i==_this.articleList.length-1){
                          alert("这已经是最后一篇啦!")
                          return false;
                      }else{
                          uuid = _this.articleList[i+1].uuid;
                      }
                  }
              }
              _this.$router.push({path: '/shadowlist/' + uuid});
          },

        imgonload(mulitImg){
                  let _this = this;
                 let img = [];
                 let flag = 0;
                 let imgTotal = mulitImg.length;
                 for(let i = 0 ; i < imgTotal ; i++){
                    img[i] = new Image()
                    img[i].src = mulitImg[i].imgpic
                    img[i].onload = function(){
                       //第i张图片加载完成
                      //  alert("第i张图片加载完成")
                       flag++
                      //  let nrimg_width = $(".enjoyFmshare-bottom-nrimg img").width();
                      //  $(".enjoyFmshare-bottom-nrimg img").height(nrimg_width);
                       if( flag == imgTotal ){
                        //  alert("全部加载完成")
                        _this.shadowlist.content = mulitImg
                        // let mySwiper = new Swiper('#swiper-container5', {
                        //   direction: 'horizontal',
                        //   loop: true,
                        //   autoplay: 6000,
                        //   prevButton:'.swiper-button-prev',
                        //   nextButton:'.swiper-button-next',
                        //   pagination : '.swiper-pagination',
                        //   autoplayDisableOnInteraction : false,
                        //   onFirstInit: function(swiper){
                        //   // alert('到了最后一个slide');
                        // }
                        // })
                        _this.show()
                          //全部加载完成
                       }
                    }
                 }
                 console.log("mulitImg------"+mulitImg)
          },
        seteupvote_count(){
          var urlshash = window.location.hash;
          var urlspathname = window.location.pathname;
          var urls = urlspathname+urlshash
          let _this = this;
          $.ajax({
                  type: 'post',
                  data:{
                    article_id:this.num,
                    visit_url:urls.toString()
                  },
                  url: PORSCHE_HOST+'/member/show/article/upvote',
                  success: function (res) {
                    if(res.code === "1004") {
                        _this.$router.push('/login');
                        return ;
                    }
                    if(res.code === "1001") {
                        console.log(res.data)
                          _this.shadowlist.upvotestatus = res.data.upvote_status
                          _this.shadowlist.upvote_count = res.data.upvote_count
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
          appSeteupvote_count(){
              var urlshash = window.location.hash;
              var urlspathname = window.location.pathname;
              var urls = urlspathname+urlshash
              let _this = this;
              $.ajax({
                  type: 'post',
                  data:{
                      article_id:this.num,
                      visit_url:urls.toString()
                  },
                  url: PORSCHE_HOST+'/member/show/article/upvote',
                  success: function (res) {
                      if(res.code === "1004") {
                          _this.$router.push('/login');
                          return ;
                      }
                      if(res.code === "1001") {
                          console.log(res.data)
                          _this.shadowlist.upvotestatus = res.data.upvote_status
                          _this.shadowlist.upvote_count = res.data.upvote_count
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
        setVisiturl(){
            let _this = this;
            _this.getNum()
          var urlshash = window.location.hash;
          var urlspathname = window.location.pathname;
          var urls = urlspathname+urlshash

          $.ajax({
                  type: 'post',
                  data:{
                    article_id:_this.num,
                    visit_url:urls.toString()
                  },
                  url: PORSCHE_HOST+'/member/visit/record/add',
                  success: function (res) {
                    if(res.code === "1004") {
                        _this.$router.push('/login');
                        return ;
                    }
                    if(res.code === "1001") {
                        // alert(res.message);
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
          getNum () {
              this.articleId = this.$route.params.num
              this.num = this.$route.params.num
          }
      },
      mounted(){
        this.num = this.$route.params.num
        this.getshadowData()
        this.setVisiturl()
      },
      created() {
        this.num = this.$route.params.num
        this.articleId = this.$route.params.num
        // this.getshadowData()
      },
        watch: {
            // 如果路由有变化，会再次执行该方法
            /*'$route': 'setVisiturl'*/

            $route(){
                this.getshadowData()
                this.setVisiturl()

            }

        }
    }
    </script>

    <style scoped>
    .swiper-slide-drive img {
      margin-left: auto;
      margin-right: auto;
      display: flex;
      /*width: 450px;*/
      max-width: 1200px;
      height: auto;
    }
    .lsts {
      max-width: 1200px;
      width: 86%;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .xinxin {
      color: red!important;
    }
    .nrpxinx-name {
      margin-left: 10px;
      display: inline-block;
    }
    .nrpxinx-name span {
      font-size: 14px;
    }
    .top-nrpxinxtext {
      padding: 0 20px;
    }
    .top-nrpxinx-ping {
      margin-right: 5px;
      display: inline-block;
    }
    .top-nrpxinx-zan {
      display: inline-block;
    }
    .nrpxinx-img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      overflow: hidden;
      display: inline-block;
    }

    .top-nrpxinx-img {
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .top-nrpxinx-pingandzan {
      float:  right;
      /*position: relative;*/
      top: 10px;
    }
    .button-a a {
      width: 65px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #fff;
      font-size: 12px;
      line-height: 22px;
      text-align: center;
        cursor: pointer;
    }
    .button-a a span:last-child{
      margin-left: 5px;
    }
    .enjoyFmshare-bottom {
      background: #000;
      display: none;
    }
    .enjoyFm-box{
        max-width: 1200px;
        width: 86%;
        margin-left: auto;
        margin-right: auto;
    }
    .enjoyFmshare-top-nr {
        width: 100%;
        position: relative;
     /*background: #000;*/
    }
    .enjoyFmshare-top-nrimg {
     /* position: relative;*/
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    .enjoyFmshare-top-nrimg img{
      /*max-width: 1200px;*/
    }
    .cover{
      object-fit: cover;
    }
    .enjoyFmshare-top-nrp {
      background: #000000;
      background-color: rgba(0,0,0,.3);
      position: absolute;
      bottom: 2px;
      width: 100%;
    }
    .enjoyFmshare-top-nrp .top-nrpxinx {
      color: #fff;
      font-size: 18px;
      line-height: 24px;
      max-width: 1200px;
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 15px;
      padding-bottom: 15px;
      margin: 0 auto;
      z-index: 5;
    }
    .enjoyFmshare-bottom-nr {
      max-width: 1100px;
      margin-left: auto;
      margin-right: auto;
    }
    .enjoyFmshare-bottom-nr a {
      display: flex;
    }
    .enjoyFmshare-bottom-nrimg {
      width: 12.5%;
      /*position: relative;*/
      float: left;
    }
    .clear {
      clear: both;
    }
    /*.swiper-container{
        position: absolute;
    }*/
   /*.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
        bottom: 0;
        top: 15px;
        z-index: 1;
        height: 15px;

    }*/
   /*.swiper-button-prev{
       right: -1200px !important;
   }
   .swiper-button-next{
      right: -1200px !important;
   }*/
    .app-top-nrpxinx-nr{
       /* display: none;*/
    }

    .app-top-nrpxinx-nr{
        display: block;
        width: 100%;
        margin: 10px auto 0px;
    }
    .app-top-con{
        padding: 0px;
        position: relative;
    }
    .app-top-conbox{
        height: 65px;
        border-bottom: 1px solid #cfcfcf;
    }
    .top-nrpxinx-nr{
        display: none;
    }
    .app-top-nrpxinx-img{
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .app-top-nrpxinx-pingandzan{
        float: right;

    }
    .app-nrpxinx-img{
        width: 50px;
        height: 50px;
        border-radius: 50px;
        overflow: hidden;
        display: inline-block;
    }
    .app-nrpxinx-name{
        display: inline-block;
        padding-left: 15px;
        width: 100px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
    }
    .app-top-nrpxinx-zan{
        width: 65px;
        height: 20px;
        position: absolute;
        right: 2px;
    }
    .button-a a {
        width: 65px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #cfcfcf;
        font-size: 12px;
        line-height: 22px;
        text-align: center;
        cursor: pointer;
    }
    .button-a a span:last-child{
        margin-left: 5px;
    }
    .order-box{
        width:144px;
        height: 20px;
        margin: 0px auto 10px;

    }
    .order-list{
       /* padding: 0 15px;*/
    }
    .order-list p{
        color: #fff;
    }
    .order-pre{
        width:67px;
        height: 22px;
        line-height: 22px;
        display: inline-block;
        background: #313639;
        text-align: center;
        float: left;
        cursor: pointer;
        font-size: 12px;

    }
    .order-next{
        width:67px;
        height: 22px;
        line-height: 22px;
        display: inline-block;
        background: #313639;
        text-align: center;
        float: right;
        cursor: pointer;
        font-size: 12px;
    }

    .app-order-box{
        display: none;
    }
    .body-text{
        width:100%;
        margin:10px auto 0;
        line-height: 1.5;
        font-size: 16px;
    }
    .order-span:hover{
       background: #d5001c !important;
    }
    .order-span:visited{
        background: #313639 !important;
    }
    @media (max-width: 768px) {
      .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
        /*top:15px*/
      }
       .enjoyFm-box{
           width: 100%;
        }
        .body-text{
            width:86%;
            font-size: 14px;
        }
        .body-text .body-text-content{
            padding: 0 15px;
        }
      .enjoyFmshare-bottom-nrimg {
        width: 25%;
        /*position: relative;*/
        float: left;
      }
      .enjoyFmshare-top-nrp p {
        font-size: 12px;
        line-height: 18px;
      }
      .enjoyFmshare-bottom {
        display: none;
      }
      .top-nrpxinxtext {
        padding: 0px;
      }
        .top-nrpxinx-nr{
            display: none;
        }
      .app-top-nrpxinx-nr{
          display: block;
          width: 86%;
          margin: 10px auto 0px;
      }
      .app-top-con{
          padding: 0 15px;
      }
      .app-top-conbox{
          height: 65px;
          border-bottom: 1px solid #cfcfcf;
      }
      .app-top-nrpxinx-img{
          float: left;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .app-top-nrpxinx-pingandzan{
          float: right;
          margin-top: 10px;
      }
      .app-nrpxinx-img{
          width: 50px;
          height: 50px;
          border-radius: 50px;
          overflow: hidden;
          display: inline-block;
      }
      .app-nrpxinx-name{
          display: inline-block;
          padding-left: 15px;
          width: 100px;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
      }
        .app-top-nrpxinx-zan{
            width: 65px;
            height: 20px;
            position: static;

        }
        .button-a a {
            width: 65px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #cfcfcf;
            font-size: 12px;
            line-height: 22px;
            text-align: center;
            cursor: pointer;
        }
        .button-a a span:last-child{
            margin-left: 5px;
        }
        .order-box{
            display: none;
        }
        .app-order-box{
            display: block;
            width: 86%;
            margin: 0px auto;
        }
        .app-order-list{
            padding: 0 15px;
        }
        .app-order-list p{
            height:60px;
            border-bottom: 1px solid #cfcfcf;
            color: #fff;
        }
        .app-order-pre{
            width:120px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            background: #313639;
            text-align: center;
            float: left;
            margin: 15px 0;
        }
        .app-order-next{
            width:120px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            background: #313639;
            text-align: center;
            float: right;
            margin: 15px 0;
        }
        /*.order-span:hover{
            background: #d5001c !important;
        }
        .order-span:visited{
            background: #313639 !important;
        }*/

    }
    </style>
