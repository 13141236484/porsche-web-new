<template lang="html">
  <div class="porsche-enjoyFm">
    <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
    <div class="porsche-enjoyFm-data  porsche-pc">
      <div class="enjoyFm-nr-conten">
        <div class="enjoyFm-conten-left">
            <div class="enjoyFm-contenleft-img">
              <div class="sss ss1">
                <router-link   :to="{ path: '/shadow' }">
                    <img  class="ico-img" @mouseenter="enter1" @mouseleave="leave1"  :src="this.message1" alt="">
                </router-link>
              </div>
              <img class="cover" id="conten-leftimg" width="100%" :src="this.shadowimg" alt="">
            </div>
            <div class="enjoyFm-contenleft-img">
              <div class="sss ss3">
                <router-link  :to="{ path: '/module' }">
                  <img  class="ico-img" @mouseenter="enter3" @mouseleave="leave3" :src="this.message3" alt="">
                </router-link>
              </div>
              <img class="conten-rightimg cover" width="100%"  :src="this.model" alt="">
            </div>
        </div>
        <div class="enjoyFm-conten-right">
          <div class="enjoyFm-contenright-img">
            <div class="sss ss2">
              <router-link  :to="{ path: '/emotion' }">
                <img  class="ico-img" @mouseenter="enter2" @mouseleave="leave2" :src="this.message2" alt="">
              </router-link>
              </div>
              <img class="conten-rightimg cover" width="100%"  :src="this.emotionimg" alt="">
          </div>
          <div class="enjoyFm-contenright-img">
            <div class="sss ss4">
              <router-link  :to="{ path: '/dream' }">
                <img  class="ico-img" @mouseenter="enter4" @mouseleave="leave4" :src="this.message4" alt="">
              </router-link>
              </div>
              <img class="conten-rightimg cover" width="100%"  :src="this.dream" alt="">
          </div>
        </div>
      </div>



      <div class="clear"></div>
    </div>

    <div class="porsche-enjoyFm-data  porsche-app">
      <div class="enjoyFm-nr-conten">
        <div class="enjoyFm-conten-left">
          <div class="enjoyFm-contenleft-img">
            <div class="sss ss1">
              <router-link   :to="{ path: '/shadow' }">
                <img  class="ico-img"  :src="this.message5" alt="">
              </router-link>
            </div>
            <img class="cover" id="conten-leftimg" width="100%" :src="this.shadowimg" alt="">
          </div>
          <div class="enjoyFm-contenleft-img">
            <div class="sss ss2">
              <router-link  :to="{ path: '/emotion' }">
                <img  class="ico-img" :src="this.message6" alt="">
              </router-link>
            </div>
            <img class="conten-rightimg cover" width="100%"  :src="this.emotionimg" alt="">
          </div>



        </div>
        <div class="enjoyFm-conten-right">
          <div class="enjoyFm-contenright-img">
            <div class="sss ss4">
              <router-link  :to="{ path: '/dream' }">
                <img  class="ico-img" :src="this.message7" alt="">
              </router-link>
            </div>
            <img class="conten-rightimg cover" width="100%"  :src="this.dream" alt="">
          </div>
          <div class="enjoyFm-contenright-img">
            <div class="sss ss3">
              <router-link  :to="{ path: '/module' }">
                <img  class="ico-img" :src="this.message8" alt="">
              </router-link>
            </div>
            <img class="conten-rightimg cover" width="100%"  :src="this.model" alt="">
          </div>

        </div>
      </div>



      <div class="clear"></div>
    </div>
  </div>
</template>

<script scoped>
  import {isIeExplore} from '../../lib/utils'
