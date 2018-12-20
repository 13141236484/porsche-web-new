<template lang="html">
  <div class="porsche-personal-footsteps">
    <h1><i class="iconfont  icon-xingqudingxiang"></i>很感兴趣</h1>
    <ul>
        <li v-for="(list,index) in footstepsDataupvotelist">
          <a class="link" :href="list.visit_url">{{list.title}}</a>
          <span class="date">{{timedata(list.created_time)}}
            <!-- <i @click="deleteFootsteps(list.id,index)" class="iconfont  icon-zgdelect"></i> -->
          </span>

        </li>
        <div class="clear"></div>
      </ul>
      <h1><i class="iconfont  icon-zuji"></i>足迹</h1>
    <ul>
        <li v-for="(list,index) in footstepsList">
          <a class="link" :href="list.visit_url">{{list.title}}</a>
          <span class="date">{{timedata(list.created_time)}}<i @click="deleteFootsteps(list.id,index)" class="iconfont  icon-zgdelect"></i></span>

        </li>
        <div class="clear"></div>
      </ul>
  </div>
</template>

<script scoped>
import {PORSCHE_HOST} from '../../common/js/host';
export default {
  props:{
    footstepsData:Array,
    footstepsDataupvote:Array,
  },
  components: {

  },
  data() {
    return {
        showuserImg:false,
        footstepsList:[],
        footstepsDataupvotelist:[]
    }
  },
  methods: {
    deleteFootsteps(id,index){
      let _this = this;
      $.ajax({
              type: 'post',
              data:{
                id:id,
              },
              url: PORSCHE_HOST+'/member/user/browse/delete',
              success: function (res) {
                  console.log(res)
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                if(res.code === "1001") {
                   _this.footstepsList.splice(index,1);
                   alert("删除浏览记录成功");
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
    this.footstepsList = this.footstepsData
    this.footstepsDataupvotelist = this.footstepsDataupvote
  }
}
</script>

<style scoped>

.porsche-personal-footsteps h1 {
  margin: 20px 30px;
  font-size: 16px;
}
.icon-zgdelect {
  margin-left: 15px;
    cursor: pointer;
}
.porsche-personal-footsteps ul li .delete{
  position: absolute;
  right: -10px;
  top: 13px;
  color: #b8b9b8;
  padding: 20px;
  cursor: pointer;
  background: red;
}
.porsche-personal-footsteps ul li .link{
  padding: 0 140px 0 40px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  color: #000;
}
.porsche-personal-footsteps ul li .date{
  position: absolute;
  right: 40px;
  top: 0;
  color: #b3b3b3;
}

.porsche-personal-footsteps ul li {
  height: 80px;
  line-height: 80px;
  position: relative;
  border-bottom: 1px dashed #b5b5b5;
}

.porsche-personal-personalcenter ul li .item-content {
  float: right;
  margin-right: 40px;
  color: #8f8f8f;
}
.porsche-personal-personalcenter ul li .item-header {
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

@media (max-width: 768px) {
  .porsche-personal-footsteps ul li .link{
    height: 66px;
    padding: 0;
    overflow: hidden;
}
.porsche-personal-footsteps ul li .date{
  position: static;
  font-size: 12px;
}
.porsche-personal-footsteps ul li .delete{
    position: static;
    padding: 2px 5px;
    vertical-align: middle;
    margin-top: -2px;
}

.porsche-personal-footsteps ul li {
    box-sizing: border-box;
    float: left;
    width: 50%;
    height: auto;
    line-height: inherit;
    padding: 15px;
    border-bottom: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
}

}
</style>
