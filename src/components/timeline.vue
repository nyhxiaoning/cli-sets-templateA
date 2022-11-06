<!--
 * @Author: ningyongheng
 * @Date: 2021-05-08 13:48:39
 * @LastEditTime: 2021-05-08 17:01:24
 * @LastEditors: Please set LastEditors
 * @Description: 自定义实现一个timeline的组件的使用，以后样式过于灵活的时间轴可以通过这个组件进行删增的修改实现不同timeline
-->

<template>
  <div class="nav-timeline-wrapper">
    <ul class="timeline-wrapper">
      <li class="timeline-item" v-for="(items,index) in timelineList" :key="items.id">
        <div class="timeline-box">
          <!-- 控制三种进度圆圈的颜色填充 -->
          <template>
            <!-- 已经完成的状态 -->
            <div v-if="items.status == 1" class="out-circle1">
              <div class="in-circle"></div>
            </div>
            <!-- 额外增加的区域线条控制 -->
            <div v-if="index ==2 || index ==5" class="line-stand"></div>
            <div v-if="index ==2 " class="line-vertical1"></div>
            <div v-if=" index ==2" class="rcorners1"></div>
            <div v-if=" index ==5" class="rcorners2"></div>

            <div v-if="index ==3" class="line-vertical-text">120</div>
            <div v-if="index ==6 || index ==10" class="line-stand"></div>
            <!-- <div v-if="index ==6 " class="line-vertical3"></div> -->
            <!-- <div v-if="index ==10" class="line-vertical4"></div> -->
            <div v-if=" index ==6" class="rcorners3"></div>
            <div v-if="index ==8" class="line-vertical-text2">急诊科</div>

            <div v-if=" index ==10" class="rcorners4"></div>

            <!-- <div v-if="index ==8" class="line-vertical2"></div> -->

            <!-- 正在进行的状态 -->

            <div v-if="items.status == 2" class="out-circle2">
              <div class="in-circle"></div>
            </div>
            <!-- 没有发生的状态 -->

            <div v-if="items.status == 3" class="out-circle3">
              <div class="in-circle"></div>
            </div>
          </template>

          <!-- 控制不同的时间线的线条的两类颜色 -->
          <template>
            <div v-if="items.status==1" class="long-line1"></div>
            <div v-else-if="items.status!=1" class="long-line2"></div>
          </template>
        </div>
        <div class="timeline-content">
          <div class="timeline-date">{{items.title}}</div>
          <div class="timeline-title">{{ items.title}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "timeline",
  props: {
    timelineList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style scoped lang="scss">
// 增加当前的水平线条的位置摆放
.nav-timeline-wrapper {
  margin-left: 100px;
}
// 最左边的横线的展示设置
.line-stand {
  width: 70px;
  height: 1px;
  background: #333333;
  margin-top: -9px;
  margin-left: -70px;
}

// 垂直时间轴的设置样式
ul.timeline-wrapper {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 时间线 */
.timeline-item {
  // 每一个组件必须有一个相对定位
  position: relative;

  .timeline-box {
    text-align: center;
    position: absolute;

    .out-circle1 {
      width: 16px;
      height: 16px;
      background: rgba(14, 116, 218, 0.1);
      // 已经完成的绿色
      // 00cc33
      // 当前的节点是黑色实心
      // 333333
      // 没有到达是黑色空心

      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
      /*opacity: 0.1;*/
      border-radius: 50%;
      display: flex;
      align-items: center;

      .in-circle {
        width: 14px;
        height: 14px;
        margin: 0 auto;
        background: #00cc33;
        border-radius: 50%;
        box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
      }
    }
    .out-circle2 {
      width: 16px;
      height: 16px;
      background: rgba(14, 116, 218, 0.1);
      // 已经完成的绿色
      // 00cc33
      // 当前的节点是黑色实心
      // 333333
      // 没有到达是黑色空心

      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
      /*opacity: 0.1;*/
      border-radius: 50%;
      display: flex;
      align-items: center;

      .in-circle {
        width: 14px;
        height: 14px;
        margin: 0 auto;
        background: rgb(14, 15, 15);
        border-radius: 50%;
        box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
      }
    }
    .out-circle3 {
      width: 16px;
      height: 16px;
      background: rgba(14, 116, 218, 0.1);
      // 已经完成的绿色
      // 00cc33
      // 当前的节点是黑色实心
      // 333333
      // 没有到达是黑色空心

      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
      /*opacity: 0.1;*/
      border-radius: 50%;
      display: flex;
      align-items: center;

      .in-circle {
        width: 14px;
        height: 14px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 50%;
        box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
      }
    }

    .long-line1 {
      width: 5px;
      height: 60px;
      background: #00cc33;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
      // opacity: 0.1;
      margin-left: 6px;
    }
    .long-line2 {
      width: 5px;
      height: 60px;
      background: #333333;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
      // opacity: 0.1;
      margin-left: 6px;
    }
    // 最左边，侧边线条文字第一个的设置样式
    .line-vertical-text {
      float: left;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-left: -90px;
      margin-top: 20px;
    }
    // 最左边，侧边线条文字第二个的设置样式
    .line-vertical-text2 {
      float: left;
      width: 60px;
      height: 20px;
      border-radius: 50%;
      margin-left: -100px;
      margin-top: -20px;
    }
    .line-vertical1 {
      float: left;
      // height: 110px;
      width: 2px;
      background: #333333;
      margin-left: -80px;
    }
    .line-vertical2 {
      float: left;
      // height: 110px;
      width: 2px;
      background: #333333;
      margin-top: -110px;
      margin-left: -80px;
    }
    .line-vertical3 {
      float: left;
      height: 150px;
      width: 2px;
      background: #333333;
      margin-left: -80px;
    }
    .line-vertical4 {
      float: left;
      height: 150px;
      width: 2px;
      background: #333333;
      margin-top: -150px;
      margin-left: -80px;
    }
    // 实现曲线的展示
    // 曲线1
    .rcorners1 {
      float: left;
      // border-radius: 20px;
      // background: #73ad21;
      padding: 20px;
      width: 40px;
      height: 60px;
      border-left: 1px solid black;
      margin-left: -80px;
      border-top-left-radius: 20px;
    }
    // 曲线2

    .rcorners2 {
      float: left;
      // border-radius: 20px;
      // background: #73ad21;
      padding: 20px;
      width: 40px;
      height: 60px;
      border-left: 1px solid black;
      margin-left: -80px;
      margin-top: -100px;
      border-bottom-left-radius: 20px;
    }
    // 曲线3

    .rcorners3 {
      float: left;
      // border-radius: 20px;
      // background: #73ad21;
      padding: 20px;
      width: 40px;
      height: 110px;
      border-left: 1px solid black;
      margin-left: -80px;
      margin-top: -0px;
      border-top-left-radius: 20px;
    }
    // 曲线4
    .rcorners4 {
      float: left;
      border-bottom-left-radius: 20px;
      // background: #73ad21;
      padding: 20px;
      width: 40px;
      height: 110px;
      border-left: 1px solid black;
      margin-top: -150px;
      margin-left: -80px;
    }
  }
  // 控制两个时间轴的高度和文案展示的内容
  .timeline-content {
    box-sizing: border-box;
    margin-left: 10px;
    height: 60px;
    padding: 0 0 0 20px;
    text-align: left;
    margin-bottom: 30px;

    .timeline-title {
      font-size: 14px;
      word-break: break-all;
      margin-bottom: 16px;
      color: #333;
      font-weight: 500;
      /*display: inline;*/
    }

    .timeline-date {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      margin-bottom: 16px;
    }
  }
}

.timeline-item:last-of-type .timeline-content {
  margin-bottom: 0;
}
</style>
