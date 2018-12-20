<template>
<div class="porsche-article">
    <a @click="back" class="back"><i class="back-con"><img :src="require('../common/image/back.png')" alt=""></i></a>
    <div class="porsche-article-nr">
      <div class="porsche-article-nrleft">
        <h2>{{this.title}}</h2>
        <img style="width: 100%;" :src="PORSCHE_HOST + this.picture_path" alt="">
        <div class="article-nrleft" v-if="this.second_type != 'CONTENT'">
              <div class="slide-article">
                  <div class="slide-article-left">
                    <div class="article-right-b">
                      <a v-if="this.join_status == 'N' && this.activity_is_end != 'Y'"  @click="participate()" class="ui-btns btn-arrows">申请参与</a>
                      <a v-if="this.join_status == 'Y' && this.activity_is_end != 'Y'" style="background:#adadad!important;" class="ui-btns btn-arrows">已申请</a>
                        <a v-if="this.activity_is_end == 'Y' && this.activeId == '186'"  style="background:#adadad!important;" class="ui-btns btn-arrows">已结束报名</a >
                        <a v-if="this.activity_is_end == 'Y' && this.activeId != '186'" style="background:#adadad!important;" class="ui-btns btn-arrows">活动已经结束</a >
                    </div>
                    <div class="article-left-b">
                      <h5 ><span>时间:</span><span v-if="this.start_time != null || this.end_time">{{timedata(this.start_time)}}&nbsp;-&nbsp;{{timedata(this.end_time)}}</span></h5>
                      <h5><span>地址:</span>{{this.address}}</h5>
                    </div>
                  </div>
                  <div class="slide-article-right">
                    <div class="article-right-a">
                        <div class="article-right-number">
                          <span style="margin-right:20px">申请人数</span>
                          <span><span class="number-data">{{this.applicants}}</span><span>&nbsp;人</span></span>
                        </div>
                        <div class="progress-data"></div>
                        <div class="progressbar-data" :style="{width:'20%'}"></div>
                    </div>
                    <div class="article-right-like">
                      <div class="article-like">
                        <!-- <h5 id="heart"></h5> -->
                        <img id="heart" v-if="this.upvote_status == 'N'" @click="tolike()" :src="require('../common/image/xinN.png')" alt="">
                        <img id="heart" v-if="this.upvote_status == 'Y'" @click="tolike()"  :src="require('../common/image/xinY.png')" alt="">
                      </div>
                        <h5>很感兴趣</h5>
                    </div>
                  </div>
                  <div class="clear"></div>
              </div>
              <div class="slide-articleapp">
                  <div class="articleapp-left">
                      <div class="articleapp-left-a">
                        <a v-if="this.join_status == 'N' && this.activity_is_end != 'Y'"  @click="participate()" class="ui-btns btn-arrows but-col">申请参与</a>
                        <a v-if="this.join_status == 'Y' && this.activity_is_end != 'Y'" style="background:#adadad" class="ui-btns btn-arrows but-col lsss">已申请</a>
                         <a v-if="this.activity_is_end == 'Y' && this.activeId == '186'"  style="background:#adadad!important;" class="ui-btns btn-arrows">已结束报名</a >
                          <a v-if="this.activity_is_end == 'Y' && this.activeId != '186'" style="background:#adadad!important;" class="ui-btns btn-arrows">活动已经结束</a >
                      </div>
                      <div class="articleapp-left-b">
                        <div class="article-right-number">
                          <span style="margin-right:20px">申请人数</span>
                          <span><span class="number-data">{{this.applicants != null ?this.applicants:"0"}}</span><span>&nbsp;人</span></span>
                        </div>
                        <div class="progress-data"></div>
                        <div class="progressbar-data" :style="{width:'20%'}"></div>
                      </div>
                      <div class="clear"></div>
                  </div>
                  <div class="articleapp-right">
                      <div class="articleapp-right-a">
                        <h5><span>时间:</span><span v-if="this.start_time != null || this.end_time">{{timedata(this.start_time)}}-{{timedata(this.end_time)}}</span></h5>
                        <h5><span>地址:</span>{{this.address}}</h5>
                      </div>
                      <div class="articleapp-right-b">
                        <div class="article-right-like">
                          <div class="article-like">
                            <img id="heart" v-if="this.upvote_status == 'N'" @click="tolike()" :src="require('../common/image/xinN.png')" alt="">
                            <img id="heart" v-if="this.upvote_status == 'Y'" @click="tolike()"  :src="require('../common/image/xinY.png')" alt="">
                            <!-- <h5 id="heart"></h5> -->
                          </div>
                            <h5>很感兴趣</h5>
                        </div>
                      </div>
                      <div class="clear"></div>
                  </div>
              </div>
        </div>
      </div>
      <div class="porsche-article-nrtext">
        <div class="article-nrtext" v-html="this.content"></div>
      </div>

     <!-- <a href="#" class="go-top"></a>-->
      <Comment :articleId="articleId"></Comment>
    </div>
</div>
</template>

