<template lang="html">
  <div class="porsche-upload">
      <div class="porsche-upload-top">
          <div class="porsche-upload-topimg">
            <div class="nrpxinx-img">
                <img class="cover"  id="enjoyFmshare-top-nrimgid" style="width: 100%;height:100%"  :src="this.avatar != 'null' && this.avatar != ''?PORSCHE_HOST+this.avatar:require('../../common/image/75b958ec5265e7e9c015b098e93862fa.jpg')" alt="">
            </div>
            <h3>{{showtext(this.num)}}</h3>
            <div class="nrpxinx-btn app-nrpxinx" v-if="uploadcontainer">
              <div class="parsche-login-btn">
                <div class="main-btn" @click="share()">发 送</div>
              </div>
            </div>
            <div class="nrpxinx-btn" v-if="!uploadcontainer">
              <div class="parsche-login-btn">
                <div class="main-btn" style="background:#afb1b2" >已发送</div>
              </div>
            </div>
          </div>
          <div class="clear"></div>
      </div>
      <div class="porsche-upload-container" v-show="uploadcontainer">
          <div class="upload-container">
              <div class="upload-container-tjfm">
                  <span class="span-nrj" v-if="spannrj">添加封面
                    <input @change="filesChange" id="fileUpload" type="file" accept="image/png,image/jpeg" name="file"/>
                  </span>
                  <div class="img-nrj" v-if="imgnrj">
                    <img width="100%" class="cover" :neme="index" @click="delectimg(index)" v-for="(img,index) in imgSrc" :src="img" alt="">
                  </div>
              </div>
          </div>
          <div class="row" v-if="imgSrc != ''">
      			<div class="img-box" >
      				<img width="100%" class="cover" :neme="index" @click="delectimg(index)" v-for="(img,index) in imgSrc" :src="img" alt="">
      			</div>
      		</div>
          <div class="upload-container-title">
              <!-- <h2>标题</h2> -->
              <input type="text" v-model="title"   name="title" @focus='titleh()' @blur='titles()'>
          </div>
          <div class="upload-container-title">
              <h5>正文</h5>
              <textarea  name="name" v-model="content" rows="8" cols="80"></textarea>
          </div>
          <div class="nrpxinx-btn pc-nrpxinx">
            <div class="parsche-login-btn">
              <div class="main-btn pc-mainupload" @click="share()">发 送</div>
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
import {PORSCHE_HOST} from '../../common/js/host';
export default {
  components: {

  },
  data() {
    return {
      PORSCHE_HOST,
      spannrj:true,
      imgnrj:false,
      uploadcontainer:true,
      avatar:'',
      imgSrc:[],
      picData:[],
      num:'',
      title:'标题',
      content:'',
      picture_path:'',
      showtextdata:{
        "PROJECTION":"光影放映厅",
        "TRACK":"燃情赛道",
        "MODELSTREET":"挚爱911模型街道",
      }

    }
  },
  methods: {
    titleh(){
      if(this.title == '标题'){
        this.title = ''
      }
    },
    titles(){
      if(this.title == ''){
        this.title = '标题'
      }
    },
    showtext(ins){
      return this.showtextdata[ins]
    },
    delectimg(index){
        console.log(index)
        this.imgSrc.splice(index,1);
        this.picData.splice(index,1);
        this.imgnrj = false
        this.spannrj = true
    },
    filesChange(e){
      self=this;
      let file = e.target.files[0];
      let reader = new window.FileReader()
      reader.readAsDataURL(file)

      reader.onload = function (e) {
        //计算图片的宽高比例大小
        let data = e.target.result;
        let image = new Image();
        image.src=data;
        image.onload=function(){
            self.imgSrc.push(data)
            console.log(self.imgSrc)
            self.imgnrj = true
            self.spannrj = false
            self.filepath(file)
        }
      }
    },
    filepath(file){
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
              url: PORSCHE_HOST+'/fileupload',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                  console.log("file"+res.data.picture_path);
                  _this.picData.push(res.data.picture_path)
                  console.log("pic"+_this.picData)
                  if(res.code === "1002" || res.code === "1003" || res.code === "1009") {
                    alert(res.message);
                    return false;
                  }
              },
              error: function (res) {
                  console.log("网络连接错误ss!")
              }
          });
    },
    share(){
      let _this = this;
      console.log("pppp---"+_this.picData)
      if(_this.title == "" || _this.content == ""){
        alert("内容不能为空")
        return false;
      }
      $.ajax({
              type: 'post',
              data: {
                  title: _this.title,
                  content: _this.content,
                  picture_path: _this.picData.toString(),
                  type:_this.num
              },
              url: PORSCHE_HOST+'/member/show/share/add',
              success: function (res) {
                if(res.code === "1004") {
                    _this.$router.push('/login');
                    return ;
                }
                if(res.code === "1001"){
                  alert(res.message)
                  _this.uploadcontainer = false
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
  mounted() {
    this.num = this.$route.params.num
    this.avatar = localStorage.getItem("avatar")
    this.titles()
  }
}
</script>
<style scoped>
.upload-container-title input{
    width: 100%;
    margin-top: 10px;
    height: 30px;
    border: 0px;
    border-bottom: 1px solid #dcdcdc;
    outline: none;
    font-size: 22px;
    color: #000;
}
.upload-container-title textarea{
  width: 100%;
  margin-top: 20px;
  border: 0px;
  outline: none;
}
.row {
  margin: 15px 0px;
}
.upload-container-title {
  margin: 30px 0px 15px 0px;
}
.upload-container-title h2{
  font-size: 22px;
  color: #000;
}
.upload-container-title h5{
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
  display: flex;
}
#fileUpload{
  position: absolute;
  left: 0;
  top:20px;
  opacity: 0;
  height: 25px;
  width: 120px;
}
.cover{
  object-fit: cover;
}
.span-nrj {
  position: relative;
  font-size: 22px;
  color: #a3a3a3;
   cursor:pointer;
}
.span-nrj::before{
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 280px;
}
.porsche-upload-containerOK {
  max-width: 310px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 170px;
  line-height: 22px;
}
.porsche-upload-containerOK p{
  margin-bottom: 50px!important;
  color:#a3a3a3;
}
.porsche-upload-container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 35px;
  margin-bottom: 20px;
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
  display: inline-block;
}
.porsche-upload-topimg {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.porsche-upload {
  position: relative;
}
.nrpxinx-img {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
  margin-right: auto;
  display: inline-block;
}
.porsche-upload-top {
  position: relative;
  background: #dcdcdc;
  width: 100%;
  padding: 15px 0;
}
@media (max-width: 768px) {
  .porsche-upload-topimg {
    margin-left:15px;
    margin-right: 15px;
  }
  .upload-container-tjfm,.upload-container {
    height: 150px;
  }
  .porsche-upload-container {
    margin-left:15px;
    margin-right: 15px;
  }
  .span-nrj {
    font-size:18px;
  }
  .span-nrj::before{
    font-size: 40px;
    top:6px;
    left: -5px;
  }
  .pc-nrpxinx  {
    display: none!important;
  }
  .app-nrpxinx {
    visibility: visible;
  }
}
</style>
