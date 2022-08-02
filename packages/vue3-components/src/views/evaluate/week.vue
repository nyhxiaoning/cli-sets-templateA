<script>
import { defineComponent, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
// TODO:获取日课表和获取周课表
import {
  userApi
} from '@test/apis-ts';
// const userApi = require("@test/apis-ts");
// import { getClassListByTeacher } from '@/api/edu'
import { useStore } from 'vuex';
const getSemesterlist = [
  { periodCode: '1', period: '2021-2022学年 上学期', start: '2021-01-01', end: '2022-12-31' },
  { periodCode: '2', period: '2021-2022学年 下学期', start: '2021-01-01', end: '2022-12-31' },
  { periodCode: '3', period: '2022-2023学年 上学期', start: '2022-01-01', end: '2023-12-31' },
  { periodCode: '4', period: '2022-2023学年 下学期', start: '2022-01-01', end: '2023-12-31' },
  { periodCode: '5', period: '2023-2024学年 上学期', start: '2023-01-01', end: '2024-12-31' },
  { periodCode: '6', period: '2023-2024学年 下学期', start: '2023-01-01', end: '2024-12-31' },
  { periodCode: '7', period: '2024-2025学年 上学期', start: '2024-01-01', end: '2025-12-31' },
  { periodCode: '8', period: '2024-2025学年 下学期', start: '2024-01-01', end: '2025-12-31' },
  { periodCode: '9', period: '2025-2026学年 上学期', start: '2025-01-01', end: '2026-12-31' },
  { periodCode: '10', period: '2025-2026学年 下学期', start: '2025-01-01', end: '2026-12-31' },
  { periodCode: '11', period: '2026-2027学年 上学期', start: '2026-01-01', end: '2027-12-31' },
  { periodCode: '12', period: '2026-2027学年 下学期', start: '2026-01-01', end: '2027-12-31' },
  { periodCode: '13', period: '2027-2028学年 上学期', start: '2027-01-01', end: '2028-12-31' },
  { periodCode: '14', period: '2027-2028学年 下学期', start: '2027-01-01', end: '2028-12-31' },
  { periodCode: '15', period: '2028-2029学年 上学期', start: '2028-01-01', end: '2029-12-31' },
  { periodCode: '16', period: '2028-2029学年 下学期', start: '2028-01-01', end: '2029-12-31' },
  { periodCode: '17', period: '2029-2030学年 上学期', start: '2029-01-01', end: '2030-12-31' },
  { periodCode: '18', period: '2029-2030学年 下学期', start: '2029-01-01', end: '2030-12-31' },
  { periodCode: '19', period: '2030-2031学年 上学期', start: '2030-01-01', end: '2031-12-31' },
  { periodCode: '20', period: '2030-2031学年 下学期', start: '2030-01-01', end: '2031-12-31' }
];
export default defineComponent({
  setup() {
    const router = useRouter(),
      { query } = useRoute(),
      store = useStore();

    const formatDate = (value, noMonth) => {
      const date = new Date(value),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
      if (noMonth) {
        return `${year}-${month < 10 ? '0' + month : month}`;
      }
      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day
        }`;
    };
    let nowDate = formatDate(new Date());
    const state = reactive({
      parmas: {
        periodCode: query.periodCode
      },
      semesterlist: [
        { id: 27, schId: 53, startTime: '2023-04-01 00:00:00', endTime: '2023-05-31 23:59:59', periodCode: 4 },
        { id: 18, schId: 53, startTime: '2022-07-01 00:00:00', endTime: '2022-12-31 23:59:59', periodCode: 2 },
        { id: 28, schId: 53, startTime: '2022-03-01 00:00:00', endTime: '2022-03-31 23:59:59', periodCode: 3 },
        { id: 17, schId: 53, startTime: '2022-01-01 00:00:00', endTime: '2022-06-30 23:59:59', periodCode: 1 }

      ],
      semesterJson: {},
      list: [],
      isEdit: false,
      id: query.id * 1,
      classList: [],
      classJson: {},
      dialog: false,
      includeHoliday: 0,
      loading: false,
      defaultAm: [`${nowDate} 05:00:00`, `${nowDate} 11:59:00`],
      defaultPm: [`${nowDate} 12:00:00`, `${nowDate} 19:59:00`]
    });
    let json = {};
    getSemesterlist.forEach(item => {
      json[item.periodCode] = item.period;
    });
    state.semesterJson = json;

    let userinfo = store?.state?.account?.userinfo;

    const getClassList = async () => {
      const { data } = await getClassListByTeacher(userinfo.id);
      state.classList = data;
      let json = {};
      data.forEach(item => {
        json[item.id] = item.fullName;
      });
      state.classJson = json;
    };
    // getClassList()

    const getList = async () => {
      const { code, data, msg } = await userApi.getCommentScheduleWeekFn(state.id);
      if (code != 200) {
        ElMessage({
          message: msg,
          type: 'warning'
        });
        return;
      }

      let list = [];
      if (data != null) {
        // TODO:这里是周课表的假数据汇总
        data.calendarDtos[0].chedules.forEach(element => {
          let isPm = element.isPm;
          element.periodSlots.forEach(item => {
            let obj = {
              isPm,
              date: [],
              startTime: '',
              endTime: '',
              day_7: '',
              day_1: '',
              day_2: '',
              day_3: '',
              day_4: '',
              day_5: '',
              day_6: ''
            };
            let timeSlot = item.timeSlot.split('-');
            obj.date = item.timeSlot == '-' ? [] : timeSlot;
            obj.startTime = timeSlot[0];
            obj.endTime = timeSlot[1];
            item.weekScheduleList.forEach(e => {
              obj['day_' + e.week] = e.classId;
            });
            list.push(obj);
          });
        });
      }

      let amlen = 0,
        pmlen = 0;
      list.forEach(item => {
        if (item.isPm == 0) {
          amlen++;
        } else {
          pmlen++;
        }
      });
      if (amlen <= 0) {
        list.push({
          isPm: 0,
          date: [],
          startTime: '',
          endTime: '',
          day_7: '',
          day_1: '',
          day_2: '',
          day_3: '',
          day_4: '',
          day_5: '',
          day_6: ''
        });
      }

      if (pmlen <= 0) {
        list.push({
          isPm: 1,
          date: [],
          startTime: '',
          endTime: '',
          day_7: '',
          day_1: '',
          day_2: '',
          day_3: '',
          day_4: '',
          day_5: '',
          day_6: ''
        });
      }
      state.list = list;
    };
    getList();
    const saveWeek = async () => {
      if (state.isEdit) {
        let list = [];
        state.list.forEach(element => {
          for (let key in element) {
            if (key.indexOf('day') != -1 && element[key]) {
              list.push({
                classId: element[key],
                className: state.classJson[element[key]],
                endTime: element.endTime,
                isPm: element.isPm,
                startTime: element.startTime,
                week: key.split('_')[1]
              });
            }
          }
        });
        // const { code, msg } = await getCommentScheduleWeekUpdata(state.id, list);
        // if (code != 200) {
        //   ElMessage({
        //     message: msg,
        //     type: 'warning'
        //   });
        // } else {
        //   ElMessage({
        //     message: '添加成功',
        //     type: 'success'
        //   });

        // }
      }

      state.isEdit = !state.isEdit;
    };

    const objectSpanMethod = ({ rowIndex, columnIndex }) => {
      let amlen = 0,
        pmlen = 0,
        amindex = null,
        pmindex = null;
      state.list.forEach((item, index) => {
        if (item.isPm == 0) {
          if (amindex === null) amindex = index;
          amlen++;
        } else {
          if (pmindex === null) pmindex = index;
          pmlen++;
        }
      });

      if (columnIndex == amindex) {
        if (rowIndex == 0) {
          return {
            rowspan: amlen,
            colspan: 1
          };
        } else if (rowIndex == pmindex) {
          return {
            rowspan: pmlen,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    };

    const dateChange = index => {
      let _that = state.list[index],
        isPm = _that.isPm,
        date = '2020-01-01 ';
      let [start, end] = state.list[index].date;
      start = new Date(date + start).getTime();
      end = new Date(date + end).getTime();

      let isCross = false;
      state.list.forEach((item, i) => {
        if (item.isPm == isPm && i != index) {
          let s = new Date(date + item.startTime).getTime(),
            e = new Date(date + item.endTime).getTime();
          if (
            (start >= s && start <= e) ||
            (end >= s && end <= e) ||
            (start < s && end > e)
          ) {
            isCross = true;
          }
        }
      });
      if (isCross) {
        ElMessage({
          message: '上课时间不能交叉',
          type: 'warning'
        });
        state.list[index].date = [];
        return;
      }
      state.list[index].startTime = state.list[index].date[0];
      state.list[index].endTime = state.list[index].date[1];
    };
    const addCol = index => {
      let list = JSON.parse(JSON.stringify(state.list));
      list.splice(index + 1, 0, {
        isPm: list[index].isPm,
        date: [],
        startTime: '',
        endTime: '',
        day_7: '',
        day_1: '',
        day_2: '',
        day_3: '',
        day_4: '',
        day_5: '',
        day_6: ''
      });
      state.list = list;
    };
    const deleteCol = index => {
      let list = JSON.parse(JSON.stringify(state.list));
      list.splice(index, 1);
      let amlen = 0,
        pmlen = 0;
      list.forEach(item => {
        if (item.isPm == 0) {
          amlen++;
        } else {
          pmlen++;
        }
      });
      if (amlen <= 0 || pmlen <= 0) {
        return;
      }
      state.list = list;
    };

    const createDay = async () => {
      state.loading = true;
      const { code, msg } = await getCommentScheduleWeekGenerate(
        state.id,
        state.includeHoliday
      );
      if (code != 200) {
        ElMessage({
          message: msg,
          type: 'warning'
        });

        state.loading = false;
      } else {
        ElMessage({
          message: '生成成功',
          type: 'success'
        });
        state.dialog = false;

        state.loading = false;
        router.push({
          path: '/evaluate/day',
          query: { id: state.id, periodCode: state.parmas.periodCode }
        });
      }
    };

    const disabledHoursAm = () => {
      return [0, 1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    };
    const disabledHoursPm = () => {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20, 21, 22, 23, 24];
    };

    return {
      state,
      saveWeek,
      objectSpanMethod,
      dateChange,
      addCol,
      deleteCol,
      createDay,
      getList,
      disabledHoursAm,
      disabledHoursPm
    };
  }
});
</script>

<template>
  <div class="screen">
    <el-space wrap size="large">
      <div>
        <label for>学期:</label>
        <el-select v-model="state.id" placeholder="请选择学期" size="small" @change="getList">
          <el-option label="全部学期" value />
          <template v-for="item in state.semesterlist" :key="item.periodCode">
            <el-option :label="state.semesterJson[item.periodCode]" :value="item.id" />
          </template>
        </el-select>
      </div>
    </el-space>
    <el-button class="button fr" type="primary" size="small" @click="state.dialog = true">
      生成日程表
    </el-button>
  </div>
  <div class="sections">
    <div class="title">
      <span>周课程表</span>
      <el-button class="button fr" type="primary" size="small" @click="saveWeek">
        {{ state.isEdit ? '保存课表' : '编辑课表' }}
      </el-button>
    </div>
    <el-table :data="state.list" :span-method="objectSpanMethod" border class="vw100">
      <el-table-column label="上/下午" width="90">
        <template #default="{ row }">
          {{ row.isPm == 0 ? '上午' : '下午' }}
        </template>
      </el-table-column>
      <el-table-column label="时间" width="205" class="relative">
        <template #default="{ row, $index }">
          <div v-if="state.isEdit" class="operate">
            <span class="el-icon-circle-plus-outline" @click="addCol($index)" />
            <span class="el-icon-remove-outline" @click="deleteCol($index)" />
          </div>
          <span v-if="!state.isEdit">
            <template v-if="row.startTime && row.endTime">{{ row.startTime }} ~ {{ row.endTime }}</template>
          </span>
          <div v-else>
            <el-time-picker
              v-if="row.isPm" v-model="row.date" is-range range-separator="~" start-placeholder="开始时间"
              end-placeholder="结束时间" placeholder="请选择时间" :disabled-hours="disabledHoursPm" format="HH:mm"
              value-format="HH:mm" size="mini" class="w180" :default-value="state.defaultPm"
              @change="dateChange($index)"
            />
            <el-time-picker
              v-else v-model="row.date" is-range range-separator="~" start-placeholder="开始时间"
              end-placeholder="结束时间" placeholder="请选择时间" :disabled-hours="disabledHoursAm" format="HH:mm"
              value-format="HH:mm" size="mini" class="w180" :default-value="state.defaultAm"
              @change="dateChange($index)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="星期一">
        <template #default="{ row }">
          <span v-if="!state.isEdit">{{ state.classJson[row.day_1] }}</span>
          <el-select v-else v-model="row.day_1" placeholder="请选择班级" size="mini" class="inp">
            <template v-for="item in state.classList" :key="item.id">
              <el-option :label="item.fullName" :value="item.id" />
            </template>
          </el-select>
          <span v-if="state.isEdit" class="el-icon-delete" @click="row.day_1 = ''" />
        </template>
      </el-table-column>
      <el-table-column label="星期二">
        <template #default="{ row }">
          <span v-if="!state.isEdit">{{ state.classJson[row.day_2] }}</span>
          <el-select v-else v-model="row.day_2" placeholder="请选择班级" size="mini" class="inp">
            <template v-for="item in state.classList" :key="item.id">
              <el-option :label="item.fullName" :value="item.id" />
            </template>
          </el-select>
          <span v-if="state.isEdit" class="el-icon-delete" @click="row.day_2 = ''" />
        </template>
      </el-table-column>
      <el-table-column label="星期三">
        <template #default="{ row }">
          <span v-if="!state.isEdit">{{ state.classJson[row.day_3] }}</span>
          <el-select v-else v-model="row.day_3" placeholder="请选择班级" size="mini" class="inp">
            <template v-for="item in state.classList" :key="item.id">
              <el-option :label="item.fullName" :value="item.id" />
            </template>
          </el-select>
          <span v-if="state.isEdit" class="el-icon-delete" @click="row.day_3 = ''" />
        </template>
      </el-table-column>
      <el-table-column label="星期四">
        <template #default="{ row }">
          <span v-if="!state.isEdit">{{ state.classJson[row.day_4] }}</span>
          <el-select v-else v-model="row.day_4" placeholder="请选择班级" size="mini" class="inp">
            <template v-for="item in state.classList" :key="item.id">
              <el-option :label="item.fullName" :value="item.id" />
            </template>
          </el-select>
          <span v-if="state.isEdit" class="el-icon-delete" @click="row.day_4 = ''" />
        </template>
      </el-table-column>
      <el-table-column label="星期五">
        <template #default="{ row }">
          <span v-if="!state.isEdit">{{ state.classJson[row.day_5] }}</span>
          <el-select v-else v-model="row.day_5" placeholder="请选择班级" size="mini" class="inp">
            <template v-for="item in state.classList" :key="item.id">
              <el-option :label="item.fullName" :value="item.id" />
            </template>
          </el-select>
          <span v-if="state.isEdit" class="el-icon-delete" @click="row.day_5 = ''" />
        </template>
      </el-table-column>
      <el-table-column label="星期六">
        <template #default="{ row }">
          <span v-if="!state.isEdit">{{ state.classJson[row.day_6] }}</span>
          <el-select v-else v-model="row.day_6" placeholder="请选择班级" size="mini" class="inp">
            <template v-for="item in state.classList" :key="item.id">
              <el-option :label="item.fullName" :value="item.id" />
            </template>
          </el-select>
          <span v-if="state.isEdit" class="el-icon-delete" @click="row.day_6 == ''" />
        </template>
      </el-table-column>
      <el-table-column label="星期日">
        <template #default="{ row }">
          <span v-if="!state.isEdit">{{ state.classJson[row.day_7] }}</span>
          <el-select v-else v-model="row.day_7" placeholder="请选择班级" size="mini" class="inp">
            <template v-for="item in state.classList" :key="item.id">
              <el-option :label="item.fullName" :value="item.id" />
            </template>
          </el-select>
          <span v-if="state.isEdit" class="el-icon-delete" @click="row.day_7 = ''" />
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="state.dialog" title="生成日程表" width="500px" size="small" custom-class="yyDialog">
    <div class="dialog-body">
      <p class="mb15">
        按照学期课表，在学期起止日期内，自动生成每天的排课日程表
      </p>
      <el-space>
        <span>法定节假日:</span>
        <el-radio-group v-model="state.includeHoliday">
          <el-radio :label="0">
            不排课
          </el-radio>
          <el-radio :label="1">
            排课
          </el-radio>
        </el-radio-group>
      </el-space>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="small" @click="state.dialog = false">
          取消
        </el-button>
        <el-button size="small" type="primary" :loading="state.loading" @click="createDay">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.mb15 {
  margin-bottom: 15px;
}

.vw100 {
  width: 100%;
}

.button {
  padding: 0 10px;
}

.operate {
  position: absolute;
  left: -45px;
  top: 17px;

  span {
    font-size: 18px;
    margin: 0 2px;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }
}

.el-icon-delete {
  cursor: pointer;

  &:hover {
    color: #409eff;
  }
}

.inp {
  width: 110px;
  margin-right: 5px;
}

.dialog-body {
  text-align: center;
  margin-bottom: 20px;
}

.dialog-body label {
  margin-right: 20px;
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
</style>