<script>
import Comment from '@/basecom/commentfm.vue';
import {PORSCHE_HOST} from '../common/js/host';
export default {
  components:{
      Comment,
  },
  data(){
    return{
          articleId:'',
          fmList:[],
          num:'',
          id:'',
          type:'',
          content:'',
          picture_path:'',
          title:'',
          address:'',
          start_time:'',
          end_time:'',
          applicants:'6447',
          city:"上海",
          first_type:'fm',
          second_type:'CONTENT',
          join_status:'',
          upvote_status:'',
          activity_is_end:'',
          PORSCHE_HOST,
          activeId:''
    }
  },
  methods:{
      back(){
          let _this = this;
          _this.$router.push('/enjoyActivity');
      },
    timedata(time){
    return  new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
    },
    tofmdetail(){
      let _this = this;
      $.ajax({
              type: 'post',
              data: {
                article_id:_this.num
              },
              url: PORSCHE_HOST+'/member/fm/detail',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  if(res.code === "1001") {
                    console.log(res.data)
                      _this.id = res.data.uuid
                      _this.start_time = res.data.article.start_time
                      _this.end_time = res.data.article.end_time
                      _this.address = res.data.article.address
                      _this.picture_path = res.data.article.picture_path
                      _this.title = res.data.article.title
                      _this.first_type = res.data.article.first_type
                      _this.second_type = res.data.article.second_type
                      _this.content = res.data.article.content
                      _this.applicants = res.data.article.join_count
                      _this.join_status = res.data.join_status
                      _this.upvote_status = res.data.upvote_status
                      _this.activity_is_end = res.data.activity_is_end
                      _this.activeId = res.data.article.id
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
    participate (){
      let _this = this;
      $.ajax({
              type: 'post',
              data: {
                article_id:_this.num
              },
              url: PORSCHE_HOST+'/member/fm/apply',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  if(res.code === "1001") {
                    _this.join_status = 'Y'
                    console.log("res"+res.data)
                    _this.applicants =   res.data.join_count
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
    tolike(){
      let _this = this;
      var urlshash = window.location.hash;
      var urlspathname = window.location.pathname;
      var urls = urlspathname+urlshash
      $.ajax({
              type: 'post',
              data: {
                article_id:_this.num,
                visit_url:urls.toString()
              },
              url: PORSCHE_HOST+'/member/fm/article/upvote',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  if(res.code === "1001") {
                      console.log(res.data.upvote_status);
                    _this.upvote_status =   res.data.upvote_status
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
  mounted(){
      this.num = this.$route.params.num
      this.articleId = this.$route.params.num
      this.tofmdetail();
      this.setVisiturl()
  },
  created() {
    this.articleId = this.$route.params.num
  }


}
</script>

<style scoped>
.slide-article {
  display: block;
}
.slide-articleapp {
  display: none;
}
.article-nrtext img {
  width: 100%;
}
.porsche-article-nrtext {
  margin: 20px 0;
}
.article-right-like h5 {
  font-size: 13px;
}
.article-like {
  margin-bottom: 5px;
}
#heart {
  position: relative;
  height: 20px;
  width: 26px;
  margin-left: auto;
  margin-right: auto;
}

#heart:after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
}
.article-right-like {
  margin-left: 15px;
  text-align: center;
    cursor: pointer;
}
.article-right-b {
  margin-right: 15px;
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
  height: 38px;
  line-height: 40px;
  background: #313639;
  display: inline-block;
  cursor: pointer;
  border: 0 none;
  padding: 0;
  position: relative;
}
.progressbar-data {
  width: 0px;
  height: 3px;
  position: relative;
  top:-3px;
  background: #d5001c;
}
.progress-data {
  width: 100%;
  height: 3px;
  background: #d2d2d2;
}
.number-data {
  font-size: 28px!important;
  color: #000;
}
.article-right-number {
  margin-bottom: 5px;
}
.article-right-a {
  margin-right: 15px;
}
.slide-article-right {
  float: right;
  display: flex;
}
.article-left-b h5{
  font-size: 14px;
  color: #000;
  line-height: 21px;
}
.article-left-a span:last-child{
  font-size: 18px;
  font-weight: bold;
  color: #000;
  position: relative;
  top: 7px;
}
.article-left-a {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}
.slide-article-left {
  float: left;
  display: flex;
}
.slide-article-right {
  float: right;
  display: flex;
}
.slide-article {
  padding: 15px 0px;
}
.porsche-article-nrleft h2 {
  font-size: 30px;
  color: #000;
  margin-bottom: 50px;
  text-align: left;
}
.porsche-article-nr {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 70px 0;
  width: 86%;
}

/*.go-top{
    position: fixed;
    right: 10px;
    bottom: 10px;
    display: block;
    width: 30px;
    height: 30px;
    background: red;
}*/
@media (max-width: 768px) {
  .porsche-article-nr {
    margin-left: 20px;
    margin-right: 20px;
    padding: 50px 0;
    line-height: 24px;
  }
  .porsche-article-nrleft h2 {
    font-size: 18px;
    color: #000;
    margin-bottom: 20px;
    text-align: left;
  }
  .ui-btns {
    width: 120px;
    height: 26px;
    line-height: 28px;
    font-size: 13px;
  }
  .articleapp-left {
    position: relative;
    padding: 15px 0;
    border-bottom: 1px solid #dddddd;
  }
  .articleapp-left-a {
    float: left;
  }
  .articleapp-left-b {
    float: right;
  }
  .number-data {
    font-size: 18px!important;
  }
  .article-right-number span {
    font-size: 12px;
  }
  .article-right-number {
    margin-bottom: 0px;
  }
  .articleapp-right-a {
    float: left;
  }
  .articleapp-right-b {
    float: right;
  }
  .articleapp-right {
    position: relative;
    padding: 15px 0;
    border-bottom: 1px solid #dddddd;
    font-size: 13px;
  }
  .article-like {
    margin-bottom: 0px;
  }
  .slide-articleapp {
    display:block;
  }
  .slide-article {
    display: none;
  }
}
</style>
