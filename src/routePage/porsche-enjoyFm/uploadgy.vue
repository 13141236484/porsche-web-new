<template lang="html">
  <div class="porsche-upload">
      <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
      <!--头部-->
      <div class="porsche-upload-top">
          <div class="porsche-upload-topimg">
            <div class="nrpxinx-img">
                <img class="cover"  id="enjoyFmshare-top-nrimgid" style="width: 100%;height:100%"  :src="this.avatar != 'null' && this.avatar != ''?PORSCHE_HOST+this.avatar:require('../../common/image/180126.jpg')" alt="">
            </div>
            <h3>{{showtext(this.num)}}</h3>
            <div class="nrpxinx-btn app-nrpxinx" v-if="uploadcontainer">
              <div class="parsche-login-btn">
                <div class="main-btn" @click="share()">发 送</div>
              </div>
            </div>
            <div class="nrpxinx-btn app-nrpxinx" v-if="!uploadcontainer">
              <div class="parsche-login-btn">
                <div class="main-btn" style="background:#afb1b2" >已发送</div>
              </div>
            </div>
          </div>
          <div class="clear"></div>
      </div>
      <!--pc端-->
      <div class="show-pc" v-if="showpc">
          <!--v-if="num !== 'PROJECTION'"-->
        <div class="porsche-upload-container" v-show="uploadcontainer" >
            <div class="wrapper" style="height:300px;clear:both;" v-show="wrapperSHow">
                <vueCropper
                        ref="cropper"
                        :img="example2.img"
                        :outputSize="example2.size"
                        :outputType="example2.outputType"
                        :info="example2.info"
                        :autoCrop="example2.autoCrop"
                        :canScale="example2.canScale"
                        :fixedBox="example2.fixedBox"
                        :full="example2.full"
                        :autoCropWidth="example2.autoCropWidth"
                        :autoCropHeight="example2.autoCropHeight"
                        @realTime="realTime"
                >
                </vueCropper>
            </div>
            <div style="text-align: center;padding:2px 0;" v-show="confirmCover">
                <el-button size="mini" @click="coverdown()" plain>确认上传</el-button>
            </div>
            <div style="text-align: center;padding:2px 0;" v-show="ConfirmUpload">
                <el-button size="mini" @click="down()" plain>确认上传</el-button>
            </div>
          <div class="porsche-upload-containerdiv">
            <div class="upload-container">
                <div class="upload-container-tjfm">
                    <span class="span-nrj" v-if="spannrj">添加封面
                      <input @change="uploadCover($event)" id="fileUpload" type="file" accept="image/*" name="file" title="未选择任何图片"/>
                    </span>
                    <div class="img-nrj" v-if="imgnrj" :id="coverid">
                      <img width="100%" class="cover"  :src="PORSCHE_HOST+imgSrc" alt="" @click="covershow(coverid)">
                    </div>
                    <i class="el-icon-circle-close" v-if="deletecover" @click=delectCover() style="position:absolute;top:-20px;right:-20px;font-size:20px;cursor:pointer;"></i>
                </div>
            </div>
            <div class="upload-container-title">
                <!--v-model="title"-->
                <input type="text" v-model="uploadTitle" placeholder="标题(最多可输入20个字)" name="title" title="未选择任何图片" maxlength="20">
            </div>
          </div>
        </div>

        <div class="porsche-upload-container" v-show="uploadcontainer">
          <div class="porsche-upload-containerdiv" :id="list.id" v-for="(list,key) in uploadcontainerlist" style="width:260px;float:left;">
            <div class="upload-container upload-container-zw">
                <div class="upload-container-tjfm" style="width:260px">
                    <span class="span-nrj" v-if="spannrj">添加封面
                      <input @change="uploadImg($event, key)"  id="fileUpload" type="file" accept="image/*" name="file" title="未选择任何图片"/>
                    </span>
                    <div class="img-nrj" v-if="imgnrj">
                      <img width="100%" class="cover" :neme="key"  :src="PORSCHE_HOST+list.imgpic" alt="" @click="imagesshow(list.id, PORSCHE_HOST+list.imgpic)">
                    </div>
                    <i class="el-icon-circle-close" v-show="list.id" @click=delectimgpc(list.id) style="position:absolute;top:-20px;right:-20px;font-size:20px;cursor:pointer;"></i>
                </div>
            </div>
          </div>

          <div class="upload-btns" style="clear:both;">
              <div class="upload-btns-ba" @click="addcontainer()">
                <div class="upload-btns-center">
                  <h5>+</h5>
                  <h6>继续添加</h6>
                </div>
              </div>
          </div>
          <!--<div class="upload-container-title">
          <input type="text" placeholder="标题(最多可输入200个字)" name="title" style="background: white;" v-model="uploadTitle" maxlength="20">
          </div>-->
          <div class="upload-container-title upload-container-titlezw">
                    <!-- <h5>正文</h5> -->
                    <textarea  name="name" placeholder="正文" v-model="BodyText" rows="5" cols="100" ></textarea>
                </div>
          <div class="nrpxinx-btn pc-nrpxinx">
            <div class="parsche-login-btn">
              <div class="main-btn pc-mainupload" @click="share()">发 送</div>
            </div>
          </div>
        </div>

      </div>
      <!--mob端-->
      <div class="show-app" v-if="showapp">
        <div class="porsche-upload-container">
            <!--v-if="num !== 'PROJECTION'"-->
          <div class="porsche-upload-container" v-show="uploadcontainer" >

              <div class="wrapper" style="height:300px;clear:both;" v-show="wrapperSHow">
                  <vueCropper
                          ref="cropper"
                          :img="example2.img"
                          :outputSize="example2.size"
                          :outputType="example2.outputType"
                          :info="example2.info"
                          :autoCrop="example2.autoCrop"
                          :canScale="example2.canScale"
                          :fixedBox="example2.fixedBox"
                          :full="example2.full"
                          :autoCropWidth="example2.autoCropWidth"
                          :autoCropHeight="example2.autoCropHeight"
                          @realTime="realTime"
                  >
                  </vueCropper>
              </div>
              <div style="text-align: center;padding:2px 0;" v-show="confirmCover">
                  <el-button size="mini" @click="coverdown()" plain>确认上传</el-button>
              </div>
              <div style="text-align: center;padding:2px 0;" v-show="ConfirmUpload">
                  <el-button size="mini" @click="down()" plain>确认上传</el-button>
              </div>
              <div class="upload-container">
                  <div class="upload-container-tjfm">
                      <span class="span-nrj" v-if="spannrj">添加封面
                         <!-- filesChange-->
                        <input @change="uploadCover($event)" id="fileUpload" type="file" accept="image/*" name="file" title="未选择任何图片"/>
                      </span>
                      <div class="img-nrj" v-if="imgnrj" :id="coverid">
                        <img width="100%" class="cover" :src="PORSCHE_HOST+imgSrc" alt="" @click="covershow(coverid)">
                      </div>
                      <i class="el-icon-circle-close" v-if="deletecover" @click=delectCover() style="position:absolute;top:-10px;right:-10px;font-size:20px;cursor:pointer;"></i>
                  </div>
              </div>
              <div class="upload-container-title">
                  <!--v-model="title"-->
                  <input type="text" v-model="uploadTitle" placeholder="标题(最多可输入20个字)"   name="title" maxlength="20">
              </div>
          </div>
          <div class="porsche-upload-container" v-show="uploadcontainer">
            <div class="porsche-upload-containerdiv upload-container-tjfmapp">
              <template v-for="(list,key) in uploadcontainerlist" v-if="list.imgpic != ''">
                <div :style="comentHeight" class="comment-images-container image-item" :id="list.id" v-if="list.imgpic != '' " :class="{'checkeds':list.active,'btn-arrow':list.active && key <= 3, 'btn-arrows':list.active && key > 3}">
                  <span>
                      <img width="100%"  class="cover lazy " style="display: inline;" :neme="key"  :src="PORSCHE_HOST+list.imgpic" alt="" @click="imagesshow(list.id, PORSCHE_HOST+list.imgpic)">
                  </span>

                  <input type="hidden" name="" v-model="indexUP">
                  <i class="el-icon-circle-close" v-show="list.imgpic" @click=delectimgapp(list.id) style="position:absolute;top:-10px;right:-10px;font-size:20px;cursor:pointer;"></i>
                </div>
                <!-- <div class="image-item jia-add" :style="comentHeight" @click="" v-if="uploadcontainerlist.length <=3">
                  <i class="iconfont icon-jia">
                    <input @change="filesChangeapp()" id="fileUploadapp" type="file" accept="image/*" name="file"/>
                  </i>
                </div> -->

              </template>
              <div class="image-item jia-add" :style="comentHeight" @click="" >
                <i class="iconfont icon-jia">
                  <input @change="filesChangeapp($event)" id="fileUploadapp" type="file" accept="image/*" name="file" title="未选择任何图片"/>
                </i>
              </div>

            <!--<div class="upload-container-title">
                <input type="text" name="title" placeholder="标题(最多可输入20个字)" style="background: white;" v-model="uploadTitle" maxlength="20">
            </div>-->
            <div class="upload-container-title upload-container-titlezw upload-container-title-appa ">
                <textarea  name="name" placeholder="正文" v-model="BodyText"  rows="5" cols="100"></textarea>
            </div>
              <div class="clear"></div>
              <div class="text-wenben">
                <div class="text-wenben1">
                  <h3>{{textwenben}}</h3>
                </div>
                  <div class="text-wenben1" style="padding:0;">
                      <h3>裁剪的图片必须不能有透明边</h3>
                  </div>
                <div class="text-wenben2">
                  <h3>{{textwenbenjx}}</h3>
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="nrpxinx-btn pc-nrpxinx">
              <div class="parsche-login-btn">
                <div class="main-btn pc-mainupload" @click="share()">发 送</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="porsche-upload-containerOK" v-show="!uploadcontainer">
          <div class="upload-containerOK">
            <p >挚享汇小编已收到你的心声，正在加急审核～～请在个人中心查看投稿审核进度，你的每一句话，挚享汇都将侧耳旁听，期待继续听到你的声音！</p>
          </div>
          <div class="nrpxinx-btn">
            <div class="parsche-login-btn">
              <div class="main-btn" style="width:300px;" ><router-link  :to="{ path: '/personal/participate'}" >查看个人中心</router-link ></div>
            </div>
          </div>
      </div>

  </div>

