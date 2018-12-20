<template lang="html">
  <div class="porsche-personal-personalcenter">
    <div class="" v-if="shwoinp">

      <ul >
        <li>
          <span class="item-header">昵称</span>
          <span class="item-content">{{this.personalcenterData.nickname}}</span>
        </li>
          <li>
            <span class="item-header">姓名</span>
            <span class="item-content">{{this.personalcenterData.username}}</span>
          </li>
          <li>
            <span class="item-header">性别</span>
            <span class="item-content">{{getgender(this.personalcenterData.gender)}}</span>
          </li>
          <li>
            <span class="item-header">联系方式</span>
            <span class="item-content">{{this.personalcenterData.tel}}</span>
          </li>
          <li>
            <span class="item-header">省份/城市/区县</span>
            <span class="item-content">{{this.personalcenterData.province !=null ?this.personalcenterData.province+'/':''}}{{this.personalcenterData.city !=null ?this.personalcenterData.city+'/':''}}{{this.personalcenterData.district}}</span>
          </li>
          <li>
            <span class="item-header">Email</span>
            <span class="item-content">{{this.personalcenterData.email}}</span>
          </li>
          <li>
            <span class="item-header">邮寄地址</span>
            <span class="item-content">{{this.personalcenterData.detail_address}}</span>
          </li>
          <li>
            <span class="item-header">一年内是否考虑购车</span>
            <span class="item-content">{{getwilling(this.personalcenterData.purchase_willing)}}</span>
          </li>
          <li>
            <span class="item-header">偏爱的保时捷车型</span>
            <span class="item-content" v-for="list in  personalcenterData.car">{{showcar(list)}}</span>
          </li>
          <li>
            <span class="item-header">您现在是否已有座驾</span>
            <span class="item-content">{{gethavecar(this.personalcenterData.have_car)}}</span>
          </li>
          <li v-if="this.personalcenterData.have_car == 'Y'">
            <span class="item-header">座驾品牌</span>
            <span class="item-content">{{this.personalcenterData.car_brand}}</span>
          </li>
          <li v-if="this.personalcenterData.have_car == 'Y'">
            <span class="item-header">座驾型号</span>
            <span class="item-content">{{this.personalcenterData.car_model}}</span>
          </li>
          <li>
            <span class="item-header">兴趣</span>
            <span class="item-content" style="display:flex;">
              <div class="interes-choice-yuan checkbox-av" v-for="listimg in personalcenterData.interest_pic">
                  <div class="choice-yuan "  >
                      <img class="imgywlx-yuan-1s" width="100%" :src="PORSCHE_HOST+listimg"  alt="">
                  </div>
              </div>
              <!-- <img  :src="PORSCHE_HOST+listimg" v-for="listimg in personalcenterData.interest_pic" alt=""> -->
            </span>
          </li>
          <div class="clear"></div>
      </ul>
      <div class="personalcenter-btn">
        <div class="parsche-login-btn">
          <div class="main-btn" @click="shwoupdates">
            修改资料
          </div>
        </div>
      </div>
    </div>
      <div class="" v-if="shwoupdate">
      <ul >
        <li>
          <span class="item-header">昵称</span>
          <label class="item-content">
              <input type="text" class="name-input" v-model="personalcenterData.nickname">
          </label>
        </li>
          <li>
            <span class="item-header">姓名</span>
            <label class="item-content">
                <input type="text" class="name-input" v-model="personalcenterData.username">
            </label>
          </li>
          <li>
            <span class="item-header">性别</span>
            <span class="item-content">
              <label class="row-radio-gender"><input name="gender" v-bind:checked="this.personalcenterData.gender == 'MALE'" v-model="personalcenterData.gender" type="radio" value="MALE">先生 </label>
              <label class="row-radio-gender"><input name="gender" v-bind:checked="this.personalcenterData.gender == 'FEMALE'" v-model="personalcenterData.gender" type="radio" value="FEMALE">女士 </label>
            </span>
          </li>
          <li>
            <span class="item-header">联系方式</span>
            <span class="item-content">{{personalcenterData.tel}}</span>
          </li>
          <li>
            <span class="item-header">省份/城市/区县</span>
            <span class="item-content scq" >
              <select class=""   name="" @change="citydata(personalcenterData.province_id)" v-model="personalcenterData.province_id" >
              <option :value="list.pronvince_id"   v-for="list in provincelistdata">{{list.province_name}}</option>
            </select>
            <select class=""   name="" v-model="personalcenterData.city_id" >
            <option :value="list.city_id"  v-for="list in citylistdata">{{list.city_name}}</option>
          </select>
          <input type="text" class="" v-model="personalcenterData.district">
          </span>
          </li>
          <li>
            <span class="item-header">Email</span>
            <label class="item-content">
                <input type="text" class="name-input" v-model="personalcenterData.email">
            </label>
          </li>
          <li>
            <span class="item-header">邮寄地址</span>
            <label class="item-content">
                <input type="text" class="name-input" v-model="personalcenterData.detail_address">
            </label>
          </li>
          <li>
            <span class="item-header">一年内是否考虑购车</span>
            <span class="item-content">
              <label class="row-radio-gender"><input name="purchase_willing" v-bind:checked="this.personalcenterData.purchase_willing == 'Y'" v-model="personalcenterData.purchase_willing" type="radio" value="Y">是 </label>
              <label class="row-radio-gender"><input name="purchase_willing" v-bind:checked="this.personalcenterData.purchase_willing == 'N'" v-model="personalcenterData.purchase_willing" type="radio" value="N">否 </label>
            </span>
          </li>
          <li class="baocx">
            <span class="item-header">偏爱的保时捷车型</span>

            <span class="item-content">
                <label class="row-radio-gender" v-for="(list,key) in intentionlistdata">
                  <input name="gender" :checked="isTitleCheckeds(list.car_id) " :value="list.car_id"  @change="changeTitleChecked(list.car_id)" type="checkbox" >{{list.car_name}}</label>
                  <label class="row-radio-gender">
                    <input name="gender" :checked="isTitleCheckedsDATA()"    @change="changeTitleCheckedDATA()" type="checkbox" >全系车型</label>

            </span>
          </li>
          <li>
            <span class="item-header">您现在是否已有座驾</span>
            <span class="item-content">
              <label class="row-radio-gender"><input name="have_car" v-bind:checked="this.personalcenterData.have_car == 'Y'" v-model="personalcenterData.have_car" type="radio" value="Y">是 </label>
              <label class="row-radio-gender"><input name="have_car" v-bind:checked="this.personalcenterData.have_car == 'N'" v-model="personalcenterData.have_car" type="radio" value="N">否 </label>
            </span>
          </li>
          <li v-if="this.personalcenterData.have_car == 'Y'">
            <span class="item-header">座驾品牌</span>
            <label class="item-content">
                <input type="text" class="name-input" v-model="personalcenterData.car_brand">
            </label>
          </li>
          <li v-if="this.personalcenterData.have_car == 'Y'">
            <span class="item-header">座驾型号</span>
            <label class="item-content">
                <input type="text" class="name-input" v-model="personalcenterData.car_model">
            </label>
          </li>
          <li class="xqli">
            <span class="item-header" style="margin-top:7px;">兴趣</span>
            <span class="item-content" style="display:flex;">
              <!-- <div class="interes-choice-yuan checkbox-av" v-for="listimg in personalcenterData.interest_pic">
                  <div class="choice-yuan "  >
                      <img class="imgywlx-yuan-1s" width="100%" :src="PORSCHE_HOST+listimg"  alt="">
                  </div>
              </div> -->
              <!-- <img  :src="PORSCHE_HOST+listimg" v-for="listimg in personalcenterData.interest_pic" alt=""> -->
              <div class="interes">
                <div class="login-interes">
                    <div class="interes-choice-nr" v-if="key < 9"  v-for="(ints,key) in interestList" @click='setInterest(ints.picture_path,key)'>
                      <div class="interes-choice-yuan interes-choice-yuan2" :class="{'checkbox-avs':!ints.isToggle ,'checkbox-avxq':ints.isToggle}">
                          <div class="choice-yuan ">
                              <img class="imgywlx-yuan-1s" width="100%" :src="PORSCHE_HOST+ints.picture_path" alt="">
                          </div>
                      </div>
                      <h5>{{ints.content}} </h5>
                    </div>
                </div>
              </div>
            </span>
            <div class="clear"></div>
          </li>
          <div class="clear"></div>
      </ul>
      <div class="personalcenter-btn">
        <div class="parsche-login-btn">
          <div class="main-btn" @click="hideEdit">
            提交修改
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import {
  PORSCHE_HOST
} from '../../common/js/host';
export default {
  props: {
    personalcenterData: {
      type: Object,
      default () {
        return {
          "province_id": "",
          "city_id": "",
          "uuid": "",
          "nickname": "",
          "username": "",
          "gender": "",
          "tel": "13964334432",
          "province": null,
          "city": null,
          "district": "",
          "detail_address": "",
          "email": "",
          "purchase_willing": "",
          "interest": '',
          "avatar": null,
          "car_name": [],
          "car_id": '',
          "car": [],
          "have_car": "",
          "car_brand": "",
          "interest_pic": [],
          "car_model": "",
        }

      }
    }
  },
  components: {

  },
  data() {
    return {
      car_id:[],
      intentionlistdata:[],
      interestList:[],
      interest:'',
      province_id: "",
      showuserImg: false,
      PORSCHE_HOST,
      provincelistdata: [],
      citylistdata: [],
      districtlistdata: [],
      isTitleChecked: [],
      shwoinp: true,
      shwoupdate: false,
      gendertype: {
        "MALE": "男",
        "FEMALE": "女",
      },
      willingtype: {
        "Y": "是",
        "N": "否",
      },
      havecar: {
        "Y": "是",
        "N": "否",
      },
      // personalcenterlist: {}
    }
  },
  methods: {
    showacxq(ins,key){
      let count =0;
      for(let i=0;this.personalcenterData.interest_pic.length;i++){
        if(this.personalcenterData.interest_pic[i] === ins){
          // this.setInterest(ins,key)
          return true
        }else{
          count++;
          if(count===this.personalcenterData.interest_pic.length){

            return false
          }
        }

      }
    },
    showcar(carval){
      for(let i=0;i<this.intentionlistdata.length;i++){
        if (this.intentionlistdata[i].car_id == carval) {
          return this.intentionlistdata[i].car_name;
        }
      }
    },
    isTitleCheckeds(car_id) {
      if(this.car_id != '[]'){
        Array.prototype.containsa = function ( needle ) {
        for (let i in this) {
          if (this[i] == needle) return true;
        }
        return false;
      }
        return this.car_id.containsa(car_id)
      }


    },
    isTitleCheckedsDATA() {
      // console.log(this.personalcenterData.car)
      // if(parseInt(JSON.stringify(this.personalcenterData.car.length)) != parseInt(this.intentionlistdata.length) ){
      //   return false;
      // }else {
      //   return true;
      // }
      if(this.car_id.length != this.intentionlistdata.length ){
        return false;
      }else {
        return true;
      }
    },
    changeTitleCheckedDATA(){
       var _this = this;
      if(event.target.checked == !true){
           _this.car_id = [];
       } else { //实现全选
           _this.car_id = [];
           _this.intentionlistdata.forEach(function(item, i) {
               _this.car_id.push(item.car_id);
           });
           _this.personalcenterData.car = _this.car_id
       }

    },
    changeTitleChecked(car_id){
      if(event.target.checked == true){
        if(this.car_id != '[]'){
          this.car_id.push(car_id);
        }
        Array.prototype.contains = function ( needle ) {
        for (let i in this) {
          if (this[i] == needle) return true;
        }
        return false;
      }
      if(this.car_id.contains(car_id) == false){
        this.car_id.push(car_id);
      }
      Array.prototype.unique3 = function(){
       var res = [];
       var json = {};
       for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
         res.push(this[i]);
         json[this[i]] = 1;
        }
       }
       return res;
      }
      this.car_id = this.car_id.unique3()
        console.log(JSON.stringify(this.car_id))
        this.personalcenterData.car = this.car_id
      }
      if(event.target.checked == false){
        Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
        this.splice(index, 1);
        }
        };
        this.car_id.remove(car_id)
        console.log(JSON.stringify(this.car_id))
        this.personalcenterData.car = this.car_id
      }
    },
    interests(){
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
    },
    isInformation2(){
        let interest_xz = [];
        for (let i=0;i<this.interestList.length;i++) {
          if(this.interestList[i].isToggle == true){
            let interest_ids =  this.interestList[i].ids
            interest_xz.push(interest_ids);
          }
        }
        this.personalcenterData.interest = interest_xz.toString();
    },

    setInterest(ins,key){
      if(this.interestList[key].picture_path === ins){
        this.interestList[key].isToggle = !this.interestList[key].isToggle
      }
    },
    provincedata() {
      let _this = this;
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST + '/member/user/province',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.provincelistdata = res.data
            if(_this.personalcenterData.province_id != null && _this.personalcenterData.province_id != "")
            _this.citydata(_this.personalcenterData.province_id)
            }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        }
      })
    },
    citydata(province_id) {
      let _this = this;
      $.ajax({
        type: 'post',
        data: {
          province_id: province_id
        },
        url: PORSCHE_HOST + '/member/user/city',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.citylistdata = res.data
          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        }
      })
    },
    shwoupdates() {
      this.$emit('updata-user')
      this.interests()
      this.shwoupdate = true
      this.shwoinp = false

    },
    hideEdit() {
      this.isInformation2()
      this.personalcenterData.car_id = this.personalcenterData.car.toString()
      this.$emit('hide-edit', this.personalcenterData)
      this.shwoupdate = false
      this.shwoinp = true
    },
    intentionlist() {
      let _this = this;
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST + '/member/user/car',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.intentionlistdata = res.data
          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        }
      })
    },
    gethavecar(zj) {
      return this.havecar[zj];
    },
    getwilling(wi) {
      return this.willingtype[wi];
    },
    getgender(sx) {
      return this.gendertype[sx];
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
    this.provincedata()
    this.show();
    this.intentionlist()
    //console.log("yyyyy---" +JSON.stringify(this.personalcenterData.province_id))

  }
}
</script>

