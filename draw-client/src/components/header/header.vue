<template>
  <div class="header">
    <!--<div class="roomInfo">
      &lt;!&ndash;// {{playerInfo.login.userName}}的房间&ndash;&gt;
          当前人数： {{onlineCount}}
    </div>-->
    <div class="playersInfo">
      <div class="user">
         <div class="userName">
           {{playerInfo.login.userName}}
         </div>
         <div class="avatar">
           <img v-if="getAvatar" :src="onlineUsers[playerInfo.login.userId].avatar">
         </div>
      </div>
      <div class="players">
        <ul>
          <li v-if="user.userId!==playerInfo.login.userId" v-for="user in onlineUsers" class="player">
            <div class="userName">
              {{user.userName}}
            </div>
            <div class="avatar">
              <img :src="user.avatar">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import star from 'components/star/star';
  import bus from '../../bus';

  export default {
    props: {
      data: {}
    },
    data() {
      return {
        playerInfo: this.playerInfo,
        onlineUsers: this.onlineUsers,
        onlineCount: this.onlineCount
      };
    },
    methods: {},
    created() {
      this.playerInfo = {
        login: {}
      };
      this.getAvatar = false;
      this.onlineUsers = {};
      // 当前在线人数
      this.onlineCount = 0;
      // bus总线 传递消息
      var VUEheader = this;
      bus.$on('isLogin', function (playerInfo) {
        // console.log(playerInfo.userName);
        VUEheader.$set(VUEheader.playerInfo, 'login', playerInfo);
        // console.log(self);
      });
    },
    sockets: {
      login: function (update) {
        // 建立链接后
        console.log(`用户 <${update.appendUser.userName}> 加入房间`);
        // console.log(update);
        this.onlineCount = update.onlineCount;
        this.onlineUsers = update.onlineUsers;
        this.getAvatar = true;
      },
      logout: function (update) {
        console.log(`用户 <${update.leaveUser.userName}> 离开房间`);
        this.onlineCount = update.onlineCount;
        this.onlineUsers = update.onlineUsers;
      }
    },
    components: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  .header
    position: relative
    overflow: hidden
    height: 60px
    border-1px(rgb(7, 17,27, 1))
    .roomInfo
      text-align: center
      color: #007ab7
      font-size: 20px
      margin-bottom: 3px
    .playersInfo
      display: flex
      margin-top: 8px
      .user
        background-color: #b5d592
        width: 60px
        text-align: center
        border: 1px solid #440044
        padding: 2px 2px 2px 2px
        .userName
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          font-size: 10px
          color: #07111b
        .avatar
          img
            width: 36px
            // max-width:40px
            border-radius: 6px

      .players
        flex: 1
        border: 1px solid #440044
        border-left: 0
        padding-top: 3px
        background-color #fc8c84
        .player
          padding: 2px 2px 2px 2px
          width: 18%
          display: inline-block
          text-align: center
          .userName
            font-size: 8px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
          .avatar
            margin-top: 2px
            img
              width: 32px
              border-radius: 25px
</style>
