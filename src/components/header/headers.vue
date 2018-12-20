<template>
<div class="porsche-header">
  <div class="logoapp-show">
    <h1 class="logoapp"></h1>
  </div>
  <div class="ui-head">
    <h1 class="logo"></h1>
    <ul class="nav">
      <li :class="{'active':active == 'home'}"><a @click="routes('home')"   ><i class="ui-icon0 ui-icon"><img :src="require('../../common/image/ui-icon-0.png')" alt=""></i><span>首页</span></a></li>
      <li :class="{'active':active == 'enjoyFm'}"><a @click="routes('enjoyFm')"  ><i class="ui-icon1 ui-icon"><img :src="require('../../common/image/ui-icon-2.png')" alt=""></i><span>挚享者说</span></a></li>
      <li :class="{'active':active == 'enjoyActivity'}"><a @click="routes('enjoyActivity')"   ><i class="ui-icon1 ui-icon"><img :src="require('../../common/image/ui-icon-1.png')" alt=""></i><span>挚享 FM</span></a></li>
      <li :class="{'active':active == 'offline'}"><a @click="routes('offline')"  ><i class="ui-icon3 ui-icon"><img :src="require('../../common/image/ui-icon-3.png')" alt=""></i><span>精彩活动</span></a></li>
      <li :class="{'active':active == 'drive'}"><a @click="routes('drive')"  ><i class="ui-icon4 ui-icon"><img :src="require('../../common/image/ui-icon-4.png')" alt=""></i><span>极致驾客</span></a></li>
      <li :class="{'active':active == 'reserve'}"><a @click="routes('reserve')"  ><i class="ui-icon6 ui-icon"><img :src="require('../../common/image/ui-icon-6.png')" alt=""></i><span>预约试驾</span></a></li>
      <li :class="{'active':active == 'personal/personalcenter'}"><a @click="routes('personal/personalcenter')"  ><i class="ui-icon5 ui-icon"><img :src="require('../../common/image/ui-icon-5.png')" alt=""></i><span>个人中心</span></a></li>
      <a v-if="outShow" class="out" @click="dropOut()">登出</a>
    </ul>

    <!--<a @click="back" class="back" :class="{ isActive: isActive }"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>-->
    <a @click="toggle" class="toggle"><span> <i class="iconfont  toggle-btn" :class="{'icon-list':!isToggle,'icon-X':isToggle}"></i></span></a>
  </div>
</div>
</template>

<script>
import {PORSCHE_HOST} from '../../common/js/host';

export default {
  data() {
    return {
      isToggle: false,
      active:"",
        isActive:false,
        outShow:false,
    }
  },
  methods: {
    routes(pat){
      this.active = pat
      this.isToggle = false
      this.$emit('toggle', false)
      this.$router.push("/"+pat)
        /*this.isBack()*/
    },
    toggle() {
      this.isToggle = !this.isToggle
      this.$emit('toggle', this.isToggle)
    },
    dropOut(){
        const _this = this
        $.ajax({
            type: 'post',
            url: PORSCHE_HOST + '/member/signOut',
            success: function (res) {
                localStorage.removeItem('member_id');
                localStorage.removeItem('avatar');
                localStorage.removeItem('nickname');
                localStorage.removeItem('tel');
                if(res.code === "1001") {
                    console.log(this)
                    console.log(_this)
                    _this.$router.push('/login')
                    _this.isToggle = !_this.isToggle
                    _this.$emit('toggle', _this.isToggle)
                    _this.outShow = false;
                    //window.location.href = "http://localhost:8084/#/login";
                }


            }
        })

    },
    quit(){
        var exit = localStorage.getItem('tel')
        if(exit != null){
            this.outShow = true;
        }else{
            this.outShow = false;
        }
    }
  },
  mounted(){
  },
  created(){
    this.quit();
  },
  watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'quit'
  }
}
</script>

<style scoped>
  /*.back {
    display: none;
  }*/

.ui-head .toggle {
  display: none;
}

.toggle-btn {
  color: #000;
  font-size: 28px;
}

.ui-head,
.ui-head .logo {
  position: relative;
  margin: 0 auto;
}

.ui-head {
  background: #fff;
  border-bottom: 1px solid #ddd;
  width: 86%;
  max-width: 1200px;
  overflow: hidden;
}

.ui-head .logo {
  width: 120px;
  background-image: url('http://ota3q760b.bkt.clouddn.com/porsche-svg.svg');
  background-repeat: no-repeat;
  background-size: 120px;
  height: 53px;
  padding: 20px 0 15px;
  position: relative;
  top:10px;
}

.ui-head .logo:before {
  left: auto;
  right: -1015px;
}

.ui-head .logo:after,
.ui-head .logo:before {
  content: "";
  height: 1px;
  width: 1000px;
  position: absolute;
  left: -1015px;
  bottom: 30px;
  display: block;
  background-color: #dfdfdf;
}

.ui-head .nav li {
  display: inline-block;
 /* width: 16%;*/
  width: 12%;
}

.ui-head .logo:before {
  left: auto;
  right: -1015px;
}

