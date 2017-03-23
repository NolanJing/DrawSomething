<template>
  <div class="chatroom">
    <div class="msgRecord">
      <ul v-if="msgList" class="msgList">
        <li v-for="msg in msgList" class="msg">
          {{msg.name}}说： {{msg.msg}}
        </li>
      </ul>
      <!--<input class="input" ref="inputName">
      <button class="sendBtn" @click="sendName()">register</button>-->
    </div>
    <div class="sendMsg">
      <input class="input" ref="inputMsg">
      <button class="sendBtn" @click="sendMsg()">send</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
    },
    sockets: {
      serverEmitMsg: function (msg) {
        console.log('Msg from server:  ' + msg);
        this.msgList.push(msg);
      },
      serverInit: function (initData) {
        // 接受来自客户端的赋值。
        let id = initData.playerId;
        // document.cookie = `id=${id}`;
        this.playerInfo = {
          id: id,
          name: `${id}号君`
        };
        // 注册名字
        this.$socket.emit('regist', this.playerInfo);
      }
    },
    mounted() {
    },
    methods: {
      sendMsg() {
        var msg = {
            name: this.name || '匿名',
            msg: this.$refs.inputMsg.value
        };
        this.$socket.emit('clientSendMsg', msg);
      },
      sendName() {
        this.name = this.$refs.inputName.value;
        // this.$socket.emit('clientSendMsg', msg);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .chatroom
    background-color: #888888
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
