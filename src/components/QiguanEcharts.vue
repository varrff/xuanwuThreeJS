<template>
    <div id="cont">
      <!-- <img src="../assets/image/card_bg.png" alt=""> -->
      <div id="charts" ref="chart" style="width: 100%; height: 100%"></div>
    </div>
  </template>
  
  <script>
  
  export default {
    props:['newValue'],
    data() {
      return {
        qigangIsShow:false,
        chart: null
      };
    },
    watch:{
      newValue(newVal){
        console.log(newVal);
          this.chart.setOption({
          series: [
            {
              data: [
                {
                  value:newVal
                }
              ]
            }
          ]
        });
      }
    },
    mounted() {
      this.chart = this.$echarts.init(this.$refs.chart);
      this.chart.setOption({
          series: [
            {
              type: 'gauge',
              min: 0, // 最小值
              max: 600, // 最大值
              axisLine: {
                lineStyle: {
                  width: 18,
                  color: [
                    [0.3, '#67e0e3'],
                    [0.8, '#37a2da'],
                    [1, '#fd666d']
                  ]
                }
              },
              pointer: {
                itemStyle: {
                  color: 'auto'
                }
              },
              axisTick: {
                distance: -30,
                length: 8,
                lineStyle: {
                  color: '#fff',
                  width: 2
                }
              },
              splitLine: {
                distance: 10,
                length: 10,
                lineStyle: {
                  color: '#74e4e4',
                  width: 1
                }
              },
              axisLabel: {
                color: 'inherit',
                distance: 30,
                fontSize: 15
              },
              detail: {
                valueAnimation: true,
                formatter: '{value} km/h',
                color: 'inherit'
              },
              data: [
                {
                  value: this.newValue
                }
              ]
            }
          ]
        });
        console.log(this.newValue);
      //模拟接口数据
      // setInterval(() => {
      //   this.chart.setOption({
      //     series: [
      //       {
      //         data: [
      //           {
      //             value: +(Math.random() * 100).toFixed(2)
      //           }
      //         ]
      //       }
      //     ]
      //   });
      // }, 2000);
    }
  };
  </script>
  
  <style scoped lang="less">
  #cont{
    width: 25vw;
    height:25vh;
    position: relative;
    z-index: 10;
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
  