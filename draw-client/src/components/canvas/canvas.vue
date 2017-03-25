<template>
  <div class="canvas">
    <div class="wrap">
      <canvas
        id="canvas"
        @mousedown="canvasDown($event)"
        @mouseup="canvasUp($event)"
        @mousemove="canvasMove($event)"
        @touchstart="canvasDown($event)"
        @touchend="canvasUp($event)"
        @touchmove="canvasMove($event)"
      >
      </canvas>
    </div>
  </div>
</template>
<script>
  export default {
    sockets: {
      customEmit: function (appendPathArray) {
        // 接收画图路径更新;
        this.redraw(appendPathArray);
      }
    },
    data () {
      return {
        config: {
          lineWidth: 1,
          lineColor: '#f2849e',
          shadowBlur: 2
        },
        route: {}
      };
    },
    created() {
      this.tempPathArray = [];
    },
    mounted () {
      const canvas = document.querySelector('#canvas');
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight - 128;
      this.context = canvas.getContext('2d');
      this.setCanvasStyle();
    },
    methods: {
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
        this.canvasMoveUse = true;
        // client是基于整个页面的坐标
        // offset是cavas距离顶部以及左边的距离
        const canvasX = e.clientX - e.target.parentNode.offsetLeft;
        const canvasY = e.clientY - e.target.parentNode.offsetTop;
        this.setCanvasStyle();
        // 清除子路径
        this.context.beginPath();
        this.context.moveTo(canvasX, canvasY);
        // console.log('moveTo', canvasX, canvasY);
        // 当前绘图表面状态
        // const preData = this.context.getImageData(0, 0, 600, 400);
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
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .canvas
    .wrap
      // padding: 0 12px 0 12px
      width: 100%
      canvas
        background-color: #505050
        width: auto
</style>
