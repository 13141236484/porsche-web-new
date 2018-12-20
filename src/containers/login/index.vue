<template >
  <div class="parsche-login">
        <layout-log></layout-log>
        <div class="pcshwo">
          <div class="parsche-login-nr">
              <div class="parsche-login-navigation">
                <ul>
                  <li>
                    <a  @click="showlogin()"><a class="navigation1"></a></a>
                    <span style="cursor: pointer;">用户登录</span>
                  </li>
                  <li>
                    <a  @click="showreg()"><a class="navigation2"></a>
                    <span style="cursor: pointer;">用户注册</span></a>
                  </li>
                </ul>
              </div>
              <div class="parsche-login-verification" v-if='this.isshowInformation1'>
                  <div class="login-verification-texth3">
                    <h3>尊敬的挚享汇会员</h3>
                    <h3>请输入手机号码验证登录</h3>
                  </div>
                  <div class="login-verification-texttel">
                      <label for="">手机号码</label>
                      <div class="input-div">
                        <input type="text" maxlength="11" v-model="tel" name="tel" value="">
                      </div>
                  </div>
                  <h3 class="verification" v-text="this.verification"></h3>
                  <div class="parsche-login-btn">
                    <div class="main-btn but-col" @click="login()">
                      登  录
                    </div>
                  </div>
              </div>
              <div class="parsche-login-nrb parsche-login-nr2" v-if='this.isshowInformation2'>
                <div class="parsche-login-interest">
                  <div class="login-verification-texth3">
                    <h3>请选择你感兴趣的内容</h3>
                  </div>
                  <div class="interes">
                    <div class="login-interes">
                        <div class="interes-choice-nr" v-if="key < 9"  v-for="(ints,key) in interestList" @click='setInterest(key)'>
                          <div class="interes-choice-yuan" :class="{'checkbox-avs':!ints.isToggle,'checkbox-av':ints.isToggle}">
                              <div class="choice-yuan ">
                                  <img class="imgywlx-yuan-1s" width="100%" :src="PORSCHE_HOST+ints.picture_path" alt="">
                              </div>
                          </div>
                          <h5>{{ints.content}} </h5>
                        </div>
                    </div>
                  </div>
                  <h3 class="verification" v-text="this.verification"></h3>
                  <div class="parsche-login-btn">
                    <div class="main-btn but-col" @click='isInformation2()'>
                      下一步
                    </div>
                  </div>
                </div>
              </div>
              <div class="parsche-login-nrc parsche-login-nr" v-if='this.isshowInformation3'>
                <div class="parsche-login-collection">
                  <div class="login-collection-texth3">
                    <h3>轻松 3 步收藏挚享汇，拥有更加便利的移动端阅读体验！</h3>
                  </div>
                  <div class="parsche-login-collectiondy">
                    <p>1.在手机默认浏览器中打开挚享汇官方网站链接</p>
                    <p>2.点击浏览器页面工具栏按钮</p>
                    <p>3.选择添加到主屏幕</p>
                    <p>*仅适用于苹果 ios Safari </p>
                  </div>
                  <div class="parsche-login-btn">
                    <div class="main-btn but-col" @click='isInformation3()'>
                      关  闭
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

  </div>
</template>

