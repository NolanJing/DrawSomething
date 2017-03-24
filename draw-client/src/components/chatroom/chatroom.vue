<template>
  <div class="chatroom">
    <div class="msgRecord">
      <ul v-if="msgList" class="msgList">
        <li v-for="msg in msgList" class="msg">
          {{msg.name}}说： {{msg.msg}}
        </li>
      </ul>
    </div>
    <div class="sendMsg">
      <input class="input" ref="inputMsg" @keyup.enter="sendMsg">
      <button class="sendBtn" @click="sendMsg()">send</button>
    </div>
    <v-login></v-login>
  </div>
</template>

<script type="text/ecmascript-6">
  import login from '../login/login.vue';
  import bus from '../../bus';
  export default {
    name: 'chatroom',
    data() {
      return {
        msgList: this.msgList,
        playerInfo: this.playerInfo
      };
    },
    created() {
      this.msgList = [];
      this.playerInfo = {
        login: {}
      };
      var VUEchatroom = this;
      bus.$on('isLogin', function (playerInfo) {
        // console.log(playerInfo.userName);
        VUEchatroom.$set(VUEchatroom.playerInfo, 'login', playerInfo);
        // console.log(self);
      });
    },
    sockets: {
    /*  connect: function () {
        // 建立链接后
        console.log('socket connected');
      }, */
      serverEmitMsg: function (msg) {
        console.log('Msg from server:  ' + msg);
        this.msgList.push(msg);
      },
      serverInit: function (initData) {
        // 接受来自客户端的赋值。
        // let id = initData.playerId;
        // document.cookie = `id=${id}`;
        /* this.playerInfo = {
         id: id,
         name: `${id}号君`
         }; */
        // 注册名字
        // this.$socket.emit('regist', this.playerInfo);
      }
    },
    mounted() {
    },
    computed: {
      genUid: function () {
        return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100);
      }
    },
    methods: {
      /* isLogin(playerInfo) {
        this.playerInfo = playerInfo;
        console.log('is Login');
      }, */
      sendMsg() {
        var msg = {
            id: this.playerInfo.login.userId,
            name: this.playerInfo.login.userName,
            msg: this.$refs.inputMsg.value
        };
        this.$socket.emit('clientSendMsg', msg);
      }
    },
    components: {
        'v-login': login
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .chatroom
    background-color: #888888
    font-size: 18px
    .msgRecord
      height: 550px
      overflow: auto
      .msgList
        .msg
          padding: 5px 5px 5px 5px
          text-align: left
          &:nth-child(odd)
            background-color: rgba(255, 255, 255, 0.8)
          &:nth-child(even)
            background-color: rgba(255, 255, 255, 0.7)

    .sendMsg
      display: flex
      height: 40px
      .input
        flex: 1
        margin: 10px 10px 0px 10px
        font-size: 20px
        text-align: center
      .sendBtn
        margin: 10px 10px 0 0
        width: 80px

</style>
