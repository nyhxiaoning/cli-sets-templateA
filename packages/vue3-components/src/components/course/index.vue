<script setup>
import { reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { userApi } from "@test/apis-ts";//getTextbook getSectio
import Tree from "@/components/tree/index.vue";
import Tree2 from "@/components/tree/tree.vue";
const { query, path } = useRoute();
const Router = useRouter();
const state = reactive({
  bookList: [],
  book: {},
  sectionList: [],
  kpId: query.kpId,
  loading: false,
  bookDialog: false
});

const emit = defineEmits(["change"]);
/**
 * 刷新路由处理函数
 */
const refresh = () => {
  Router.replace({
    path,
    query: {
      id: state.book.id,
      kpId: state.kpId
    }
  });
};

/**
 * 监测 kpId 变化刷新路由
 * 右侧页面可根据路由变化获取数据
 */
watch(
  () => state.kpId,
  () => {
    refresh();
    emit("change", state.kpId);
  }
);

/**
 * 路由没有变化时初始化数据
 */
if (state.kpId) emit("change", state.kpId);
// userApi.httpFn().get("http://127.0.0.1:4523/m1/712439-0-default/api-sch/interact/quiz/page");
/**
 * 获取教材下的章节目录（树结构）
 */
const getSectionList = async () => {
  const { data } = await userApi.getSection();
  // state.sectionList = data;
  state.sectionList = data[0].children;

  // 判断kpId是否在章节中
  let hasKpId = false;
  state.sectionList.forEach((item) => {
    item.children.forEach((e) => {
      if (query.kpId == e.id) hasKpId = true;
    });
  });

  // 如果路由中没有kpId或kpId不在章节中 更新kpId
  if (!query.kpId || !hasKpId) {
    state.kpId = data[0].children[0].children[0].id;
  }
  state.loading = false;
};

/**
 * 获取全部教材
 */
const getTextbookList = async () => {
  // state.loading = true;
  const resultdata = await userApi.getTextbook();
  state.bookList = resultdata[0].children;
  debugger;
  // 如果路由中存在id，找到对应的教材进行存储
  // 不存在id，取第一个教材
  if (query.id) {
    state.book = resultdata[0].children[0];
  } else {
    state.book = {};
    state.book = resultdata[0].children[0];

  }
  getSectionList();
};
getTextbookList();

/**
 * 教材选择处理函数
 */
const bookItemClick = (book) => {
  state.book = book;
  state.bookDialog = false;
  getSectionList();
};

// const treeChange = (obj) => {
//   if (obj.level == 2) {
//     state.kpId = obj.id;
//   }
// };
const treeChange = (id) => {
  state.kpId = id;
};

const eduPhase = {
  1: "小学",
  2: "初中",
  3: "高中"
};
</script>
<template>
  <div class="course">
    <el-button @click="userApi.getSection()">
      点击这里按钮userAPi
    </el-button>
    <el-button @click="userApi.getQuestion()">
      点击这里按钮usergetQuestion
    </el-button>
    <div class="book" @click="state.bookDialog = true">
      <img :src="state.book.image">
      <div>
        <p>名称：{{ state.book.name }}</p>
        <p>年级：{{ eduPhase[state.book.eduPhase] }}</p>
      </div>
    </div>
    <div class="section">
      <el-scrollbar>
        <Tree :data="state.sectionList" :active="state.kpId + ''" @change="treeChange" />
      </el-scrollbar>
    </div>
  </div>
  <el-dialog v-model="state.bookDialog" title="教材选择" width="830px" custom-class="dialog" center>
    <el-scrollbar class="contentDialog">
      <div class="bookList">
        <ul>
          <template v-for="item in state.bookList" :key="item.id">
            <li @click="bookItemClick(item)">
              <img :src="item.image" :alt="item.name">
              <p>{{ item.name }}</p>
            </li>
          </template>
        </ul>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>
<style lang="less" scoped>
.book {
  display: flex;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1px;
  background-color: #f9f9f9;
  cursor: pointer;

  p {
    line-height: 40px;
  }

  img {
    height: 80px;
    box-sizing: border-box;
    margin-right: 15px;
  }
}

.section {
  margin-top: 15px;
  height: calc(100vh - 60px - 15px - 80px - 50px);
  overflow-y: auto;
}

.bookList {
  width: 778px;
  overflow: hidden;
  margin-bottom: -10px;

  ul {
    width: 848px;
    overflow: hidden;
  }

  li {
    cursor: pointer;
    font-size: 0;
    float: left;
    margin-right: 66px;
    margin-bottom: 10px;
    width: 142px;
    padding: 1px;
  }

  img {
    width: 142px;
    height: 180px;
    border-radius: 5px;
    border: 2px solid rgba(108, 150, 254, 0.7);
    margin-bottom: 8px;
    display: block;
  }

  p {
    font-size: 16px;
    text-align: center;
    width: 100%;
    line-height: 22px;
    box-sizing: border-box;
    text-align: center;
    height: 44px;
  }
}

.contentDialog {
  height: 450px;
}
</style>
<style>
.dialog .el-dialog__footer {
  display: none;
}
</style>
