<template lang="html">
  <div class="page-agency-search">
      <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
    <div class="main-kv">
			<img alt="" class="kv-img" :src="bgshow">
			<div class="ui-content">
				<div class="md-agency">
					<div class="agency-content content-form">
						<h3 class="content-title">试驾申请</h3>
						<p class="tips block-pc">
							尊敬的挚享汇会员，如果您想试驾心仪的保时捷，只需选择您要预约的地区和时间，即可完成预约。
						</p>
						<p class="tips block-mobile">
							尊敬的挚享汇会员，<br/>
							如果您想试驾心仪的保时捷，只需选择您要预约的城市和时间，即可完成预约!。
						</p>
            <div class="select-selection">
              <select class="select-hidd" name="">
                <option value="">请选择您要预约的城市</option>
              </select>
              <span class="select-show" @click="selectshow1(spanselect1)" >
                  <span class="select-show-span" id="day1">
                    {{this.provinceval}}
                  </span>
                  <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
              </span>
              <span class="span-select" @mouseleave="spanshow1()" v-if="spanselect1">
                <span class="span-select-nr">
                  <ul>
                    <li>请选择您要预约的城市</li>
                    <li @click="offlinecenter(list.pronvince_id,list.name)"  v-for="list in provincelist">{{list.name}}</li>
                  </ul>
                </span>
              </span>
            </div>
            <div class="select-selection">
              <select class="select-hidd" name="">
                <option value="">请选择您要预约的保时捷中心</option>
              </select>
              <span class="select-show" @click="selectshow2(spanselect2)">
                  <span class="select-show-span" id="day2" >
                    {{this.centerval}}
                  </span>
                  <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
              </span>
              <span class="span-select" @mouseleave="spanshow2()" v-if="spanselect2">
                <span class="span-select-nr">
                  <ul >
                    <li>请选择您要预约的保时捷中心</li>
                    <li @click="offlinecenterthes(list.uuid,list.cn_name)" v-for="list in centerlist">{{list.cn_name}}</li>
                  </ul>
                </span>
              </span>
            </div>
            <div class="select-selection">
                  <input class="select-show" size="16" type="text"   v-model="this.datetimepickers"   id="datetimepicker">
            </div>
            <!-- <div class="center-result" v-if="this.zhongxnr != ''"><div class="md-center">
            	<div class="center-image"></div>
            	<h3>{{this.zhongxnr}}</h3>
            	<p>{{this.addressnr}}</p>
            </div></div> -->
						<p class="check">
							<label>
								<input type="checkbox" @click="checkboxthe(read)">
								我已阅读并了解
							</label>
							<strong class="btn-privacy" @click="yszc()">隐私政策</strong>
						</p>
						<!--<p class="note">
							保时捷集团或其代理机构可能会通过您提供的信息以及我们已经存储的关于您的信息联系您，包括通过邮件、电话、短消息或者传真的形式，向您介绍有关保时捷的产品和我们提供的服务信息。我们可能会在一段合理的时间内保存您的信息，以便向您提供与我们的产品和服务有关的介绍、邀请函或资讯。
						</p>-->
                        <div class="reserve-btn">
						<a class="ui-btn btn-lg btn-block btn-contact but-collan" @click="offlinecdealerapp()">我要预约试驾</a>
                        </div>
					</div>
					<div class="agency-content content-result">
						<h3 class="content-title block-pc">试驾申请</h3>
						<div class="center">
              <div class="center-result" v-if="this.zhongxnrpc != ''"><div class="md-center">
              	<div class="center-image"></div>
              	<h3>{{this.zhongxnrpc}}</h3>
              	<p>{{this.addressnrpc}}</p>
              </div></div>
						</div>
                        <p class="result-tips">我们会尽快安排保时捷中心联系您，<br>敬候您的到来！</p>
                        <div class="reserve-btn">
						<a @click="topath()" class="ui-btn btn-lg btn-block btn-confirm but-collan">我知道了</a>
                        </div>
					</div>
				</div>
			</div>
			<div class="md-privacy">
				<div class="content">
					保时捷集团或其代理机构可能会通过您提供的信息以及我们已经存储的关于您的信息联系您，包括通过邮件、电话、短消息或者传真的形式，向您介绍有关保时捷的产品和我们提供的服务信息。我们可能会在一段合理的时间内保存您的信息，以便向您提供与我们的产品和服务有关的介绍、邀请函或资讯。
					<a class="ui-icon-cross close"></a>
				</div>
			</div>

		</div>
  </div>

</template>

