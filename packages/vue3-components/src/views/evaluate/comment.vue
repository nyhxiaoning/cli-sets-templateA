<script>
import { defineComponent, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage, ElLoading } from 'element-plus';
import {
  getSemesterlist,
  getCommentStatisticStudent,
  getCommentSemesters,
  getCommentStatisticsDetail,
  getCommentPersonal
} from '@/api/evaluate';
import { getClassListByTeacher } from '@/api/edu';

export default defineComponent({
  setup() {
    const router = useRouter(),
      { query } = useRoute(),
      store = useStore();

    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });

    const state = reactive({
      semesterlist: [],
      semesterJson: {},
      page: {
        pageNum: 1,
        pageSize: 20,
        semesterId: query.id * 1 || '',
        classId: '',
        keyword: ''
      },
      list: [],
      classList: [],
      classJson: {},
      total: 0,
      detailDialog: false,
      dialog: false,
      detail: [],
      studentScheduleId: '',
      stars: {
        isPraise: 0,
        star1: 0,
        star2: 0,
        star3: 0
      },
      curItem: {}
    });

    let userinfo = store?.state?.account?.userinfo;

    let json = {};
    getSemesterlist.forEach(item => {
      json[item.periodCode] = item.period;
    });

    state.semesterJson = json;

    const getSemesterList = async () => {
      const { data } = await getCommentSemesters();
      state.semesterlist = data;
    };
    getSemesterList();

    const getClassList = async () => {
      const { data } = await getClassListByTeacher(userinfo.id);
      state.classList = data;
      let json = {};
      data.forEach(item => {
        json[item.id] = item.fullName;
      });
      state.classJson = json;
    };
    getClassList();

    const getList = async () => {
      const { code, data, msg } = await getCommentStatisticStudent(state.page);
      if (code != 200) {
        ElMessage({
          message: msg,
          type: 'warning'
        });
        state.list = [];
        return;
      }
      state.total = data.total;
      state.list = data.result;
      loading.close();
    };
    getList();

    const toDetail = async item => {
      state.curItem = item;
      const res = await getCommentStatisticsDetail({
        semesterId: state.page.semesterId,
        studentId: item.studentId
      });
      if (res.code == 200) {
        state.detail = res.data;
        state.detailDialog = true;
      }
    };

    const pageSizeChange = pageSize => {
      state.page.pageNum = 1;
      state.page.pageSize = pageSize;
    };
    const currentPageChange = pageNum => {
      state.page.pageNum = pageNum;
    };

    const batchComment = async () => {
      let res, parmas;
      parmas = {
        studentScheduleId: state.studentScheduleId,
        isPraise: state.stars.isPraise || 0,
        star1: state.stars.star1 || 0,
        star2: state.stars.star2 || 0,
        star3: state.stars.star3 || 0
      };
      res = await getCommentPersonal(parmas);

      if (res.code != 200) {
        ElMessage({
          message: res.msg,
          type: 'warning'
        });
      } else {
        ElMessage({
          message: '评价成功',
          type: 'success'
        });
        toDetail(state.curItem);
        getList();
        for (let k in state.stars) {
          state.stars[k] = 0;
        }
        state.dialog = false;
      }
    };
    const toClass = () => {
      router.push({
        path: '/evaluate/classes',
        query: {
          id: state.page.semesterId
        }
      });
    };

    return {
      state,
      getList,
      toDetail,
      pageSizeChange,
      currentPageChange,
      batchComment,
      toClass
    };
  }
});
</script>

