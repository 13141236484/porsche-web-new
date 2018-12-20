<template lang="html">
  <div class="porsche-enjoyFm-shadow">
    <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
    <div class="enjoyFmshare-top">
        <div class="enjoyFmshare-top-nr">
            <div class="enjoyFmshare-top-nrimg">
              　<div class="top-text">
              　  <h3>光影视界</h3>
                  <p>一个梦想的里程碑，保时捷挚爱写真</p>
              　</div>
                <img class="cover" id="enjoyFmshare-top-nrimgid" style="width: 100%;"  :src="topimg" alt="">
                <div class="enjoyFmshare-top-nrp">
                    <p>{{this.toptext}}</p>
                </div>
            </div>
        </div>
  </div>
    <div class="enjoyFmshare-bottom">
      <div class="enjoyFmshare-bottom-nr">
        <div class="enjoyFmshare-bottom-nrimg" >
          <router-link  :to="{ path: '/uploadgy/'+this.type}" >
            <img  class="cover bottom-nrimg" style="width: 100%;" @mouseenter="enter1" @mouseleave="leave1"  :src="this.messages" alt="">
          </router-link>
        </div>
          <div class="enjoyFmshare-bottom-nrimg enjoyFmshare-bottom-nrimg-2" v-for="(shadow,index) in shadowtList">
            <router-link  :to="{ path: '/shadowlist/'+shadow.id }" >
              <img  class="cover bottom-nrimg" style="width: 100%;"  :src="shadow.picture_path" alt="">
            </router-link>

          </div>
          <div class="clear"></div>
      </div>
    </div>
  </div>

</template>

