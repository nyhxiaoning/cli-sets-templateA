<script>
import { defineComponent, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage,ElLoading } from 'element-plus'
import {
  getCommentStatisticStudent,
  getCommentSemesters,
  getCommentStatisticsClass,
} from '@/api/evaluate'

export default defineComponent({
  setup() {
    const router = useRouter(),
      { query } = useRoute(),
      store = useStore()

    const state = reactive({
      semesterlist: [],
      semesterJson: {},
      page: {
        pageNum: 1,
        pageSize: 20,
        semesterId: query.id * 1 || '',
      },
      list: [],
      total: 0,
    })

    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })

    let json = {}
    getSemesterlist.forEach(item => {
      json[item.periodCode] = item.period
    })

    state.semesterJson = json

    const getSemesterList = async () => {
      const { data } = await getCommentSemesters()
      state.semesterlist = data
    }
    getSemesterList()

    const getList = async () => {
      const { code, data, msg } = await getCommentStatisticsClass(state.page)
      if (code != 200) {
        ElMessage({
          message: msg,
          type: 'warning',
        })
        state.list = []
        return
      }
      state.total = data.total
      state.list = data.result
      loading.close()
    }
    getList()

    const pageSizeChange = pageSize => {
      state.page.pageNum = 1
      state.page.pageSize = pageSize
    }
    const currentPageChange = pageNum => {
      state.page.pageNum = pageNum
    }

    return {
      state,
      getList,
      pageSizeChange,
      currentPageChange,
    }
  },
})
</script>

<template>
  <div class="screen">
    <el-space wrap size="large">
      <div>
        <label for="">学期:</label>
        <el-select
          v-model="state.page.semesterId"
          placeholder="请选择学期"
          size="small"
          @change="getList"
        >
          <el-option label="全部学期" value="" />
          <template v-for="item in state.semesterlist" :key="item.periodCode">
            <el-option
              :label="state.semesterJson[item.periodCode]"
              :value="item.id"
            />
          </template>
        </el-select>
      </div>
    </el-space>
    <el-space class="fr" size="large">
      <el-button type="primary" size="small" class="button">导出成绩</el-button>
    </el-space>
  </div>
  <div class="sections">
    <el-table :data="state.list" border>
      <el-table-column prop="className" label="班级" />
      <el-table-column prop="studentCount" label="人数" />
      <el-table-column prop="commentCount" label="已点评课时数" />
      <el-table-column prop="unCommentCount" label="待点评课时数" />
      <el-table-column prop="star1Rate" label="出勤率" />
      <el-table-column prop="star2Rate" label="参与度" />
      <el-table-column prop="star3Rate" label="学习任务" />
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="state.page.pageSize"
        layout="prev, pager, next, sizes, jumper"
        :total="state.page.total"
        @size-change="pageSizeChange"
        hide-on-single-page
        @current-change="currentPageChange"
      />
    </div>
  </div>
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
