<template>
<div class="porsche-article">
    <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
    <div class="porsche-article-nr">
      <img class="cover"  style="width: 100%;"  :src="PORSCHE_HOST+drivearticle.picture_path" alt="">
      <div class="drive-top-nr">
          <div class="drive-nrimg">
              <img class="cover"  style="width: 100%;height:100%"  :src="drivearticle.avatar != null && drivearticle.avatar != ''?PORSCHE_HOST+drivearticle.avatar:require('../../common/image/180126.jpg')" alt="">
          </div>
          <h3 class="drive-top-nrh3">{{drivearticle.nickname}}</h3>
          <h2 class="drive-top-nrh2"><i class="iconfont icon-26yinhao icon-yinhao"></i>{{drivearticle.title}}<i class="iconfont icon-quotesUp-copy icon-quotesUp"></i></h2>
      </div>
      <div class="porsche-article-nrtext">
        <div class="article-nrtext" v-html="drivearticle.content"></div>
      </div>
      <Comment :articleId="articleId"></Comment>
    </div>
</div>
</template>

<script>
import Comment from '@/basecom/commentdealer.vue';
import {PORSCHE_HOST} from '../../common/js/host';
export default {
  components:{
      Comment,
  },
  data(){
    return{
        PORSCHE_HOST,
        articleId:'',
        drivearticle:{},
    }
  },
  methods:{
      back(){
          let _this = this;
          _this.$router.push('/drive');
      },
    timedata(time){
    return  new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
    },
    getdrivearticle(){
      let _this = this;
      $.ajax({
              type: 'post',
              data: {
                article_id:_this.num
              },
              url: PORSCHE_HOST +'/member/driver/detail',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  if(res.code === "1001") {
                    console.log(res.data)
                    _this.drivearticle = res.data
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
      this.getdrivearticle();
      this.setVisiturl()
  },
  created() {
    this.articleId = this.$route.params.num
  }


}
</script>

<style scoped>
.drive-nrimg {
    width: 70px;
    height: 70px;
    border-radius: 70px;
    overflow: hidden;
    display: inline-block;
}
.drive-top-nr {
  position: absolute;
  text-align: center;
  top: 20px;
  width: 100%;
  z-index: 9;
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
.drive-top-nrh3 {
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
}
.drive-top-nrh2 {
  color: #fff;
  font-size: 20px;
  margin-top: 30px;
}
.slide-article {
  display: block;
}
.slide-articleapp {
  display: none;
}
.porsche-article-nrtext {
  margin: 20px 0;
}
.article-nrtext h3,.article-nrtext p{
    font-size: 15px;
    line-height:1.5;
}
.article-right-like h5 {
  font-size: 13px;
}
.article-like {
  margin-bottom: 5px;
}
#heart {
  position: relative;
  height: 22px;
  width: 30px;
  margin-left: auto;
  margin-right: auto;
}

#heart:before,#heart:after {
    content: "";
    width: 13px;
    height: 22px;
    position: absolute;
    background: #9a0000;
    left: 13px;
    top: 0;
    border-radius: 50px 50px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
}
#heart:after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
}
.article-right-like {
  margin-left: 15px;
  text-align: center;
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
  background: #9a0000;
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
  background: #48b412;
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
  text-align: center;
}
.porsche-article-nr {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  /*padding: 70px 0;*/
  position: relative;
  width: 86%;
}
@media (max-width: 768px) {
  .porsche-article-nr {
    margin-left: 20px;
    margin-right: 20px;
    padding: 50px 0;
    padding-top: 10px;
    line-height: 24px;
    width: 86%;
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
    font-size: 16px;
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
  .drive-top-nrh2 {
    font-size: 16px;
  }
}
</style>