</template>
<script>
import {
  PORSCHE_HOST
} from '../../common/js/host';
import vueCropper from 'vue-cropper'
import Viewer from 'viewerjs';
import  'viewerjs/dist/viewer.min.css';
export default {
  components: {
    vueCropper
  },
  data() {

    return {
      coverid:"",
      textwenbenjx:"",
      textwenben:"点击+添加图片",
      selectId:'',
      showthe:false,
      PORSCHE_HOST,
      showapp: false,
      showtextareams: false,
      deletecover:false,
      showpc: false,
      indexUP: 0,
      comentHeight: {},
      uploadcontainerlist: [{
        id: 1,
        imgpic: '',
        active:false
      }],
      spannrj: true,
      imgnrj: true,
      uploadcontainer: true,
      avatar: '',
      imgSrc: [],
      picData: [],
      num: '',
      title: '',
      content: '',
      picture_path: '',
      showtextdata: {

        "PROJECTION": "光影视界",
        "TRACK": "燃情驾驶",
        "MODELSTREET": "挚爱模型",
          "DREAMSAIL":"梦想起航",
      },
      // 新的接口数据
      // pc端
      example2: {
        img: '',
        info: true,
        /* size: 1,
        outputType: 'png',*/
        size: 0.8,
        outputType: 'jpeg',
        autoCrop: true,
        autoCropWidth: 250,
        autoCropHeight: 150,
        fixedBox: true,
        canScale:true,
        full: true
      },
      downImg: '#',
      wrapperSHow: false,
      ConfirmUpload: false,
      confirmCover:false,
      previews: {},
      ids: '',
      BodyText: '',
      uploadTitle: ''
    }
  },
  methods: {
    /****新加的裁剪图片的事件*/
    realTime (data) {
      this.previews = data
    },
      //封面上传
    uploadCover (e) {
      let _this = this
      // _this.ids = ids
      //上传图片
      // this.option.img
      //var file = e.target.files[0]
      var file = e.target.files[0] ||e.dataTransfer.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
      }
      // 判断文件大小限制
      if (file.size > 5242880) {
          alert('您选择的图片过大，请选择5MB以内的图片！')
          return;
      }
      _this.wrapperSHow = true
      _this.confirmCover = true
      var reader = new FileReader()
      reader.readAsDataURL(file)
      //reader.readAsArrayBuffer(file)
      reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
              console.log(e.target.result)
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL(new Blob([e.target.result]))
              let img = new Image()
              img.src = data;
              console.log(data.length);
              img.onload = function () {
                data = _this.compress(img);
              }
          } else {
              console.log(1)
              data = e.target.result
              console.log(data)
              let img = new Image()
              img.src = data;
              console.log(data.length);
              img.onload = function () {
                data = _this.compress(img);
                _this.example2.img = data
                // _this.filepath(_this.dataURLtoFile(data, 'file'), ids)
              }
          }
         // _this.example2.img = data

      }

      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      //reader.readAsArrayBuffer(file)
      //reader.readAsArrayBuffer(file)
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      let initSize = img.src.length;
      let width = 1080;
      canvas.width = width;
      canvas.height = width * (img.height / img.width);
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.5);
       //console.log("*******压缩后的图片大小*******");
      console.log(ndata)
      console.log(ndata.length);
      return ndata;
    },
    //预览封面
    covershow(index){
        var viewer;
        viewer = new Viewer(document.getElementById(index),{toolbar:false,title:false,
            hidden:function(){
                viewer.destroy();
            }
        });
     /* var viewer;
      console.log(idc)
      console.log(index)
      viewer = new Viewer(document.getElementById(idc),{
          toolbar:false,
          title:false,
          url: index,
          hidden:function(){
              viewer.destroy();
          }
      });*/
  },
 // pc端点击封面图片进行删除
  delectCover () {
      this.imgSrc = "";
      this.deletecover = false;
      this.picData.splice(0,this.picData.length);
      console.log(this.picData)
      let filecon = document.getElementById("fileUpload");
      filecon.value="";
      //$("#fileUpload").val("");
  },
  // 确认上传
  coverdown () {
    this.$refs.cropper.getCropData((data) => {
      this.filepathcover(this.dataURLtoFile(data, 'file'))
      console.log(this.uploadcontainerlist)
      this.wrapperSHow = false
      this.confirmCover = false
      this.deletecover = true

    })
  },
