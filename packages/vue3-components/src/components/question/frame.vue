<script setup>
import { reactive } from "vue";
// import { getHtmlTextImg } from "/utils/index";
const getHtmlTextImg = (html) => {
  let obj = {
    img: "",
    text: ""
  };
  if (html.indexOf("http") == 0) {
    obj.img = html;
  } else {
    let imgs = html.match(/src="([^"]*)"/g) || [];
    obj.img = imgs.length ? imgs[0].substring(5, imgs[0].length - 1) : "";
    obj.text = html
      .replaceAll(/<style>.*<\/style>/g, "")
      .replaceAll(/<\/?[a-zA-Z0-9\/:"\s=.-;-,()\\%#]*>/g, "");
  }
  return obj;
};
const props = defineProps({
  info: Object,
  no: Number,
  hasAdd: Boolean
});
const state = reactive({
  analysis: {},
  answers: [],
  explainShow: false
});
// 处理解析
state.analysis = getHtmlTextImg(props.info.analysis);

// 处理答案
let answers = [];
if (props.info.answers) {
  props.info.answers.forEach((item) => {
    if (item.isRight) {
      let obj = getHtmlTextImg(item.answerDesFullText);
      answers.push(
        Object.assign(obj, {
          option: item.answerOption,
          id: item.id
        })
      );
    }
  });
}
state.answers = answers;
const difficultys = {
  1: "简单",
  2: "一般",
  3: "难"
};
</script>

<template>
  <div class="box">
    <slot />
    <div v-show="state.explainShow" class="explain">
      <p class="clearfix">
        <span class="fl">答案：</span>
        <template v-if="state.answers.length == 1">
          <span v-if="state.answers[0].option" class="fl">{{ state.answers[0].option }}、</span>
          <span v-if="state.answers[0].text" class="fl">{{ state.answers[0].text }}</span>
          <img v-if="state.answers[0].img" class="img" :src="state.answers[0].img">
        </template>
        <template v-if="state.answers.length == 0">
          无
        </template>
      </p>
      <template v-if="state.answers.length > 1">
        <template v-for="(item, index) in state.answers" :key="item.id">
          <div>
            <span v-if="item.option">{{ item.option }}、</span>
            <span v-if="info.type == 3">{{ index + 1 }}、</span>
            <span v-if="item.text">{{ item.text }}</span>
            <img v-if="item.img" class="img" :src="item.img">
          </div>
        </template>
      </template>
      <p class="mt10">
        解析：{{ state.analysis.text || "无" }}
      </p>
      <img v-if="state.analysis.img" class="images" :src="state.analysis.img">
    </div>
    <div class="knowledge">
      <div class="fl">
        <p>
          知识点：{{
            info.knowledgePoints.length ? info.knowledgePoints[0].link : "无"
          }}
        </p>
        <p>难度：{{ difficultys[info.difficulty] }}</p>
      </div>
      <div class="fr pt5">
        <el-button plain @click="state.explainShow = !state.explainShow">
          {{ state.explainShow ? '隐藏解析' : '显示解析' }}
        </el-button>
        <el-button v-if="hasAdd" plain>
          加入试题栏
        </el-button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.box {
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin-bottom: 15px;
}

.knowledge {
  padding: 15px;
  background-color: #f3f9ff;
  overflow: hidden;
}

.explain {
  padding: 15px;
}

.images {
  max-width: 660px;
  max-height: 300px;
  margin-top: 10px;
}

.img {
  max-width: 157.5px;
  max-height: 93px;
}
</style>
