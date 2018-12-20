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
          <li class="city-li">
            <span class="item-header">省份/城市/区县</span>
            <span class="item-content city-span">{{this.personalcenterData.province !=null ?this.personalcenterData.province+'/':''}}{{this.personalcenterData.city !=null ?this.personalcenterData.city+'/':''}}{{this.personalcenterData.district}}</span>
          </li>
          <li>
            <span class="item-header">Email</span>
            <span class="item-content">{{this.personalcenterData.email}}</span>
          </li>
          <li class="address-li">
            <span class="item-header">邮寄地址</span>
            <span class="item-content address-span">{{this.personalcenterData.detail_address}}</span>
          </li>
          <li>
            <span class="item-header">一年内是否考虑购车</span>
            <span class="item-content">{{getwilling(this.personalcenterData.purchase_willing)}}</span>
          </li>
          <li style="height: inherit;">
            <span class="item-header">偏爱的保时捷车型</span>
            <span class="item-content" v-for="list in  personalcenterData.car">{{showcar(list)}}</span>
          </li>
          <li>
            <span class="item-header">您现在是否已有座驾</span>
            <span class="item-content">{{gethavecar(this.personalcenterData.have_car)}}</span>
          </li>
          <li class="havecar-li" v-if="this.personalcenterData.have_car == 'Y'">
            <span class="item-header">品牌/型号</span>
            <span class="item-content" v-for="(list,index) in personalcenterData.brand_model">
              {{list}}
            </span>
          </li>


         <!-- <li v-if="this.personalcenterData.have_car == 'Y'">
            <span class="item-header">座驾品牌</span>
            <span class="item-content">{{this.personalcenterData.car_brand}}</span>
          </li>
          <li v-if="this.personalcenterData.have_car == 'Y'">
            <span class="item-header">座驾型号</span>
            <span class="item-content">{{this.personalcenterData.car_model}}</span>
          </li>-->
          <li style="height: inherit;">
            <span class="item-header">兴趣</span>
            <span class="item-content" style="line-height: 35px;">
              <div class="interes-choice-yuan checkbox-av" style="display: inline-block;" v-for="listimg in personalcenterData.interest_pic">
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
          <span class="item-header"><b style="color: #d5001c; padding-right: 3px; font-size: 22px;">*</b>昵称</span>
          <label class="item-content">
              <input type="text" class="name-input" v-model="personalcenterData.nickname" maxlength="10" placeholder="最多输入10个字符">
          </label>
        </li>
          <li>
            <label class="item-content lscontent" >
              <input type="text" class="name-input" v-model="personalcenterData.surname" maxlength="8" placeholder="最多输入8个字符">
              <span class="item-header"><b style="color: #d5001c; padding-right: 3px; font-size: 22px;">*</b>姓</span>
            </label>
            <label class="item-content lscontent" >
                <input type="text" class="name-input" v-model="personalcenterData.firstname" maxlength="8" placeholder="最多输入8个字符">
                <span class="item-header"><b style="color: #d5001c; padding-right: 3px; font-size: 22px;">*</b>名</span>
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
          <li class="sheng">
            <span class="item-header">省份/城市/区县</span>
            <span class="item-content scq" >
              <!-- <select class=""   name="" @change="citydata(personalcenterData.province_id)" v-model="personalcenterData.province_id" >
              <option :value="list.pronvince_id"   v-for="list in provincelistdata">{{list.province_name}}</option>
            </select>
            <select class=""   name="" v-model="personalcenterData.city_id" >
            <option :value="list.city_id"  v-for="list in citylistdata">{{list.city_name}}</option>
          </select> -->
          <span class="pc-select">
            <span class="pc-select-nr">
              <span class="pc-select-nrtext" @click="showsheng()">{{this.personalcenterData.province !=null ?this.personalcenterData.province:'请选择省份'}}</span>
              <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
            </span>
            <span class="span-select  span-select-nr1" v-if="showshengul">
              <span class="span-select-nr">
              <ul >
                <li >请选择省份</li>
                <li :value="list.pronvince_id" :class="{'results-xz':list.pronvince_id == personalcenterData.province_id}"  @click="citydatapc(list.pronvince_id,list.province_name)" v-for="list in provincelistdata">{{list.province_name}}</li>
                </ul>
              </span>
            </span>
          </span>
          <span class="pc-select">
            <span class="pc-select-nr">
              <span class="pc-select-nrtext" @click="showshi()">{{this.personalcenterData.city !=null ?this.personalcenterData.city:'请选择城市'}}</span>
              <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
            </span>
            <span class="span-select  span-select-nr1" v-if="showshiul">
              <span class="span-select-nr">
              <ul >
                <li >请选择城市</li>
                <li @click="chenshipc(list.city_id,list.city_name)"  :value="list.city_id" v-for="list in citylistdata">{{list.city_name}}</li>
                </ul>
              </span>
            </span>
          </span>
          <input type="text" class="" placeholder="请输入详细地址" v-model="personalcenterData.district">
          </span>
          </li>
          <li>
            <span class="item-header"><b style="color: #d5001c; padding-right: 3px; font-size: 22px;">*</b>Email</span>
            <label class="item-content">
                <input type="text" class="name-input" v-model="personalcenterData.email">
            </label>
          </li>
          <li>
            <span class="item-header"><b style="color: #d5001c; padding-right: 3px; font-size: 22px;">*</b>邮寄地址</span>
            <label class="item-content">
                <input type="text" class="name-input" style="width:180px" v-model="personalcenterData.detail_address" placeholder="请确保地址可以正常签收快递礼品">
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
          <li v-if="this.personalcenterData.have_car == 'Y'" class="carbox">
          <span class="item-header">品牌/型号</span>
          <span class="item-content">
             <span class="seat-pc-select" >
                <span class="seat-pc-select-nr">
                  <span class="seat-pc-select-nrtext" @click="showallbrand()">选择品牌/型号</span>
                  <span class="seat-select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
                </span>
                <span class="seat-span-select  seat-span-select-nr1" v-if="allcarkind">
                  <span class="seat-span-select-nr" >
                    <span v-if="brandName" class="seat-span-left">
                      <ol>
                        <li v-for="(letter,index) in Letters" @click="showtitle(index)">{{letter}}</li>
                      </ol>
                      <ul >
                        <li v-for="list in carbranddata" :ref="list.letter">
                          <div class="listtitle">{{list.letter}}</div>
                          <div class="listcon">
                            <span v-for="item in list.brands"  @click="showbrandname(item.brand_id,item.brand_name)">{{item.brand_name}}</span>
                          </div>
                        </li>
                      </ul>
                    </span>
                    <span class="seat-span-right">
                      <ul v-if="modelName">
                        <li v-for="list in carmodeldata" @click="showmodelname(list.model_name,list.brand_name)">{{list.model_name}}</li>
                      </ul>
                    </span>

                  </span>
                </span>
              </span>
              <!--<span class="el-icon-circle-plus-outline find-el" @click="addbrand()"></span>-->
              <span class="find-no" @click="nobrand()">没有找到?</span>
             <div v-if="carkind" style="margin-left: 10px">
               <div>
                 <input type="text" class="find-input" placeholder="品牌" maxlength="20" v-model="carbrand" @input="cartype(carbrand)">
                 <input type="text" class="find-input" placeholder="型号" maxlength="20" v-model="carmodel">
                 <span class="carsubmit" @click="carsubmit()">提交</span>
               </div>
                <ul class="carul" v-if="likeul">
                  <li v-for="list in importdata" @click="likechange(list.brand_name)">{{list.brand_name}}</li>
                </ul>
             </div>
             <div class="find-car" v-if="okbrand"  style="margin-left: 10px">
               已选车型:
                <span class="carkinds"  v-for="(list,index) in carlist">
                  <span>{{list}}</span>
                  <i class="el-icon-circle-close" style="position:absolute;top:-10px;right:-10px;font-size:20px;cursor:pointer;" @click="delectcar(index)"></i>
                </span>
             </div>
          </span>
          </li>
          <!--<li v-if="this.personalcenterData.have_car == 'Y'">
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
          </li>-->
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
          "surname": "",
          "firstname": "",
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
          /*"car_brand": "",
           "car_model": "",*/
          "interest_pic": [],
          "brand_model":[],//车型品牌
        }

      }
    }
  },
  components: {

  },
  data() {
    return {
      showshiul:false,
      showshengul:false,
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
        allcarkind:false, //整个列表的显示
        brandName:false, //车品牌
        modelName:false, //车系
        carkind:false, //没有找到
        likeul:false,  //模糊列表
        okbrand:false, //已选车型列表
        carbranddata:[], //车品牌内容
        carmodeldata:[], //车系内容
        importdata:[], //查询列表
        carbrand:"",  //输入品牌
        carmodel:"",  //输入车系
        Letters:['A','B','C','D','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z'],
        carlist: [],
    }
  },
  methods: {
    valsheng(id,name){
      alert(id+"----"+name)
    },

      //车品牌
      showallbrand(){
        let _this = this;
        _this.allcarkind = !_this.allcarkind
        _this.brandName = true
          _this.carkind = false;
          $.ajax({
              type: 'post',
              url: PORSCHE_HOST+'/member/user/car/brand',
              success: function (res) {
                  if(res.code === "1001") {
                      _this.carbranddata = res.data
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
         // $(".carbox").css({"height":"50px !important","line-height":"50px !important"});
      },
      //车系
      showbrandname(brand_id){
        let _this = this;
        _this.modelName = true;
          $.ajax({
              type: 'post',
              data: {
                  brand_id: brand_id
              },
              url: PORSCHE_HOST+'/member/user/car/model',
              success: function (res) {
                  if(res.code === "1001") {
                      _this.carmodeldata = res.data;
                      $(".seat-span-right").css({"border-bottom":"1px solid #aaa"})
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
      //确认车型添加
      showmodelname(model_name,brand_name){
          let _this = this;
          if(this.carlist.length >1){
              alert("最多添加两辆车!")
              _this.brandName = false;
              _this.modelName = false;
              _this.allcarkind = false;
              return false;
          }
          _this.carlist.push(brand_name+'/'+model_name);
          for(let i=0;i<_this.carlist.length;i++){
              if (_this.carlist[0] === _this.carlist[1]) {
                  alert("不能添加相同的车型!");
                  _this.carlist.splice(1,1);
                  _this.brandName = false;
                  _this.modelName = false;
                  _this.allcarkind = false;
                  return false;
              }
          }
          _this.personalcenterData.brand_model = _this.carlist.toString();
          _this.brandName = false;
          _this.modelName = false;
          _this.allcarkind = false;
          _this.okbrand = true;

      },
      //滑动A-Z
      showtitle(index){
          $('.seat-span-left ol li').removeClass('active');
          $('.seat-span-left ol li').eq(index).addClass('active');
          let scrollPosition = $('.seat-span-left ul li').eq(index)[0];
          $('.seat-span-left ul').animate({scrollTop:scrollPosition.offsetTop},500);
      },
      //删除已选车
      delectcar(index) {
          let _this = this
          if(typeof(this.personalcenterData.brand_model) === "string" ){
              _this.carlist.splice(index,1);
              _this.personalcenterData.brand_model.split(",").splice(index,1);
              _this.personalcenterData.brand_model = _this.personalcenterData.brand_model.split(",");
          }else{
              _this.carlist.splice(index,1);
              _this.personalcenterData.brand_model.splice(index,1);
          }
          if(this.carlist.length <=0){
              _this.okbrand = false;
              _this.personalcenterData.brand_model = [];
              return false;
          }

      },
      //+号添加车型
      /*addbrand(){
        let _this = this;
          _this.allcarkind = true
          _this.brandName = !_this.brandName
          _this.carkind = false;
          $.ajax({
              type: 'post',
              url: PORSCHE_HOST+'/member/user/car/brand',
              success: function (res) {
                  if(res.code === "1001") {
                      _this.carbranddata = res.data
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
      },*/
      //没有找到
      nobrand(){
          let _this = this;
          _this.allcarkind = false
          _this.carkind = !_this.carkind
          _this.carbrand = "";
          _this.carmodel ="";
      },
      //模糊车品牌查询
      cartype(carbrand){
          let _this = this;
          if(carbrand == ""){
              _this.importdata.splice(0,_this.importdata.length);
              _this.likeul = false;
              return false
          }
          $.ajax({
              type: 'post',
              data:{
                  brand_name: carbrand,
              },
              url: PORSCHE_HOST+'/member/user/find/brand',
              success: function (res) {
                  if(res.code === "1001") {
                      _this.importdata = res.data
                      if(_this.importdata == ''){
                          _this.likeul = false
                      }else{
                          _this.likeul = true
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
      //模糊选择
      likechange(brand_name){
        let _this = this;
        _this.carbrand = brand_name;
        _this.likeul = false;
          _this.importdata.splice(0,_this.importdata.length);
      },
      //提交手动输入的车系
      carsubmit(){
          let _this = this;
          let brand_name = _this.carbrand
          let model_name = _this.carmodel
          let contentNo = /\s{0,}[\S]{1,}[\s\S]{0,}/;
          if(brand_name == "" || !contentNo.test(brand_name)){
              alert("请输入品牌!")
              _this.likeul = false;
              return false
          }
          if(model_name == "" || !contentNo.test(model_name)){
              alert("请输入型号!")
              return false
          }
          if(this.carlist.length >1){
              alert("最多添加两辆车!")
              _this.brandName = false;
              _this.modelName = false;
              _this.allcarkind = false;
              _this.carkind = false;
              _this.carbrand = "";
              _this.carmodel ="";
              return false;
          }
          _this.carlist.push(brand_name+'/'+model_name);
          for(let i=0;i<_this.carlist.length;i++){
              if (_this.carlist[0] === _this.carlist[1]) {
                  alert("不能添加相同的车型!");
                  _this.carlist.splice(1,1);
                  _this.brandName = false;
                  _this.modelName = false;
                  _this.allcarkind = false;
                  _this.carkind = false;
                  _this.carbrand = "";
                  _this.carmodel ="";
                  return false;
              }
          }
          _this.personalcenterData.brand_model = _this.carlist.toString();
          _this.brandName = false;
          _this.modelName = false;
          _this.allcarkind = false;
          _this.carkind = false;
          _this.okbrand = true;
          _this.carbrand = "";
          _this.carmodel ="";
      },
    showshi(){
      this.showshiul = !this.showshiul
      this.showshengul = false
    },
    showsheng(){
        this.showshengul = !this.showshengul
        this.showshiul = false
    },
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
    sstis(pic){
      let cuno = 0;
      for(let j=0;j<this.personalcenterData.interest_pic.length;j++){
        // alert(this.personalcenterData.interest_pic[j] +"----"+pic)
        if(this.personalcenterData.interest_pic[j] === pic){
            return true
        } else {
          cuno++;
          if(cuno === this.personalcenterData.interest_pic.length){
            return false
          }

        }
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
                        "isToggle":_this.sstis(res.data[i].picture_path),
                      }
                      console.log("-s-s-s--s----"+object_interest)
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
        console.log(ins)
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
            console.log(res)
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
    citydatapc(province_id,name) {
      let _this = this;
      $.ajax({
        type: 'post',
        data: {
          province_id: province_id
        },
        url: PORSCHE_HOST + '/member/user/city',
        success: function(res) {
            console.log(res)
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.citylistdata = res.data
            _this.personalcenterData.province_id = province_id
            _this.personalcenterData.province = name
            _this.personalcenterData.city = "请选择城市"
            _this.showshengul = false
              _this.showshiul = true

          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        }
      })
    },
    chenshipc(id,name){
      console.log(id+"---"+name)
      this.personalcenterData.city_id = id
      this.personalcenterData.city = name
      this.showshiul = false
    },
    shwoupdates() {
      this.$emit('updata-user')
      this.shwoupdate = true
      this.shwoinp = false
      this.interests()

    },
    hideEdit() {
      var  myNickname = /\s{0,}[\S]{1,}[\s\S]{0,}/;
      if(!myNickname.test(this.personalcenterData.nickname)){
          alert("'昵称'不可为空!");
          return false;
      }
      var  mySurname = /^[\u4e00-\u9fa5a-zA-Z]{1,8}$/;
      if(!mySurname.test(this.personalcenterData.surname)){
          alert("'姓'不可为空并不能包含数字及特殊字符!");
          return false;
      }
      var  myFirstname = /^[\u4e00-\u9fa5a-zA-Z]{1,8}$/;
      if(!myFirstname.test(this.personalcenterData.firstname)){
          alert("'名'不可为空并不能包含数字及特殊字符!");
          return false;
      }
      var contentNo = /\s{0,}[\S]{1,}[\s\S]{0,}/;
      if(!contentNo.test(this.personalcenterData.detail_address) || this.personalcenterData.detail_address === null){
          alert("请输入邮寄地址!");
          return false;
      }

      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        //var p = /[0-9a-z]/i; var b = p.test(string);//true,说明有英文字母或数字。
      var p = /[A-Z]/;// var b = p.test(string);//true,说明有英文字母或数字。
      if(this.personalcenterData.car === undefined){
        this.personalcenterData.car_id = ""
      }else {
        this.personalcenterData.car_id = this.personalcenterData.car.toString()
      }

      if(p.test(this.personalcenterData.email)){
          this.personalcenterData.email = this.personalcenterData.email.toLowerCase();
          console.log(this.personalcenterData.email)
      }
      console.log(this.personalcenterData.brand_model)
      if(this.personalcenterData.brand_model === undefined || this.personalcenterData.brand_model === null){
          this.personalcenterData.brand_model = "";
      }else{
          this.personalcenterData.brand_model = this.personalcenterData.brand_model.toString();
      }
      if(this.personalcenterData.have_car == "N"){
          this.allcarkind = false; //整个列表的显示
          this.brandName = false; //车品牌
          this.modelName = false; //车系
          this.carkind = false; //没有找到
          this.likeul = false;  //模糊列表
          this.okbrand = false; //已选车型列表
          this.carlist = [];
          this.personalcenterData.brand_model = "";
      }
      if(!reg.test(this.personalcenterData.email)){
            alert("请输入正确 Email 格式!");
            return false;
      }else {
        this.shwoupdate = false;
        this.shwoinp = true;
        this.showshiul = false;
        this.okbrand = false;//已选车型列表
        this.likeul = false;//模糊列表
        this.carkind = false;//没有找到
        this.allcarkind = false;//整个列表的显示
        this.brandName = false; //车品牌
        this.modelName = false; //车系
        this.carlist = [];
        this.isInformation2();
        this.$emit('hide-edit', this.personalcenterData)
      }
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

.results-xz {
  background-color: #ddd;
}
.sheng {
  overflow: inherit!important;
}
.span-select {
  position: absolute;
  width: 100%;
  display: block;
  height: 200px;
}
.span-select-nr {
  background-color: #fff;
  border: 1px solid #aaa;
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100%;
  z-index: 1051;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 0px;
  overflow: hidden;
}
.span-select-nr ul{
  max-height: 200px;
  overflow-y: scroll!important;
}
.span-select-nr ul li{
  height: 26px!important;
  line-height: 26px!important;
  border-bottom: 0px !important;
  padding: 6px;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  color: #000;
}
.span-select-nr ul li:hover{
  background-color: #d5001c!important;
  color: #fff;
}
.select2-selection__arrow b {
    border-color: #888 transparent transparent;
    border-style: solid;
    border-width: 5px 4px 0;
    height: 0;
    left: 50%;
    margin-left: -4px;
    margin-top: -2px;
    position: absolute;
    top: 50%;
    width: 0;
}
.select2-selection__arrow {
    height: 26px;
    position: absolute;
    top: 1px;
    right: 1px;
    width: 20px;
}
.pc-select-nrtext {
  display: block;
  padding-left: 8px;
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 28px;
}
.pc-select {
  width: 100px;
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  position: relative;
  vertical-align: middle;
}
.pc-select-nr {
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  height: 28px;
}
.checkbox-avs {
  background: #000 !important;
  border-color: #000 !important;
}
.checkbox-avxq {
    background: #d5001c !important;
    border-color: #d5001c !important;
}
.seat-span-select {
  position: absolute;
  width: 100%;
  display: block;
  height: 190px;
}
.seat-span-select-nr {
  background-color: #fff;
  /*border: 1px solid #aaa;*/
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100%;
  z-index: 1051;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 0px;
  overflow: hidden;
}
.seat-span-left{
  width: 49%;
  display: inline-block;
  float: left;
  border:1px solid #aaa;
  border-top: none;

}

.seat-span-left ol{
  width: 20%;
  float: left;
  max-height: 190px;
  overflow-y: scroll!important;
  margin: 0px !important;
}
.seat-span-left ol li{
  height: 15px!important;
  line-height: 15px!important;
  border-bottom: 0px !important;
  padding: 6px;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  color: #000;
}
.seat-span-left ol li:hover{
  background-color: #d5001c!important;
  color: #fff;
}
.active{
  background-color: #d5001c!important;
  color: #fff !important;
}
.seat-span-left ul{
  width: 80%;
  float: left;
  max-height: 190px;
  overflow-y: scroll!important;
}
.seat-span-left ul li{
  height: inherit !important;
  line-height: inherit !important;
  border: none !important;
}
.seat-span-left ul li .listtitle{
  height: 26px!important;
  line-height: 26px!important;
  border-bottom: 0px !important;
  padding: 6px;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  color: #000;
  background: #edf2fc;
}
.seat-span-left ul li .listcon span{
  display: block;
  height: 26px!important;
  line-height: 26px!important;
  border-bottom: 0px !important;
  padding: 6px;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  color: #000;
  overflow: hidden;
}

.seat-span-left ul li .listcon span:hover{
  background-color: #d5001c!important;
  color: #fff;
}

.seat-span-right{
  width: 49%;
  display: inline-block;
  float: left;
  border-left:1px solid #aaa;
  border-right:1px solid #aaa;

}
.seat-span-right ul{
  width: 100%;
  float: left;
  max-height: 190px;
  overflow-y: scroll!important;
}
.seat-span-right ul li{
  height: 26px!important;
  line-height: 26px!important;
  border-bottom: 0px !important;
  padding: 6px;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  color: #000;
}
.seat-span-right ul li:hover{
  background-color: #d5001c!important;
  color: #fff;
}

.seat-select2-selection__arrow b {
  border-color: #888 transparent transparent;
  border-style: solid;
  border-width: 5px 4px 0;
  height: 0;
  left: 50%;
  margin-left: -4px;
  margin-top: -2px;
  position: absolute;
  top: 50%;
  width: 0;
}
.seat-select2-selection__arrow {
  height: 26px;
  position: absolute;
  top: 1px;
  right: 1px;
  width: 20px;
}
.seat-pc-select-nrtext {
  display: block;
  padding-left: 8px;
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 28px;
}
.seat-pc-select {
  width: 300px;
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  position: relative;
  vertical-align: middle;
}
.seat-pc-select-nr {
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  height: 28px;
}

.seat-span-select-nr ol::-webkit-scrollbar{/*滚动条整体样式*/
  width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 2px;
}
.seat-span-select-nr ol::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
.seat-span-select-nr ol::-webkit-scrollbar-track{/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}

/*.seat-span-left ul::-webkit-scrollbar{!*滚动条整体样式*!
  width: 2px;     !*高宽分别对应横竖滚动条的尺寸*!
  height: 2px;
}
.seat-span-left ul::-webkit-scrollbar-thumb{!*滚动条里面小方块*!
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.2);
}
.seat-span-left ul::-webkit-scrollbar-track{!*滚动条里面轨道*!
  -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}*/





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
  cursor: pointer;
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

/*.item-content ul {
  z-index: 909999999;
  overflow-y: visible!important;
  height: 200px;
}

.item-content ul li {
  line-height: 40px;
  height: 40px;
}*/

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
  margin: 0 5px!important;
}

.main-kv .register-form .row-radio-gender:first-child {
  margin-left: 0;
}

.row-radio-gender {
  margin-left: 0px;
  margin-left: 0px;
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
  clear: both;
}

.cover {
  object-fit: cover;
}

.clear {
  clear: both;
}
.baocx {
  /*line-height: 100%!important;
  height: 100%!important;*/
  overflow: inherit !important;
  /*border-bottom: 1px dashed #b5b5b5!important;*/
}
.baocx .item-header{
 /*margin-top: 10px;*/
  /*margin-bottom: 10px;*/
}
.baocx > .item-content {
 /* width: 86%;*/
  text-align: right;
}
.baocx > .item-content >label {
  /*margin-bottom: 10px;*/
}

.carbox{
 /* line-height: 100%!important;
 height: 100%!important;*/
  line-height: 50px!important;
  height: inherit!important;
  overflow: inherit !important;
  border-bottom: 1px dashed #b5b5b5!important;
}
.carul{
  margin: 0px 0px 5px 0px;
  width: 120px;
  min-height: 20px;
  border: 1px solid #b5b5b5;
}
.carul li{
  line-height: 20px !important;
  border-bottom: 1px solid #b5b5b5 !important;
  height: 20px !important;
  zoom: 1;
  clear: both;
  overflow: hidden;
  cursor: pointer;
}
.carul li:last-child{
  border: none !important;
}
.find-el{
  font-size: 24px;
  padding: 0 5px;
  cursor: pointer;
}
.find-no{
  cursor: pointer;
  color: #d5001c;
}
.find-input{
  width: 110px;
  height: 30px !important;
  border: 1px solid #b5b5b5 !important;
  text-align: left !important;
  padding-left: 5px;
  color: #8f8f8f;
  margin-right: 5px;
}
.find-car{
 /* height: 40px;
  line-height: 40px;*/
}
.carkinds{
  display: inline-block;
  min-width: 80px;
  height: 30px;
  line-height: 30px;
  position: relative;
  background: #edf2fc;
  text-align: center;
  margin: 0 5px;
  padding: 0 5px;
}
.carsubmit{
  display: inline-block;
  min-width: 40px;
  height: 30px;
  line-height: 30px;
  background: #edf2fc;
  text-align: center;
  padding: 0 5px;
  cursor: pointer;
}
.address-li,.city-li,.havecar-li{
  height: inherit!important;
  line-height: 50px!important;
}
.address-li >.address-span,
.city-li >.city-span{
  width: 60%;
  text-align: right;
}

.lscontent {
  float: left!important;
}
.lscontent input{
  line-height: 40px;
}

@media (max-width: 768px) {
  .porsche-personal-personalcenter ul li .item-header {
    margin-left: 10px;
  }
  .lscontent input{
    width: 80px!important
  }
  .porsche-personal-personalcenter ul li .item-content {

    margin-right: 10px;

  }
  .seat-pc-select {
    width:300px;
    box-sizing: border-box;
    display: inline-block;
    margin: 0;
    position: relative;
    vertical-align: middle;
  }
  .seat-span-select {
    height: 280px;
  }
  .seat-span-left ol{
    max-height: 280px;
  }
  .seat-span-left ul{
    max-height: 280px;
  }
  .seat-span-right ul{
    max-height: 280px;
  }
  .seat-span-select-nr ol li{
    padding: 6px 8px;
  }
  .seat-span-left ul li .listcon span{
    padding: 6px 1px;
  }
  .seat-span-right ul li{
    padding: 6px 1px;
  }
  .find-el{
    font-size: 24px;
    padding: 0 1px;
    cursor: pointer;
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
    line-height: 50px!important;
  }
  .baocx > .item-content {
    width: 230px;
  }
  .baocx > .item-content >label {
    width: 110px;
  }
  .address-li,.city-li{
    height: inherit!important;
    line-height: 50px!important;
  }
  .pc-select {
    width: 64px;
  }
}
</style>