// 图片路径
  filepathcover(file) {
      console.log(file)
      let _this = this;
      let formData = new FormData();
      formData.append('file', file);
      $.ajax({
          type: 'post',
          cache: false,
          processData: false,
          contentType: false,
          data: formData,
          url: PORSCHE_HOST + '/fileupload',
          success: function (res) {
              if (res.code === "1004") {
                  _this.$router.push('/login');
                  return;
              }
              _this.imgSrc = res.data.picture_path;
              _this.coverid = 'coverid';
              _this.picData.push(res.data.picture_path);
              console.log("pic" + _this.picData)
              if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
                  alert(res.message);
                  return false;
              }
          },
          error: function (res) {
              console.log("网络连接错误ss!")
          }
      });

  },

    // pc 端选择图片
    uploadImg (e, ids) {
      let _this = this
      // _this.ids = ids
      //上传图片
      // this.option.img
      //var file = e.target.files[0]
       var file = e.target.files[0] ||e.dataTransfer.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      // 判断文件大小限制
      if (file.size > 5242880) {
        alert('您选择的图片过大，请选择5MB以内的图片！')
        return;
      }
      _this.wrapperSHow = true
      _this.ConfirmUpload = true
      var reader = new FileReader()
      //reader.readAsDataURL(file)
      //reader.readAsArrayBuffer(file)
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          console.log(e.target.result)
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
          /*let img = new Image()
          img.src = data;
          console.log(data.length);
          img.onload = function () {
            data = _this.compress(img);
          }*/
        } else {
          console.log(1)
          data = e.target.result
          /*console.log(data)
          let img = new Image()
          img.src = data;
          console.log(data.length);
          img.onload = function () {
            data = _this.compress(img);
            _this.example2.img = data
            // _this.filepath(_this.dataURLtoFile(data, 'file'), ids)
          }*/
        }
          _this.example2.img = data
          _this.ids = ids

      }

      // 转化为base64
        // reader.readAsDataURL(file)
      // 转化为blob
        reader.readAsArrayBuffer(file)
