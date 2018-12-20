<template>
  <div class="porsche-content">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    data(){
      return{

      }
    },
    watch:{
      '$route' (to, from) {
                // this.logs(to, from);
            }
    },
    methods:{
        logs(to, from){
          let tel = localStorage.getItem('tel')
          let urls = window.location.href
          let time =  Date.parse(new Date());
          // console.log('tel('+tel+')----'+'urls('+urls+')----'+'time('+time+')')
          console.log('to('+to+')----'+'from('+from+')')
          // $.ajax({
          //         type: 'post',
          //         data: {
          //           tel:tel,
          //           urls:urls,
          //           time:time
          //         },
          //         url: PORSCHE_HOST+'/member/signin',
          //         success: function (res) {
          //
          //         },
          //         error: function (res) {
          //             console.log("网络连接错误!")
          //         }
          //     });
        }
    },
    mounted(){
      // this.logs()
    },
}
</script>

<style >
</style>
