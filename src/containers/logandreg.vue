<template >
  <div class="parsche-logins">
    <login @show-login="showlogin" @show-reg="showreg"  v-if="showlo" @LoginPhone="loginPhone"></login>
    <registered @show-login="showlogin" @show-reg="showreg" v-if="showre" :registerPhone="RegisterPhone"></registered>
  </div>
</template>

<script>
import Login from '@/containers/login/index.vue';
import Registered from '@/containers/registered/index.vue';
export default {
  components:{
    Login,
    Registered
  },
  data(){
    return{
      showlo:true,
      showre:false,
        RegisterPhone:''
    }
  },
  methods:{
    showlogin(){
      this.showlo = true
      this.showre = false
    },
    showreg(){
      this.showre = true
      this.showlo = false
    },
      loginPhone (data) {
        this.RegisterPhone = data
      }

  },
  mounted(){

  }


}
</script>

<style scoped>

</style>
