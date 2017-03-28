<template>
  <div class="canvas">
    <div class="newMsg">
      <!--<span> {{' '+ newMsg.name}}：{{newMsg.msg}}</span>-->
      <span v-if="newMsg">{{newMsg.name}} say: {{newMsg.msg}}</span>
    </div>
    <div class="wrap">
      <canvas
        id="canvas"
        @mousedown="canvasDown($event)"
        @mouseup="canvasUp($event)"
        @mousemove="canvasMove($event)"
        @touchstart="touchStart($event)"
        @touchend="touchUp($event)"
        @touchmove="touchMove($event)"
      >
      </canvas>
      <v-chatroom v-show="isChat"></v-chatroom>
      <div v-show="isPop" class="pop">
        <div v-show="switchBtn==1" class="setBrush">
          <div class="circle" id="brush1" @click="setBrush(1)"></div>
          <div class="circle" id="brush2" @click="setBrush(2)"></div>
          <div class="circle" id="brush3" @click="setBrush(3)"></div>
          <div class="circle" id="brush4" @click="setBrush(4)"></div>
          <div class="circle" id="brush5" @click="setBrush(5)"></div>
        </div>
        <div v-show="switchBtn==2" class="pallete">
          <ul class="rowList">
            <li v-for="(row, index) in pallete">
              <!---->
              <ul class="colorRow">
                <li v-for="color in row">
                  <div class="squre"
                       :id="color.color"
                       @click="setColor($event)"
                       :style="{'background-color': color.color}">
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="config">
        <!--手写笔 铅笔 荧光笔
        颜色 粗细-->
        <img src="./chat.png" @click="showChat">
        <!-- <img src="./pencil.png" @click="erase">-->
        <img src="./paintbrush.png" @click="chat(1)">
        <img src="./palette.png" @click="chat(2)">
        <img src="./previous.png" @click="pre">
        <img src="./next.png" @click="next">
        <img src="./clear.png" @click="clear">
      </div>

    </div>
  </div>
