<template>
<div class="porsche-comment">
    <div class="porsche-comment-nr">
        <h3>评论列表</h3>
        <div class="porsche-comment-list">
          <div class="comment-item " v-for="(list ,index) in commentList">
          	<img  class="item-avatar lazy"  :src="list.avatar != null  && list.avatar != ''?PORSCHE_HOST+list.avatar:require('../common/image/180126.jpg')" style="display: block;">
          	<div class="item-content">
          		<p class="comment-info">
          			<strong>{{list.user_type == 'MANAGER'?'管理员回复 ':'会员 '+list.nickname}}</strong>
          			<span>{{timedata(list.created_time)}}</span>
          		</p>
          		<div class="comment-content">
                    <p class="showActiveNo" :class="{'showActive':list.showActive}" @click="toggleCon(list,index)">{{list.content}}</p>
                <!--<p>{{list.content}}</p>-->
          		</div>
              		<div class="comment-images">
                    <span class="comment-images-container" :id="list.uuid">
                      <span class="image-item" v-for="path in list.picture_path.split(',')" v-if="path != ''">
                        <img @click="imagesshow(list.uuid)" class="lazy cover" width="100%"   :src="PORSCHE_HOST+path" style="display: inline;">
                  </span>
                </span>
              </div>
              <div class="comment-the" v-for="(the,index) in list.commentList">
                <h5 v-if="the.user_type == 'MANAGER'" class="item-avatar lazy" style="border-radius:0px;color:red;margin-top:5px;">管理员</h5>
                <img v-if="the.user_type == 'MEMBER'"  class="item-avatar lazy" :src="the.avatar != null && the.avatar != ''?PORSCHE_HOST+the.avatar:require('../common/image/180126.jpg')" style="display: block;">
                <div class="item-contentthe">
              		<p class="comment-info" >
              			<strong>{{the.user_type == 'MANAGER'?'管理员回复 ':'会员 '+the.nickname}}</strong>
              			<span>{{timedata(the.created_time)}}</span>
              		</p>
              		<div class="comment-content">
                        <p class="replyNo" :class="{'replyActive':the.replyActive}" @click="toggleReply(the,index)">{{the.content}}</p>
                   <!-- <p>{{the.content}}</p>-->
              		</div>
                  		<div class="comment-images">
                        <span class="comment-images-container" :id="the.uuid">
                          <span class="image-item" v-for="thee in the.picture_path.split(',')" v-if="thee != ''">
                            <img @click="imagesshow(the.uuid)" class="lazy cover" width="100%"   :src="PORSCHE_HOST+thee" style="display: inline;">
                      </span>
                    </span>
                  </div>
                    </div>
              </div>
          	</div>
              <div style="text-align: right;">
                  <span class="comment-info-zan" @click="likeCmment(list.uuid)"><span>
                  <i class="iconfont icon-xiangqu" v-if="list.upvote_status == 'N'"></i>
                  <i class="iconfont icon-xin1"  v-if="list.upvote_status == 'Y'"></i>
                  {{list.upvote_count}}</span>&nbsp;</span>
                  <h4 class="hui-ff" @click="huiff(list.uuid,list.user_id,list.content,list.avatar)">回复</h4>
              </div>
          </div>
        </div>
        <div class="Page navigation" v-if="this.total > 10">
            <el-pagination
                background
                @current-change="getCmment"
                :current-page="currentPage"
                :page-size="count"
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
        </div>
        <div class="common-content-app">
            <div class="common-content-appnr">
              <div class="porsche-comment-list" style="border-bottom:1px solid #c1c1c1" v-if="thexinxi">
                <div style="text-align:right;cursor: pointer;" @click="xx()">X</div>
                <div class="comment-item" >
                	<img  class="item-avatar lazy" :src="this.avatarten != null  && this.avatarten != ''?PORSCHE_HOST+this.avatarten:require('../common/image/180126.jpg')" style="display: block;">
                	<div class="item-content item-content-app" style="background:#fff;border:none;">
                		<p class="comment-info" style="padding-left:10px;font-size:16px;color:#000;line-height:40px;width: 100%;margin-bottom:0px!important;height:40px;">{{this.contentten}}</p>
                	</div>
                </div>
              </div>
              <div class="porsche-comment-list">
                <div class="comment-item" style="margin-top: 40px;">
                	<img  class="item-avatar lazy" :src="this.useravatar != null &&this.useravatar != 'null' && this.useravatar != ''?PORSCHE_HOST+this.useravatar:require('../common/image/180126.jpg')" style="display: block;">
                  <h4 class="xpl">写评论</h4>
                	<div class="item-content item-content-app" >
                		<p class="comment-info" style="width: 100%;margin-bottom:0px!important;">
                      <textarea name="name" v-model="content" rows="2" cols=""></textarea>
                      <div class="main-btn app-mainbtn" @click="addCmment()" v-if="addCmmentbtn">发送</div>
                      <div class="main-btn app-mainbtn" @click="addCmmentThe()" v-if="addCmmentThebtn">发送</div>
                		</p>
                	</div>
                  <div class="comment-images">
                    <span class="comment-images-container">
                      <div class="" v-if="imgSrc != ''">
                          <span class="image-item" v-for="(img,index) in imgSrc">
                                <img width="100%" class="cover lazy" style="display: inline;" :neme="index" @click="delectimg(index)"  :src="img" alt="">
                          </span>
                      </div>
                      <span class="image-item jia-add" @click=""><i class="iconfont icon-jia">
                    <input @change="filesChange" id="fileUpload" type="file" accept="image/*" name="file" title="未选择任何图片"/>
                  </i></span>
                </span>
              </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {PORSCHE_HOST} from '../common/js/host';
