<template>
  <div v-show="!(isLogin&&isConnect)" class="login">
    <div class="background">
      <div class="imgWrap"></div>
      <img src="./canvas.png">
    </div>
    <span class="text">请输入用户名</span>
    <div class="regist">
      <input class="input" ref="inputName" @keyup.enter="sendName()">
      <button class="sendBtn" @click="sendName()">进入房间</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import bus from '../../bus';
  export default {
    name: 'login',
    data() {
      return {
        isLogin: this.isLogin,
        isConnect: this.isConnect
      };
    },
    created() {
      this.isLogin = false;
      this.isConnect = false;
    },
    sockets: {
      connect: function () {
        // 建立链接后
        console.log('connect....');
        this.isConnect = true;
      }
    },
    methods: {
      sendName() {
        let name = this.$refs.inputName.value;
        let pattern = /^[\w\u4e00-\u9fa5]+$/gi;

        if (pattern.test(name)) {
          if (this.$refs.inputName.value.trim() !== '') {
            let name = this.$refs.inputName.value;
            // this.$socket.emit('clientName', name);
            this.isLogin = true;
            let id = new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100);
            this.playerInfo = {
              userId: id,
              userName: name,
              avatar: 'https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/8ad4b31c8701a18bbef9f231982f07082838feba.jpg'
            };
            //
            this.$socket.emit('login', this.playerInfo);
            console.log(`新用户 ${name} 已经注册, id 为${id}`);
            // 向总线
            bus.$emit('isLogin', this.playerInfo);
          }
        } else {
          // alert('好好输入');
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    position: fixed // 成绝对定位的元素
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    text-align: center
    margin: 0 auto
    overflow: auto
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 1)
    .background
      img
        width: 800px
        height: 590px
    .text
      font-size: 45px
      color: aliceblue
      line-height: 100px
    .regist
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
