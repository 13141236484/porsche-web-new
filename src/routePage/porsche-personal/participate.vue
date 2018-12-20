<template lang="html">
  <div class="porsche-personal-participate">
    <h1><i class="iconfont  icon-feiji"></i>已发送</h1>
    <ul>
      <li v-for="(list,index) in participateSendList">
        <a class="link" href="#">{{list.title}}</a>
        <span class="date">{{timedata(list.created_time)}}</span>
        <h5 v-if="list.review_status == 'N'"><span class="red status-sh">审核中</span><i class="iconfont  icon-zgdelect" style="color: #cfd0d1!important;cursor: pointer;" @click="deleteParticipate(list.article_id,index)"></i></h5>
        <h5 v-if="list.review_status == 'Y'"><span class="red status-sh">已发布</span><i class="iconfont  icon-zgdelect" style="color: #cfd0d1!important;cursor: pointer;" @click="deleteParticipate(list.article_id,index)"></i></h5>
        <h5 v-if="list.review_status == 'R'"><span class="red status-sh">审核未通过</span><i class="iconfont  icon-zgdelect" style="color: #cfd0d1!important;cursor: pointer;" @click="deleteParticipate(list.article_id,index)"></i></h5>

      </li>
        <div class="clear"></div>
      </ul>
      <h1><i class="iconfont  icon-zgdelect"></i>已删除</h1>
      <ul>
        <li v-for="(list,index) in participateDelete">
          <a class="link" href="#">{{list.title}}</a>
          <span class="date">{{timedata(list.created_time)}}</span>
          <h5 class="huishou"><span class="red huifu"><img class="cover" id="enjoyFmshare-top-nrimgid" style="width: 90%;cursor: pointer;"  :src="huishou" alt="" @click="restoreParticipate(list.article_id,index)"></span></h5>
        </li>
          <div class="clear"></div>
        </ul>
  </div>
</template>

<script scoped>
import {PORSCHE_HOST} from '../../common/js/host';
export default {
  props:{
    participateDelete:Array,
    participateSend:Array,
  },
  components: {

  },
  data() {
    return {
        huishou:require('../../common/image/appimg/huishou.png'),
        showuserImg:false,
        participateSendList:[],
        participateDeleteList:[],
    }
  },
  methods: {
    restoreParticipate(id,index){
      let _this = this;
      $.ajax({
              type: 'post',
              data:{
                post_id:id,
              },
              url: PORSCHE_HOST+'/member/user/post/recover',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                if(res.code === "1001") {
                  for(let i=0;i<_this.participateDeleteList.length;i++){
                    if(_this.participateDeleteList[i].article_id === id){
                        var object_participate = i
                    }
                  }
                   _this.participateSendList.push(_this.participateDeleteList[object_participate])
                    // _this.$emit('participate-restore')
                    _this.participateDeleteList.splice(index,1);
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
    deleteParticipate(id,index){
      let _this = this;
      $.ajax({
              type: 'post',
              data:{
                post_id:id,
              },
              url: PORSCHE_HOST+'/member/user/post/delete',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                if(res.code === "1001") {
                  for(let i=0;i<_this.participateSendList.length;i++){
                    if(_this.participateSendList[i].article_id === id){
                        var object_participate = i
                    }
                  }
                   _this.participateDeleteList.push(_this.participateSendList[object_participate])
                    _this.participateSendList.splice(index,1);
                    alert("删除发帖成功");
                  //  _this.participateSend.splice(index,1);
                  //  _this.participateDeleteList.push(_this.participateSend[index]);
                  // _this.$emit('participate-restore')
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
    timedata(time){
    return  new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
    },
    show() {
      if (document.body.offsetWidth > 750) {
        this.topimg = require('../../common/image/pcimg/gr-bg.jpg');
      } else {
        this.topimg = require('../../common/image/appimg/mxjk-bg.jpg');
      }
    }
  },
  mounted() {
    this.show();
    this.participateSendList = this.participateSend
    console.log(JSON.stringify(this.participateSendList))
    this.participateDeleteList = this.participateDelete
  }
}
</script>

<style scoped>
.icon-feiji:before {
  font-size: 24px;
}
.porsche-personal-participate h1 .icon-zgdelect:before {
  font-size: 24px;

}
.porsche-personal-participate h1 {
  margin: 20px 30px;
}
.porsche-personal-participate .date {
  font-size: 12px;
}
.red {
  color: red;
}
.porsche-personal-participate {
  margin-left: 0px;
}
.porsche-personal-participate ul {
  width: 100%;
}
.porsche-personal-participate ul li .delete{
  position: absolute;
  right: -10px;
  top: 13px;
  color: #b8b9b8;
  padding: 20px;
  cursor: pointer;
  background: red;
}
.porsche-personal-participate ul li .link{
  padding: 0 40px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  color: #000;
  width: 70%;
}
.porsche-personal-participate ul li .date{
  position: absolute;
  right: 40px;
  font-size: 14px!important;
  top: -10px;
  color: #b3b3b3;
}

.porsche-personal-participate ul li {
  height: 80px;
  line-height: 80px;
  position: relative;
  border-bottom: 1px solid #b5b5b5;
  /*border-top: 1px solid #b5b5b5;*/
}
.porsche-personal-participate ul li:first-child {
  border-top: 1px solid #b5b5b5;
}


.porsche-personal-participate ul li .item-content {
  float: right;
  margin-right: 40px;
  color: #8f8f8f;
}
.porsche-personal-participate ul li .item-header {
    float: left;
    margin-left: 40px;
    color: #000;
}

.cover {
  object-fit: cover;
}

.clear {
  clear: both;
}



.porsche-personal-participate ul li .delete{
    position: static;
    padding: 2px 5px;
    vertical-align: middle;
    margin-top: -2px;
}

.porsche-personal-participate ul li {
    box-sizing: border-box;
    float: left;
    width: 100%;
    height: 80px;
    line-height: 80px;
    /*padding: 15px;*/
    /*border-bottom: 1px solid #dcdcdc;*/
    /*border-right: 2px solid #dcdcdc;*/
}
.porsche-personal-participate ul li:nth-child(even) {
  border-right: 0px;
}

.porsche-personal-participate ul li h5{
  position: absolute;
  right: 50px;
  top: 10px;
}

.porsche-personal-participate ul li .huishou{
  position: absolute;
  right: 80px;
  top: 15px;
}

@media (max-width: 768px) {
  .porsche-personal-participate ul  {
      width: 100%;
      margin: 0px;
  }
  .porsche-personal-participate {
    margin: 0;
  }
  .porsche-personal-participate ul li {
      width: 50%;
      height: auto;
      border-bottom: 1px solid #dcdcdc;
      border-right: 2px solid #dcdcdc;
      border-top: 1px solid #b5b5b5;
      line-height: inherit;
           padding: 15px;
  }
  .porsche-personal-participate h1{
    margin: 20px 10px;
}
.porsche-personal-participate ul li .link{
  height: 66px;
  padding: 0;
  overflow: hidden;
}
.porsche-personal-participate ul li .date{
  position: static;
  font-size: 12px;
}
.porsche-personal-participate ul li h5{
  position: static;
     right: inherit;
    top: inherit;
}
.porsche-personal-participate ul li .huishou {
  position: static;
  right: inherit;
  top: inherit;
}
.huifu {
  display: block;
  width: 27px;
  height: auto;
}

}
</style>