import Viewer from 'viewerjs';
import  'viewerjs/dist/viewer.min.css';
import Vue from 'vue';
export default {
  props:{
    articleId:"",
    typedata:""
  },
  data() {
    return {
        upvote_status:"N",
        offset:0,
        total:10,
        count:10,
        currentPage:1,
        useravatar:'',
        thexinxi:false,
        contentten:'',
        avatarten:'',
        addCmmentbtn:true,
        addCmmentThebtn:false,
        imgSrc:[],
        content:'',
        picData:[],
        uuid:'',
        userid:'',
        commentList:[],
        comment_id:'',
        PORSCHE_HOST,

    };
  },

  methods: {
    huiff(uuid,userid,contents,avatarten){
        this.contentten = contents
        this.uuid = uuid
        this.userid = userid
        this.addCmmentThebtn = true
        this.addCmmentbtn = false
        this.avatarten = avatarten
        this.thexinxi = true
        if (document.body.offsetWidth > 750) {
          $('html,body').animate({scrollTop:$('.common-content-appnr').offset().top}, $(window).height());
        }
        else {
          $(".porsche").removeClass("frame-toggle-hide")
          $(".common-content-app").css("position","fixed")
          // let _this = this
          // $(window).scroll(function() {
              // $(".common-content-app").css("position","relative")
          //     _this.thexinxi = false
          //     _this.addCmmentbtn = true
          //     _this.addCmmentThebtn = false
          // });
          }

    },
    delectimg(index){
        console.log(index)
        this.imgSrc.splice(index,1);
        this.picData.splice(index,1);
    },
    filesChange(e){
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
            self.imgSrc.push(data)
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
                  _this.picData.push(res.data.picture_path)
                  console.log("pic"+_this.picData)
                  if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                    alert(res.message);
                    return false;
                  }
              },
              error: function (res) {
                  alert("网络连接错误!")
              }
          });
    },
    timedata(time){
    return  new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
    },
    likeCmment(uuid){
      let _this = this;
      $.ajax({
              type: 'post',
              data: {
                comment_id:uuid,
              },
              url: PORSCHE_HOST+'/member/show/comment/upvote',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  if(res.code === "1001") {
                    console.log(res.data)
                    _this.getCmment(_this.currentPage)
                  }
                  if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                    alert(res.message);
                    return false;
                  }
              },
              error: function (res) {
                  alert("网络连接错误!")
              }
          });
    },
    getCmment(val){
      let _this = this;
        console.log(_this.articleId)
      _this.content = ''
      _this.thexinxi =false
      _this.addCmmentThebtn = false
      _this.addCmmentbtn = true
      _this.picData = []
      _this.imgSrc = []
      _this.offset = (parseInt(val) - 1) * _this.count
      _this.currentPage = val
      $.ajax({
              type: 'post',
              data: {
                offset: _this.offset,
                count: _this.count,
                article_id:_this.articleId
              },
              url: PORSCHE_HOST+'/member/show/comment/list',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  if(res.code === "1001") {
                    console.log(res.data)
                    _this.commentList = res.data.rows
                    _this.total = res.data.count
                  }
                  if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                    alert(res.message);
                    return false;
                  }
              },
              error: function (res) {
                  alert("网络连接错误!")
              }
          });
    },
    addCmment(){
      let _this = this;
        let contentNo = /\s{0,}[\S]{1,}[\s\S]{0,}/;
      if(_this.content == "" || !contentNo.test(_this.content)){
        alert("评论不能为空")
        return false;
      }
      $.ajax({
              type: 'post',
              data: {
                article_id:_this.articleId,
                content: _this.content,
                picture_path: _this.picData.toString(),
                type: _this.typedata,
              },
              url: PORSCHE_HOST+'/member/show/comment/add',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  if(res.code === "1001") {
                    console.log(res.data)
                    _this.commentList = res.data;
                    _this.getCmment(_this.currentPage);
                    $(".common-content-app").css("position","relative");
                    return false;
                  }
                  if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                    alert(res.message);
                    return false;
                  }
              },
              error: function (res) {
                  alert("网络连接错误!")
              }
          });
    },
    addCmmentThe(){
      let _this = this;
      if(_this.content == ""){
        alert("评论不能为空")
        return false;
      }
      $.ajax({
              type: 'post',
              data: {
                 article_id:_this.articleId,
                 to_comment_id: _this.uuid,
                 content:_this.content,
                 picture_path:_this.picData.toString(),
                 type: "PROJECTION",
              },
              url: PORSCHE_HOST+'/member/show/reply/comment',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  if(res.code === "1001") {
                    console.log(res.data);
                    _this.commentList = res.data;
                    _this.getCmment(_this.currentPage);
                    $(".common-content-app").css("position","relative");
                      return false;
                  }
                  if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                    alert(res.message);
                    return false;
                  }
              },
              error: function (res) {
                  alert("网络连接错误!")
              }
          });
    },
    xx(){
        let _this = this
            $(".common-content-app").css("position","relative")
            _this.thexinxi = false
            _this.addCmmentbtn = true
            _this.addCmmentThebtn = false
    },
    imagesshow(index){
      var viewer;
         viewer = new Viewer(document.getElementById(index),{toolbar:false,title:false,
          hidden:function(){
            viewer.destroy();
          }
      });
    },
      toggleCon(list,index){
          if(list.showActive){
              Vue.set(list,'showActive',false);//为item添加不存在的属性，需要使用vue提供的Vue.set( object, key, value )方法。
          }else{
              Vue.set(list,'showActive',true);
          }
      },
      toggleReply(the,index){
          if(the.replyActive){
              Vue.set(the,'replyActive',false);//为item添加不存在的属性，需要使用vue提供的Vue.set( object, key, value )方法。
          }else{
              Vue.set(the,'replyActive',true);
          }
      },
  },
  mounted() {
    this.getCmment(this.currentPage)

    this.useravatar = localStorage.getItem("avatar");
  },
    watch: {
        articleId(){
            this.getCmment(this.currentPage)
        },
        /*$route(){
            this.getCmment(this.currentPage)

        }*/
    }

}
</script>