.ui-head .nav li.active a,
.ui-head .nav li a:hover {
  border-color: #d5001c;
  color: #d5001c;
}

.ui-head .nav li a {
  display: inline-block;
  border-bottom: 2px solid transparent;
  height: 40px;
  line-height: 40px;
  padding: 0 5px;
  cursor: pointer;
  color: #000;
}

.ui-head .nav {
  text-align: center;
  margin: 0!important;
}

h1 {
  font-size: 16px;
}

.ui-icon img {
  display: none;
}
.out{
  display: none !important;
}

@media (max-width: 768px) {

  .isActive{
    display: none !important;
  }
  .ui-icon img {
    display: inline-block;
  }
  .ui-head {
    width: 100%;
    height: 55px;
  }
  .ui-icon {
    height: 30px;
  }
  .ui-icon0 img {
    width: 30px;
    height: 33px;
  }
  .ui-icon1 img {
    width: 35px;
    height: 30px;
  }
  .ui-icon2 img {
    width: 33px;
    height: 28px;
  }
  .ui-icon3 img {
    width: 35px;
    height: 25px;
  }
  .ui-icon4 img {
    width: 30px;
    height: 34px;
  }
  .ui-icon5 img {
    width: 35px;
    height: 35px;
  }
  .ui-icon6 img {
    width: 35px;
    height: 35px;
  }
  .ui-head,
  .ui-head .logo {
    position: relative;
    margin-left: 0;
  }

  .frame-toggle {
    -webkit-transform: translate(-195px);
    transform: translate(-195px);
  }

  .ui-frame {
    -webkit-transition: -webkit-transform .5s ease-in-out;
    transition: -webkit-transform .5s ease-in-out;
    transition: transform .5s ease-in-out;
    transition: transform .5s ease-in-out, -webkit-transform .5s ease-in-out;
  }
  .ui-head .logo {
    background-size: 67px;
    padding-bottom: 15px;
    height: 20px;
  }
  .ui-head .logo:after,
  .ui-head .logo:before {
    content: none;
  }
  .ui-icon-address:before {
    content: "\F101"
  }
  .ui-icon-cross:before {
    content: "\F102"
  }
  .ui-icon-edit:before {
    content: "\F103"
  }
  .ui-icon-eye:before {
    content: "\F104"
  }
  .ui-icon-game:before {
    content: "\F105"
  }
  .ui-head .nav {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 195px;
    right: 0;
    z-index: 100;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    background-color: #000;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  address,
  blockquote,
  dl,
  fieldset,
  figure,
  hr,
  ol,
  p,
  pre,
  ul {
    margin: 0 0 5px;
    padding: 0;
  }

  element.style {}
  .ui-head .nav li {
    width: auto;
    display: block;
    text-align: left;
      position: relative;
  }
  li {
    list-style: none;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  .ui-head .nav li a {
    height: 85px;
    line-height: 85px;
    display: block;
    color: #fff;
    margin: 5px 0px;
    border-bottom: 1px solid hsla(0, 0%, 100%, .3);
  }
  .ui-head .nav li a i {
    /*display: block;*/
    margin: 0 auto;
    font-size: 30px;
    /*padding-top: 15px;*/
    padding: 0 15px;
      position: absolute;
      left: 10px;
      top: 5px;
  }
    .ui-head .nav li a span{
        padding-left: 70px;
    }
  .out{
    display: inline-block !important;
    height: 20px !important;
    line-height: 20px !important;
    border-bottom: 1px solid hsla(0, 0%, 100%, .8) !important;
    margin-left: 10px !important;
    padding: 0 2px !important;
    color: #fff;
    position: absolute;
    top: 582px;
    right: 15px;
    z-index: 50;
  }
  /*.back {
    display: block;
  }
  .back {
    position: absolute;
    z-index: 30;
    right: 65px;
    top:43%;
    margin-top: -20px;
    padding: 15px 0;
    width: 25px;

  }
  .back-con{
    width: 30px;
    height: 15px;
    display: block;
  }
  .back-con img{
    width: 14px;
    height: 25px;
  }*/
  .ui-head .toggle {
    display: block;
  }
  .ui-icon-home:before {
    content: "\F106";
  }
  .toggle {
    position: absolute;
    z-index: 30;
    right: 25px;
    top: 50%;
    margin-top: -20px;
    padding:5px 0px 5px 12px;
    width: 25px;
    border-left: 1px solid #eee;
  }
  .logo {
    display: none;
  }
  .logoapp {
    display: inline-block;
    outline: none;
    background-color: #fff;
    background-repeat: no-repeat;
    width: 80px;
    height: 50px;
    background-size: 80px auto;
    background-image: url('http://ota3q760b.bkt.clouddn.com/porsche-svg.svg');
    background-repeat: no-repeat;
  }
  .logoapp-show {
    box-shadow: rgba(0,0,0,.14) 0 0 8px 0;
    padding: 12px 5px;
    margin-left: 6px;
    position: absolute;
    height: 45px;
    background-color: #fff;
    z-index: 999999;
    transform: translate3d(0,0,0);
  }
}
</style>
