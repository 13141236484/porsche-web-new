<template >
  <div class="parsche-login">
        <carousel :setswiperstyle='setswiperstyle' >

        </carousel>
  </div>
</template>

<script>
import Carousel from '@/basecom/carousel.vue';
import {PORSCHE_HOST} from '../common/js/host';
export default {
  props:{
      setswiperheight: "",
  },
  components:{
    Carousel
  },
  data(){
    return{
      types:"WELCOME",
      setswiperstyle: {
        width: "100%",
        height: "",
        img:[],
        sta:"login"
      },

    }
  },
  methods:{
    carouselImg (){
      // let formData = new FormData();
      // formData.append("type", this.type); //类型
      // console.log(this.setswiperstyle);
      let self =  this;
      $.ajax({
              type: 'post',
              data: {
                  type:this.types,
              },
              url: PORSCHE_HOST+'/member/loginpicture',
              success: function (res) {
                    self.setswiperstyle.img = res.data;
              },
              error: function (res) {
                  console.log("网络连接错误!")
              }
          });
          console.log(self.setswiperstyle.img)


    },
    setswiper() {
      let l_height = $(window).height();
      let zongapp_height = parseInt(l_height) - parseInt(55);
      let zongpc_height = parseInt(l_height) - parseInt(131);
      if (document.body.offsetWidth > 750) {
        this.setswiperstyle.height = zongpc_height + 'px';
      }
      else {
        this.setswiperstyle.height = '300px';

      }
    }
  },
  mounted(){
    let self = this;
    this.carouselImg();
    this.setswiper();
    window.onresize = function() {
      self.setswiper();
    }
  }

}
</script>

<style scoped>

</style>
