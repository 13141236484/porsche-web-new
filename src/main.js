// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import router from './router';
import Pagination  from 'element-ui'
import MessageBox  from 'element-ui'
import DatePicker  from 'element-ui'
import Dialog from 'element-ui'
import Input from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'vue-event-calendar/dist/style.css'
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'en'})
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
Vue.use(Pagination)
Vue.use(MessageBox)
Vue.use(VueAwesomeSwiper)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Input)
Vue.config.productionTip = false;
// var htmlWebpackMonitorPlugin = require('./common/js/tongji.js');
// new htmlWebpackMonitorPlugin();
/* eslint-disable no-new */
router.afterEach( ( to, from, next ) => {
  setTimeout(()=>{
    var _hmt = _hmt || [];
    (function() {
      //每次执行前，先移除上次插入的代码
      document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?b04abb992303cacd91f623ec32ae1aaf";
      hm.id = "baidu_tj"
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  },0);
} );

router.beforeEach((to, from, next) => {
  // function GetRequest() {
  //   var url = window.location.href; //获取url中"?"符后的字串
  //   var theRequest = new Object();
  //   if (url.indexOf("?") != -1) {
  //   var str = url.substring(url.indexOf("?") +1);
  //   var strs = str.split("&");
  //     for(var i = 0; i < strs.length; i ++) {
  //     theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
  //     }
  //   }
  //   return theRequest;
  //   }
  // var referral = GetRequest();
  // if(referral['referral'] !== undefined){
  //   localStorage.setItem("referral",referral['referral'])
  // }
  function randomString (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  //设置cookie
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
    localStorage.setItem('fullPathUrl', to.fullPath)
  }
  //获取cookie
  function getCookie (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  }
  //清除cookie
  function clearCookie() {
    this.setCookie("username", "", -1);
    
  }
  let time =  Date.parse(new Date());
  var uuid =  localStorage.getItem('member_id')
  
  if(!getCookie("xid")){
    var str = time +"_"+randomString(4)
    setCookie('xid',str,7)
    
  }else {
    var str = getCookie("xid")
  }
  // var url = 'http://101.52.132.255/writelog_1.gif?uuid='+uuid+'&path='+to.fullPath+'&xid='+str
  var url = '/writelog_1.gif?uuid='+uuid+'&path='+to.fullPath+'&xid='+str

  $.ajax({
    type: 'get',
    // data: {
    //   // tel:tel,
    //   urls:urls,
    //   time:time
    // },
    url:url,
    success: function (res) {

    },
    error: function (res) {
      // console.log("网络连接错误!")
    }
  });
  
  //蓝标加的百度统计
    // if (to.path) {
    //     if (window._hmt) {
    //         window._hmt.push(['_trackPageview', '/#' + to.fullPath]);
    //         console.log(window._hmt)
    //
    //     }
    // }
  // if (to.meta.requiresAuth) {
  //   console.log('a')
  //   if (uuid) {
  //     console.log('b')
  //     next();
  //   } else {
  //     console.log('c')
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath } // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
  //     });
  //   }
  //
  // } else {
  //   console.log('d')
  //   next(); //如果无需token,那么随它去吧
  // }
  next();
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
