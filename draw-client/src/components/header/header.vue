<template>
  <div class="header">
    <div class="roomInfo">
      {{playerInfo.login.userName}}的房间
      当前人数： {{onlineCount}}
    </div>
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
          <li v-for="user in onlineUsers" class="player">
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
        console.log(update);
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
        padding: 25px;
        border: 1px solid #440044;
        .userName
          color: #3a33d1
        .avatar
          img
            width: 100px
            border-radius: 50px
      .players
        flex: 1
        padding: 12px 12px 12px 12px
        border: 1px solid #440044;
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
