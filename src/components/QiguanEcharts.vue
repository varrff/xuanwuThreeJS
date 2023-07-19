<template>
    <div id="cont">
      <!-- <img src="../assets/image/card_bg.png" alt=""> -->
      <div id="charts" ref="chart" style="width: 100%; height: 100%"></div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        qigangIsShow:false,
        chart: null,
        option: {
          series: [
            {
              type: 'gauge',
              axisLine: {
                lineStyle: {
                  width: 25,
                  color: [
                    [0.3, '#67e0e3'],
                    [0.7, '#37a2da'],
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
                distance: -30,
                length: 30,
                lineStyle: {
                  color: '#fff',
                  width: 4
                }
              },
              axisLabel: {
                color: 'inherit',
                distance: 40,
                fontSize: 13
              },
              detail: {
                valueAnimation: true,
                formatter: '{value} km/h',
                color: 'inherit'
              },
              data: [
                {
                  value: 70
                }
              ]
            }
          ]
        }
      };
    },
    mounted() {
      this.chart = this.$echarts.init(this.$refs.chart);
      this.chart.setOption(this.option);

      //模拟接口数据
      setInterval(() => {
        this.chart.setOption({
          series: [
            {
              data: [
                {
                  value: +(Math.random() * 100).toFixed(2)
                }
              ]
            }
          ]
        });
      }, 2000);
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
  