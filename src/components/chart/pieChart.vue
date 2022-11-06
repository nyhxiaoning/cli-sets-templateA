<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '520px'
    },
    height: {
      type: String,
      default: '350px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initChart()
      }, 0)
    })
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions();
    },
    setOptions(value) {
      const legend = value ? value.legend : [];
      const data = value ? value.data : [];
      let count = 0;
      for (let value of data) {
        count += value.value;
      }
      this.chart.setOption({
        // title : {
        //   text: '{name|比赛总数}\n{val|' + count + '}',
        //   top: '35%',
        //   left: '50%',
        //   textStyle: {
        //     rich: {
        //       name: {
        //         fontSize: 16,
        //         color: '#4E5969',
        //         padding: [20, 0, 0, -35],
        //         lineHeight: 30
        //       },
        //       val: {
        //         fontSize: 18,
        //         color: '#393D43',
        //         fontWeight: 800,
        //         align: 'center',
        //         padding: [0, 0, 0, -35],
        //         lineHeight: 30
        //       }
        //     }
        //   }
        // },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255,255,255,0.7)',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          left: 'center',
          icon: "circle",
          bottom: '0%',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 16,
          data: legend
        },
        color: ['#249EFF','#21CCFF'],
        series: [
          {
            name: '性别分布',
            type: 'pie',
            avoidLabelOverlap: false,
            // radius: ['30%', '55%'],
            startAngle: 60,
            minAngle: 10,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{d}%'
                },
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true
                },
                labelLine: {
                  show: true
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(36, 158, 255, 0.8)'
                },
                smooth: 0.8
              }
            },
            data: data
          }
        ]
      })
    }
  }
}
</script>
