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
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['7-8岁', '9-10岁', '11-12岁', '13-15岁', '16-18岁'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              color: '#4E5969',
              // interval: 0  //设置 X 轴数据间隔几个显示一个，为0表示都显示
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
            color: '#4E5969',
              formatter: function(arg) {
                return numFormat(arg);
              }
              // interval: 0  //设置 X 轴数据间隔几个显示一个，为0表示都显示
            },
          }
        ],
        series: [
          {
            name: '年龄分布',
            type: 'bar',
            barWidth: '14',
            itemStyle: {
              color: '#4086FF',
		          barBorderRadius: [10, 10, 10, 10]
            },
            data: [10, 52, 200, 334, 390]
          }
        ]
      })
    }
  }
}
</script>
