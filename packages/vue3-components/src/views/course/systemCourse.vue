<script setup>
import { reactive } from "vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Course from "@/components/course/index.vue";


const state = reactive({
  kpId: ""
});

const courseChange = id => {
  state.kpId = id;
};
</script>
<template>
  <el-aside class="aside">
    <Course @change="courseChange" />
  </el-aside>
  <el-main class="main">
    kpId: {{ state.kpId }}
  </el-main>
</template>
