<template>
  <div class="content">
    <v-canvas></v-canvas>
    <v-chatroom></v-chatroom>
  </div>
</template>

<script type="text/ecmascript-6">
  import canvas from '../canvas/canvas.vue';
  import chatroom from '../chatroom/chatroom';

  export default {
    components: {
      'v-canvas': canvas,
      'v-chatroom': chatroom
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content
    // padding: 0 18px 0 18px
    display: flex
    .canvas
    .chatroom
      flex: 1
    // background-color #440044
</style>
