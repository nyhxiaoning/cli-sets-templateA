<script>
import { computed, defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import {
  getCommentSemesters,
  getCommentSemestersCreate,
  getCommentSemestersUpdata,
  getCommentSemestersDelete,
  getSemesterlist,
} from '@/api/evaluate'
import { addIcon, editIcon, deleteIcon } from './../../utils/svg'
export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const validatorStart = (rule, value, callback) => {
      let item = state.semesterJson[state.from.periodCode],
        time = new Date(value).getTime()
      if (item) {
        let startTime = new Date(item.start).getTime(),
          endTime = state.from.endTime
            ? new Date(state.from.endTime).getTime()
            : new Date(item.end).getTime()
        if (time < startTime || time > endTime) {
          callback(new Error('开始日期必须在学期范围内'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validatorEnd = (rule, value, callback) => {
      let item = state.semesterJson[state.from.periodCode],
        time = new Date(value).getTime()
      if (item) {
        let startTime = state.from.startTime
            ? new Date(state.from.startTime).getTime()
            : new Date(item.start).getTime(),
          endTime = new Date(item.end).getTime()
        if (time < startTime || time > endTime) {
          callback(new Error('结束日期必须在学期范围内'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const state = reactive({
      parmas: {
        periodCode: '',
      },
      semesterlist: getSemesterlist,
      semesterJson: {},
      list: [],
      createDialog: false,
      id: '',
      from: {
        endTime: '',
        periodCode: '',
        startTime: '',
      },
      rules: {
        periodCode: [
          {
            required: true,
            message: '请选择学期',
            trigger: 'blur',
          },
        ],
        startTime: [
          {
            required: true,
            message: '请选择开始日期',
            trigger: 'blur',
          },
          {
            validator(rule, value, callback) {
              let end = new Date(state.from.endTime).getTime(),
                start = new Date(value).getTime()
              console.log(start, end)
              if (value != '' && state.from.endTime != '' && start > end) {
                callback(new Error('开始日期必须小于结束日期'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
          {
            validator: validatorStart,
            trigger: 'blur',
          },
        ],
        endTime: [
          {
            required: true,
            message: '请选择结束日期',
            trigger: 'blur',
          },
          {
            validator(rule, value, callback) {
              let start = new Date(state.from.startTime).getTime(),
                end = new Date(value).getTime()
              if (value != '' && state.from.startTime != '' && start > end) {
                callback(new Error('结束日期必须大于开始日期'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
          {
            validator: validatorEnd,
            trigger: 'blur',
          },
        ],
      },
      defaultTimeStart: new Date(),
      defaultTimeEnd: new Date(),
    })

    let json = {}
    getSemesterlist.forEach(item => {
      json[item.periodCode] = item
    })
    state.semesterJson = json

    /**
     * @description:获取此时的默认所偶有的列表 
     * @param {*}
     * @return {*}
     */
    const getList = async () => {
      debugger
      const { code, data, msg } = await getCommentSemesters(state.parmas)
      if (code != 200) {
        ElMessage({
          message: msg,
          type: 'warning',
        })
        state.list = []
        return
      }
      state.list = data
      // store.commit('evaluate/setData', { tagList: data })
    }
    debugger
    getList()
    const from = ref('')
    const cardSubmit = async () => {
      let parmas = JSON.parse(JSON.stringify(state.from))
      parmas.startTime += ' 00:00:00'
      parmas.endTime += ' 23:59:59'

      if (!state.id) {
        let arr = state.list.filter(
          item => item.periodCode == state.from.periodCode
        )
        if (arr.length > 0) {
          ElMessage({
            message: '请勿重复创建学期',
            type: 'warning',
          })
          return
        }
      }

      if (state.from.periodCode % 2) {
        // 上学期
        const nextCode = state.from.periodCode * 1 + 1
        let dataArr = state.list.filter(item => item.periodCode == nextCode)
        if (dataArr.length) {
          let start = dataArr[0].startTime,
            startTime = new Date(start).getTime(),
            fromEnd = new Date(state.from.endTime).getTime()
          if (fromEnd > startTime) {
            ElMessage({
              message: '上学期结束时间应小于下学期开始时间',
              type: 'warning',
            })
            return
          }
        }
      } else {
        // 下学期
        const preCode = state.from.periodCode * 1 - 1
        let dataArr = state.list.filter(item => item.periodCode == preCode)
        if (dataArr.length) {
          let end = dataArr[0].endTime,
            endTime = new Date(end).getTime(),
            fromStart = new Date(state.from.startTime).getTime()
          if (fromStart < endTime) {
            ElMessage({
              message: '下学期开始时间应大于上学期结束时间',
              type: 'warning',
            })
            return
          }
        }
      }

      let res
      const valid = await from.value.validate()
      if (valid) {
        if (state.id) {
          res = await getCommentSemestersUpdata(state.id, parmas)
        } else {
          res = await getCommentSemestersCreate(parmas)
        }
        if (res.code != 200) {
          ElMessage({
            message: res.msg,
            type: 'warning',
          })
          return
        }
        ElMessage({
          message: state.id ? '修改成功' : '创建成功',
          type: 'success',
        })
        state.createDialog = false
        getList()
      }
    }
    const cardAdd = () => {
      state.id = ''
      state.createDialog = true
    }
    const cardEdit = (id, periodCode, startTime, endTime) => {
      state.id = id
      state.from.periodCode = periodCode + ''
      state.from.startTime = startTime
      state.from.endTime = endTime
      state.createDialog = true
    }
    const cardDelete = async id => {
      ElMessageBox.confirm('学期删除后不可恢复，确认要删除该学期', '删除学期', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      }).then(() => {
        getCommentSemestersDelete(id).then(({ code, msg }) => {
          if (code != 200) {
            ElMessage({
              message: msg,
              type: 'warning',
            })
          } else {
            ElMessage({
              message: '删除成功',
              type: 'success',
            })
            getList()
          }
        })
      })
    }
    const toWeek = (id, periodCode) => {
      router.push({
        path: '/evaluate/week',
        query: { id, periodCode },
      })
    }
    const toDay = (id, periodCode) => {
      router.push({
        path: '/evaluate/day',
        query: { id, periodCode },
      })
    }
    const toComment = (id, periodCode) => {
      router.push({
        path: '/evaluate/comment',
        query: { id, periodCode },
      })
    }

    const createSemesterChange = () => {
      state.from.startTime = ''
      state.from.endTime = ''
      let item = state.semesterJson[state.from.periodCode]
      state.defaultTimeStart = new Date(item.start).toString()

      state.defaultTimeEnd = state.from.startTime
        ? new Date(state.from.startTime).toString()
        : new Date(item.start).toString()
    }
    const disabledDateStart = computed(() => {
      return date => {
        let item = state.semesterJson[state.from.periodCode],
          time = date.getTime()
        if (item) {
          let startTime = new Date(item.start).getTime(),
            endTime = state.from.endTime
              ? new Date(state.from.endTime).getTime()
              : new Date(item.end).getTime()
          return time < startTime || time > endTime
        } else return time < new Date().getTime()
      }
    })
    const disabledDateEnd = computed(() => {
      return date => {
        let item = state.semesterJson[state.from.periodCode],
          time = date.getTime()
        if (item) {
          let startTime = state.from.startTime
              ? new Date(state.from.startTime).getTime()
              : new Date(item.start).getTime(),
            endTime = new Date(item.end).getTime()
          return time < startTime || time > endTime
        } else return time < new Date().getTime()
      }
    })
    return {
      state,
      from,
      cardSubmit,
      cardAdd,
      cardEdit,
      cardDelete,
      toWeek,
      toDay,
      toComment,
      getList,
      disabledDateStart,
      disabledDateEnd,
      createSemesterChange,
      addIcon,
      editIcon,
      deleteIcon,
    }
  },
})
</script>

<template>
111111111111111111111111111111111111111111111111111111111111
<div>
  myVHTMLSVG
  <span v-html="deleteIcon"></span>
  <span v-html="deleteIcon"></span>

  <span v-html="deleteIcon"></span>

</div>
3333333333333333333333333333333
  <div class="screen">
    <el-space wrap size="large">
      <div>
        <label for="">学期:</label>
        <!-- TODO 没有学期ID -->
        <el-select
          v-model="state.parmas.periodCode"
          placeholder="请选择学期"
          size="small"
          @change="getList"
        >
          <el-option label="全部学期" value="" />
          <template v-for="item in state.list" :key="item.periodCode">
            <el-option
              :label="state.semesterJson[item.periodCode].period"
              :value="item.periodCode"
            />
          </template>
        </el-select>
      </div>
    </el-space>
  </div>
  <div class="sections pr0">
    <el-space wrap :size="30">
      <template v-for="(item, index) in state.list" :key="item.id">
        <div class="card">
          <div class="title">
            <span class="last" v-if="index == 0">最新</span>
            <span>
              {{
                state.semesterlist.filter(
                  e => e.periodCode == item.periodCode
                )[0].period
              }}
            </span>
            <span
              class="icon fr"
              v-html="deleteIcon"
              @click="cardDelete(item.id)"
            ></span>
            <span
              class="icon fr"
              v-html="editIcon"
              @click="cardEdit(item.id, item.periodCode, item.startTime, item.endTime)"
            ></span>
          </div>
          <div>
            <p>开学日期: {{ item.startTime.split(' ')[0] }}</p>
            <p>结束日期: {{ item.endTime.split(' ')[0] }}</p>
          </div>
          <div class="footer">
            <el-button
              class="button"
              size="mini"
              type="primary"
              @click="toWeek(item.id, item.periodCode)"
            >
              周课表
            </el-button>
            <el-button
              class="button"
              size="mini"
              type="primary"
              @click="toDay(item.id, item.periodCode)"
            >
              日程表
            </el-button>
            <el-button
              class="button"
              size="mini"
              type="primary"
              @click="toComment(item.id, item.periodCode)"
            >
              点评数据
            </el-button>
          </div>
        </div>
      </template>
      <div class="card pointer cardAdd" @click="cardAdd">
        <div class="add">
          <span class="icon" v-html="addIcon"></span>
          <p>创建任务</p>
        </div>
      </div>
    </el-space>
  </div>
  <el-dialog
    v-model="state.createDialog"
    :title="state.id?'编辑任务':'创建任务'"
    width="450px"
    size="small"
    custom-class="yyDialog"
  >
    <el-form
      ref="from"
      :model="state.from"
      :rules="state.rules"
      label-width="120px"
      size="small"
    >
      <el-form-item label="学期" prop="periodCode">
        <el-select
          v-model="state.from.periodCode"
          :disabled="!!state.id"
          placeholder="请选择学期"
          @change="createSemesterChange"
        >
          <template v-for="item in state.semesterlist" :key="item.periodCode">
            <el-option :label="item.period" :value="item.periodCode" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="开学日期" prop="startTime">
        <!-- <el-date-picker
          v-model="state.from.startTime"
          type="date"
          placeholder="请选择开学日期"
          value-format="YYYY-MM-DD"
          :defaultValue="state.defaultTimeStart"
          :disabled-date="disabledDateStart"
        /> -->
        <el-date-picker
          v-model="state.from.startTime"
          type="date"
          placeholder="请选择开学日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="结束日期" prop="endTime">
        <!-- <el-date-picker
          v-model="state.from.endTime"
          type="date"
          placeholder="请选择结束日期"
          value-format="YYYY-MM-DD"
          :default-value="state.defaultTimeEnd"
          :disabled-date="disabledDateEnd"
        /> -->
        <el-date-picker
          v-model="state.from.endTime"
          type="date"
          placeholder="请选择结束日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" @click="state.createDialog = false">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="cardSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.last {
  color: #fff;
  background-color: #fa626e;
  border-radius: 4px;
  margin-right: 5px;
  padding: 2px 5px;
  font-size: 14px;
}
.sections {
  min-height: calc(100vh - 172px);
}
.pr0 {
  padding-right: 0;
}
.card {
  border: 1px solid #ccc;
  overflow: hidden;
  width: 310px;
  height: 220px;
  box-sizing: border-box;
  color: #333333;
  .title {
    overflow: hidden;
    font-size: 16px;
    line-height: 1;
    margin-bottom: 16px;
    background: #f2f4f5;
    padding: 17px 12px 17px 20px;
    .icon {
      font-size: 20px;
      margin: 0 5px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
  p {
    font-size: 16px;
    line-height: 1;
    padding: 8px 20px;
    // text-align: left;
  }
  .footer {
    margin-top: 24px;
    // display: inline-block;
    padding: 0 20px;
  }
  .button {
    line-height: 36px;
    width: 80px;
    font-size: 16px;
    font-weight: 400;
    background-color: #3a82ff;
    border-radius: 4px;
  }
  .add {
    text-align: center;
    margin-top: 65px;
    color: #3a82ff;
  }
}
.cardAdd {
  background-color: #f2f4f5;
  border-color: #f2f4f5;
}
</style>
<style>
.yyDialog .el-dialog__body {
  padding: 20px 20px 0;
}
.dialog-footer {
  text-align: center;
}
.dialog-footer .el-button {
  padding: 0 15px;
}
</style>
