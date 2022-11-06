<template>
  <div class="header-container">
    <div class="header-warpper">
      <img
        v-if="showBack"
        src="@/assets/common/back-icon.png"
        alt
        class="go-back"
        @click="goBack"
      />
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<script setup>
import { getNavHeight } from '@/utils/index.js';

const emit = defineEmits(['goBack']);
const navigationBarHeight = ref('');
const statusBarHeight = ref('');
const height = ref('');

init();
async function init() {
  if (window.JeeWeb?.deviceInfo?.statusBarHeight) {
    navigationBarHeight.value = getNavHeight() + 'px';
    statusBarHeight.value = JeeWeb.deviceInfo.statusBarHeight + 'px';
    height.value = JeeWeb?.deviceInfo?.statusBarHeight + getNavHeight() + 'px';
  } else {
    navigationBarHeight.value = getNavHeight() + 'px';
    statusBarHeight.value = 0 + 'px';
    height.value = getNavHeight() + 'px';
  }
  console.log(navigationBarHeight, '-------------navigationBarHeight', height);
  // getDetail();
}

const props = defineProps({
  // 是否展示返回按钮
  showBack: {
    type: Boolean,
    default: false
  },
  // title 名称
  title: {
    type: String,
    default: ''
  },
  // title 颜色
  color: {
    type: String,
    default: '#fff'
  },
  layerColor: {
    type: String,
    default: 'transparent'
  }
});

const { title, showBack, layerColor } = toRefs(props);

function goBack() {
  emit('goBack');
}
// setup code
</script>

<style lang="scss" scoped>
.header-container {
  height: v-bind("height");
  background: v-bind("layerColor");
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
  &::before {
    content: "";
    display: block;
    height: v-bind("height");
    width: 100%;
  }
  .header-warpper {
    position: absolute;
    top: v-bind("statusBarHeight");
    width: 100%;
    height: v-bind("navigationBarHeight");
    display: flex;
    justify-content: center;
    align-items: center;
    .go-back {
      width: 0.46rem;
      height: 0.46rem;
      position: absolute;
      top: 50%;
      left: 0.32rem;
      transform: translateY(-50%);
    }
    .title {
      font-size: 0.32rem;
      font-family: SourceHanSansCN, SourceHanSansCN-Medium;
      font-weight: 500;
      text-align: center;
      color: v-bind(color);
      line-height: v-bind("navigationBarHeight");
      letter-spacing: 0.02rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .toolbar {
      position: absolute;
      top: 50%;
      right: 0.31rem;
      transform: translateY(-50%);
      width: 1.48rem;
      height: 0.54rem;
      background: rgba(255, 255, 255, 0.5);
      border: 0.01rem solid rgba(0, 0, 0, 0.1);
      border-radius: 0.27rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .more-icon {
        width: 0.37rem;
        height: 0.37rem;
      }
      .close-icon {
        margin-left: 0.33rem;
        width: 0.37rem;
        height: 0.37rem;
      }
    }
  }
}
</style>