//      reader.readAsArrayBuffer(file)
    },
    // 压缩图片
   /* compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      let initSize = img.src.length;
      let width = 1080;
      canvas.width = width;
      canvas.height = width * (img.height / img.width);
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.5);
      //console.log("*******压缩后的图片大小*******");
      console.log(ndata)
      console.log(ndata.length);
      return ndata;
      },*/


    // 确认上传
    down () {
      this.$refs.cropper.getCropData((data) => {
        this.filepath(this.dataURLtoFile(data, 'file'), this.ids)
        console.log(this.uploadcontainerlist)
        this.ConfirmUpload = false
        this.wrapperSHow = false
      })
    },
    // 预览
    imagesshow(id, index){
      var viewer;
      viewer = new Viewer(document.getElementById(id),{
        toolbar:false,
        title:false,
        url: index,
        hidden:function(){
          viewer.destroy();
        }
      });
    },
    // 图片64位码转成file格式
    dataURLtoFile (dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    },
    // 正文空格,换行,转换
    strVlaue (strValue){
      return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
    },
    /****新加的裁剪图片的事件*/
      back(){
          let _this = this;
          _this.$router.push('/shadow');
      },
    // pc端继续添加
    addcontainer() {
      if(this.uploadcontainerlist.length >7){
        alert("最多上传8张！")
        return false
      }
      let ids = this.uploadcontainerlist.length + 1
      this.uploadcontainerlist.push({
        id: ids,
        imgpic: '',
        active:false
      })
    },
    showtext(ins) {
      return this.showtextdata[ins]
    },
    delectimg(index) {
      console.log(index)
      this.uploadcontainerlist.splice(index, 1);
    },
    // pc端点击当前图片进行删除
    delectimgpc (index) {
      let list = this.uploadcontainerlist;
      for (let i = 0; i < list.length; i++) {
        if (index === list[i].id) {
          this.uploadcontainerlist.splice(i, 1)
        }
      }
    },
    // mob 端点击当前图片进行删除
    delectimgapp(index) {
      let list = this.uploadcontainerlist;
      for (let i = 0; i < list.length; i++) {
        if (index === list[i].id) {
          this.uploadcontainerlist.splice(i, 1)
        }
      }
    },
    // mob端点击上传
    filesChangeapp(e) {
      const self = this
      console.log(self.uploadcontainerlist)
      if(self.uploadcontainerlist.length >7){
        alert("最多上传8张！")
        return false
      }
      if(self.uploadcontainerlist.length >0){
        self.textwenben = "点击当前图片可删除"
        self.textwenbenjx = "点击+继续添加图片(最多添加八张)"
      }
      // self.uploadcontainerlist = []
      if (self.uploadcontainerlist.length === 0) {
        self.uploadcontainerlist.push({
          id: 1,
          imgpic: '',
          active:false
        })
      }else if (self.uploadcontainerlist[0].imgpic !== '') {
        var ids = self.uploadcontainerlist.length + 1
        self.uploadcontainerlist.push({
          id: ids,
          imgpic: '',
          active:false
        })
      }


      self.ids = parseInt(self.uploadcontainerlist.length - 1)
      //上传图片
      // this.option.img
      // var file = e.target.files[0]
      var file = e.target.files[0] ||e.dataTransfer.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      // 判断文件大小限制
      if (file.size > 5242880) {
        alert('您选择的图片过大，请选择5MB以内的图片！')
        return;
      }
      self.wrapperSHow = true
      self.ConfirmUpload = true
      var reader = new FileReader()
      //reader.readAsDataURL(file)
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          //console.log(e.target.result)
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
          /*let img = new Image()
          img.src = data;
          console.log(data.length);
          img.onload = function () {
            data = self.compress(img);
          }*/
        } else {
         // console.log(1)
          data = e.target.result
            /*console.log(data)
            let img = new Image()
            img.src = data;
            console.log(data.length);
            img.onload = function () {
              data = self.compress(img);
              self.example2.img = data
              // _this.filepath(_this.dataURLtoFile(data, 'file'), ids)
            }*/
        }
          self.example2.img = data

      }
        reader.readAsArrayBuffer(file)
      // reader.readAsArrayBuffer(file)
      },
    // 图片路径
    filepath(file, ids) {
      console.log(file)
      let _this = this;
      let formData = new FormData();
      formData.append('file', file);
      $.ajax({
        type: 'post',
        cache: false,
        processData: false,
        contentType: false,
        data: formData,
        url: PORSCHE_HOST + '/fileupload',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          console.log("file" + JSON.stringify(_this.uploadcontainerlist));
          // _this.picData.push(res.data.picture_path)
          _this.uploadcontainerlist[ids].imgpic = res.data.picture_path
            console.log(_this.uploadcontainerlist[ids].imgpic)
          //_this.imgwidthheight()
          console.log("pic" + _this.picData)
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        },
        error: function(res) {
          console.log("网络连接错误ss!")
        }
      });
    },
    // 发送
    share() {
      let _this = this;
      let contentNo = /\s{0,}[\S]{1,}[\s\S]{0,}/;
      if(_this.picData.toString() === ""){
        alert("封面不能为空")
        return false;
      }
      if( _this.uploadTitle === ""){
        alert("标题不能为空")
        return false;
      }
     /* alert(_this.uploadcontainerlist.length)*/
        if(_this.uploadcontainerlist.length == 0){
            alert("图片不能为空")
            return false;
        }
      for(let i=0;i<_this.uploadcontainerlist.length;i++){
        if(_this.uploadcontainerlist[i].imgpic === ""){
            alert("图片不能为空")
            return false;
        }
      }
      if(this.strVlaue(_this.BodyText) === ""){
        alert("正文不能为空")
        return false;
      }
      $.ajax({
        type: 'post',
        data: {
          title:  _this.uploadTitle,
          content: JSON.stringify(_this.uploadcontainerlist),
          picture_path: _this.picData.toString(),
          type: _this.num,
          body_text: _this.strVlaue(_this.BodyText)
        },
        url: PORSCHE_HOST + '/member/show/share/add',
        success: function(res) {
          if (res.code === "1004") {
            _this.$router.push('/login');
            return;
          }
          if (res.code === "1001") {
            alert(res.message)
            _this.uploadcontainer = false
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
    imgwidthheight() {
      let containerwidth = $(".porsche-upload-containerdiv").width()
      let zonghe = (containerwidth / 4) - 9.5
      this.comentHeight = {
        width: zonghe + 'px',
        height: zonghe + 'px',
        lineHeight: zonghe + 'px',
      }
    }
  },
  mounted() {
    console.log(this.uploadcontainerlist)
    this.num = this.$route.params.num
    this.avatar = localStorage.getItem("avatar")
    // this.titles()
    if (document.body.offsetWidth > 750) {
      this.showpc = true
    } else {
      let _this = this
      this.showapp = true
      window.onload = function() {
        _this.imgwidthheight()
      }
    }
    this.imgwidthheight()

  }
}
</script>
<style scoped>
.clear {
  clear: both;
}

.upload-container-title input {
  width: 100%;
  margin-top: 10px;
  height: 30px;
  background: #eff0f1;
  border: 0px;
  border-bottom: 1px solid #dcdcdc;
  outline: none;
  font-size: 22px;
  color: #000;
}

.upload-container-title textarea {
  width: 100%;
  margin-top: 20px;
  border: 0px;
  outline: none;
  background: #eff0f1;
  font-size: 16px;
  resize: none;
  line-height: 33px;
}

.row {
  margin: 15px 0px;
}

.upload-container-title {
 /* margin: 30px 0px 15px 0px;*/
    margin: 10px 0;
}

.upload-container-title h2 {
  font-size: 22px;
  color: #000;
}

.upload-container-title h5 {
  font-size: 16px;
  color: #000;
}

.img-box {
  width: 80px;
  height: 80px;
  display: flex;
}

.img-nrj {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /*display: flex;*/
}

#fileUpload {
  position: absolute;
  left: 0;
  top: 20px;
  opacity: 0;
  height: 25px;
  width: 120px;
    cursor: pointer;
}

.cover {
  object-fit: cover;
}

.span-nrj {
  /*position: relative;*/
  color: #a3a3a3;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 22px;
  transform: translate(-50%, -50%);
}

.span-nrj::before {
  content: "+";
  font-size: 50px;
  font-weight: 100;
  position: relative;
  top: 7px;
  left: -5px;
  color: #a3a3a3;
}

.pc-nrpxinx {
  width: 100%;
  display: flex!important;
  justify-content: center;
  align-items: center;
}

.app-nrpxinx {
  visibility: hidden;
}

.upload-container-tjfm {
  /*display: flex;
  justify-content: center;
  align-items: center;*/
  height: 280px;
  background: #ffffff;
  position: relative;
}

.porsche-upload-containerOK {
  max-width: 310px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 170px;
  line-height: 22px;
}

.porsche-upload-containerOK p {
  margin-bottom: 50px!important;
  color: #a3a3a3;
}

.porsche-upload-container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 35px;
  margin-bottom: 20px;
}

.porsche-upload-containerdiv {
  padding: 20px;
  margin-bottom: 10px;
  background: #eff0f1;
}

.upload-container {
  width: 100%;
  height: 280px;
  border: 1px dashed #959595;
}

.main-btn {
  width: 60px;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  background: #313639;
}

.pc-mainupload {
  width: 150px;
  background: #313639;
}

.nrpxinx-btn {
  display: inline-block;
  margin-left: auto;
}

.clear {
  clear: both;
}

.porsche-upload-topimg h3 {
  font-size: 20px;
  color: #000;
    float: left;
    margin-left: 500px;
  /*display: inline-block;*/
}

.porsche-upload-topimg {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  /*display: flex;
  justify-content: center;
  align-items: center;*/
}

.porsche-upload {
  position: relative;
}

.nrpxinx-img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
    /*margin-right: auto;
    display: inline-block;*/
    float: left;
    margin: 15px 0px;
}

