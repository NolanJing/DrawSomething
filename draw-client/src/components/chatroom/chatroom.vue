<template>
  <div class="chatroom">
    <div class="msgRecord">
      <ul v-if="msgList" id="msgList">
        <li v-for="msg in msgList" class="msg">
          <span class="name">{{msg.name}}</span>：
          <span class="text"> {{msg.msg}}</span>
          <span class="date">{{msg.date.slice(11, 16)}}</span>
        </li>
      </ul>
    </div>
    <div class="sendMsg">
      <input class="input"
             ref="inputMsg"
             @keyup.enter="sendMsg"
             autofocus
      >
      <!--<button class="sendBtn" @click="sendMsg()">send</button>-->
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
        bus.$emit('newMsg', msg);
        this.msgList.unshift(msg);
        // this.newMsg = undefined;
        // this.newMsg = msg;
      }
    },
    mounted() {
      let msgDom = document.querySelector('#msgList');
      // msgDom.sheight = window.innerWidth * 0.5;
      // height
      document.querySelector('.msgRecord').style.height = window.innerHeight * 0.60 + 'px';
      console.log(document.querySelector('.msgRecord').style.height);
      // scrooll
      var overscroll = function (el) {
        el.addEventListener('touchstart', function () {
          var top = el.scrollTop;
          var totalScroll = el.scrollHeight;
          var currentScroll = top + el.offsetHeight;
          if (top === 0) {
            el.scrollTop = 1;
          } else if (currentScroll === totalScroll) {
            el.scrollTop = top - 1;
          }
        });
        el.addEventListener('touchmove', function (evt) {
          // if the content is actually scrollable, i.e. the content is long enough
          // that scrolling can occur
          if (el.offsetHeight < el.scrollHeight) {
            evt._isScroller = true;
          }
        });
      };
      overscroll(msgDom);
      document.body.addEventListener('touchmove', function (evt) {
        if (!evt._isScroller) {
          evt.preventDefault();
        }
      });
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
          msg: this.$refs.inputMsg.value,
          date: new Date()
        };
        this.$socket.emit('clientSendMsg', msg);
        this.$refs.inputMsg.value = '';
      }
    },
    components: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

    .chatroom
      position: absolute
      bottom: 40px
      background-color: rgba(7, 17, 27, 0.5)
      font-size: 18px
      height: 100%
      width: 100%
      padding-top: 45px
      .msgRecord
        margin-top: 80px
        #msgList
          overflow: auto
          height: 300px
          .msg
            padding: 5px 5px 5px 10px
            // text-align: left
            display: flex
            &:nth-child(odd)
              background-color: rgba(255, 255, 255, 0.8)
            &:nth-child(even)
              background-color: rgba(255, 255, 255, 0.7)
            .name
              color: #440044
              font-family: Calibri
              font-weight: 700
              font-size: 17px
              line-height: 17px
            .text
              margin-left: 5px
              color: #07111b
              font-family: Heiti SC
              font-size: 15px
              line-height: 16px
            .date
              flex 1
              padding-right: 3px
              font-size: 6px
              text-align: right
              line-height: 18px
              color: rgba(7, 17, 27, 0.5)


      .sendMsg
        display: flex
        .input
          width: 100%
          margin:10px 10px 10px 10px
          font-size: 16px
          font-family: arial
          text-align: center

</style>
