<template>
  <div id="app">
    <v-header :data="data"></v-header>
    <v-canvas></v-canvas>
  </div>
</template>

<script>
  import header from './components/header/header';
  import canvas from './components/canvas/canvas';

  // const ERR_OK = 0;
  export default {
    // name: 'app'
    data() {
      return {
        data: {}
      };
    },
    created() {
      this.$http.get('/api').then((response) => {
        response = response.body;
        // console.log(response);
        // if (response.errno === ERR_OK) {
        this.data = response.data;
        // }
      });
    },
    components: {
      'v-header': header,
      'v-canvas': canvas
    }
  };
</script>

<style>
</style>
