<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import './common/css/bootstrap.css'
import './common/css/datetme.css'
import './common/css/common.css'
import Layout from '@/components/layout.vue'
export default {
  components: {
    Layout
  },
  name: 'app',
}

</script>

<style>
#app {

  font-family: "PorscheNextWLa", 黑体, SimHei, 宋体, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #000000;
}
</style>
