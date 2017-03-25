<template>
  <div class="chatroom">
    <div class="msgRecord">
      <ul v-if="msgList" class="msgList">
        <li v-for="msg in msgList" class="msg">
          {{msg.name}}说： {{msg.msg}}
        </li>
      </ul>
    </div>
    <div v-if="newMsg" class="newMsg">
      <span> {{' '+ newMsg.name}}：{{newMsg.msg}}</span>
    </div>
    <div class="sendMsg">
      <input class="input" ref="inputMsg" @keyup.enter="sendMsg">
      <button class="sendBtn" @click="sendMsg()">send</button>
    </div>
   <!-- <v-login></v-login>-->
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
        newMsg: this.newMsg
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
        console.log(msg);
        this.msgList.push(msg);
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
    components: {
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @-webkit-keyframes 'wobble'
    0%
      margin-left: 10px
      background: #ffffff

    40%
      margin-left: 150px
      background: #b5d592

    60%
      margin-left: 10px
      background: #b5d592

    100%
      margin-right: 50px
      background: #007ab7

  .chatroom
    position: fixed
    bottom: 0
    // left:0
    background-color: #888888
    font-size: 18px
    width: 100%
    .newMsg
      span
        // background: blue;
        -webkit-animation-name:'wobble';/*动画属性名，也就是我们前面keyframes定义的动画名*/
        -webkit-animation-duration: 10s;/*动画持续时间*/
        -webkit-animation-timing-function: ease-in-out;
        /*动画频率，和transition-timing-function是一样的*/
        -webkit-animation-delay: 0s;
        /*动画延迟时间*/
        -webkit-animation-iteration-count: 10;
        /*定义循环资料，infinite为无限次*/
        -webkit-animation-direction: alternate;/*定义动画方式*/
    .msgRecord
      overflow: auto
      display: none
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
        margin: 10px 10px 10px 10px
        font-size: 20px
        text-align: center
      .sendBtn
        margin: 10px 16px 6px 0px
        // width: 80px

</style>
