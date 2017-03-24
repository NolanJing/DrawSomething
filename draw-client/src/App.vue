<template>
  <div id="app">
    <!--<v-header :data="data"></v-header>-->
    <v-header></v-header>
    <v-content>
      <v-canvas></v-canvas>
      <v-chatroom></v-chatroom>
    </v-content>
  </div>
</template>

<script>
  import header from './components/header/header';
  import content from './components/content/content';
  // const ERR_OK = 0;
  export default {
    // name: 'app'
    data() {
      return {
        data: {}
      };
    },
    created() {
      /* this.$http.get('/api').then((response) => {
        response = response.body;
        // console.log(response);
        // if (response.errno === ERR_OK) {
        this.data = response.data;
        // }
      }); */
    },
    components: {
      'v-header': header,
      'v-content': content
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    background-color: rgba(17, 27, 37, 0.1)
    padding: 0 18px 0 18px
</style>
