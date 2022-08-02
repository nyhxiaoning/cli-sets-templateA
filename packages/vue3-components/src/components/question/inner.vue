<script setup>
import { computed, reactive, watch } from "vue";
// import { getHtmlTextImg } from "/utils/index";
const getHtmlTextImg = (html) => {
  let obj = {
    img: "",
    text: "",
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
});
const state = reactive({
  title: "",
  stem: "",
  img: "",
  audio: "",
  answers: [],
});

const questionInfo = {
  1: "单选题",
  2: "多选题",
  3: "填空题",
  4: "判断题",
  5: "视唱题",
};

state.title = `${props.no}、${questionInfo[props.info.type]}`;
state.stem = props.info.stems;
state.img = getHtmlTextImg(props.info.stemsFullText).img;

if (props.info.voideAttId) {
  state.audio = props.info.voideAttInfo.cloudUrl;
} else {
  state.audio = false;
}

let answers = [];
if (props.info.answers) {
  props.info.answers.forEach((item) => {
    let obj = getHtmlTextImg(item.answerDesFullText);
    answers.push(
      Object.assign(obj, {
        option: item.showAnswerOption || item.answerOption,
        id: item.id,
      })
    );
  });
}
state.answers = answers;
</script>
<template>
  <div class="question">
    <p class="title">{{ state.title }}</p>
    <p class="stem">{{ state.stem }}</p>
    <div v-if="state.audio">
      <audio
        class="audio"
        preload="auto"
        controlsList="nodownload"
        controls
        :src="state.audio"
      />
    </div>
    <div v-if="state.img">
      <img class="image" :src="state.img" />
    </div>
    <template v-if="info.type != 3">
      <div class="options clearfix">
        <el-space wrap :size="0">
          <template v-for="item in state.answers" :key="item.id">
            <div class="option fl">
              <template v-if="item.option"
                ><span class="fl">{{ item.option }}、</span></template
              >
              <template v-if="item.text"
                ><span class="fl">{{ item.text }}</span></template
              >
              <div class="clearfix" v-if="item.text"></div>
              <template v-if="item.img"
                ><img class="img" :src="item.img"
              /></template>
            </div>
          </template>
        </el-space>
      </div>
    </template>
  </div>
</template>
<style lang="less" scoped>
.question {
  padding: 20px;
}
.title {
  font-weight: 500;
}
.stem {
  padding-left: 20px;
  margin-top: 10px;
}
.image {
  max-width: 660px;
  max-height: 300px;
  margin-top: 15px;
}
.audio {
  margin-top: 15px;
}
.options {
  width: 440px;
}
.option {
  overflow: hidden;
  margin-top: 15px;
  width: 220px;
}
.img {
  float: left;
  max-width: 157.5px;
  max-height: 93px;
}
</style>