</template>
<script>
  import bus from '../../bus';
  import chatroom from '../chatroom/chatroom';

  export default {
    name: 'canvas',
    data () {
      return {
        config: {
          lineWidth: 1,
          lineColor: '#07111b',
          shadowBlur: 1
        },
        route: {},
        isPop: this.isPop,
        switchBtn: this.switchBtn,
        isChat: this.isChat,
        newMsg: this.newMsg
      };
    },
    sockets: {
      appendPath: function (appendPathArray) {
        // 接收画图路径更新;
        this.appendPath(appendPathArray);
        // console.log(appendPathArray);
      },
      clear: function () {
        let canvas = document.querySelector('canvas');
        canvas.height = canvas.height;
      }
    },
    created() {
      this.tempPathArray = [];
      this.isPop = false;
      this.switchBtn = 0;
      this.isChat = false;
      this.pallete = [
        [{
          name: '红',
          color: '#c62938'
        },
          {
            name: '橙',
            color: '#fa931e'
          },
          {
            name: '金',
            color: '#ffce1f'
          },
          {
            name: '黄',
            color: '#faf320'
          }],

        [{
          name: '绿',
          color: '#a4e617'
        },
          {
            name: '深绿',
            color: '#167d1d'
          },
          {
            name: '鲜绿',
            color: '#38d180'
          },
          {
            name: '浅蓝',
            color: '#3db8ff'
          }],

        [{
          name: '深蓝',
          color: '#1353ba'
        },
          {
            name: '紫',
            color: '#8252d1'
          },
          {
            name: '玫瑰红',
            color: '#ff73a6'
          },
          {
            name: '褐',
            color: '#904c15'
          }],

        [{
          name: '深灰',
          color: '#404040'
        },
          {
            name: '灰色',
            color: '#808080'
          },
          {
            name: '浅灰',
            color: '#a0a0a0'
          },
          {
            name: '白色',
            color: '#ffffff'
          }
        ]];
    },
    mounted () {
      const canvas = document.querySelector('#canvas');
      canvas.width = window.innerWidth - 22;
      canvas.height = window.innerHeight - 128;
      this.context = canvas.getContext('2d');
      this.setCanvasStyle();
      let VUEcanvas = this;
      bus.$on('newMsg', function (msg) {
        // console.log(msg);
        VUEcanvas.newMsg = msg;
      });
      var overscroll = function (el) {
        el.addEventListener('touchstart', function () {
          var top = el.scrollTop;
          var totalScroll = el.scrollHeight;
          var currentScroll = top + el.offsetHeight;
          // If we're at the top or the bottom of the containers
          // scroll, push up or down one pixel.
          //
          // this prevents the scroll from "passing through" to
          // the body.
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
      overscroll(document.querySelector('canvas'));
      // overscroll(document.querySelector('#msgList'));
      document.body.addEventListener('touchmove', function (evt) {
        // In this case, the default behavior is scrolling the body, which
        // would result in an overflow.  Since we don't want that, we preventDefault.
        if (!evt._isScroller) {
          evt.preventDefault();
        }
      });
    },
    methods: {
      showChat () {
        this.isChat = !this.isChat;
      },
      setColor (e) {
        let lineColor = e.target.id;
        this.isPop = !this.isPop;
        this.config.lineColor = lineColor;
        document.querySelector('#brush1').style.backgroundColor = lineColor;
        document.querySelector('#brush2').style.backgroundColor = lineColor;
        document.querySelector('#brush3').style.backgroundColor = lineColor;
        document.querySelector('#brush4').style.backgroundColor = lineColor;
        document.querySelector('#brush5').style.backgroundColor = lineColor;
      },
      setBrush (brushNum) {
        // console.log(num);
        this.isPop = !this.isPop;
        this.config.shadowBlur = brushNum;
        this.config.lineWidth = brushNum;
      },
      chat (num) {
        this.isPop = !this.isPop;
        // this.isPop = true;
        this.switchBtn = num;
        // console.log(document.querySelector('.input').user);
        // document.querySelector('.input').onfocus = true;
      },
      erase () {
      },
      clear () {
        let canvas = document.querySelector('canvas');
        canvas.height = canvas.height;
        this.$socket.emit('clear');
      },
      pre () {
      },
      next () {
      },
      touchUp(e) {
        this.canvasMoveUse = false;
        // console.log(this.pathArray);
        this.$socket.emit('path', this.tempPathArray);
        this.tempPathArray = [];
      },
      touchMove(e) {
        let te = e.changedTouches[0];
        if (this.canvasMoveUse) {
          // console.log('canvasMove');
          // const t = e.target;
          const canvasX = te.clientX - te.target.parentNode.offsetLeft;
          const canvasY = te.clientY - te.target.parentNode.offsetTop;

          this.context.lineTo(canvasX, canvasY);
          this.context.stroke();
          this.tempPathArray.push({
            point: {
              x: canvasX,
              y: canvasY
            },
            lineColor: this.config.lineColor,
            lineWidth: this.config.lineWidth,
            shadowBlur: this.config.shadowBlur
          });
        }
      },
      touchStart(e) {
        let te = e.changedTouches[0];
        this.canvasMoveUse = true;
        const canvasX = te.clientX - te.target.parentNode.offsetLeft;
        const canvasY = te.clientY - te.target.parentNode.offsetTop;
        this.setCanvasStyle();
        this.context.beginPath();
        this.context.moveTo(canvasX, canvasY);
        // console.log(te);
      },
      canvasMove (e) {
        if (this.canvasMoveUse) {
          // console.log('canvasMove');
          // const t = e.target;
          let canvasX;
          let canvasY;
          // canvasX = e.clientX - t.parentNode.offsetLeft;
          // canvasY = e.clientY - t.parentNode.offsetTop;
          canvasX = e.offsetX;
          canvasY = e.offsetY;
          this.context.lineTo(canvasX, canvasY);
          this.context.stroke();
          this.tempPathArray.push({
            point: {
              x: canvasX,
              y: canvasY
            },
            lineColor: this.config.lineColor,
            lineWidth: this.config.lineWidth,
            shadowBlur: this.config.shadowBlur
          });
        }
      },
      // mouseup
      canvasUp (e) {
        // console.log('canvasUp');
        this.canvasMoveUse = false;
        // console.log(this.pathArray);
        this.$socket.emit('path', this.tempPathArray);
        this.tempPathArray = [];
      },
      // mousedown
      canvasDown (e) {
        // console.log('canvasDown');
        if (e.changedTouches) {
          console.log('是触摸');
        }
        this.canvasMoveUse = true;
        // client是基于整个页面的坐标
        // offset是cavas距离顶部以及左边的距离
        const canvasX = e.clientX - e.target.parentNode.offsetLeft;
        const canvasY = e.clientY - e.target.parentNode.offsetTop;
        this.setCanvasStyle();
        this.context.beginPath();
        this.context.moveTo(canvasX, canvasY);
      },
      // 设置绘画配置
      setCanvasStyle () {
        this.context.lineWidth = this.config.lineWidth;
        this.context.shadowBlur = this.config.shadowBlur;
        this.context.shadowColor = this.config.lineColor;
        this.context.strokeStyle = this.config.lineColor;
      },
      appendPath(appendPathArray) {
        // let paintArray = this.route.temp;
        // console.log(paintArray[0]);
        const canvas = document.querySelector('#canvas');
        let context = canvas.getContext('2d');
        // this.setCanvasStyle();
        // let canvasX = 0;
        // let canvasY = 0;
        // context.clearRect(0, 0, 600, 600);
        for (let i = 0; i < appendPathArray.length - 1; i++) {
          // console.log(i);
          context.beginPath();
          context.strokeStyle = appendPathArray[i].lineColor;
          context.lineWidth = appendPathArray[i].lineWidth;
          context.shadowBlur = appendPathArray[i].shadowBlur;
          context.shadowColor = appendPathArray[i].lineColor;
          context.lineTo(appendPathArray[i].point.x, appendPathArray[i].point.y);
          context.lineTo(appendPathArray[i + 1].point.x, appendPathArray[i + 1].point.y);
          context.stroke();
          context.closePath();
        }
      }
    },
    components: {
      'v-chatroom': chatroom
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon";
  @-webkit-keyframes 'wobble'
    0%
      margin-left: 400px
    100%
      margin-left: -400px
  .canvas
    .wrap
    // width: 100%
      overflow: hidden
      position: relative
      canvas
        background-color: #ffffff
        width: auto
        border: 1px solid #07111b
        border-top: 0
        border-bottom: 0
        margin-bottom: 2px
      .pop
        background-color #bfbfbf
        border-top: 1px solid rgba(7, 17, 27, 0.8)
        position: absolute
        bottom: 43px
        height: 20%
        width: 100%
        .setBrush
          text-align: center
          .circle
            display: inline-block
            margin: 30px 20px 10px 20px
            border-radius: 50%
            background-color #07111b
          #brush1
            width: 10px
            height: 10px
          #brush2
            width: 12px
            height: 12px
          #brush3
            width: 14px
            height: 14px
          #brush4
            width: 16px
            height: 16px
          #brush5
            width: 18px
            height: 18px

        .pallete
          position: relative
          display flex
          vertical-align: center
          .rowList
            padding: 10px 0 10px 0

            text-align: center
            li
              display: inline-block
              .colorRow
                margin: 0 5px 5px 5px
                .squre
                  margin: 0px 5px 5px 5px
                  width: 25px
                  height: 25px
                  border-radius: 6px

      .config
        text-align: center
        bottom: 0
        img
          padding: 0 5px 5px 5px
          &:active
            box-shadow: 0 0 10px #07111b
          &:nth-child(1)
            &:hover
              box-shadow: 0 0 10px #07111b
          &:nth-child(2)
            &:hover
              box-shadow: 0 0 10px #07111b
          &:nth-child(3)
            &:hover
              box-shadow: 0 0 10px #07111b
    .newMsg
      height: 20px
      width: 100%
      background-color: rgba(7, 17, 27, 0.5)
      // font-size: 18px
      line-height:20px
      white-space nowrap
      span
        font-size: 14px
        color: #ffffff
        -webkit-animation-name: 'wobble'; /*动画属性名，也就是我们前面keyframes定义的动画名*/
        -webkit-animation-duration: 8s; /*动画持续时间*/
        -webkit-animation-timing-function: ease-in-out;
        /*动画频率，和transition-timing-function是一样的*/
        -webkit-animation-delay: 0s;
        /*动画延迟时间*/
        -webkit-animation-iteration-count: infinite;
        /*定义循环资料，infinite为无限次*/
        -webkit-animation-direction: alternate;

</style>