<style scoped>
.navigation ul li {
  background: #000;
  text-align: center;
  margin-left: 2px;
}
.navigation ul li {
  width: 35px;
  height: 35px;
  line-height: 35px;
  background: #f0f0f0;
  text-align: center;
  margin-left: 2px;
}
.navigation ul{
  display: flex;
  justify-content: center;
  align-items:center;
}
.navigation {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
}
.comment-info textarea {
  width: 100%;
  height:68px;
  border:0px;
  outline: none;
}
.xpl {
  position: absolute;
  top: -25px;
}
.app-mainbtn {
  width: 65px;
  height: 72px;
  font-size: 14px;
  line-height: 72px;
  background: #424242;
    cursor: pointer;
}
.item-content-app {
  display: flex;
  padding: 0px!important;
  /*justify-content: center;*/
  /*align-items: center;*/
}
.common-content-appnr {
  padding: 15px;
  }
.common-content-app {
  width: 100%;
  display: block;
  position: relative;
  z-index: 889;
  color: black;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  bottom: 0;
  left: 0;
  background: #dedede;
}
.hui-ff {
    display: inline-block;
  position: relative;
  margin-top: 10px;
    cursor: pointer;
  /*text-align: right;*/
}
.app-nrpxinx {
  display: flex;
  justify-content: center;
  align-items: center;
}
#fileUpload{
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  height: 50px;
  width: 50px;
    cursor: pointer;
}
.jia-add {
  display: flex!important;
  justify-content: center;
  align-items: center;
}
.icon-jia {
  font-size: 35px!important;
  color: #a3a3a3!important
}

