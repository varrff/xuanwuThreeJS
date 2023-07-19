<template>
    <div id="cont">
      <img src="../assets/image/card_bg.png" alt="">
      <h1>房间温度:{{ 30 }}°C</h1>
      <h1>房间湿度:{{ 30 }}%</h1>
      <h1>房间氧气浓度:{{ 30 }}%</h1>
      <!-- <div id="charts" ref="chart" style="width: 100%; height: 100%"></div> -->
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        qigangIsShow:false     
      };
    },
    mounted() {
    }
  };
  </script>
  
  <style scoped lang="less">
  #cont{
    width: 25vw;
    height:25vh;
    position: fixed;
    top: 10vh;
    z-index: 10;
    h1{
        font-size: 35px;
        color: #d0cfcf;
        margin-top: 5%;
    }
    img{
      width: 100%;
      height:100%;
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

  </style>
  