export default {
  components: {

  },
  data(){
    return {
        shadowimg:'',
        emotionimg:'',
        model:'',
        dream:'',
        message1:require('../../common/image/pcimg/01.png'),
        message2:require('../../common/image/pcimg/03.png'),
        message3:require('../../common/image/pcimg/05.png'),
        message4:require('../../common/image/pcimg/07.png'),
        message5:require('../../common/image/appimg/m1.png'),
        message6:require('../../common/image/appimg/m2.png'),
        message7:require('../../common/image/appimg/m3.png'),
        message8:require('../../common/image/appimg/m4.png'),
      }
  },
  methods:{
      back(){
          let _this = this;
          _this.$router.push('/home');
      },
      enter1(){
          this.message1 = require('../../common/image/pcimg/02.png');
      },
      leave1(){
          this.message1 = require('../../common/image/pcimg/01.png');
      },
      enter2(){
          this.message2 = require('../../common/image/pcimg/04.png');
      },
      leave2(){
          this.message2 = require('../../common/image/pcimg/03.png');
      },
      enter3(){
          this.message3 = require('../../common/image/pcimg/06.png');
      },
      leave3(){
          this.message3 = require('../../common/image/pcimg/05.png');
      },
      enter4(){
          this.message4 = require('../../common/image/pcimg/08.png');
      },
      leave4(){
          this.message4 = require('../../common/image/pcimg/07.png');
      },

    showPc(){
        /*let l_height = $(window).height();
        document.getElementById('conten-leftimg').onload=function(){
          console.log(isIeExplore())
          let zongpc_height = parseInt(l_height) - parseInt(131);
          if(isIeExplore()===11){
            $("#conten-leftimg").height(zongpc_height*1.23);
          }else {
            $("#conten-leftimg").height(zongpc_height);
          }

          let enjoyFm_left = $("#conten-leftimg").height();
          $(".conten-rightimg").height(enjoyFm_left / 2);
        };*/
        let l_height = $(window).height();
        document.getElementById('conten-leftimg').onload=function(){
            console.log(isIeExplore())
            let zongpc_height = parseInt(l_height) - parseInt(131);
            /*if(isIeExplore()===11){
                $("#conten-leftimg").height(zongpc_height*1.23);
            }else {*/
                $("#conten-leftimg").height(zongpc_height/2);
            /*}*/

            let enjoyFm_left = $("#conten-leftimg").height();
            $(".conten-rightimg").height(zongpc_height / 2);
        };




    },
    showApp(){
      /*let l_height = $(window).height();
      document.getElementById('conten-leftimg').onload=function(){
        let zongapp_height = parseInt(l_height) - parseInt(55);
        $(".enjoyFm-nr-conten").height(zongapp_height);
        $("#conten-leftimg").height(zongapp_height * 0.7);
        $(".conten-rightimg").height(zongapp_height * 0.3);
      };*/

        let l_height = $(window).height();
        document.getElementById('conten-leftimg').onload=function(){
            let zongapp_height = parseInt(l_height) - parseInt(55);
            //$(".enjoyFm-nr-conten").height(zongapp_height);
            $("#conten-leftimg").height(zongapp_height * 0.3);
            $(".conten-rightimg").height(zongapp_height * 0.3);
        };
    },
    show(){
      if (document.body.offsetWidth > 750) {
        this.shadowimg = require('../../common/image/pcimg/tc-1a.jpg');
        this.emotionimg = require('../../common/image/pcimg/tc-2a.jpg');
        this.model = require('../../common/image/pcimg/tc-3a.jpg');
        this.dream =  require('../../common/image/pcimg/tc-4a.jpg');
        this.showPc();
      }
      else {
        this.shadowimg = require('../../common/image/appimg/talk_02.jpg');
        this.emotionimg = require('../../common/image/appimg/talk_04.jpg');
        this.model = require('../../common/image/appimg/talk_08.jpg');
          this.dream =  require('../../common/image/appimg/talk_06.jpg');
        this.showApp();
      }
    }
  },
  mounted(){
    this.show();
  }
}
</script>

<style scoped>
.porsche-app{
  display: none;
}
.porsche-pc{
  display: block;
}
.enjoyFm-contenleft-img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.enjoyFm-contenright-img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sss {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  -o-transform: translate(-50%,-50%);
}
.cover{
  object-fit: cover;
}
.porsche-enjoyFm {
  background: #000;
}

.enjoyFm-nr-conten a {
  /*display: flex;
  justify-content: center;
  align-items: center;*/
  clear: both;
}
.clear {
  clear: both;
}
.enjoyFm-conten-left {
  width: 50%;
  float: left;
}
.enjoyFm-conten-right {
  width: 50%;
  float: left;
}
.enjoyFm-nr-conten {
  float: left;
  width: 100%;
}
.sss  a  .ico-img {
  width: 100%;
  height: 100%;
}
@media (max-width: 768px) {
  .porsche-pc{
    display: none;
  }
  .porsche-app{
    display: block;
  }

  .enjoyFm-contenleft-img {
    border-bottom: 3px solid #999999;
  }
  .enjoyFm-contenright-img {
    border-bottom: 3px solid #999999;
  }
  .enjoyFm-contenright-img:last-child{
    border-bottom: none;
  }
  .enjoyFm-conten-left {
    width: 100%;
  }
  .enjoyFm-conten-right{
    width: 100%;

  }
  .enjoyFm-conten-right .enjoyFm-contenright-img{
    width: 100%;
  }

  .sss {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    text-align: center;
  }
  .ss2,.ss3,.ss4 {
    width: 100%;
    text-align: center;
  }
  .ss1 a .ico-img {
    width: 70%;
    height:70%;
  }
  .ss2 a .ico-img{
    width: 35%;
    height:35%;
  }
  .ss3 a .ico-img{
    width: 40%;
    height:40%;
  }
  .ss4 a .ico-img{
    width: 50%;
    height:50%;
  }
}
</style>