<style scoped>
.checkbox-avs {
  background: #000 !important;
  border-color: #000 !important;
}
.checkbox-avxq {
    background: #d5001c !important;
    border-color: #d5001c !important;
}
.choice-yuan {
    width: 100%;
    text-align: center;
}
.interes-choice-nr h5{
  margin-left: 10px;
  color: #000;
}
.interes-choice-nr {
  float: left;
  justify-content: center;
  display: flex;
  align-items: center;
}
.login-interes {
  max-width: 565px;
}
.interes{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.choice-yuan {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.checkbox-av {
    background: #000 !important;
    border-color: #000 !important;
}
.interes-choice-yuan {
  margin: 7px auto;
  display: flex;
  width: 25px;
  height: 25px;
  padding: 5px;
  border: 1px solid #c8cacb;
  border-radius: 50px;
  margin-left: 10px;
}
.xqli{
  height: 100%!important;
  line-height:100%!important;
  overflow: initial!important;
  border-bottom: 1px dashed #b5b5b5!important;
}
/*.item-content img {
  width: 35px;
  height: 35px;
  padding: 5px;
}*/

.item-content ul {
  z-index: 909999999;
  overflow-y: visible!important;
  height: 200px;
}

.item-content ul li {
  line-height: 40px;
  height: 40px;
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
  margin: 0 10px!important;
}

.main-kv .register-form .row-radio-gender:first-child {
  margin-left: 0;
}

.row-radio-gender {
  margin-left: 2px;
  font-size: 12px;
  color: #000;
}

.item-content input[type=text] {
  border: none;
  text-align: right;
  height: 40px;
  outline: none;
  vertical-align: middle;
}

.personalcenter-btn {
  padding: 20px 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
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

.porsche-personal-personalcenter ul li {
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  zoom: 1;
  position: relative;
  border-bottom: 1px dashed #b5b5b5;
}

.cover {
  object-fit: cover;
}

.clear {
  clear: both;
}

@media (max-width: 768px) {
  .porsche-personal-personalcenter ul li .item-header {
    margin-left: 10px;
  }
  .porsche-personal-personalcenter ul li .item-content {
    margin-right: 10px;
  }
  .scq input {
    width: 50px!important;
  }
  .login-interes {
    max-width: 265px;
  }
  .interes-choice-nr {
    width: 33.33%;
    display: block;
    margin-bottom: 20px;
  }
  .interes-choice-nr h5 {
    text-align: center;
      margin-left: auto;
  }
  .interes-choice-yuan2 {
    margin-left: auto;
  }
  .baocx {
    height: inherit!important;
  }
  .baocx > .item-content {
    width: 190px;
  }
  .baocx > .item-content >label {
    width: 90px;
  }
}
</style>