<script scoped>
import {PORSCHE_HOST} from '../../common/js/host';
import {isIeExplore} from '../../lib/utils'
export default {
  components: {

  },
  data(){
    return {
      messages:require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-1.jpg'),
      currentPage:1,
      offset:0,
      count:10,
      type:"PROJECTION",
      PORSCHE_HOST,
      shadowtList:[],
      topimg:'',
      IsBottom:false,
      toptext:'一个经典的设计会得到百年的传承，每一辆保时捷都是一件艺术品。每一位保时捷粉丝也都是最专业的摄影师。分享你为保时捷拍过的“写真”，分享你眼中的挚爱。',
      }
  },
  methods:{
      back(){
          let _this = this;
          _this.$router.push('/enjoyFm');
      },
    enter1(){
        this.messages = require('../../common/image/fenxbg.jpg');
    },
    leave1(){
        this.messages = require('../../common/image/appimg/P2a挚享者说--光影放映厅列表-1.jpg');
    },
    showPc(){
      let l_height = $(window).height();
      document.getElementById('enjoyFmshare-top-nrimgid').onload=function(){
        let zongpc_height = parseInt(l_height) - parseInt(131);
        if(isIeExplore()===11){
          $("#enjoyFmshare-top-nrimgid").height(zongpc_height*1.22);
        }else {
          $("#enjoyFmshare-top-nrimgid").height(zongpc_height);
        }

      };
    },
    showApp(){
      let l_height = $(window).height();
      document.getElementById('enjoyFmshare-top-nrimgid').onload=function(){
        let zongapp_height = parseInt(l_height) - parseInt(55);
        //$(".porsche-enjoyFm-shadow").height(zongapp_height);
        $("#enjoyFmshare-top-nrimgid").height(zongapp_height * 0.7);

      };
    },
    isIeExplore(){
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
      var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
      var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
      if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
          return 7;
        } else if(fIEVersion == 8) {
          return 8;
        } else if(fIEVersion == 9) {
          return 9;
        } else if(fIEVersion == 10) {
          return 10;
        } else {
          return 6;//IE版本<=7
        }
      } else if(isEdge) {
        return 'edge';//edge
      } else if(isIE11) {
        return 11; //IE11
      }else{
        return -1;//不是ie浏览器
      }
    },
    show(){

      if (document.body.offsetWidth > 750) {
        this.topimg = require('../../common/image/pcimg/gy-bga.jpg');
        this.showPc();
      }
      else {
        this.topimg = require('../../common/image/appimg/gy-bga.jpg');
        this.showApp();
      }
    },
    getshadowlist(){
      let _this = this;
      $.ajax({
              type: 'post',
              data:{
                type:"PROJECTION",
                offset:_this.offset,
                count:_this.count,
              },
              url: PORSCHE_HOST+'/member/show/list',
              success: function (res) {
                  console.log(res)
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                if(res.code === "1001") {
                  // let array_shadow = [];
                  _this.currentPage = _this.currentPage +1
                  let array_shadowimg = [];
                  for (let i=0;i<res.data.length;i++){
                    // let content = JSON.parse(res.data[i].content)
                      let content = JSON.parse(res.data[i].content)
                    // console.log("content"+content[0].imgpic)
                    let object_shadowimg = {
                      "id":res.data[i].uuid,
                        "picture_path":PORSCHE_HOST+res.data[i].picture_path,
                      //"picture_path":PORSCHE_HOST+content[0].imgpic,
                    }
                    array_shadowimg.push(object_shadowimg)
                  }
                    // console.log(array_shadowimg)
                    _this.imgonload(array_shadowimg)
                    // _this.shadowtList =  array_shadow
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
    imgonload(mulitImg){
              let _this = this;
             let img = [];
             let flag = 0;
             let imgTotal = mulitImg.length;
             for(let i = 0 ; i < imgTotal ; i++){
                img[i] = new Image()
                img[i].src = mulitImg[i].picture_path
                img[i].onload = function(){
                   //第i张图片加载完成
                  //  alert("第i张图片加载完成")
                   flag++
                   //let nrimg_width = $(".enjoyFmshare-bottom-nrimg img").width();
                   if( flag == imgTotal ){
                    //  alert("全部加载完成")
                      //全部加载完成
                   }
                }
             }
             if(_this.offset == 0){
               _this.shadowtList = mulitImg
               _this.IsBottom = true;
             } else {
                _this.shadowtList = _this.shadowtList.concat(mulitImg)
                 console.log(_this.shadowtList)
               _this.IsBottom = true;
               // console.log('正确的是')
               //console.log(_this.shadowtList)
             }

            //  console.log("uiouioi----"+JSON.stringify(mulitImg))
            //   console.log("shadowtList----"+JSON.stringify(_this.shadowtList))

      },
      loadMore(){
          this.count = 10
          this.offset = (parseInt(this.currentPage) - 1) * this.count
          console.log(this.offset, this.count)
          this.getshadowlist();
      },
  },
  mounted(){
    this.getshadowlist();
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
  background-color: #000;
  position: absolute;
  top: 10px;
  margin-left: -50px;


}
.top-text h3::after {
  content: "";
  height: 1px;
  width: 35px;
  background-color: #000;
  position: absolute;
  top: 10px;
  margin-left: 15px;

}
.top-text p {
  font-size: 14px;
  letter-spacing: 1px;
}
.enjoyFmshare-bottom {
  background: #000;
    margin-bottom:-5px;
}

#enjoyFmshare-top-nrimgid {
  display: flex;
}
.enjoyFmshare-top-nrimg {
  position: relative;
  background: #000;
}
.cover{
    object-fit: cover;
}
.enjoyFmshare-top-nrp {
  background: #000000;
  background-color: rgba(0,0,0,.3);
  position: absolute;
  bottom: 0px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.enjoyFmshare-top-nrp p {
  color: #fff;
  font-size: 18px;
  line-height: 24px;
  max-width: 1200px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: left;
}
.enjoyFmshare-bottom-nr {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
    -webkit-column-count: 6;
    -moz-column-count: 6;
    column-count: 6;
    -moz-column-gap:10px;
    -webkit-column-gap:10px;
    column-gap:10px;
}
.enjoyFmshare-bottom-nr a {
  /*display: flex;*/
}
.enjoyFmshare-bottom-nrimg {
    /*width: 11.7%;*/
    position: relative;
    margin-bottom:5px;
    cursor: pointer;
}

.enjoyFmshare-bottom-nrimg a {
    width:100%;
}
.clear {
  clear: both;
}
@media (max-width: 768px) {
    .enjoyFmshare-bottom-nr {
        column-gap:6px;
    }
  .enjoyFmshare-bottom-nrimg {
    /*width: 31.2%;*/
    position: relative;
    /*float: left;*/
      /*height:100px;*/
  }
    .enjoyFmshare-bottom-nrimg {
        margin-bottom:4px;

    }
  .enjoyFmshare-top-nrp p {
    font-size: 12px;
    line-height: 18px;
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
    .cover{
        object-fit: cover;
    }
}
</style>
