<script setup>
import { reactive, ref } from "vue";
import { Check, Close, Plus } from "@element-plus/icons-vue";
import json from "./data.js";
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
const ruleFormRef = ref(null);
let ruleForm = reactive({
  form: {
    analysis: "",
    answers: [
      {
        answerDes: "",
        answerDesFullText: "",
        isRight: 1, //1:正确答案,0:错误答案
        id: null,
        questionId: null
      },
      {
        answerDes: "",
        answerDesFullText: "",
        isRight: 0, //1:正确答案,0:错误答案
        id: null,
        questionId: null
      },
      {
        answerDes: "",
        answerDesFullText: "",
        isRight: 0, //1:正确答案,0:错误答案
        id: null,
        questionId: null
      },
      {
        answerDes: "",
        answerDesFullText: "",
        isRight: 0, //1:正确答案,0:错误答案
        id: null,
        questionId: null
      }
    ],
    difficulty: 1, //1简单,2一般,3难
    knowledgePointIds: [],
    opernAttId: null,
    stems: "",
    stemsFullText: "",
    type: 1, //1单选,2多选,3填空,4判断,5视唱
    voideAttId: null
  }
});

const rules = reactive({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change"
    }
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change"
    }
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "Please pick a time",
      trigger: "change"
    }
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "Please select at least one activity type",
      trigger: "change"
    }
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change"
    }
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" }
  ]
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const state = reactive({
  list: json.data.result
});
const edit = (row) => {
  let stemsFullText = getHtmlTextImg(row.stemsFullText),
    analysis = getHtmlTextImg(row.analysis);

  let obj = {
    analysis: analysis.text,
    difficulty: row.difficulty,
    knowledgePointIds: row.knowledgePointIds,
    opernAttId: row.opernAttId,
    stems: stemsFullText.text || row.stems,
    stemsFullText: stemsFullText.img,
    type: row.type,
    voideAttId: row.voideAttId,
    answers: []
  };


  if (row.answers) {
    for (let i = 0; i < row.answers.length; i++) {
      let optionObj = {
        answerDes: "",
        answerDesFullText: "",
        isRight: 1,
        id: null,
        questionId: null
      };
      let item = row.answers[i];
      if (item) {
        let answerDesFullText = getHtmlTextImg(item.answerDesFullText);
        optionObj.answerDes = answerDesFullText.text || item.answerDes;
        optionObj.answerDesFullText = answerDesFullText.img;
        optionObj.isRight = item.isRight;
        optionObj.id = item.id;
        optionObj.questionId = item.questionId;
      } else {
        obj.answers.push(optionObj);
      }
    }
  }

  ruleForm.form = obj;
};
const optionChange = (index) => {
  let isRight = ruleForm.form.answers[index].isRight;
  if (isRight) {
    // 处理单选题
    if (ruleForm.form.type == 1 || ruleForm.form.type == 4) {
      ruleForm.form.answers.forEach((e, i) => {
        if (index != i) e.isRight = 0;
      });
    }
  } else {
    // 至少有一个是正确的
    let hasRight = false;
    ruleForm.form.answers.forEach((e) => {
      if (e.isRight) hasRight = true;
    });
    if (!hasRight) ruleForm.form.answers[index].isRight = 1;
  }
};
const typeChange = () => {
  // 单选题、多选题、判断题至少有一个是正确的
  if (
    ruleForm.form.type == 1 ||
    ruleForm.form.type == 2 ||
    ruleForm.form.type == 4
  ) {
    let hasRight = false;
    ruleForm.form.answers.forEach((e) => {
      if (hasRight) {
        e.isRight = 0;
      } else {
        hasRight = !!e.isRight;
      }
    });
    if (!hasRight) ruleForm.form.answers[0].isRight = 1;
  }
  if (ruleForm.form.type == 3) {
    ruleForm.form.answers.forEach((e) => {
      e.isRight = 1;
    });
  }
};
const questionInfo = {
  1: "单选题",
  2: "多选题",
  3: "填空题",
  4: "判断题",
  5: "视唱题"
};
const options = {
  0: "A",
  1: "B",
  2: "C",
  3: "D"
};
</script>
<template>
  <el-aside class="aside">
    <el-table :data="state.list" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column label="题型">
        <template #default="{ row }">
          {{ questionInfo[row.type] }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="text" @click="edit(row)">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-aside>
  <el-main class="main">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="题型：">
        <el-radio-group v-model="ruleForm.form.type" @change="typeChange">
          <el-radio :label="1">
            单选题
          </el-radio>
          <el-radio :label="2">
            多选题
          </el-radio>
          <el-radio :label="3">
            填空题
          </el-radio>
          <el-radio :label="4">
            判断题
          </el-radio>
          <el-radio :label="5">
            视唱题
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度：">
        <el-radio-group v-model="ruleForm.form.difficulty">
          <el-radio :label="1">
            简单
          </el-radio>
          <el-radio :label="2">
            一般
          </el-radio>
          <el-radio :label="3">
            难
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="题干：" prop="stems">
        <el-input
          v-model="ruleForm.form.stems"
          class="w500"
          type="textarea"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="题干图片：">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="ruleForm.form.stemsFullText"
            :src="ruleForm.form.stemsFullText"
            class="avatar"
          >
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="题干音频：">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :show-file-list="false"
          :on-exceed="handleExceed"
          :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">
              选择文件
            </el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip">
              支持扩展名：.mp3 .wav .wma .midi等 文件限制：50Mb
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="ruleForm.form.type == 5" label="曲谱：">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :show-file-list="false"
          :on-exceed="handleExceed"
          :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">
              选择文件
            </el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip">
              支持扩展名：.zip 文件限制：500Mb
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item v-if="ruleForm.form.type != 5" label="选项：">
        <el-button type="primary" :icon="Plus">
          添加选项
        </el-button>
      </el-form-item>
      <div v-if="ruleForm.form.type != 5" class="optionOuter clearfix">
        <template v-for="(item, index) in ruleForm.form.answers" :key="index">
          <div v-if="ruleForm.form.type == 4 ? index < 2 : true" class="option">
            <el-icon class="close">
              <Close />
            </el-icon>
            <p>
              选项<span>{{ options[index] }}</span>
            </p>
            <el-form-item label="是否正确：">
              <el-switch
                v-model="item.isRight"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
                :active-value="1"
                :inactive-value="0"
                :disabled="ruleForm.form.type == 3"
                @change="optionChange(index)"
              />
            </el-form-item>
            <el-form-item label="选项内容：">
              <el-input
                v-model="item.answerDes"
                class="w240"
                type="text"
                maxlength="10"
                show-word-limit
              />
            </el-form-item>
            <el-form-item
              v-if="ruleForm.form.type == 1 || ruleForm.form.type == 2"
              label="选项图片："
            >
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <el-icon v-else class="avatar-uploader-icon img">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
          </div>
        </template>
      </div>

      <el-form-item label="答案解析：" prop="analysis">
        <el-input
          v-model="ruleForm.form.analysis"
          class="w500"
          type="textarea"
        />
      </el-form-item>
    </el-form>
  </el-main>
</template>
<style lang="less" scoped>
.aside {
  width: 400px;
}
.w500 {
  width: 500px;
}
.w240 {
  width: 240px;
}
.optionOuter {
  width: 784px;
  margin-left: 100px;
  margin-bottom: 10px;
}
.option {
  border: 1px solid #eee;
  margin-bottom: 10px;
  width: 380px;
  padding-top: 20px;
  float: left;
  margin-right: 10px;
  position: relative;
  p {
    padding-left: 18px;
    margin-bottom: 10px;
    span {
      color: var(--el-color-primary);
      padding-left: 10px;
      font-weight: 700;
    }
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 330px;
  height: 150px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.img {
  max-width: 157.5px;
  max-height: 93px;
}
</style>
