<script setup>
import { reactive } from "vue";
import QuestionFrame from "@/components/question/frame.vue";
import QuestionInner from "@/components/question/inner.vue";
import { userApi } from "@test/apis-ts";
const state = reactive({
  params: {
    pageNum: 1,
    pageSize: 20,
    pointId: 905,
    keyword: "",
    type: "",
    difficulty: ""
  },
  questionList: [],
  loading: false
});

const getQuestionList = async () => {
  state.loading = true;
  const { code, data, msg } = await userApi.getQuestion(state.params);
  state.questionList = data.result;
  state.loading = false;
};

const courseChange = (id) => {
  state.params.pointId = id;
  getQuestionList();
};

const getIndex = index => {
  return (state.params.pageNum - 1) * state.params.pageSize + index + 1;
};

</script>
<template>
  <el-aside class="aside">
    <Course @change="courseChange" />
  </el-aside>
  <el-main v-loading="state.loading" class="main">
    <template v-for="(item, index) in state.questionList" :key="item.id">
      <QuestionFrame :info="item" :no="getIndex(index)">
        <QuestionInner :info="item" :no="getIndex(index)" />
      </QuestionFrame>
    </template>
  </el-main>
</template>
