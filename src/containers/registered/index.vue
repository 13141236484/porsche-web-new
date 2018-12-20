<template >
<div class="parsche-login">
  <div class="popShow" v-if="this.poponShow">
    <div class="popShow-nr">
      <div class="popShow-nrtext">
        <h3>隐私政策</h3>
        <p>保时捷集团或其代理机构可能会通过您提供的信息以及我们已经存储的关于您的信息联系您，包括通过邮件、电话、短消息或者传真的形式，向您介绍有关保时捷的产品和我们提供的服务信息。我们可能会在一段合理的时间内保存您的信息，以便向您提供与我们的产品和服务有关的介绍、邀请函或资讯。</p>
        <h2 @click="closepopShow()">X</h2>
      </div>
      </div>
  </div>
  <layout-log></layout-log>
  <div class="pcshwo">
    <div class="parsche-login-nra parsche-login-nr" v-if='this.isshowInformation1'>
      <div class="parsche-login-navigation">
        <ul>
          <li>
            <a @click="showlogin()"><a class="navigation1"></a>
              <span>用户登录</span></a>
          </li>
          <li>
            <a @click="showreg()"><a class="navigation2"></a>
              <span>用户注册</span></a>
          </li>
        </ul>
      </div>
      <div class="parsche-login-verification">
        <div class="login-verification-texth3">
          <h3>尊敬的挚享汇会员</h3>
          <h3>感谢您对保时捷的支持</h3>
          <h5>请完善个人信息,获得保时捷挚享汇会员特权</h5>
        </div>
        <table class="form-table step-form">
          <tbody>
            <tr class="form-row">
              <td class="row-input-nickname" colspan="2">昵称</td>
              <td class="td-name-nickname" colspan="6">
                <input name="name" v-model="name" id="name" type="text" maxlength="10">
              </td>
              <td class="radio-w" colspan="4">
                <label class="row-radio-gender"><input name="gender" v-model="gender" type="radio" value="MALE" checked="">先生 </label>
                <label class="row-radio-gender"><input name="gender" v-model="gender"  type="radio" value="FEMALE">女士</label>
              </td>
            </tr>
            <tr class="hr-bai"></tr>
            <tr class="form-row">
              <td class="row-input-label" colspan="3">姓</td>
              <td class="td-name-input" colspan="3">
                <input name="name" v-model="surname" id="surname" type="text" maxlength="8">
              </td>
              <td class="row-input-label" colspan="3">名</td>
              <td class="td-name-input" colspan="3">
                <input name="name" v-model="firstname" id="firstname" type="text" maxlength="8">
              </td>
            </tr>
            <tr class="hr-bai"></tr>
            <tr class="form-row mobile-row">
              <td colspan="4" class="row-input-label">手机号码</td>
              <td colspan="8">
                <input name="mobile" id="mobile" v-model="tel" type="tel" maxlength="11">
              </td>
            </tr>
          </tbody>
        </table>
        <div class="parsche-login-dy">
          <label class="row-checkbox-policy">
            <input name="gender" type="checkbox" v-model="read"  checked="">
            <span>我已阅读并了解</span>
            <a href="javascript:;" @click="popShow()" style="text-decoration:underline;"  class="policy-button">隐私政策</a>
          </label>
          <p class="policy-p">备注：请确保您的姓名可以正常签收快递</p>
        </div>
        <h3 class="verification" v-text="this.verification"></h3>
        <div class="parsche-login-btn">
          <div class="main-btn but-col" @click='isInformation1()'>
            下一步
          </div>
        </div>
      </div>
    </div>

    <div class="parsche-login-nrb parsche-login-nr" v-if='this.isshowInformation2'>
      <div class="parsche-login-interest">
        <div class="login-verification-texth3">
          <h3>请选择你感兴趣的内容</h3>
        </div>
        <div class="interes">
          <div class="login-interes">
              <div class="interes-choice-nr" v-if="key < 9"   v-for="(ints,key) in interestList" @click='setInterest(key)'>
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
    <div class="parsche-login-nrd parsche-login-nr" v-if='this.isshowInformation4'>
      <div class="parsche-login-gift">
        <div class="login-verification-texth3">
          <h3>请选择你喜欢的礼品</h3>
        </div>
        <div class="gift">
            <div class="login-gift">
              <div class="gift-choice-nr" v-for="(pres,key) in presentList" @click="setPresent(key)">
                    <div class="gift-img"  :class="{'checkbox-gifts':!pres.isToggle,'checkbox-gift':pres.isToggle}">
                        <img  style="height: 100%;width: 100%;object-fit: cover;" :src="PORSCHE_HOST+pres.picture_path" alt="">
                    </div>
                <h5>{{pres.content}} </h5>
              </div>
            </div>
            <h3 class="verification" v-text="this.verification"></h3>
            <div class="parsche-login-btn">
              <div class="main-btn but-col" @click='isInformation4()'>
                提  交
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="parsche-login-nre parsche-login-nr" v-if='this.isshowInformation5'>
      <div class="parsche-login-improve">
        <div class="login-improve-texth3">
          <h3>已收到申请，距离心仪的礼品只差一步！</h3>
            <h3>请至个人中心完善信息，</h3>
            <h3>即可获得挚享汇专属礼品！</h3>
        </div>
        <div class="parsche-login-btn">
          <div class="main-btn but-col" @click='toSuccessful()'>
            完善信息
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
  components: {
    LayoutLog
  },
    props: ['registerPhone'],
  data() {
    return {
        referral:'',
        verification:'',
        gotoInformation2:false,
        name:'',
        tel:'',
        firstname:'',
        surname:'',
        gender:'',
        interest:'',
        present:'',
        presentgift:false,
        read:false,
        poponShow:false,
        isshowInformation1:true,
        isshowInformation2:false,
        isshowInformation3:false,
        isshowInformation4:false,
        isshowInformation5:false,
        presentList:[],
        interestList:[],
        PORSCHE_HOST,
        windowUrl:"",
        show: true,


    }
  },
    watch: {
        registerPhone () {
            this.tel = this.registerPhone
        }
    },
  methods:{
    showlogin(){
      this.$emit('show-login')
    },
    showreg(){
      this.$emit('show-reg')
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
    closepopShow(){
      this.poponShow = false
    },
    popShow(){
      this.poponShow = true
    },
    setInterest(key){
      this.interestList[key].isToggle = !this.interestList[key].isToggle
    },
    setPresent(key){
      for(let i = 0;i< this.presentList.length;i++){
        this.presentList[i].isToggle = false
      }
      this.presentList[key].isToggle = !this.presentList[key].isToggle
    },
    isInformation1(){
      if(this.name === '' || this.gender === '' ||this.tel === '' || this.surname === '' || this.firstname === '' ) {
        this.verification = "信息不能为空"
        return false
      }
      if(this.read === false) {
        this.verification = "请阅读隐私政策"
        return false
      }else {
        this.verification = ""
      }
      let mySurname = /^[\u4e00-\u9fa5a-zA-Z]{1,8}$/;
      if(!mySurname.test(this.surname)){
          this.verification = "姓不可包含数字及特殊字符";
          return false;
      }
      let myFirstname = /^[\u4e00-\u9fa5a-zA-Z]{1,8}$/;
      if(!myFirstname.test(this.firstname)){
          this.verification = "名不可包含数字及特殊字符";
          return false;
      }
      this.login();
      if(this.gotoInformation2 === true){
        this.verification = ""
          // 用户注册
        this.isshowInformation1 = false;
        // 兴趣
        this.isshowInformation2 = true;
        let _this = this;
        let formData = {
            type:'interest',
        }
        $.ajax({
            type: 'post',
            data: formData,
            url: PORSCHE_HOST+'/member/interest',
            success: function (res) {
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
                    console.log(object_interest)
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
      }

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
        }
        if(this.IsPC()){
          this.isInformation3();
        }
        this.isshowInformation2 = false;
        this.isshowInformation3 = true;

    },
    isInformation3(){
      this.isshowInformation3 = false;
      this.isshowInformation4 = true;
      let _this = this;
      let formData = {
          type:'PRESENT',
      }
      $.ajax({
        type: 'post',
        data: formData,
        url: PORSCHE_HOST+'/member/present',
        success: function (res) {
            console.log("data---"+res.data);
            if(res.code === "1001") {
                let array_present = [];
                for (let i=0;i<res.data.length;i++){
                  let object_present = {
                    "ids":res.data[i].id,
                    "picture_path":res.data[i].picture_path,
                    "content":res.data[i].content,
                    "isToggle":false,
                  }
                  console.log(object_present)
                  array_present.push(object_present)
                }
                  _this.presentList =  array_present
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
    isInformation4(){
      let present_xz = [];
      for (let i=0;i<this.presentList.length;i++) {
        if(this.presentList[i].isToggle == true){
          let present_ids =  this.presentList[i].ids
          present_xz.push(present_ids);
        }
      }
      this.present = present_xz.toString();
      if(this.present === '') {
        this.verification = "请选择礼品"
        return false
      }
      let _this = this;
      _this.windowUrl = decodeURIComponent(window.location.href);
      let formData = {
        nickname: _this.name,
        gender: _this.gender,
        tel: _this.tel,
        firstname: _this.firstname,
        surname: _this.surname,
        interest: _this.interest,
        present: _this.present,
        referral:_this.referral,
        url:_this.windowUrl,
        code:_this.code,
      }
      $.ajax({
          type: 'post',
          data: formData,
          url: PORSCHE_HOST+'/member/register',
          success: function (res) {
              console.log("data---"+res.code);
              if(res.code === "1001") {
                  localStorage.setItem("member_id",res.data.member_id)
                  localStorage.setItem("avatar",res.data.avatar)
                  localStorage.setItem("nickname",res.data.nickname)
                  localStorage.setItem("tel",_this.tel)
                  _this.isshowInformation4 = false;
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
                      _this.isshowInformation5 = true;
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
    },
    toSuccessful(){
      this.$router.push('/personal/personalcenter');
    },
    login(){
      let _this = this;
      console.log(1222)
      if(_this.tel == ""){
        _this.verification = "手机号不能为空"
        return false;
      }

      //let myreg = /^(((13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        let myreg = /^(1(([36579][0-9])|(47)|[8][012356789]))\d{8}$/;
      if(!myreg.test(_this.tel)){
          _this.verification = "请输入有效的手机号码！"
          return false;
      }
      this.windowUrl = decodeURIComponent(window.location.href);
      let formData = {
          tel:this.tel,
          url:this.windowUrl
      }
      $.ajax({
          type: 'post',
          data: formData,
          url: PORSCHE_HOST+'/member/signin',
          success: function (res) {
              console.log("data---"+res.code);
              if(res.code === "1001") {
                localStorage.setItem("member_id",res.data.member_id)
                localStorage.setItem("avatar",res.data.avatar)
                localStorage.setItem("nickname",res.data.nickname)
                localStorage.setItem("tel",_this.tel)
                // _this.$router.push('/home');
                // window.history.go(-1)
                  /*if(localStorage.getItem('fullPathUrl') && localStorage.getItem('fullPathUrl') != '/login'){
                      //  let redirect = decodeURIComponent(this.$route.query.redirect);
                      let redirect = localStorage.getItem('fullPathUrl');
                      alert(22)
                      _this.$router.push(redirect);
                  }else{
                      alert(33)
                      _this.$router.push('/home');
                  }*/
              }
              if(res.code === "1001" && res.message === "登录成功"){
                  _this.verification = "该帐号已注册!"
                  return false
              }
              if(res.code === "1011") {
                  _this.gotoInformation2 = true
              }
              if(res.code === "1015"){
                  _this.verification = "该帐号已注册!"
                  return false
              }
              if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                if(res.code === "1009"){
                  _this.verification = "该手机号暂时无法登陆挚享汇。请关注保时捷中国相关活动，即有机会成为会员。"
                }else {
                  _this.verification = res.message
                }
                return false;
              }

          },
          error: function (res) {
              console.log(res)
              console.log("网络连接错误!")
          }
      });
    }
  },
  mounted(){
    this.referral = localStorage.getItem("referral")
    let _this = this;
    _this.tel = _this.registerPhone
    let myreg = /^(1(([36579][0-9])|(47)|[8][012356789]))\d{8}$/;
      $("#mobile").change(function(){
          console.log(1)
          if(_this.tel.length == "11" && myreg.test(_this.tel)){
              console.log(2)
              _this.login();
              _this.verification = ""
          }else{
              _this.verification = "请输入有效的手机号码！"
              return false;
          }
      });
//    $("#mobile").bind('input onpropertychange',function(){
//      if(_this.tel.length == "11" && myreg.test(_this.tel)){
//        _this.login();
//        _this.verification = ""
//      }else{
//          _this.verification = "请输入有效的手机号码！"
//          return false;
//      }
//    });

  }

}
</script>

<style scoped>
.policy-p {
  width: 252px;
}
.login-improve-texth3 h3:first-child{
  margin-bottom: 30px;
  margin-top: 20px;
}
.login-improve-texth3 h3:last-child{
  margin-bottom: 20px;
}
.login-improve-texth3 h3{
  line-height: 19px;
  margin: 5px 0px;
  font-size: 16px;
  color: #000;
  font-weight: bold;
  text-align: center;
}
.login-improve-texth3 {
  width: 290px;
  display: table;
  margin: 20px auto;
  margin-bottom: 10px;
}
.popShow-nrtext h2{
  text-align: center;
  font-size: 30px;
  margin: 10px 0px;
  color: #000;
  cursor: pointer;
}
.popShow-nrtext p{
  line-height: 25px;
  font-size: 12px;
  margin-bottom: 30px;
  color: #000;
}
.popShow-nrtext h3{
  font-size: 15px;
  text-align: center;
  margin-bottom: 30px;
  color: #000;
}
.popShow-nrtext {
  padding: 20px;
}
.popShow-nr {
  width: 290px;
  background: #fff;
}
.popShow {
  background: rgba(0, 0, 0, 0.5);
  z-index: 999999;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.parsche-login-collectiondy {
  width: 275px;
  display: table;
  margin: 0 auto;
}
.login-collection-texth3 {
  width: 275px;
  display: table;
  margin: 20px auto;
  margin-bottom: 10px;
}
.parsche-login-collectiondy p:last-child{
    margin-bottom: 15px!important;
}
.parsche-login-collectiondy p{
    font-size: 13px;
    color: #000;
    line-height:22px;
    /*margin-bottom: 15px!important;*/
}
.login-collection-texth3 h3{
  line-height: 19px;
  margin: 5px 0px;
  font-size: 16px;
  color: #000;
  font-weight: bold;
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
.gift-img {
  width: 130px;
  height: 130px;
  border: 1px solid #c1c1c1;
}
.checkbox-avs {
  background: #c8cacb !important;
  border-color: #c8cacb !important;
}
.checkbox-av {
    background: #000 !important;
    border-color: #000 !important;
}
.checkbox-gifts {
  background: none !important;
}
.checkbox-gift {
    background: #6f6f6fcf !important;
    opacity: 0.6;
}

.interes{
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-interes {
  width: 290px;
}
.interes-choice-nr {
  width: 33.33%;
  float: left;
  margin-bottom: 20px;
}
.interes-choice-nr h5 {
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
  color: #000;
}
.login-interes-choice {
  width: auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
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
.choice-yuan {
    width: 100%;
    text-align: center;
}
.radio-w {
  width: 110px;
}

.parsche-login-dy {
  position: relative;
  display: table;
  margin: 0 auto;
  left: -8px;
  margin-bottom: 20px;
  color: #000;
}

.parsche-login-dy label span,.parsche-login-dy label a{
  font-size: 13px;
}
.hr-bai {
  height: 10px;
}

input[type=checkbox]:checked:after,
input[type=radio]:checked:after {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  position: absolute;
  top: 2px;
  left: 1px;
  display: table;
  width: 8px;
  height: 4px;
  border: 1px solid red;
  border-top: 0;
  border-right: 0;
  content: '';
}

.main-kv .register-form .row-radio-gender input {
  margin-right: 5px;
}

input[type=checkbox]:checked,
input[type=radio]:checked {
  border-width: 1px;
  background-color: #fff;
}

input[type=checkbox],
input[type=radio] {
  background-color: #fff;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #000;
  width: 14px;
  height: 14px;
  border-radius: 0;
  position: relative;
  vertical-align: middle;
  outline: none;
  -webkit-appearance: none;
}

.main-kv .register-form .row-radio-gender:first-child {
  margin-left: 0;
}

.row-radio-gender {
  margin-left: 2px;
  font-size: 12px;
  color: #000;
}

.form-table td input[type=tel],
.form-table td input[type=text] {
  font-size: 12px;
  width: 100%;
  height: 34px;
  line-height: 34px;
  border: 0 none;
  outline: none;
  box-sizing: border-box;
  text-indent: 5px;
}

.form-table .td-name-input {
  width: 80px;
}
.form-table .td-name-nickname{
  width: 130px;
}
.form-table td {
  border: 1px solid #989898;
  height: 34px;
  line-height: 34px;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.form-table .row-input-label {
  /*width: 74px;*/
  text-align: left;
  font-size: 12px;
  text-indent: 7px;
  color: #000;
}
.form-table .row-input-nickname{
  width: 40px;
  text-align: left;
  font-size: 12px;
  text-indent: 7px;
  color: #000;
}

.form-table td {
  border: 1px solid #989898;
  height: 34px;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.form-table {
  width: 270px;
  margin: 0 auto 10px;
  border-color: #989898;
  vertical-align: middle;
  table-layout: fixed;
  /*margin-bottom: 20px;*/
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.kong {
  visibility: hidden;
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

.login-verification-texttel label {
  width: 60px;
  border: 1px solid #b7b7b7;
  height: 30px;
  line-height: 30px;
  border-right: 0px;
  padding: 1px 10px;
  font-size: 14px;
  color: #796e6e;
}

.login-verification-texttel input {
  border: 1px solid #b7b7b7;
  height: 30px;
  font-size: 15px;
  color: #796e6e;
  padding-left: 10px;
}

.login-verification-texth3 {
  margin: 20px 0px;
  text-align: center;
}

.login-verification-texth3 h3 {
  margin: 5px 0px;
  font-size: 16px;
  color: #000;
  font-weight: bold;
}

.login-verification-texth3 h5 {
  margin-top: 15px;
  font-size: 12px;
  color: #000;
  font-weight: bold;
}

.parsche-login-navigation {
  width: 100%;
  overflow: hidden;
}

.parsche-login-navigation ul {
  display: flex;
  margin: 0px;
}

.parsche-login-navigation ul li {
  width: 50%;
  height: 35px;
  line-height: 35px;
  text-align: center;
}

.parsche-login-navigation ul li a {
  display: block;
}

.parsche-login-navigation ul li span {
  position: relative;
  top: -35px;
  color: #fff;
}

.parsche-login-navigation ul li:last-child span {
  color: #000;
}

.navigation1 {
  border-top: 35px solid #000;
  border-right: 20px solid #fff;
  border-left: 35px solid #000;
}

.navigation2 {
  border-bottom: 35px solid #fff;
  border-right: 35px solid #fff;
  border-left: 35px solid #fff;
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
}
.parsche-login-nrc {
  display: none;
}
.popShow-nr {
  top: -13%;
  position: relative;
}

@media (max-width: 768px) {
  .parsche-login-nrc {
    display: block;
  }
  .parsche-login-nr {
    width: 100%;
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
  .popShow-nr {
    top: inherit;
    position: fixed;
  }
  .login-improve-texth3 h3:first-child{
    margin-top: 0;
  }

}
</style>