.porsche-upload-top {
  position: relative;
  background: #dcdcdc;
  width: 100%;
  //padding: 15px 0;
    height: 80px;
    line-height: 80px;
}

.upload-container-zw {
  border: 0px;
  display: flex;
}

.upload-container-titlezw {
  /*margin-left: 30px;*/
}

.upload-btns {
  margin-top: 10px;
}

.upload-btns-ba {
  background: #626669;
  width: 65px;
  height: 65px;
  font-weight: 200;
  color: #fff;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.upload-btns-ba:hover {
  background: #d5001c;
}

.upload-btns-ba h5 {
  font-size: 24px;
}

.upload-btns-center {
  text-align: center;
    cursor: pointer;
}

@media (max-width: 768px) {
  .porsche-upload-topimg {
    margin-left: 15px;
    margin-right: 15px;
  }
  .jia-add {
    float: left;
    display: block!important;
  }
  .upload-container-tjfm,
  .upload-container {
    height: 150px;
  }
  .porsche-upload-container {
    margin-left: 15px;
    margin-right: 15px;
  }
  .span-nrj {
    font-size: 18px;
  }
  .span-nrj::before {
    font-size: 40px;
    top: 6px;
    left: -5px;
  }
    .porsche-upload-topimg h3 {
        font-size: 20px;
        color: #000;
        /* display: inline-block; */
        float: left;
        padding-left: 30px;
        margin: 0px;
    }
  .pc-nrpxinx {
    display: none!important;
  }
  .app-nrpxinx {
    visibility: visible;
      float: right;
      margin: 22px 0;
  }
  .upload-container-title input {
    background: #fff;
  }
  .upload-container-title textarea {
    border-top: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
    background: #ffffff;
  }
  .upload-container-titlezw {
    margin-left: 0px;
  }
  .img-nrjapp {
    width: 20%;
    height: 100%;
    object-fit: cover;
  }
  .image-item {
    display: inline-block;
    color: #a3a3a3;
    background: #fff;
    width: 65px;
    height: 65px;
    vertical-align: middle;
    text-align: center;
    font-size: 10px;
    /*overflow: hidden;*/
    margin-bottom: 3px;
    position: relative;
    margin-right: 11px;
    margin-bottom: 11px;
  }

  #fileUploadapp {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
  }
  .jia-add {
    line-height: 65px;
    text-align: center;
    border: 1px dashed #838687;
  }
  .porsche-upload-containerdiv {
    padding: 0px;
    margin-bottom: 5px;
    background: #ffffff;
    position: relative;
    width: 100%;
    float: left;
  }

  .upload-container-tjfmapp>.comment-images-container:nth-of-type(4)
   {
    margin-right: 0px;
  }

  .upload-container-title textarea {
    margin-top: 10px;
      margin-bottom:  10px;
      width: 97%;
  }
  .btn-arrow:before {
    content: "";
    border: 8px solid transparent;
    width: 0;
    height: 0;
    display:block;
    border-bottom-color: #ea0d0d;
    position: absolute;
    right:calc(50% - 8px);
    top: 110%;
  }
  .btn-arrows:before {
    content: "";
    border: 8px solid transparent;
    width: 0;
    height: 0;
    display:block;
    border-top-color: #ea0d0d;
    position: absolute;
    right:calc(50% - 8px);
    top: -42%;
  }
  .comment-images-container {
    float: left;
  }
  .jia-add {
    float: left;
    display: block!important;
    margin-right: 0px;
  }
  .checkeds {
    border: 2px solid #d5001c;
    margin-right: 10px;
  }
  .text-wenben {
    border: 1px dashed #838687;
  }
  .text-wenben1 {
    width: 100%;
    color: #000;
    padding:  50px 0 0px  0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #838687;
  }
  .text-wenben2 {
    width: 100%;
    color: #000;
    padding:0px 0  50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
      color: #838687;
  }
}
</style>
