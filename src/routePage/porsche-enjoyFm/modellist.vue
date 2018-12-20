<template lang="html">
  <div class="porsche-enjoyFm-emotionlist">
      <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
      <div class="enjoyFmemotion-emotionlist-top">
            <div class="emotionlist-top">
                <div class="emotionlist-top-img">
                    <img class="cover"  style="width: 100%;height:100%"  :src="this.emotionlist.avatar != null && this.emotionlist.avatar != ''?PORSCHE_HOST+this.emotionlist.avatar:require('../../common/image/180126.jpg')" alt="">
                </div>
                <div class="emotionlist-top-text">
                    <h3>{{this.emotionlist.title}}</h3>
                </div>
            </div>
            <div class="emotionlist-top-shadow">
                <span>分享自会员&nbsp;<span>{{this.emotionlist.nickname}}</span></span>
                <!-- <span class="emotionlist-zan" @click="seteUpvotecount()"><span>{{this.emotionlist.upvote_count}}</span>赞</span> -->
                <span class="emotionlist-zan" @click="seteUpvotecount()"><span>
                  <i class="iconfont icon-xiangqu" v-if="this.emotionlist.upvotestatus == 'N'"></i>
                  <i class="iconfont icon-xin1"  v-if="this.emotionlist.upvotestatus == 'Y'"></i>
                  {{this.emotionlist.upvote_count}}</span>&nbsp;赞</span>
            </div>
            <div class="clear"></div>
        </div>
        <div class="enjoyFmemotion-emotionlist-bottom" v-for="con in this.emotionlist.content">
            <!--<p>{{con.content}}</p>-->
            <p v-html="strVlaue(con.content)"></p>
              <img class="cover"  style="width: 100%;" :src="PORSCHE_HOST+con.imgpic" alt="">
            <!-- <img class="cover"  style="width: 100%;" v-for="img in this.emotionlist.picture_path"  :src="PORSCHE_HOST+img" alt=""> -->
      </div>
        <Comment :typedata="typedata"  :articleId="articleId"></Comment>
  </div>
</template>

<script scoped>
import Comment from '@/basecom/comment.vue';
import {PORSCHE_HOST} from '../../common/js/host';
export default {
  components: {
    Comment,
  },
  data() {
    return {
      num:'',
      typedata:'MODELSTREET',
      PORSCHE_HOST,
      emotionlist:
            {
              upvotestatus:'N',
              upvote_count:'',
              avatar:'',
              zan:"",
              title:"",
              content:"",
              nickname:"",
              picture_path:'',
              content:'',
            }
    }
  },
  methods: {
      back(){
          let _this = this;
          _this.$router.push('/module');
      },
      // 正文空格,换行,转换
      strVlaue (strValue){
          return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
      },
    show() {
      if (document.body.offsetWidth > 750) {
        this.topimg = require('../../common/image/pcimg/rqsd-bg.jpg');
      } else {
        this.topimg = require('../../common/image/appimg/rqsd-bg.jpg');
      }
    },
    getemotionData(){
      let _this = this;
      $.ajax({
              type: 'post',
              data:{
                article_id:this.num,
              },
              url: PORSCHE_HOST+'/member/show/detail',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                if(res.code === "1001") {
                  console.log("sssss"+JSON.stringify(res.data))
                      _this.emotionlist.picture_path = res.data.article.picture_path.split(',')
                      _this.emotionlist.avatar = res.data.article.avatar
                      _this.emotionlist.title = res.data.article.title
                        _this.emotionlist.content = JSON.parse(res.data.article.content)
                      _this.emotionlist.nickname = res.data.article.nickname
                      _this.emotionlist.upvote_count = res.data.article.upvote_count
                      _this.emotionlist.upvotestatus = res.data.upvote_status
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
    seteUpvotecount(){
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
                      _this.emotionlist.upvotestatus = res.data.upvote_status
                      _this.emotionlist.upvote_count = res.data.upvote_count
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
      var urlshash = window.location.hash;
      var urlspathname = window.location.pathname;
      var urls = urlspathname+urlshash
      let _this = this;
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
    }
  },
  mounted() {
    this.num = this.$route.params.num
    this.getemotionData()
    this.show();
    this.setVisiturl()
  },
  created() {
    this.articleId = this.$route.params.num
  }
}
</script>

<style scoped>
.enjoyFmemotion-emotionlist-bottom p{
  letter-spacing: 1px;
  font-size: 14px;
  color: #000;
  line-height: 22px;
  padding:15px 0;
    word-wrap: break-word;
}
.enjoyFmemotion-emotionlist-bottom {
  margin: 20px 0px;
}
.enjoyFmemotion-emotionlist-top {
  position: relative;
}
.emotionlist-zan {
  position: absolute;
  right: 0px;
    cursor: pointer;
}
.emotionlist-top-shadow {
  padding-left: 60px;
  position:relative;
  margin-top: -15px;
}
.emotionlist-top-shadow span {
  font-size: 12px;
  color: #7d7b7b;
}
.emotionlist-top-text {
  margin-left: 10px;
}
.emotionlist-top-text h3 {
  font-size: 18px;
  color: #000;
}
.porsche-enjoyFm-emotionlist {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  margin-bottom: 20px;
  width: 86%;
}
.emotionlist-top {
  width: 100%;
  display: flex;
}
.emotionlist-top-img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
  display: inline-block;
}
.enjoyFmemotion-emotionlist-top {
  padding-bottom: 15px;
  border-bottom: 1px solid #cfcfcf;
}
.clear {
  clear: both;
}
.cover{
  object-fit: cover;
}
@media (max-width: 768px) {
  .porsche-enjoyFm-emotionlist {
    margin:20px;
  }

  .emotionlist-top {
    width: 100%;
  }
  .emotionlist-top-text {
    width: 200px;
  }
  .emotionlist-top-text h3{
    line-height: 20px;
  }
  .emotionlist-top-shadow {
    margin-top: 0px;
  }

}
</style>
