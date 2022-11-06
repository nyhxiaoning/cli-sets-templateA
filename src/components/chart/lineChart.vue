<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
function numFormat(num) {
  if (num >= 10000) {
    num = Math.round(num / 1000) / 10 + 'w';
  } else if (num >= 1000) {
    num = Math.round(num / 100) / 10 + 'k';
  }
  return num;
}
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
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
      this.initChart();
    });
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions();
    },
    setOptions(value) {
      const date = value ? value.date : [];
      const data = value ? value.data : [];
      const fullDate = value ? value.fullDate : {};
      this.chart.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#4E5969',
            // interval: 0  //设置 X 轴数据间隔几个显示一个，为0表示都显示
          },
          data: date
        },
        yAxis: {
          type: 'value',
          minInterval: 1,//只显示整数
          axisLine: {
            show: false
          },
          splitLine: {
            show: true
          },
          axisLabel: {
            color: '#4E5969',
            formatter: function(arg) {
              return numFormat(arg);
            }
            // interval: 0  //设置 X 轴数据间隔几个显示一个，为0表示都显示
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: {
                type: 'line',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(255, 255, 255, 0)'
                }, {
                  offset: 1, color: 'rgba(22, 93, 255, 0.5)'
                }]
              },
              type: 'solid',
              width: 30
            },
            axis: 'auto',
            snap: true
          },
          backgroundColor: 'rgba(240, 245, 253, 0.8)',
          showContent: true,
          confine: true,
          textStyle: { // 提示框浮层的文本样式。
            color: '#000000',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 14,
          },
          padding: [0, 0, 0, 0],
          borderWidth: 0,
          borderRadius: 6,
          extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);',
          formatter: function(arg) {
            return '<div class="subformater"><div class="title">' + fullDate[arg[0].name] + '</div><div class="info"><h3>新增人数</h3><h4>' + (arg[0].data) + '<span>个</h4></h4></div></div>'
          }
        },
        grid: {
          top: '10%',
          left: '24px',
          right: '24px',
          bottom: '24px',
          containLabel: true
        },
        series: [
          {
            data: data,
            type: 'line',
            // symbolSize: 2,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 8, //拐点大小
            color: 'rgba(0, 0, 0, 0.2)',
            itemStyle: {
              normal: {
                color: "#165DFF",
                borderWidth: 3,
                borderColor: '#CDDCFF',
                lineStyle:{
                  width: 2,
                  type: 'solid',
                  color : '#165dff'
                }
              }
            },
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(22,93,255, 0.5)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(22,93,255, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="less">
.subformater {
  width: 185px;
  border-radius: 6px;
  margin: 8px;
  .title {
    font-size: 12px;
    margin-left: 6px;
    margin-bottom: 4px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: LEFT;
    color: #1d2129;
    line-height: 20px;
  }
  .info {
    line-height: 32px;
    padding: 0 10px;
    background: rgba(255, 255, 255, .9);
    border-radius: 4px;
    box-shadow: 6px 0 20px 0 rgba(34, 87, 188, .1);
    font-size: 12px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #86909c;
    display: flex;
    align-items: center;
    &::before {
      content: " ";
      width: 10px;
      height: 10px;
      background: #165dff;
      border-radius: 50%;
      display: inline-block;
      margin-right: 8px;
    }
    h3 {
      flex: 1;
      margin: 0;
    }
    h4 {
      color: #1d2129;
      margin: 0;
      span {
        margin-left: 5px;
        color: #86909c;
      }
    }
  }
}
</style>