<script>
import LayoutLog from '@/containers/layout.vue';
import {PORSCHE_HOST} from '../../common/js/host';
export default {
  components:{
    LayoutLog
  },
  data(){
    return{
        PORSCHE_HOST,
        verification:'',
        tel:'',
        isshowInformation1:true,
        isshowInformation2:false,
        isshowInformation3:false,
        interestList:[],
        interest:'',
        member_id:'',
        avatar:'',
        nickname:'',
        windowUrl:"",
        show: true,

    }
  },
  methods:{
    showlogin(){
      this.$emit('show-login')
    },
    showreg(){
      this.$emit('show-reg')
    },
    isInformation3(){
        // this.$router.push('/home');
        //window.history.go(-1)
        //H5活动页判断
        var fromurl = decodeURIComponent(window.location.href)
        if(fromurl.indexOf('redirect_uri') != -1){
            var fromurls = fromurl.indexOf('#')
            var fromuri = fromurl.substring(fromurl.lastIndexOf('=')+1,fromurls);
            if(fromurl.indexOf('from') != -1){
                window.location.href = "http://www.porsche-fan.com/cardsurveyh5/?from="+fromuri+"";
            }else{
                window.location.href = "http://www.porsche-fan.com/cardsurveyh5/";
            }
            return false
        }else{
            window.history.go(-1)
        }


    },
    IsPC(){
           let userAgentInfo = navigator.userAgent;
           let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
           let flag = true;
           for (let v = 0; v < Agents.length; v++) {
               if (userAgentInfo.indexOf(Agents[v]) > 0) {
                 flag = false;
                 break;
               }
           }
           return flag;
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
    isInformation2(){
        let interest_xz = [];
        for (let i=0;i<this.interestList.length;i++) {
          if(this.interestList[i].isToggle == true){
            let interest_ids =  this.interestList[i].ids
            interest_xz.push(interest_ids);
          }
        }
        this.interest = interest_xz.toString();
        if(this.interest === '') {
          this.verification = "请选择你感兴趣的内容"
          return false
        } else {
          this.verification = ""
        }
        let _this = this;
        _this.verification = ""
        _this.windowUrl = decodeURIComponent(window.location.href);
        $.ajax({
                type: 'post',
                data: {
                    tel:_this.tel,
                    interest:_this.interest,
                    url:_this.windowUrl,
                },
                url: PORSCHE_HOST+'/member/interest/add',
                success: function (res) {
                    console.log("data---"+JSON.stringify(res));
                    if(res.code === "1001") {
                      localStorage.setItem("member_id",res.data.member_id)
                      localStorage.setItem("avatar",res.data.avatar)
                      localStorage.setItem("nickname",res.data.nickname)
                      localStorage.setItem("tel",_this.tel)
                      //设置cookie
                      _this.setCookie('uuid',res.data.member_id,7)
                      if(_this.IsPC()){
                        // _this.router.push('/home');
//                        if(localStorage.getItem('fullPathUrl') && localStorage.getItem('fullPathUrl') != '/login'){
//                          //  let redirect = decodeURIComponent(this.$route.query.redirect);
//                          let redirect = localStorage.getItem('fullPathUrl');
//                          _this.$router.push(redirect);
//                        }else{
//                          _this.$router.push('/home');
//                        }
//                         window.history.go(-1)
                          //H5活动页判断
                          var fromurl = decodeURIComponent(window.location.href)
                          if(fromurl.indexOf('redirect_uri') != -1){
                              var fromurls = fromurl.indexOf('#')
                              var fromuri = fromurl.substring(fromurl.lastIndexOf('=')+1,fromurls);
                              if(fromurl.indexOf('from') != -1){
                                  window.location.href = "http://www.porsche-fan.com/cardsurveyh5/?from="+fromuri+"";
                              }else{
                                  window.location.href = "http://www.porsche-fan.com/cardsurveyh5/";
                              }
                              return false
                          }else{
                              window.history.go(-1)
                          }
                      }else {
                        _this.isshowInformation2 = false;
                        _this.isshowInformation3 = true;
                      }
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
        // if(this.IsPC()){
        //   localStorage.setItem("member_id",this.member_id)
        //   localStorage.setItem("avatar",this.avatar)
        //   localStorage.setItem("nickname",this.nickname)
        //   localStorage.setItem("tel",this.tel)
        //   this.$router.push('/home');
        // }


    },
    setInterest(key){
      this.interestList[key].isToggle = !this.interestList[key].isToggle
    },
    interests(){
      let _this = this;
      _this.isshowInformation1 = false;
      _this.isshowInformation2 = true;
      _this.verification = ""
      let formData = {
          type:'interest',
      }
      $.ajax({
              type: 'post',
              data: formData,
              url: PORSCHE_HOST+'/member/interest',

              success: function (res) {
                  console.log(res);
                  console.log("data---"+res.data);
                  if(res.code === "1001") {
                    let array_interest = [];
                    for (let i=0;i<res.data.length;i++){
                      let object_interest = {
                        "ids":res.data[i].id,
                        "picture_path":res.data[i].picture_path,
                        "content":res.data[i].content,
                        "isToggle":false,
                      }
                      array_interest.push(object_interest)
                    }
                      _this.interestList =  array_interest
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

      picture(){
          let _this = this;
          _this.isshowInformation1 = false;
          _this.isshowInformation2 = true;
          _this.verification = ""
          let formData = {
              type:'interest',
          }
          $.ajax({
              type: 'post',
              data: formData,
              url: PORSCHE_HOST+'/member/tupian',

              success: function (res) {
                  console.log(res);
                  console.log("data---"+res.data);
                  if(res.code === "1001") {
                      let array_interest = [];
                      for (let i=0;i<res.data.length;i++){
                          let object_interest = {
                              "ids":res.data[i].id,
                              "picture_path":res.data[i].picture_path,
                              "content":res.data[i].content,
                              "isToggle":false,
                          }
                          array_interest.push(object_interest)
                      }
                      _this.interestList =  array_interest
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
    login(){
      // let formData = new FormData();
      // formData.append("tel", this.tel); //类型
      let _this = this;
      if(_this.tel == ""){
        _this.verification = "手机号不能为空"
        return false;
      }
      // let myreg = /^(((13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      let myreg = /^(1(([36579][0-9])|(47)|[8][012356789]))\d{8}$/;
      if(!myreg.test(_this.tel)){
          _this.verification = "请输入有效的手机号码！"
          return false;text-align
      }
        this.windowUrl = decodeURIComponent(window.location.href);
      let formData = {
          tel:this.tel,
          url:this.windowUrl
      }
      _this.$emit('LoginPhone', _this.tel)
      $.ajax({
          type: 'post',
          data: formData,
          url: PORSCHE_HOST+'/member/signin',
          success: function (res) {

              console.log("data---"+JSON.stringify(res));
              if(res.code === "1001") {
                localStorage.setItem("member_id",res.data.member_id)
                localStorage.setItem("avatar",res.data.avatar)
                localStorage.setItem("nickname",res.data.nickname)
                localStorage.setItem("tel",_this.tel)
                //设置cookie
                _this.setCookie('uuid',res.data.member_id,7)
                //_this.$router.push('/home');
                //window.history.go(-1);
                //H5活动页判断
                  var fromurl = decodeURIComponent(window.location.href)
                  if(fromurl.indexOf('redirect_uri') != -1){
                    var fromurls = fromurl.indexOf('#')
                    var fromuri = fromurl.substring(fromurl.lastIndexOf('=')+1,fromurls);
                    if(fromurl.indexOf('from') != -1){
                        window.location.href = "http://www.porsche-fan.com/cardsurveyh5/?from="+fromuri+"";
                    }else{
                        window.location.href = "http://www.porsche-fan.com/cardsurveyh5/";
                    }
                    return false
                }
                //正常登录
                if(localStorage.getItem('fullPathUrl') && localStorage.getItem('fullPathUrl') != '/login'){
                //  let redirect = decodeURIComponent(this.$route.query.redirect);
                    let redirect = localStorage.getItem('fullPathUrl');
                    _this.$router.push(redirect);
                }else{
                    _this.$router.push('/home');
                }
//                    window.history.go(-1)
              }
              if(res.code === "1015") {
                console.log("data1015---");
                console.log(res);
                  //_this.interests();
                  _this.picture();

              }
              if(res.code === "1002" || res.code === "1003" || res.code === "1009" || res.code === "1011") {
                if(res.code === "1009"){
                  _this.verification = "该手机号暂时无法登陆挚享汇。请关注保时捷中国相关活动，即有机会成为会员。"
                  return false;
                }else if(res.code === "1011"){
                    _this.verification = res.message
                    setTimeout(function () {
                        _this.showreg();
                    }, 2000)
                  return false;
                }else {
                  _this.verification = res.message
                  return false;
                }
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

  }

}
</script>

<style scoped>
.parsche-login-collectiondy p:last-child{
    margin-bottom: 15px!important;
}
.parsche-login-collectiondy p{
    font-size: 13px;
    color: #000;
    line-height:22px;
    /*margin-bottom: 15px!important;*/
}
.parsche-login-collectiondy {
  width: 275px;
  display: table;
  margin: 0 auto;
}
.login-collection-texth3 h3{
  line-height: 19px;
  margin: 5px 0px;
  font-size: 16px;
  color: #000;
  font-weight: bold;
}
.login-collection-texth3 {
  width: 275px;
  display: table;
  margin: 20px auto;
  margin-bottom: 10px;
}
.checkbox-avs {
  background: #c8cacb !important;
  border-color: #c8cacb !important;
}
.checkbox-av {
    background: #000 !important;
    border-color: #000 !important;
}
.interes-choice-nr {
  width: 33.33%;
  float: left;
  margin-bottom: 20px;
}
.interes{
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-interes {
  width: 290px;
}
.choice-yuan {
    width: 100%;
    text-align: center;
}
.interes-choice-nr h5 {
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
  color: #000;
}
.interes-choice-yuan {
    margin: 0 auto;
    width: 40px;
    height: 40px;
    padding: 5px;
    border: 1px solid #c8cacb;
    border-radius: 50px;
    background: #c8cacb;
}
.checkbox-gifts {
  background: none !important;
}
.checkbox-gift {
    background: #6f6f6fcf !important;
    opacity: 0.6;
}
.gift-img {
  width: 130px;
  height: 130px;
  border: 1px solid #c1c1c1;
}
.gift-choice-nr h5 {
  font-size: 14px;
  color: #000;
  margin-top: 20px;
}
.gift-choice-nr {
  margin: 10px 5px;
  text-align: center;
}
.login-gift {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-verification-texth3 {
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin: 20px 0px;
  text-align: center;
}
.login-verification-texth3 h3 {
  margin: 5px 0px;
}
.input-div {
  border: 1px solid #b7b7b7;
  padding-left: 1px;
  padding-right: 1px;
  position:relative;
}
.pcshwo {
  display: flex;
  position: absolute;
  top: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 99999;
}
.parsche-login-nr {
  background: #fff;
  width: 320px;
  margin-top: 255px;
}
.parsche-login-nr2 {
  background: #fff;
  width: 320px;
  margin-top: 0px;
}
.parsche-login-btn {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-verification-texttel {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

}
.login-verification-texttel label{
  width: 70px;
  border: 1px solid #b7b7b7;
  height: 30px;
  line-height: 30px;
  border-right: 0px;
  padding: 1px 5px;
  font-size: 14px;
  color: #796e6e;
}
.login-verification-texttel input{
  /*border: 1px solid #b7b7b7;*/
  border: 0 none;
  box-sizing: border-box;
  -webkit-appearance:none;
  height: 32px;
  font-size: 15px;
  color: #796e6e;
  padding-left: 10px;
  outline: none;
}
.login-verification-texth3 {
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin: 20px 0px;
  text-align: center;
}
.login-verification-texth3 h3 {
  margin: 5px 0px;
}

.parsche-login-navigation {
  width: 100%;
  overflow: hidden;
}
.parsche-login-navigation ul{
  display: flex;
  margin: 0px;
}

.parsche-login-navigation ul li{
  width: 50%;
  height: 35px;
  line-height: 35px;
  text-align: center;

}
.parsche-login-navigation ul li a{
  display: block;

}
.parsche-login-navigation ul li span{
  position: relative;
  top: -35px;
  color: #000;
}
.parsche-login-navigation ul li:last-child span{
  color: #fff;
}
.navigation1 {
  border-bottom: 35px solid #fff;
  border-right: 20px solid #000;
  border-left: 35px solid #fff;
}
.navigation2 {
  border-top: 35px solid #000;
  border-right: 35px solid #000;
  border-left: 35px solid #000;
}

@media (max-width: 768px) {
  .parsche-login-nr,.parsche-login-nr2 {
    width: 100%;
    margin-top: 0;
  }
  .pcshwo {
    display: block;
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
    background: none;
    z-index: 99999;
  }
}
</style>