.comment-the {
  position: relative;
  padding-left: 60px;
  margin: 15px 0;
}
.item-contentthe {
  background: #f1f1f1;
  border: 1px solid #e0e0e0;
  padding: 15px;
  margin-top: 10px;
}
.comment-images-container {
  display: flex;
}
.comment-content p {
  line-height: 18px;
    cursor: pointer;
    word-wrap:break-word;
}
.showActiveNo{
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.showActive{
    width: 100% !important;
    overflow:visible !important;
    white-space: normal !important;
    text-overflow: clip !important;
}
.replyNo{
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.replyActive{
    width: 100% !important;
    overflow:visible !important;
    white-space: normal !important;
    text-overflow: clip !important;

}
.comment-images .comment-images-container .image-item:last-child {
    margin-right: 0;
  }
.comment-images .image-item {
    border: 1px solid #e2e2e2;
    display: inline-block;
    background: #fff;
    width: 48px;
    height: 48px;
    vertical-align: middle;
    text-align: center;
    font-size: 10px;
    overflow: hidden;
    margin-bottom: 3px;
    position: relative;
    cursor: pointer;
}
.comment-images .comment-images-container .image-item {
    margin-right: 3px;
}
.comment-images .comment-images-container {
    padding-top: 10px;
  }
.comment-item .comment-info strong {
    color: #b3b3b3;
    font-weight: 400;
    padding-right: 15px;
    border-right: 2px solid #e0e0e0;
  }
.comment-item .item-content {
    border: 1px solid #e0e0e0;
    padding: 15px;
    color: #000;
  }
.comment-item .comment-info {
    color: #b3b3b3;
    font-size: 13px;
  }
.comment-item .item-avatar {
    width: 46px;
    height: 46px;
    overflow: hidden;
    border-radius: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
.comment-item {
    position: relative;
    padding-left: 60px;
    margin: 15px 0;
  }
.porsche-comment-nr h3 {
  padding-bottom: 15px;
  border-bottom: 1px solid #cfcfcf;
  color: #000;
}
.comment-info-zan {
  /*position: absolute;*/
  /*right: 10px;*/
  color: #000;
  letter-spacing: 2px;
    cursor: pointer;
}
@media (max-width: 768px){
   .comment-item .item-content {
    padding: 7px;
    font-size: 12px;
  }
  .comment-item .comment-info {
    font-size: 12px;
  }
  .porsche-comment-nr {
    padding: 15px;
  }
}

</style>
