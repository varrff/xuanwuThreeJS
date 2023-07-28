<template>
  <div id="cont">
    <img src="../assets/image/card_bg.png" alt="">
    <div v-if="type.indexOf('room')>-1">
      <h1>房间温度:{{ roomData.temperature }}°C</h1>
      <h1>房间湿度:{{ roomData.humidity }}%</h1>
      <h1>房间氧气浓度:{{ roomData.oxygenConcentration }}%</h1>
    </div>
    <div class="allContent" v-if="type.indexOf('all')>-1">
      <!-- <h1 class="room-title">大楼预警情况</h1> -->
      <h1>监控状态:{{ roomData.status }}</h1>
      <h1>设备异常数量:{{ roomData.abnormalNumberOfDevices }}</h1>
    </div>
  </div>
</template>
  
<script>

export default {
  data() {
    return { 
      type:'',
      roomData:null
    };
  },
  mounted() {
    this.type = 'all'
    this.$EventBus.$on('roomUI', data => {
      this.type = data.type
    })
  },
  watch:{
    type(newVal){
      if(newVal=='all'){
        this.roomData = {
          status:'正常',
          abnormalNumberOfDevices:0
        }
      }else if(newVal=='room1'){
        this.roomData = {
          temperature:28,
          humidity:40,
          oxygenConcentration:60
        }
      }else if(newVal=='room2'){
        this.roomData = {
          temperature:30,
          humidity:45,
          oxygenConcentration:51
        }
      }
    }
  }
};
</script>
  
<style scoped lang="less">
#cont {
  width: 25vw;
  height: 25vh;
  position: fixed;
  top: 10vh;
  z-index: 10;
  // .room-title{
  //   background-image: url('../assets/image/Vector\ 80.png');
  //   background-repeat: no-repeat;
  //   background-size: 150%;
  //   width: 100%;

  //   margin-top: 0;
  //   margin-left: 5%;
  //   color: #043e48;
  //   font-size: 40px;
  // }
  h1 {
    font-size: 35px;
    color: #03a9f4;
    margin-top: 5%;
  }

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  #charts {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
.allContent{

}
</style>
  