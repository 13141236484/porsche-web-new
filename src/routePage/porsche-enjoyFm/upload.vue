<template lang="html">
  <div class="porsche-upload">
      <a @click="back" class="back"><i class="back-con"><img :src="require('../../common/image/back.png')" alt=""></i></a>
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
      <div class="show-pc" v-if="showpc">
        <div class="porsche-upload-container" v-show="uploadcontainer" v-if="num !== 'PROJECTION'">
          <div class="porsche-upload-containerdiv">
            <div class="upload-container">
                <div class="upload-container-tjfm">
                    <span class="span-nrj" v-if="spannrj">添加封面
                      <input @change="filesChangeFM()" id="fileUpload" type="file" accept="image/*" name="file" title="未选择任何图片"/>
                    </span>
                    <div class="img-nrj" v-if="imgnrj">
                      <img width="100%" class="cover" :neme="index" @click="delectimgFM(index)"  v-for="(img,index) in imgSrc" :src="img" alt="">

                    </div>
                </div>
            </div>
            <div class="upload-container-title">
                <input type="text" v-model="title" placeholder="标题(最多可输入20个字)"  name="title" maxlength="20">
            </div>
          </div>
        </div>

        <div class="porsche-upload-container" v-show="uploadcontainer">
          <div class="porsche-upload-containerdiv" v-for="(list,key) in uploadcontainerlist">
            <div class="upload-container upload-container-zw">
                <div class="upload-container-tjfm" style="width:280px">
                    <span class="span-nrj" v-if="spannrj">添加封面
                      <input @change="filesChange(key)"  id="fileUpload" type="file" accept="image/*" name="file" title="未选择任何图片"/>
                    </span>
                    <div class="img-nrj" v-if="imgnrj">
                      <img width="100%" class="cover" :neme="key"  :src="PORSCHE_HOST+list.imgpic" alt="">
                    </div>
                </div>
                <div class="upload-container-title upload-container-titlezw">
                    <!-- <h5>正文</h5> -->
                    <textarea  name="name" v-model="list.content" placeholder="正文" rows="5" cols="100" wrap="hard"></textarea>
                </div>
            </div>
          </div>

          <div class="upload-btns">
              <div class="upload-btns-ba" @click="addcontainer()">
                <div class="upload-btns-center">
                  <h5>+</h5>
                  <h6>继续添加</h6>
                </div>
              </div>
          </div>
          <div class="nrpxinx-btn pc-nrpxinx">
            <div class="parsche-login-btn">
              <div class="main-btn pc-mainupload" @click="share()">发 送</div>
            </div>
          </div>
        </div>

      </div>
      <div class="show-app" v-if="showapp">
        <div class="porsche-upload-container">
          <div class="porsche-upload-container" v-show="uploadcontainer" v-if="num !== 'PROJECTION'">
              <div class="upload-container">
                  <div class="upload-container-tjfm">
                      <span class="span-nrj" v-if="spannrj">添加封面
                        <input @change="filesChangeFM()" id="fileUpload" type="file" accept="image/*" name="file" title="未选择任何图片"/>
                      </span>
                      <div class="img-nrj" v-if="imgnrj">
                        <img width="100%" class="cover" :neme="index" @click="delectimgFM(index)" v-for="(img,index) in imgSrc" :src="img" alt="">
                      </div>
                  </div>
              </div>
              <div class="upload-container-title">
                  <input type="text" v-model="title"   name="title" placeholder="标题(最多可输入20个字)" maxlength="20">
              </div>
          </div>
          <div class="porsche-upload-container" v-show="uploadcontainer">
            <div class="porsche-upload-containerdiv upload-container-tjfmapp">
              <template v-for="(list,key) in uploadcontainerlist" v-if="list.imgpic != ''">
                <div @click="showTextarea(key,list.id)" :style="comentHeight" class="comment-images-container image-item" v-if="list.imgpic != '' " :class="{'checkeds':list.active,'btn-arrow':list.active && key <= 3, 'btn-arrows':list.active && key > 3}">
                  <span  @click="imgSrclick(key)">
                      <img width="100%"   class="cover lazy " style="display: inline;" :neme="key"  :src="PORSCHE_HOST+list.imgpic" alt="">
                  </span>

                  <input type="hidden" name="" v-model="indexUP">
                </div>
                <!-- <div class="image-item jia-add" :style="comentHeight" @click="" v-if="uploadcontainerlist.length <=3">
                  <i class="iconfont icon-jia">
                    <input @change="filesChangeapp()" id="fileUploadapp" type="file" accept="image/*" name="file"/>
                  </i>
                </div> -->
                <div class="upload-container-title upload-container-titlezw upload-container-title-appa " v-if="isShowTextarea(showthe,key,uploadcontainerlist.length) && uploadcontainerlist.length !=0&&selectId!==''">
                    <textarea placeholder="正文"  name="name" v-model="uploadcontainerlist[selectId]['content']"   rows="5" cols="100" wrap="hard"></textarea>
                </div>
              </template>
              <div class="image-item jia-add" :style="comentHeight" @click="" >
                <i class="iconfont icon-jia">
                  <input @change="filesChangeapp()" id="fileUploadapp" type="file" accept="image/*" name="file" title="未选择任何图片"/>
                </i>
              </div>
              <div class="clear">

              </div>
              <div class="text-wenben">
                <div class="text-wenben1">
                  <h3>{{this.textwenben}}</h3>
                </div>
                <div class="text-wenben2">
                  <h3>{{this.textwenbenjx}}</h3>
                </div>
              </div>
          <!-- <div class="upload-container-title upload-container-titlezw upload-container-title-appa "  v-if="uploadcontainerlist.length-1 < 4 && uploadcontainerlist.length-1 !== 0">
              <textarea  name="name"  rows="5" cols="100"></textarea>
          </div> -->


          <!-- <div class="upload-container-title upload-container-titlezw upload-container-title-appa "  v-if="uploadcontainerlist.length-1 > 4">
              <textarea  name="name"  rows="5" cols="100"></textarea>
          </div> -->
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
      <!-- <div class="porsche-upload-container" v-show="uploadcontainer">
        <div class="porsche-upload-containerdiv">
          <div class="upload-container">
              <div class="upload-container-tjfm">
                  <span class="span-nrj" v-if="spannrj">添加封面
                    <input @change="filesChange" id="fileUpload" type="file" accept="image/*" name="file"/>
                  </span>
                  <div class="img-nrj" v-if="imgnrj">
                    <img width="100%" class="cover" :neme="index" @click="delectimg(index)" v-for="(img,index) in imgSrc" :src="img" alt="">
                  </div>
              </div>
          </div>
          <div class="upload-container-title">
              <input type="text" v-model="title"   name="title" @focus='titleh()' @blur='titles()'>
          </div>
          <div class="upload-container-title">
              <textarea  name="name" v-model="content" rows="8" cols="80"></textarea>
          </div>
          <div class="nrpxinx-btn pc-nrpxinx">
            <div class="parsche-login-btn">
              <div class="main-btn pc-mainupload" @click="share()">发 送</div>
            </div>
          </div>
        </div>
      </div> -->
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
export default {
  components: {

  },
  data() {

    return {
      textwenbenjx:"",
      textwenben:"点击+添加图片",
      selectId:'',
      showthe:false,
      PORSCHE_HOST,
      showapp: false,
      showtextareams: false,
      showpc: false,
      indexUP: 0,
      comentHeight: {},
      uploadcontainerlist: [{
        id: 1,
        content: '',
        imgpic: '',
        active:false
      }],
      PORSCHE_HOST,
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
      }

    }
  },
  methods: {

      back(){
          let _this = this;
          let urlshash = window.location.hash;
          console.log(urlshash)
          let lastUrl = urlshash.substring(urlshash.lastIndexOf('/')+1,);

          if(lastUrl == "TRACK"){
              _this.$router.push('/emotion');
          }else if(lastUrl == "DREAMSAIL"){
              _this.$router.push('/dream');
          }else if(lastUrl == "MODELSTREET"){
              _this.$router.push('/module');
          }
      },
    filesChangeFM() {
      self = this;
      let file = event.target.files[0];
      let reader = new window.FileReader()
      reader.readAsDataURL(file)

      reader.onload = function(e) {
        //计算图片的宽高比例大小
        let data = e.target.result;
        let image = new Image();
        image.src = data;
        image.onload = function() {
          self.imgSrc = []
          self.picData = []
          self.imgSrc.push(data)
          // self.uploadcontainerlist[ids].img  = data
          // self.imgnrj = true
          // self.spannrj = false
          self.filepathFM(file)
        }
      }
    },
    filepathFM(file) {
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
          console.log("file" + JSON.stringify(res.data.picture_path));
          _this.picData.push(res.data.picture_path)
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
    showTextarea(key,ids){
      if(this.showthe == false){
        this.showthe = true
      }
      this.setSelectImgIndex(key)
    },
    setSelectImgIndex(index){

      this.selectId=index;

      let list = this.uploadcontainerlist;
      let newList = [];
      for(let i=0 ; i < list.length;i++){
        if(index===i){
          newList.push({
            id: list[i].id,
            content: list[i].content,
            imgpic:list[i].imgpic,
            active:true
          })
        }else{
          newList.push({
            id: list[i].id,
            content: list[i].content,
            imgpic:list[i].imgpic,
            active:false
          })
        }
        this.uploadcontainerlist = newList;
      }
    },
    isShowTextarea(show,index, length) {
      if(show === true){
        if (length < 4) {
          if (index === length - 1) {
            return true;
          }
        } else if (length > 3) {
          if (index === 3) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }else {
        return false;
      }



    },
    imgSrclick(index) {
      // var beforehtml = '<div class="upload-container-title upload-container-titlezw upload-container-title-appa">'
      //   beforehtml+=  '<textarea  name="name"  rows="5" cols="100"></textarea></div>'
      //   if(this.imgSrc.length  <= 3 ){
      //     $('.comment-images-container').find('span:last').after(beforehtml);
      //   } else if(this.imgSrc.length  = 4 ){
      //     $('.comment-images-container').find('span').eq(3).after(beforehtml);
      //   }
    },
    addcontainer() {
      if(this.uploadcontainerlist.length >14){
        alert("最多上传15张！")
        return false
      }
      let ids = this.uploadcontainerlist.length + 1
      this.uploadcontainerlist.push({
        id: ids,
        content: '',
        imgpic: '',
        active:false
      })
    },
    // titleharea(ins) {
    //   if (this.uploadcontainerlist[ins].content == '正文') {
    //     this.uploadcontainerlist[ins].content = ''
    //   }
    // },
    // titlesarea(ins) {
    //   if (this.uploadcontainerlist[ins].content == '') {
    //     this.uploadcontainerlist[ins].content = '正文'
    //   }
    // },
    // titleh() {
    //   if (this.title == '标题') {
    //     this.title = ''
    //   }
    // },
    // titles() {
    //   if (this.title == '') {
    //     this.title = '标题'
    //   }
    // },
    showtext(ins) {
      return this.showtextdata[ins]
    },
    delectimgFM(index) {
      console.log(index)
      this.imgSrc.splice(index,1);
      this.picData.splice(index,1);
      // this.uploadcontainerlist[index].img = ''
      // this.uploadcontainerlist[index].imgpic = ''
      // this.imgSrc.splice(index,1);
      // this.picData.splice(index,1);
      // this.imgnrj = false
      // this.spannrj = true
    },
    delectimg(index) {
      console.log(index)
      this.uploadcontainerlist.splice(index, 1);
      // this.uploadcontainerlist[index].img = ''
      // this.uploadcontainerlist[index].imgpic = ''
      // this.imgSrc.splice(index,1);
      // this.picData.splice(index,1);
      // this.imgnrj = false
      // this.spannrj = true
    },
    delectimgapp(index) {
      console.log(index)
      // this.uploadcontainerlist.splice(index, 1);
      // this.uploadcontainerlist[index].img = ''
      // this.uploadcontainerlist[index].imgpic = ''
      // this.imgSrc.splice(index,1);
      // this.picData.splice(index,1);
      // this.imgnrj = false
      // this.spannrj = true
    },




    filesChange(ids) {
      self = this;
      let file = event.target.files[0];
      let reader = new window.FileReader()
      reader.readAsDataURL(file)

      reader.onload = function(e) {
        //计算图片的宽高比例大小
        let data = e.target.result;
        let image = new Image();
        image.src = data;
        image.onload = function() {
          // self.imgSrc.push(data)
          // self.uploadcontainerlist[ids].img  = data
          // self.imgnrj = true
          // self.spannrj = false
          self.filepath(file, ids)
        }
      }
    },
    filesChangeapp() {
      if(this.uploadcontainerlist.length >14){
        alert("最多上传15张！")
        return false
      }
      if(this.uploadcontainerlist.length >0){
        this.textwenben = "点击对应图片以添加正文"
        this.textwenbenjx = "点击+继续添加图片(最多添加七张)"
      }
      self = this;
      if(self.uploadcontainerlist[0].imgpic !== ''){
        let ids = self.uploadcontainerlist.length + 1
        self.uploadcontainerlist.push({
          id: ids,
          content: '',
          imgpic: '',
          active:false
        })
      }
      // self.uploadcontainerlist = []
      let index = parseInt(self.uploadcontainerlist.length - 1)

      let file = event.target.files[0];
      let reader = new window.FileReader()
      reader.readAsDataURL(file)

      reader.onload = function(e) {
        //计算图片的宽高比例大小
        let data = e.target.result;
        let image = new Image();
        image.src = data;
        image.onload = function() {
          // self.imgSrc.push(data)
          // self.uploadcontainerlist[ids].img  = data
          // self.imgnrj = true
          // self.spannrj = false
          self.filepath(file, index)
        }
      }
    },
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
    share() {
      let _this = this;
        let contentNo = /\s{0,}[\S]{1,}[\s\S]{0,}/;
      console.log("pppp---" + _this.picData)
      if(_this.title === ""){
        alert("标题不能为空")
        return false;
      }
      if(_this.picData.toString() === ""){
        alert("封面不能为空")
        return false;
      }
      for(let i=0;i<_this.uploadcontainerlist.length;i++){
        if( _this.uploadcontainerlist[i].content === "" ||!contentNo.test(_this.uploadcontainerlist[i].content) ){
          alert("正文不能为空")
          return false;
        }
        if(_this.uploadcontainerlist[i].imgpic === ""){
          alert("图片不能为空")
          return false;
        }
      }

      // if(_this.title == "" || _this.content == ""){
      //   alert("内容不能为空")
      //   return false;
      // }
      console.log(JSON.stringify(_this.uploadcontainerlist))
      $.ajax({
        type: 'post',
        data: {
          title: _this.title,
          content: JSON.stringify(_this.uploadcontainerlist),
          picture_path: _this.picData.toString(),
          type: _this.num
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
  margin: 30px 0px 15px 0px;
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
  top: 25px;
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
  /*display: inline-block;*/
    float: left;
    margin-left: 500px;
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
 /* margin-right: auto;
  display: inline-block;*/
    float: left;
    margin: 15px 0px;
}

.porsche-upload-top {
  position: relative;
  background: #dcdcdc;
  width: 100%;
    /* padding: 15px 0;*/
    height: 80px;
    line-height: 80px;
}

.upload-container-zw {
  border: 0px;
  display: flex;
}

.upload-container-titlezw {
  margin-left: 30px;
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
