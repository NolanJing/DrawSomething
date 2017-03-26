<template>
  <div class="chatroom">
    <div class="msgRecord">
      <ul v-if="msgList" class="msgList">
        <li v-for="msg in msgList" class="msg">
          {{msg.name}}说： {{msg.msg}}
        </li>
      </ul>
      <!-- <div v-if="newMsg" class="newMsg">
         <span> {{' '+ newMsg.name}}：{{newMsg.msg}}</span>
       </div>-->
      <div class="sendMsg">
        <input class="input"
               ref="inputMsg"
               @keyup.enter="sendMsg"
               placeholder="please input"
        >
        <button class="sendBtn" @click="sendMsg()">send</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../../bus';
  export default {
    name: 'chatroom',
    data() {
      return {
        msgList: this.msgList,
        playerInfo: this.playerInfo,
        newMsg: this.newMsg,
        isChat: this.isChat
      };
    },
    created() {
      this.isChat = false;
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
      bus.$on('isChat', function () {
        // console.log('chat');
        VUEchatroom.isChat = !VUEchatroom.isChat;
      });
    },
    sockets: {
      serverEmitMsg: function (msg) {
        console.log(msg);
        this.msgList.push(msg);
        this.newMsg = undefined;
        this.newMsg = msg;
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
      sendMsg() {
        var msg = {
          id: this.playerInfo.login.userId,
          name: this.playerInfo.login.userName,
          msg: this.$refs.inputMsg.value
        };
        this.$socket.emit('clientSendMsg', msg);
        this.$refs.inputMsg.value = '';
      }
    },
    components: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @-webkit-keyframes 'wobble'
      0%
        margin-left: 400px
      100%
        margin-left: -400px

    .chatroom

      // right: 10px
      // margin-right: 10px
      background-color: #888888
      font-size: 18px
      // width: 100%

      .newMsg
        background-color coral
        font-size: 20px
        line-height: 20px
        white-space nowrap
        span
          color: azure
          -webkit-animation-name: 'wobble'; /*动画属性名，也就是我们前面keyframes定义的动画名*/
          -webkit-animation-duration: 8s; /*动画持续时间*/
          -webkit-animation-timing-function: ease-in-out;
          /*动画频率，和transition-timing-function是一样的*/
          -webkit-animation-delay: 0s;
          /*动画延迟时间*/
          -webkit-animation-iteration-count: 1;
          /*定义循环资料，infinite为无限次*/
          -webkit-animation-direction: alternate;

      .msgRecord
        padding-right:10px
        .msgList
          overflow: auto
          height: 100%
          overflow: hidden
          .msg
            padding: 5px 5px 5px 5px
            text-align: left
            &:nth-child(odd)
              background-color: rgba(255, 255, 255, 0.8)
            &:nth-child(even)
              background-color: rgba(255, 255, 255, 0.7)

        .sendMsg
          .input
            // flex: 1
            width: 100%
            margin: 10px 10px 10px 10px
            font-size: 20px
            text-align: center
          .sendBtn
            display: none
</style>