<template>
  <div class="screen">
    <el-space wrap size="large">
      <div>
        <label for="">学期:</label>
        <el-select v-model="state.page.semesterId" placeholder="请选择学期" size="small" @change="getList">
          <el-option label="全部学期" value="" />
          <template v-for="item in state.semesterlist" :key="item.periodCode">
            <el-option :label="state.semesterJson[item.periodCode]" :value="item.id" />
          </template>
        </el-select>
      </div>
      <div>
        <label for="">班级:</label>
        <el-select v-model="state.page.classId" placeholder="请选择班级" size="small" class="inp" @change="getList">
          <template v-for="item in state.classList" :key="item.id">
            <el-option :label="item.name" :value="item.id" />
          </template>
        </el-select>
      </div>
      <div>
        <el-input v-model="state.page.keyword" placeholder="请输入学生名称/学号" size="small">
          <template #append>
            <el-button icon="el-icon-search" @click="getList" />
          </template>
        </el-input>
      </div>
    </el-space>
    <el-space class="fr" size="large">
      <el-button type="primary" size="small" class="button" @click="toClass">
        班级统计
      </el-button>
      <el-button type="primary" size="small" class="button">
        导出数据
      </el-button>
    </el-space>
  </div>
  <div class="sections">
    <el-table :data="state.list" border>
      <el-table-column prop="className" label="班级" />
      <el-table-column prop="studentName" label="姓名" />
      <el-table-column prop="studentNo" label="学号" />
      <el-table-column prop="commentCount" label="已点评课时数" />
      <el-table-column prop="unCommentCount" label="待点评课时数" />
      <el-table-column prop="star1Rate" label="出勤率" />
      <el-table-column prop="star2Rate" label="参与度" />
      <el-table-column prop="star3Rate" label="学习任务" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="text" @click="toDetail(row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background :page-sizes="[10, 20, 50, 100, 200]" :page-size="state.page.pageSize"
        layout="prev, pager, next, sizes, jumper" :total="state.page.total" hide-on-single-page
        @size-change="pageSizeChange" @current-change="currentPageChange"
      />
    </div>
  </div>
  <el-dialog v-model="state.detailDialog" title="个人详情" width="800px" custom-class="yyDialog">
    <div class="dialog-body">
      <div style="margin-bottom: 15px;text-align:left">
        <el-space size="large">
          <span>姓名：{{ state.curItem.studentName }}</span>
          <span>学号：{{ state.curItem.studentNo }}</span>
        </el-space>
      </div>
      <el-table :data="state.detail" border :height="400">
        <el-table-column prop="startTime" label="开课时间">
          <template #default="{ row }">
            <p>{{ row.startTime.split(' ')[0] }}</p>
            <p>{{ row.startTime.split(' ')[1] }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="star1" label="出勤率" />
        <el-table-column prop="star2" label="参与度" />
        <el-table-column prop="star3" label="学习任务" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="text" @click="
                () => {
                  state.dialog = true
                  state.studentScheduleId = row.id
                  state.stars.isPraise = row.isPraise
                  state.stars.star1 = row.star1
                  state.stars.star2 = row.star2
                  state.stars.star3 = row.star3
                }
              "
            >
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template #footer>
      <div class="dialog-footer" />
    </template>
  </el-dialog>
  <el-dialog
    v-model="state.dialog" :title="state.curItem.studentName" width="500" size="small" custom-class="yyDialog"
    center
  >
    <div class="dialog-body">
      <div
        style="margin-bottom: 20px" class="start" @click="
          () => (state.stars.isPraise = state.stars.isPraise == 0 ? 1 : 0)
        "
      >
        <p>特别表扬</p>
        <img v-if="state.stars.isPraise" src="@/assets/img/hand.png">
        <img v-else src="@/assets/img/hand-outline.png">
      </div>
      <el-space size="large">
        <div class="start" @click="() => (state.stars.star1 = state.stars.star1 == 0 ? 1 : 0)">
          <p>出勤率：准时到课</p>
          <img v-if="state.stars.star1" src="@/assets/img/star.png">
          <img v-else src="@/assets/img/star-outline.png">
        </div>
        <div class="start" @click="() => (state.stars.star2 = state.stars.star2 == 0 ? 1 : 0)">
          <p>参与度：课堂积极</p>
          <img v-if="state.stars.star2" src="@/assets/img/star.png">
          <img v-else src="@/assets/img/star-outline.png">
        </div>
        <div class="start" @click="() => (state.stars.star3 = state.stars.star3 == 0 ? 1 : 0)">
          <p>作业：认真思考</p>
          <img v-if="state.stars.star3" src="@/assets/img/star.png">
          <img v-else src="@/assets/img/star-outline.png">
        </div>
      </el-space>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" @click="state.dialog = false">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="batchComment">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.ml10 {
  margin-left: 10px;
}

.button {
  padding: 0 10px;
}

.dialog-body {
  text-align: center;
  margin-bottom: 20px;
}

.dialog-body label {
  margin-right: 20px;
}

.start {
  text-align: center;
  cursor: pointer;

  span {
    font-size: 20px;
  }
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
<style>
.el-input.w220 {
  width: 220px;
}

.el-date-editor.w180 {
  width: 180px;
}

.yyDialog .el-dialog__body {
  padding: 20px 20px 0;
}

.dialog-footer {
  text-align: center;
}

.dialog-footer .el-button {
  padding: 0 15px;
}

.el-button .el-icon-search {
  margin-left: 12px;
}
</style>
