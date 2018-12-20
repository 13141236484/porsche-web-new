<template lang="html">
  <div class="porsche-personal-message">
    <div class="" v-if="this.showMessage">

      <ul>
        <li v-for="(list,index) in messageList" class="item read" >
	           <div class="text" @click="notification(list.uuid,index)"><p v-html="list.content" style="line-height:20px;"></p></div>
             <span class="message-date">{{timedata(list.created_time)}} <i @click="notification(list.uuid,index)" class="iconfont icon-yanjing" :class="{'icon-yanjing-heis':list.is_read == 'Y','icon-yanjing-hongs':list.is_read == 'N'}"></i></span>
             <i @click="deleteMessage(list.uuid,index)" class="iconfont icon-zgdelect" style="position: absolute;right: 5px;"></i>
             <i class="iconfont icon-bofang"></i>
       </li>
       <div class="clear"></div>
     </ul>
      <div class="personalcenter-btn" @click="showContents()">
        <div class="parsche-login-btn">
          <div class="main-btn" >
            留言给我们
          </div>
        </div>
      </div>

      </div>
      <div class="ui-content" v-if="showContent">
        <div class="page-feedback">
            <textarea name="feedback" id="feedback_content" placeholder="填写反馈意见" v-model="content"></textarea>
            <div class="personalcenter-btn" @click="setMessages()">
              <div class="parsche-login-btn">
                <div class="main-btn" >
                  提 交
                </div>
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
    messageData: Array,
  },
  components: {

  },
  data() {
    return {
      showuserImg:false,
      content: '',
      showContent: false,
      showMessage: true,
      messageList: [],
    }
  },
  methods: {
    timedata(time){
    return  new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
    },
    notification(id,index){
      let _this = this;
      $.ajax({
        type: 'post',
        data: {
          notification_id: id,
        },
        url: PORSCHE_HOST + '/member/user/notification/read',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {
            console.log("data---"+JSON.stringify(res));
            _this.messageList[index].is_read = res.data.is_read
            _this.$emit('message-count', res.data.count)

          }
          if (res.code === "1002" || res.code === "1003" || res.code === "1009") {
            alert(res.message);
            return false;
          }
        }
        })
    },
    timedata(time) {
      return new Date(time).getFullYear() + '/' + (new Date(time).getMonth() + 1) + '/' + new Date(time).getDate()
    },
    showMessages() {
      this.showContent = false
      this.showMessage = true
    },
    showContents() {
      this.showMessage = false
      this.showContent = true
    },
    deleteMessage(id, index) {
      let _this = this;
      $.ajax({
        type: 'post',
        data: {
          notification_id: id,
        },
        url: PORSCHE_HOST + '/member/user/notification/delete',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {
            _this.messageList.splice(index, 1);
              alert("删除浏览记录成功")
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
    setMessages() {
      let _this = this;
        let contentNo = /\s{0,}[\S]{1,}[\s\S]{0,}/;
      if(_this.content == '' || !contentNo.test(_this.content)){
        alert("信息不能为空!")
        return;
      }
      $.ajax({
        type: 'post',
        data: {
          content: _this.content,
        },
        url: PORSCHE_HOST + '/member/user/notification/reply',
        success: function(res) {
          if(res.code === "1004") {
              _this.$router.push('/login');
              return ;
          }
          if (res.code === "1001") {
            alert(res.message);
            _this.content = ""
            _this.showMessage = true
            _this.showContent = false
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
    show() {
      if (document.body.offsetWidth > 750) {
        this.topimg = require('../../common/image/pcimg/gr-bg.jpg');
      } else {
        this.topimg = require('../../common/image/appimg/mxjk-bg.jpg');
      }
    }
  },
  mounted() {
    this.show();
    this.messageList = this.messageData
  }
}
</script>

<style scoped>
.icon-bofang {
  position: absolute;
  right: 0;
  top: 10px;
  font-size: 25px;
  color: #b3b3b3;

}
.item .btn-delete {
   position: absolute;
   right: -10px;
   top: 13px;
   color: #b8b9b8;
   padding: 20px;
   cursor: pointer;
}
.item .btn-delete {
    right: 10px;
    top: auto;
    bottom: 14px;
    padding-top: 0;
    padding-bottom: 0;
}
.item .message-date {
    color: #b3b3b3;
    font-size: 12px;
}
 .item.read .text {
    height: auto;
}

.item .text {
    height: 22px;
    overflow: hidden;
    margin-right: 40px;
}
 .item {
    padding: 20px 40px;
    height: auto;
    line-height: inherit;
    cursor: pointer;
}
 .item {
    /*height: 80px;
    line-height: 80px;*/
    position: relative;
    border-bottom: 1px dashed #b5b5b5;
}


.ui-content {
  margin: 0 auto;
  width: 86%;
  max-width: 1200px;
}

.personalcenter-btn {
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  margin: 50px 0;
}

.porsche-personal-message ul li .delete {
  position: absolute;
  right: -10px;
  top: 13px;
  color: #b8b9b8;
  padding: 20px;
  cursor: pointer;
  background: red;
}

.porsche-personal-message ul li .link {
  padding: 0 40px;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  color: #000;
}

.porsche-personal-message ul li .date {
  position: absolute;
  right: 40px;
  top: 0;
  color: #b3b3b3;
}

.porsche-personal-message ul li {
  /*height: 80px;
  line-height: 80px;*/
  position: relative;
  border-bottom: 1px dashed #b5b5b5;
}

.porsche-personal-message ul li .item-content {
  float: right;
  margin-right: 40px;
  color: #8f8f8f;
}

.porsche-personal-message ul li .item-header {
  float: left;
  margin-left: 40px;
  color: #000;
}

.cover {
  object-fit: cover;
}

.clear {
  clear: both;
}
.page-feedback #feedback_content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  height: 300px;
  outline: none;
}
.icon-yanjing-heis {
    color: #000;
}
.icon-yanjing-hongs {
    color: #d5001c;
}
@media (max-width: 768px) {
  .page-feedback #feedback_content {
    width: 100%
  }
  .porsche-personal-message ul li .link {
    height: 66px;
    padding: 0;
    overflow: hidden;
  }
  .porsche-personal-message ul li .date {
    position: static;
    font-size: 12px;
  }
  .porsche-personal-message ul li .delete {
    position: static;
    padding: 2px 5px;
    vertical-align: middle;
    margin-top: -2px;
  }

  .porsche-personal-message ul li {
    box-sizing: border-box;
    float: left;
    width: 100%;
    height: auto;
    line-height: inherit;
    padding: 15px;
    border-bottom: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
  }
}
</style>
