<template>
  <div class="tooltip-wrapper">
    <div class="tooltip bottom">
      <!-- <h3>{{ data['楼栋'] }}</h3>
        <h6>楼层: {{ data['楼层'] }}</h6> -->

      <div v-if="data['type'] !== '摄像头'">

        <h6 class="shebeiName">{{ data['设备号'] }}</h6>
        <h6 class="qiya-value">气压值：<span>{{ data['度数'] }}</span></h6>
        <qiguan-echarts :newValue="data['度数']" v-if="true" class="qiguan-echarts" />
        <button>历史记录</button>
      <button @click="clickCamera()">摄像头</button>
      </div>
      <div v-else>
        <h6>摄像头：{{ data['name'] }}</h6>
        <video autoplay loop controls muted src="" style="width: 300px;"></video>
      </div>
    </div>
  </div>
</template>
  
<script>
import QiguanEcharts from '@/components/QiguanEcharts.vue' 
import EventBus from "@/bus";
export default {
  name: '',
  components: { QiguanEcharts },
  props: ['data'],
  mounted() {
  },
  methods: {
    clickCamera() {
      // setTimeout(() => {
      //   this.data['type'] = "摄像头"
      //   EventBus.$emit("changeTooltip", {
      //     房间号: this.data['房间号'],
      //     度数: this.data.value,
      //     设备号: this.data['设备号'],
      //     type: this.data['type'],
      //     x: this.data.x,
      //     y: this.data.y,
      //     show: true,
      //   });
      //   console.log(this.data);
      // }, 100)
      window.location.href = "CvstVideoPlayer://version:v2.0;network:1;device:0;ip:M1lNVFBCRk5TNlg5TVM2VjExMUE=;port:NDQwMA==;username:YWRtaW4=;password:YWJ4MTIzNDU2;style:1;videoChannel:7;talkChannel:;expand:20;top:1;expand:20"
    }
  }
};
</script>
<style lang="less" scoped>
.shebeiName{
  color: #add7ff;
  font-size: 35px !important;
  font-style: italic;
  font-family: "Microsoft YaHei", "SimHei", "Heiti SC", STXihei, "WenQuanYi Micro Hei", sans-serif;
}
.qiya-value{
  margin-top: 45px;
  font-size: 25px !important;
  span{
    color: #ffffff;
    z-index: 10;
  }
}


.qiguan-echarts {
  // margin-top: -30%;
}

.tooltip .bottom {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.tooltip-wrapper {
  display: inline-block;
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
  opacity: 1;
  transition: none;
  z-index: 3;
  // width: 30vw;
  // height: 50vh;
}

.tooltip-wrapper .tooltip {
  padding: 10px 15px 15px 15px;
  border-radius: 0;
  display: inline-block;
  position: relative;
  margin-left: -50%;
  margin-top: -100%;
  top: -83px;
  opacity: 1;
  border: 1px solid #2294ff;
  // background: linear-gradient(to bottom, #081a30, #003678);
  box-shadow: inset 0 0 10px rgba(13, 150, 255, 0.8);
  overflow: hidden;
}

.tipnav {
  position: relative;
  z-index: 10;
}

.tooltip-wrapper .tooltip::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
  pointer-events: none;
}

.tooltip-wrapper .tooltip::before {
  background: url('./../assets/image/mdbg.png') center top no-repeat,
    url(./../assets/image/ft_mdbg.png) left bottom no-repeat;
}

.tooltip-wrapper .tooltip>h3 {
  font-size: 32px;
  position: initial !important;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px 0 13px 0;
  text-align: center;
}

.tooltip-wrapper .tooltip>h3:before {
  position: absolute;
  content: '';
  pointer-events: none;
  left: -10px;
  top: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background: rgba(5, 7, 9, 0.2);
  border: 1px solid rgba(124, 192, 255, 0.1);
  z-index: -1;
}

.tooltip-wrapper .tooltip h6 {
  font-size: 24px;
  height: 36px;
}
// button
button {
 --glow-color: rgb(217, 176, 255);
 --glow-spread-color: rgba(191, 123, 255, 0.781);
 --enhanced-glow-color: rgb(231, 206, 255);
 --btn-color: rgb(100, 61, 136);
 border: .25em solid var(--glow-color);
 padding: .5em 1.5em;
 color: var(--glow-color);
 font-size: 16px;
 font-weight: bold;
 background-color: var(--btn-color);
 border-radius: 1em;
 outline: none;
 box-shadow: 0 0 1em .25em var(--glow-color),
        0 0 4em 1em var(--glow-spread-color),
        inset 0 0 .75em .25em var(--glow-color);
 text-shadow: 0 0 .5em var(--glow-color);
 position: relative;
 transition: all 0.3s;
 cursor:pointer;
//  margin-left: 5%;
}

button::after {
 pointer-events: none;
 content: "";
 position: absolute;
 top: 120%;
 left: 0;
 height: 100%;
 width: 100%;
 background-color: var(--glow-spread-color);
 filter: blur(2em);
 opacity: .7;
 transform: perspective(1.5em) rotateX(35deg) scale(1, .6);
}

button:hover {
 color: var(--btn-color);
 background-color: var(--glow-color);
 box-shadow: 0 0 1em .25em var(--glow-color),
        0 0 4em 2em var(--glow-spread-color),
        inset 0 0 .75em .25em var(--glow-color);
}

button:active {
 box-shadow: 0 0 0.6em .25em var(--glow-color),
        0 0 2.5em 2em var(--glow-spread-color),
        inset 0 0 .5em .25em var(--glow-color);
}
</style>
  