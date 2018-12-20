<template>
<div class="porschecon">
  <div class="porsche "  :class="{'frame-toggle':isToggle,'frame-toggle-hide':!isToggle}">
    <headers @toggle="toggle"></headers>
    <cont></cont>
  </div>
  <tail v-if="showtail()"></tail>
  <!-- <iframe src="" width="0" height="0"></iframe> -->
</div>
</template>

<script>
import Cont from '../components/content/cont.vue';
import Headers from '../components/header/headers.vue';
import Tail from '../components/tail/tail.vue';
import {PORSCHE_HOST} from '../common/js/host';
export default {
  components: {
    Cont,
    Headers,
    Tail,
  },
  data() {
    return {
      isToggle: false
    }
  },
  watch:{
    '$route' (to, from) {
              this.logs(to, from);

          }
  },
  methods: {
    logs(to, from){
      // let tel = localStorage.getItem('tel')
      // let urls = window.location.href
      // let time =  Date.parse(new Date());
      // let uuid =  localStorage.getItem('member_id')
      // // console.log('tel('+tel+')----'+'urls('+urls+')----'+'time('+time+')')
      // console.log('to('+to+')----'+'from('+from+')')
      //
      // if(to !== undefined){
      //   if(!uuid){
      //     var str = time +"-"+this.randomString(4)
      //     this.setCookie('xid',str)
      //     var url = 'http://101.52.132.255/writedatalog?uuid='+uuid+'&path='+to.fullPath+'&xid='+str
      //   }else {
      //     var url ='http://101.52.132.255/writedatalog?uuid='+uuid+'&path='+to.fullPath
      //   }
      //   $.ajax({
      //     type: 'get',
      //     // data: {
      //     //   // tel:tel,
      //     //   urls:urls,
      //     //   time:time
      //     // },
      //     url: url,
      //     success: function (res) {
      //
      //     },
      //     error: function (res) {
      //       // console.log("网络连接错误!")
      //     }
      //   });
      // }

    },
    randomString:function (len) {
      len = len || 32;
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length;
      var pwd = '';
      for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    //设置cookie
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      console.info(cname + "=" + cvalue + "; " + expires);
      document.cookie = cname + "=" + cvalue + "; " + expires;
      console.info(document.cookie);
    },
    //获取cookie
    getCookie: function (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("username", "", -1);

    },
    showtail(){
      if(this.$route.path === "/shadowlist/"+this.$route.params.num ||
         this.$route.path === "/emotionlist/"+this.$route.params.num ||
         this.$route.path === "/modulelist/"+this.$route.params.num ||
        this.$route.path === "/article/"+this.$route.params.num ||
        this.$route.path === "/dealerarticle/"+this.$route.params.num){
          return false;
      } else {
        return true;
      }
    },
    toggle(isToggle) {
      this.isToggle = isToggle;
      $(".common-content-app").css("position","relative")
    },

  },
  mounted(){
    this.logs()
  }
}
</script>

<style scoped>
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
.span-select {
  display: none;
}
@media (max-width: 768px) {
  .frame-toggle {
    transform: translate(-195px) ;
    transition: transform 0.5s;
  }
  .frame-toggle-hide {
    transform: translate(0px) ;
    transition: transform 0.5s;
  }
  .span-select-btn span:last-child{
    margin-left: auto;
    padding: 10px;
    color: #196a99;
  }
  .span-select-btn span:first-child{
    margin-right: auto;
    padding: 10px;
    color: #b0b0b0;
  }
.span-select-btn{
  line-height: 1.6;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .span-select {
    position: fixed;
    width: 100%;
    display: block;
    height: 180px;
    bottom: 0;
    z-index: 9999999
  }
  .span-select-nr {
    background-color: #fff;
    /*border: 1px solid #aaa;*/
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    z-index: 1051;
    height: 180px;
  }
  .span-select-nr ul{
    max-height: 110px;
    overflow-y: auto;
  }
  .span-select-nr ul li{
    text-align: center;
    line-height: 1.6;
    padding: 6px;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    color: #b0b0b0;
  }
  /*.span-select-nr ul li:hover{
    background-color: #196a99;
    color: #fff;
  }*/
}

</style>
