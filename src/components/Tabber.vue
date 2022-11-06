<template>
  <div style="width:100%;height:12.5vw">
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item>
        <span>主页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item badge="0">
        <span>消息</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      // 默认选中和未选中的样式背景
      icon: {
        active: "https://img01.yzcdn.cn/vant/user-active.png",
        inactive: "https://img01.yzcdn.cn/vant/user-inactive.png",
      },
    };
  },
  methods: {
    onChange(index) {
      if (index === 0) {
        this.$router.push("/home");
      }
      if (index === 1) {
        this.$router.push("/message");
      }
      if (index === 2) {
        this.$router.push("/mine");
      }
    },
  },
};
</script>
