<template>
  <div class="canvas">
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
      <!--<v-tuya></v-tuya>-->
      <div v-show="isPop" class="pop">
        <v-chatroom></v-chatroom>
        <div class="setBrush">
          <div class="circle" id="s"></div>
          <div class="circle" id="m"></div>
          <div class="circle" id="l"></div>
        </div>
        <div class="pallete">
          <ul class="rowList">
            <li v-for="row in pallete">
              <!---->
              <ul class="colorRow">
                <li v-for="color in row">
                  <div class="squre"
                       :id="color.color"
                       @click="selectColor($event)"
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
        <img src="./chat.png" @click="chat">
        <!-- <img src="./pencil.png" @click="erase">-->
        <img src="./paintbrush.png" @click="erase">
        <img src="./palette.png" @click="erase">
        <img src="./previous.png" @click="pre">
        <img src="./next.png" @click="next">
        <img src="./clear.png" @click="clear">
      </div>
    </div>
  </div>
</template>
<script>
  // import bus from '../../bus';
  import chatroom from '../chatroom/chatroom';

  export default {
    name: 'canvas',
    data () {
      return {
        config: {
          lineWidth: 1,
          lineColor: '#f2849e',
          shadowBlur: 2
        },
        route: {},
        isPop: this.isPop,
        pallete: this.pallete
      };
    },
    sockets: {
      appendPath: function (appendPathArray) {
        // 接收画图路径更新;
        this.redraw(appendPathArray);
      },
      clear: function () {
        let canvas = document.querySelector('canvas');
        canvas.height = canvas.height;
      }
    },
    created() {
      this.tempPathArray = [];
      this.isPop = false;
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
            color: '#bfbfbf'
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
      canvas.height = window.innerHeight - 108;
      this.context = canvas.getContext('2d');
      this.setCanvasStyle();
      document.ontouchmove = function (e) {
        e.preventDefault();
      };
      this.pallete.forEach(function (color, index) {
        // var colorNum = color.color;
        // colorNum = colorNum.slice(1);
      });
    },
    methods: {
      selectColor (e) {
        console.log(e.target.id);
      },
      chat () {
        this.isPop = !this.isPop;
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
            x: canvasX,
            y: canvasY
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
            x: canvasX,
            y: canvasY
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
      redraw(appendPathArray) {
        // let paintArray = this.route.temp;
        // console.log(paintArray[0]);
        const canvas = document.querySelector('#canvas');
        let context = canvas.getContext('2d');
        // this.setCanvasStyle();
        // let canvasX = 0;
        // let canvasY = 0;
        this.context.beginPath();
        // context.clearRect(0, 0, 600, 600);
        for (let i = 0; i < appendPathArray.length - 1; i++) {
          // console.log(i);
          context.lineTo(appendPathArray[i].x, appendPathArray[i].y);
          context.lineTo(appendPathArray[i + 1].x, appendPathArray[i + 1].y);
          context.stroke();
        }
        context.closePath();
      }
    },
    components: {
      'v-chatroom': chatroom
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon";
  .canvas
    .wrap
      width: 100%
      canvas
        background-color: #ffffff
        width: auto
        border: 1px solid #07111b
        border-top: 0
      .pop
        position: fixed
        bottom: 300px
        height: 20%
        width: 100%
        .setBrush
          width: 80px
          height: 40px
          .circle
            display: inline-block
            vertical-align: middle
            border-radius: 50%
            background-color #007ab7
          #s
            width: 12px
            height: 12px
          #m
            width: 15px
            height: 15px
          #l
            width: 20px
            height: 20px

        .pallete
          .rowList
            display: flex
            margin: 0 20px 20px 20px
            .colorRow
              margin: 0 20px 20px 20px
              .squre
                margin: 10px 20px 10px 20px
                width: 30px
                height: 30px
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
</style>
