<template lang="html">
  <div class="porsche-personal-mypost">
    <ul>
        <li v-for="(list,index) in mypostList">
          <router-link  :to="{ path: '/article/'+ list.article_id}"  class="link" >{{list.title}}</router-link>
          <span class="date">{{timedata(list.created_time)}}</span>
        </li>
      </ul>
  </div>
</template>

<script scoped>
export default {
  props:{
    mypostData:Array,
  },
  components: {

  },
  data() {
    return {
      showuserImg:false,
      mypostList:[],
    }
  },
  methods: {
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
    this.mypostList = this.mypostData
  }
}
</script>

<style scoped>
.porsche-personal-mypost ul li .delete{
  position: absolute;
  right: -10px;
  top: 13px;
  color: #b8b9b8;
  padding: 20px;
  cursor: pointer;
}
.porsche-personal-mypost ul li .link{
  padding: 0 40px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  color: #000;
}
.porsche-personal-mypost ul li .date{
  position: absolute;
  right: 40px;
  top: 0;
  color: #b3b3b3;
}

.porsche-personal-mypost ul li {
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
  .porsche-personal-mypost ul li .link{
    height: 66px;
    padding: 0;
    overflow: hidden;
}
.porsche-personal-mypost ul li .date{
  position: static;
  font-size: 12px;
}
.porsche-personal-mypost ul li .delete{
    position: static;
    padding: 2px 5px;
    vertical-align: middle;
    margin-top: -2px;
}

.porsche-personal-mypost ul li {
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
