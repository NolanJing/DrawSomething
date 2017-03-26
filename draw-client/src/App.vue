<template>
  <div id="app">
    <!--<v-header :data="data"></v-header>-->
    <v-header></v-header>
    <v-content>
      <!--<v-canvas></v-canvas>
      <v-chatroom></v-chatroom>-->
    </v-content>
    <v-login></v-login>
  </div>
</template>

<script>
  import header from './components/header/header';
  import content from './components/content/content';
  import login from './components/login/login';
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
      'v-content': content,
      'v-login': login
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    background-color: rgba(17, 27, 37, 0.1)
    padding: 0 10px 0 10px
    user-select: none
</style>
