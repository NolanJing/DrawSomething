<template>
  <div class="header">
    <div v-if="data.room" class="roomInfo">
      {{data.room.name}}
    </div>
    <div class="playersInfo">
      <div class="user">
        <div v-if="data.user" class="userName">
          {{data.user.userName}}
        </div>
        <div class="avatar">
          <img v-if="data.user" :src="data.user.avatar">
        </div>
      </div>
      <div class="players">
        <ul>
          <li v-for="player in data.players" class="player">
            <div class="userName">
              {{player.userName}}
            </div>
            <div class="avatar">
              <img :src="player.avatar">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import star from 'components/star/star';
  export default {
    props: {
      data: {}
    },
    data() {
      return {};
    },
    methods: {},
    created() {
    },
    components: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    // height: 300px
    // display: flex
    // padding:0 12px 0 12px
    // background-color: rgba(17, 27, 37, 0.1)
    .roomInfo
      text-align: center
      color: red
      font-size: 24px
    .playersInfo
      display: flex
      .user
        // padding: 12px 12px 12px 12px
        // padding-left: 12px
        background-color: #b5d592
        width: 160px
        padding:25px;
        border:1px solid  #440044;
        .userName
          color: #3a33d1
        .avatar
          img
            width: 100px
            border-radius: 50px
      .players
        flex: 1
        padding: 12px 12px 12px 12px
        border:1px solid  #440044;
        text-align: center
        line-height: 40px
        background-color #fc8c84
        .player
          // float: right
          display: inline-block
          text-align: center

          width: 80px
          overflow: hidden
          .userName
            width: 80px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
          .avatar
            img
              width: 50px
              border-radius: 25px

             // float: right
</style>