<script>
import {
  PORSCHE_HOST
} from '../../common/js/host';
import '../../common/css/bootstrap.css'
import '../../common/css/datetme.css'
import MobileSelect from 'mobile-select'
export default {
  components: {

  },
  data() {
    return {
      read: false,
      datetimepickers: '请选择您要预约的时间',
      zhongxnr: '',
      addressnr: '',
      zhongxnrpc: '',
      addressnrpc: '',
      provinceval: '请选择您要预约的城市',
      centerval: '请选择您要预约的保时捷中心',
      bgshow: "",
      spanselect1: false,
      spanselect2: false,
      PORSCHE_HOST,
      provincelist: [],
      centerlist: [],
      appprovincelist: [],
      appcenterlist: [],
      mobileSelect2: {},
      porsche_center_id: '',
    }
  },
  methods: {
      back(){
          let _this = this;
          _this.$router.push('/reserve');
      },
    yszc(){
      this.$alert('保时捷集团或其代理机构可能会通过您提供的信息以及我们已经存储的关于您的信息联系您，包括通过邮件、电话、短消息或者传真的形式，向您介绍有关保时捷的产品和我们提供的服务信息。我们可能会在一段合理的时间内保存您的信息，以便向您提供与我们的产品和服务有关的介绍、邀请函或资讯。', ' ', {
        confirmButtonText: '确定',
      });
    },
    topath(){
      this.$router.push('/reserve');
    },
    spanshow1 (){
      this.spanselect1 = false
    },
    spanshow2 (){
      this.spanselect2 = false
    },
    checkboxthe(lei){
      if(lei == true){
          this.read = false
      }
      if(lei == false){
          this.read = true
      }
    },
    offlinearea() {
      this.mobileSelect2 = new MobileSelect({
        trigger: '#day2',
        wheels: [{
          data: [{
            id: 1,
            value: '0'
          }]
        }],
        position: [2], //初始化定位
        callback: (dateSttr, data) => {
          _this.zhongxnr = data[0].value
          _this.zhongxnrpc = data[0].value
          _this.offlinecaddressapp(data[0].id)
        }
      });
      let _this = this;
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST + '/member/offline/area',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.provincelist = res.data
            let provincelistApp = []
            for (let i = 0; i < res.data.length; i++) {
              let arr_applist = {
                "id": res.data[i].pronvince_id,
                "value": res.data[i].name
              }
              provincelistApp.push(arr_applist)
            }
            _this.appprovincelist = provincelistApp
            const mobileSelect1 = new MobileSelect({
              trigger: '#day1',
              wheels: [{
                data: _this.appprovincelist
              }],
              position: [2], //初始化定位,
              callback: function(indexArr, data) {
                _this.offlinecenterapp(data[0].id)
              }
            });


            //console.log()

          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
    },
    offlineareapc() {

      let _this = this;
      $.ajax({
        type: 'post',
        url: PORSCHE_HOST + '/member/offline/area',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.provincelist = res.data

          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
    },
    offlinecenter(province_id, name) {
      let _this = this;
      $.ajax({
        type: 'post',
        data: {
          province_id: province_id
        },
        url: PORSCHE_HOST + '/member/offline/center',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            console.log("ididii" + JSON.stringify(res.data))
            _this.centerlist = res.data
            _this.provinceval = name
            _this.spanselect1 = false
            _this.centerval = "请选择您要查询的保时捷中心"
          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
    },
    offlinecenterthes(uuid, name) {
      this.centerval = name
      this.spanselect2 = false
      this.offlinecaddresspc(uuid, name)

    },
    offlinecenterapp(id) {
      let province_id = $(".select-show-span").attr("ids");
      let name = $(".select-show-span").html();
      let _this = this;
      $.ajax({
        type: 'post',
        data: {
          province_id: id
        },
        url: PORSCHE_HOST + '/member/offline/center',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            _this.centerlist = res.data
            _this.provinceval = name
            _this.spanselect1 = false
            _this.centerval = "请选择您要查询的保时捷中心"
            let centerelistApp = []
            for (let i = 0; i < res.data.length; i++) {
              let arr_applist = {
                "id": res.data[i].uuid,
                "value": res.data[i].cn_name
              }
              centerelistApp.push(arr_applist)
            }
            _this.appcenterlist = centerelistApp
            _this.mobileSelect2.updateWheel(0, _this.appcenterlist);

          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
    },
    offlinecdealerapp() {
      let _this = this;
      let datetimepicker = $("#datetimepicker").val();
      if (_this.read == false) {
        alert("请同意保时捷隐私政策")
        return false;
      }
      if (_this.porsche_center_id == "" || datetimepicker == "") {
        alert("请选择你要想查询信息")
        return false
      }
        console.log(_this.porsche_center_id)
        console.log(datetimepicker)
        var mydata=datetimepicker.replace(/-/g, '/');
        console.log("返回时间：" + mydata);
        var drive_time = Date.parse(new Date(mydata));
        console.log(Date.parse(new Date(datetimepicker)))
        console.log(drive_time)
        //Date.parse(new Date(datetimepicker))
      $.ajax({
        type: 'post',
        data: {
          porsche_center_id: _this.porsche_center_id,
          trial_drive_time:drive_time ,
        },
        url: PORSCHE_HOST + '/member/offline/drive',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            console.log(res.message)
            $(".content-form").css("display", "none")
            $(".content-result").css("display", "block")
            $(".center-result").css("display", "block")
          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
    },
    offlinecaddressapp(id) {
      let _this = this;
      $.ajax({
        type: 'post',
        data: {
          porsche_center_id: id
        },
        url: PORSCHE_HOST + '/member/offline/porscheaddr',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.addressnr = res.data.detail_address
            _this.addressnrpc = res.data.detail_address
            _this.porsche_center_id = id
          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
    },
    offlinecaddresspc(id, name) {
      let _this = this;
      console.log(name)
      $.ajax({
        type: 'post',
        data: {
          porsche_center_id: id
        },
        url: PORSCHE_HOST + '/member/offline/porscheaddr',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            console.log(res.data)
            _this.addressnrpc = res.data.detail_address
            _this.zhongxnrpc = name

            _this.porsche_center_id = id
          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误!")
        }
      });
    },
    selectshow1(span) {

      if (span == false) {
        this.spanselect1 = true
      } else {
        this.spanselect1 = false
      }

    },
    selectshow2(span) {
      //this.offlinecenterapp()
      if (document.body.offsetWidth > 750) {} else {
        this.mobileSelect2.show()
      }

      if (span == false) {
        this.spanselect2 = true
      } else {
        this.spanselect2 = false
      }

    },
    setswiper() {
      let l_height = $(window).height();
      let zongapp_height = parseInt(l_height) - parseInt(55);
      let zongpc_height = parseInt(l_height) - parseInt(260); //131
      if (document.body.offsetWidth > 750) {
        //$(".main-kv").height(zongpc_height)
        this.bgshow = require('../../common/image/rexervepc.jpg');
        /*if($(".main-kv").height() > 540){
          $(".kv-img").css("left", -$(".md-agency").width()/2.5 + 'px')
          $(".kv-img").height(zongpc_height)
        }else {
          $(".kv-img").css("left",'0px')
          $(".kv-img").css("width","100%")
          $(".kv-img").height(540)
          $(".main-kv").height(540)

        }*/
      } else {
        this.bgshow = require('../../common/image/rexerveapp.jpg');


      }
    },

  },
  mounted() {
    window.jQuery('#datetimepicker').datetimepicker({
      format: 'YYYY-MM-DD ',
      locale: moment.locale('zh-cn'),
      minDate: new Date()
    });
    if (document.body.offsetWidth > 750) {
      this.offlineareapc()
    } else {
      this.offlinearea()

    }
    let self = this;
    this.setswiper();
    window.onresize = function() {
      self.setswiper();
    }
  }
}
</script>

<style scoped>
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
}

.span-select-nr ul {
  max-height: 200px;
  overflow-y: auto;
}

.span-select-nr ul li {
  line-height: 1.6;
  padding: 6px;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-select: none;
  color: #000;
}

.span-select-nr ul li:hover {
  background-color: #15577e!important;
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
  height: 38px;
  position: absolute;
  top: 1px;
  right: 1px;
  width: 20px;
}

.select-hidd {
  display: none;
}

.select-selection {
  position: relative;
  margin-bottom: 30px;
    width: 30%;
    float: left;
    margin-right: 3%;
}

.select-show {
  display: block;
  border: 1px solid #a6a6a6;
  border-radius: 0;
  height: 38px;
  width: 100%;
    padding-left: 10px;
}

.select-show-span {
  display: block;
  line-height: 38px;
  color: #444;
  font-size: 14px;
  /*padding-left: 8px;*/
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.page-agency-search .ui-content {
  height: 100%;
  position: relative;
}

.agency-content {
  display: none;
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

.page-agency-search .md-agency .result-tips {
  font-size: 18px;
  text-align: center;
  margin: 30px 0!important;
}

.page-agency-search .md-agency .center {
  padding: 40px 0;
  border-bottom: 1px solid #989898;
}

.page-agency-search .md-agency .agency-content {
  padding: 40px 35px 20px;
    margin-top: -90px;
}

.ui-btn.btn-block {
  display: block;
  width: auto;
}

.ui-btn.btn-lg {
    width: 305px;
  height: 34px;
  line-height: 34px;
}

.ui-btn {
  color: #fff;
  width: 130px;
  text-align: center;
  height: 28px;
  line-height: 28px;
  background: #9a0000;
  display: inline-block;
  cursor: pointer;
  border: 0 none;
  padding: 0;
  position: relative;
}

.page-agency-search .md-agency .note {
  color: #686868;
  margin-bottom: 15px;
}

input[type=checkbox],
input[type=radio] {
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
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

.page-agency-search .md-agency .check input {
  vertical-align: middle;
  margin-top: -2px;
  margin-right: 5px;
}

.page-agency-search .md-agency .check strong {
  text-decoration: underline;
  font-weight: 400;
}

option {
  font-weight: normal;
  display: block;
  white-space: pre;
  min-height: 1.2em;
  padding: 0px 2px 1px;
}

.page-agency-search .md-agency select {
  width: 100%;
}

.select2-hidden-accessible {
  outline: none;
  display: none;
  width: 100%;
}

.block-mobile {
  display: none;
}

.page-agency-search .md-agency .tips {
  font-size: 18px;
  line-height: 26px;
  color: #000;
    margin-bottom: 20px !important;
}

.block-pc {
  display: block;
}

.page-agency-search .md-agency .content-title {
  font-size: 30px;
  font-weight: 400;
  color: #000;
  line-height: 1;
  margin-bottom: 40px;
}

.page-agency-search .md-agency .agency-content {
  padding: 40px 35px 20px;
}

.page-agency-search .md-agency .content-form {
  display: block;
}

.page-agency-search .md-agency {
  /*position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  max-width: 480px;
  width: 48%;
  background-color: #fff;*/
}

.ui-content {
  margin: 0 auto;
  width: 86%;
  max-width: 1200px;
}

.page-agency-search .ui-content {
  height: 100%;
  position: relative;
}

.page-agency-search .md-agency .center-result {
  display: none;
}

.page-agency-search .main-kv {
  position: relative;
  overflow: hidden;
  height: 720px;
  background: #ffffff;
}

.page-agency-search .main-kv img {
  /*position: absolute;*/
  max-width: none;
  width: 100%;
 /* height: 100%;*/
  object-fit: cover;
}

.page-agency-search .md-agency .note {
  line-height: 1.6
}

.page-agency-search .md-agency .check {
  color: #bbb;
  cursor: pointer;
}

.page-agency-search .md-center {
  position: relative;
  padding-left: 124px;
  margin: 0 10px;
  min-height: 65px;
}

.page-agency-search .md-center .center-image {
  /*background: url(http://www.porsche-fan.com/d23997412f1247425bb9201268a1749c.jpg) 0 0 no-repeat;*/
  background: url('http://ota3q760b.bkt.clouddn.com/porsche-svg.svg');
  background-size: 100%;
  background-repeat: no-repeat;
  width: 108px;
  height: 65px;
  position: absolute;
  left: 0;
  top: 0;
  border: 1px solid #ccc;
}

.page-agency-search .md-center h3 {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 0;
  padding-top: 5px;
  color: #000;
  margin: 0 0 5px;
}

.page-agency-search .md-center p {
  font-size: 12px;
  color: #686868;
  margin-top: 0;
  margin: 0 0 5px;
  padding: 0;
  line-height: 1.6
}
.ui-btn:hover {
  background: #d5001c!important;
}
.reserve-btn {
    padding: 20px 0 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}
@media (max-width: 768px) {
  .span-select {
    display: none;
  }
    .select-selection {
        position: relative;
        margin-bottom: 15px;
        width: 100%;

    }
    .block-mobile{
        display: block;
    }
    .block-pc{
        display: none;
    }
    .page-agency-search .main-kv {
        height: 550px;
    }
  .page-agency-search .md-agency .center-result .md-center {
    margin: 0 0 20px;
  }
  .page-agency-search .md-agency .note {
    display: none;
  }
  .page-agency-search .main-kv img {
    position: relative;
    width: 100%;
  }
  .ui-content {
    width: auto;
    margin: 0 15px!important;
  }
  .page-agency-search .md-agency {
    position: relative;
    max-width: 10000px;
    width: auto;
    background: none;
  }
  .page-agency-search .md-agency .tips {
    font-size: 12px;
    margin-bottom: 20px !important;
  }
  .page-agency-search .md-agency .agency-content {
    padding: 0 20px 20px;
    margin-top: -25px;
  }
  .page-agency-search .md-agency .content-title {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .page-agency-search .md-agency .ui-select-mobile {
    border: 1px solid #c1c1c1;
    height: 30px;
    margin-bottom: 20px;
  }
  .page-agency-search .md-agency .center-result {
    display: block;
  }
  .select-show-span {
    font-size: 12px;
  }
  .page-agency-search .md-agency .check {
    font-size: 12px;
    display: block;
    margin-bottom: 15px;
    color: #bbb;
    cursor: pointer;
  }
  .page-agency-search .md-agency .check input {
    width: 12px;
    height: 12px;
  }
  .page-agency-search .md-agency .content-title {
   /* color: #fff;*/
  }
  .page-agency-search .md-agency .result-tips {
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
