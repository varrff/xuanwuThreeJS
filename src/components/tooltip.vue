<template>
  <div class="tooltip-wrapper">
    <div class="tooltip bottom">
      <!-- <h3>{{ data['楼栋'] }}</h3>
        <h6>楼层: {{ data['楼层'] }}</h6> -->

      <div v-if="data['type'] !== '摄像头'">
        <button>历史记录</button>
      <button @click="clickCamera()">摄像头</button>
        <h6>设备号：{{ data['设备号'] }}</h6>
        <h6>气压值：{{ data['度数'] }}</h6>
        <qiguan-echarts :newValue="data['度数']" v-if="true" class="qiguan-echarts" />
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
button {
  font-size: 25px;
  cursor: pointer;
}

.qiguan-echarts {
  // margin-top: -30%;
}

.tooltip .bottom {
  width: 100%;
  height: 100%;
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
  background: linear-gradient(to bottom, #081a30, #003678);
  box-shadow: inset 0 0 10px rgba(13, 150, 255, 0.8);
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
</style>
  