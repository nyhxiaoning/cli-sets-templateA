<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  userApi
} from '@test/apis-ts';
// const userApi = require("@test/apis-ts");
// import { getClassListByTeacher } from '@/api/edu'
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
    const hasClasses = index => {
      let has = false;
      if (index != -1) {
        let thatWeek = state.list[index];
        for (let key in thatWeek) {
          if (key.indexOf('day') != -1 && thatWeek[key] != '') {
            if (thatWeek[key].list.length > 0) has = true;
          }
        }
      }
      return has;
    };
    const router = useRouter(),
      { query } = useRoute(),
      store = useStore();
    const curDate = new Date(),
      curYear = curDate.getFullYear(),
      curMonth = curDate.getMonth() + 1;

    // gitee 未更新添加
    const state = reactive({
      parmas: {
        periodCode: query.periodCode
      },
      unCommentCount: 0,
      id: query.id * 1,
      semesterlist: [
        { id: 27, schId: 53, startTime: '2023-04-01 00:00:00', endTime: '2023-05-31 23:59:59', periodCode: 4 },
        { id: 18, schId: 53, startTime: '2022-07-01 00:00:00', endTime: '2022-12-31 23:59:59', periodCode: 2 },
        { id: 28, schId: 53, startTime: '2022-03-01 00:00:00', endTime: '2022-03-31 23:59:59', periodCode: 3 },
        { id: 17, schId: 53, startTime: '2022-01-01 00:00:00', endTime: '2022-06-30 23:59:59', periodCode: 1 }

      ],
      semesterJson: {},
      list: [],
      startTime: '',
      endTime: '',
      date: null,
      m: null,
      start_year_month: null,
      end_year_month: null,
      calendar: {},
      dialog: false,
      index: null,
      stars: {
        isPraise: 0,
        star1: 0,
        star2: 0,
        star3: 0
      },
      classList: [],
      classJson: {},
      addDialog: false,
      isEdit: false,
      from: {
        classId: '',
        date: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        classId: [
          {
            required: true,
            message: '请选择班级',
            trigger: 'blur'
          }
        ],
        date: [
          {
            required: true,
            message: '请选择上课时间',
            trigger: 'blur'
          }
        ]
      },
      classDialog: false,
      studentList: [],
      // 批量点评：1表示日课表的批量点评，2表示对于单个学生单独表扬，3表示批量评分
      isBatch: false,
      curCourse: null,
      studentId: null,
      curRow: null,
      commentTitle: ''
    });

    let userinfo = store.state?.account?.userinfo;
    // 切换dialog的时候，这里展示清空
    watch(
      () => state.dialog,
      (newVal, oldVal) => {
        if (!newVal) {
          // 关闭了按钮，此时取消上一次的单独的按钮的单独表扬的状态
          state.stars.isPraise = 0;
        }
      }
    );
    /**
     * @description:获取当前老师下的班级列表汇总 
     * @param {*}
     * @return {*}
     */
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

    const getTime = date => {
      return new Date(date).getTime();
    };
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

    /**
     * @description:获取当前学期下的列表数据汇总 
     * @param {*} startTime
     * @param {*} endTime
     * @return {*}
     */
    const getCalendar = (startTime, endTime) => {
      const start_arr = startTime.split('-'),
        end_arr = endTime.split('-'),
        start = start_arr[0] + '-' + start_arr[1] + '-01',
        end =
          end_arr[0] +
          '-' +
          end_arr[1] +
          '-' +
          new Date(end_arr[0], end_arr[1], 0).getDate();
      let start_time = new Date(start).getTime(),
        end_time = new Date(end).getTime();
      let list = [];
      while (start_time <= end_time) {
        list.push(formatDate(start_time));
        start_time += 24 * 60 * 60 * 1000;
      }
      let start_week = new Date(list[0]).getDay();
      let obj = {};
      const initObj = () => {
        obj = {
          week: '',
          day0: '',
          day1: '',
          day2: '',
          day3: '',
          day4: '',
          day5: '',
          day6: ''
        };
      };
      initObj();
      let n = null,
        json = {},
        month = null;
      // console.log(list)

      list.forEach((item, index) => {
        let week = (index + start_week) % 7;
        let dateArr = item.split('-'),
          d = dateArr[2],
          m = dateArr[1] * 1,
          y = dateArr[0];

        const createObj = () => {
          obj['day' + week] = {
            date: item,
            week,
            d,
            m,
            y,
            list: []
          };
        };
        if (item == startTime) n = 1;

        if (month == null) {
          month = m;
          json[m] = [];
          createObj();
        }
        if (month != m) {
          let isNotNull = 0;
          for (let key in obj) {
            if (key.indexOf('day') != -1) {
              if (obj[key] != '') isNotNull += 1;
            }
          }
          if (isNotNull > 0) {
            obj.week = `第${n}周`;
            if (isNotNull == 7) n++;
            json[month].push(obj);
            initObj();
          }
          month = m;
          json[m] = [];
          createObj();
          if (obj.day0 != '') {
            json[month].push(obj);
            initObj();
            n++;
          }
        } else {
          createObj();
          if (week == 0) {
            if (n != null) {
              obj.week = `第${n}周`;
              n++;
            } else {
              obj.week = '';
            }
            json[m].push(obj);
            initObj();
          }
        }
        if (index == list.length - 1) {
          let hasMore = false;
          for (let key in obj) {
            if (obj[key] != '') {
              hasMore = true;
            }
          }
          if (hasMore) {
            obj.week = `第${n}周`;
            json[m].push(obj);
          }
        }
      });
      console.log(json);
      state.calendar = json;
    };
    let json = {};
    getSemesterlist.forEach(item => {
      json[item.periodCode] = item.period;
    });
    state.semesterJson = json;
    debugger;

    /** 数组模式
    const getCalendar = (startTime, endTime) => {
      const start_arr = startTime.split('-'),
        end_arr = endTime.split('-'),
        start = start_arr[0] + '-' + start_arr[1] + '-01',
        end =
          end_arr[0] +
          '-' +
          end_arr[1] +
          '-' +
          new Date(end_arr[0], end_arr[1], 0).getDate()
      let start_time = new Date(start).getTime(),
        end_time = new Date(end).getTime()
      let list = []
      while (start_time <= end_time) {
        list.push(formatDate(start_time))
        start_time += 24 * 60 * 60 * 1000
      }
      let start_week = new Date(list[0]).getDay()
      let obj = {
        week: '',
        day1: '',
        day2: '',
        day3: '',
        day4: '',
        day5: '',
        day6: '',
        day7: '',
      }
      let new_list = [],
        n = null

      list.forEach((item, index) => {
        let week = (index + start_week) % 7
        let dateArr = item.split('-'),
          d = dateArr[2],
          m = dateArr[1],
          y = dateArr[0]
        obj['day' + week] = {
          date: item,
          week,
          d,
          m,
          y,
          list: [],
        }
        if (item == startTime) n = 1
        if (week == 0) {
          if (n != null) {
            obj.week = `第${n}周`
            n++
          } else {
            obj.week = ''
          }
          new_list.push(obj)
          obj = {
            week: '',
            day0: '',
            day1: '',
            day2: '',
            day3: '',
            day4: '',
            day5: '',
            day6: '',
          }
        }
        if (index == list.length - 1) {
          let hasMore = false
          for (let key in obj) {
            if (obj[key] != '') {
              hasMore = true
            }
          }
          if (hasMore) {
            obj.week = `第${n}周`
            new_list.push(obj)
          }
        }
      })
      return new_list
    }
    */

    const getList = async () => {
      let parmas = {
        date: state.date
      };
      const { code, data, msg } = await getCommentScheduleDay(
      );
      if (code != 200) {
        ElMessage({
          message: msg,
          type: 'warning'
        });
        return;
      }
      if (data == null) {
        ElMessage({
          message: '未生产日程表',
          type: 'warning'
        });
        state.list = [];
        state.unCommentCount = 0;
        return;
      }
      state.unCommentCount = data.unCommentCount;
      let chedules = data.calendarDtos[0].chedules || [];
      let list = state.calendar;
      // list.forEach(item => {
      //   for (let key in item) {
      //     if (key.indexOf('day') != -1 && item[key] != '') {
      //       let date = item[key].date
      //       let list = []
      //       chedules.forEach(e => {
      //         if (e.startTime.indexOf(date) != -1) {
      //           list.push(e)
      //         }
      //       })
      //       item[key].list = list
      //     }
      //   }
      // })

      state.list = list;
    };

    const getCurDate = () => {
      const start_arr = state.startTime.split('-'),
        end_arr = state.endTime.split('-'),
        start = start_arr[0] + '-' + start_arr[1],
        end = end_arr[0] + '-' + end_arr[1],
        cur_time = new Date(curYear + '-' + curMonth).getTime();
      state.start_year_month = start;
      state.end_year_month = end;

      if (
        cur_time >= new Date(start).getTime() &&
        cur_time <= new Date(end).getTime()
      ) {
        state.date = curYear + '-' + curMonth;
      } else {
        state.date = start;
      }
      let m = state.date.split('-')[1] * 1;
      state.m = m;
      getList();
    };

    const changeSemester = () => {
      // let cur = state.semesterlist.filter(item => item.id == state.id)[0]
      // state.startTime = cur.startTime.split(' ')[0]
      // state.endTime = cur.endTime.split(' ')[0]
      getCalendar('2023-04-01', '2023-05-31');
      // getCurDate()
    };
    // TODO:切换学习的假数据
    // changeSemester()
    // TODO:获取日课表详情数据
    getList();
    debugger;
    // getCalendar()

    const addMonth = () => {
      let currentDate = new Date(state.date),
        date = currentDate.setMonth(currentDate.getMonth() + 1);
      if (getTime(date) <= getTime(state.end_year_month)) {
        state.date = formatDate(date, true);
        state.m = state.date.split('-')[1] * 1;
        getList();
      }
    };
    const cutMonth = () => {
      let currentDate = new Date(state.date),
        date = currentDate.setMonth(currentDate.getMonth() - 1);
      if (getTime(date) >= getTime(state.start_year_month)) {
        state.date = formatDate(date, true);
        state.m = state.date.split('-')[1] * 1;
        getList();
      }
    };

    const batchComment = async () => {
      console.log(state.isBatch, '-------------------------isBatch');
      let res, parmas;
      // TODO:isBatch是表示批量点评的窗口下发
      if (state.isBatch == 1) {
        let item = state.list[state.index];
        let days = [];
        for (let key in item) {
          if (key.indexOf('day') != -1) {
            if (item[key] != '' && item[key].list.length > 0) {
              if (key != 'day0') {
                days.push(item[key]);
              }
            }
          }
        }
        if (item.day0 != '' && item.day0.list.length > 0) {
          days.push(item.day0);
        }
        if (days.length == 0) {
          ElMessage({
            message: '没有可评价的数据',
            type: 'warning'
          });
          state.dialog = false;
          return;
        }
        parmas = {
          startTime: days[0].date + ' 00:00:00',
          endTime: days[days.length - 1].date + ' 23:59:59',
          semesterId: state.id,
          isPraise: state.stars.isPraise || 0,
          star1: state.stars.star1 || 0,
          star2: state.stars.star2 || 0,
          star3: state.stars.star3 || 0
        };
        res = await getCommentBatch(parmas);
        if (res.code == 200) {
          // TODO:不应该调用切换学期数据再次获取，因为这里调用了当前的日期，导致数据对应不上，单独获取当前的列表数据即可
          // changeSemester()
          getList();
        }
      } else if (state.isBatch == 2) {
        parmas = {
          studentScheduleId: state.studentId,
          isPraise: state.stars.isPraise || 0,
          star1: state.stars.star1 || 0,
          star2: state.stars.star2 || 0,
          star3: state.stars.star3 || 0
        };
        res = await getCommentPersonal(parmas);
        if (res.code == 200) {
          commentClick();
          changeSemester();
        }
      } else if (state.isBatch == 3) {
        parmas = {
          dayScheduleIds: [state.curCourse.id],
          isPraise: state.stars.isPraise || 0,
          star1: state.stars.star1 || 0,
          star2: state.stars.star2 || 0,
          star3: state.stars.star3 || 0
        };
        res = await getCommentClass(parmas);
        if (res.code == 200) {
          commentClick();
          // TODO:批量点评后，这里的内容
          changeSemester();
        }
      }

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
        for (let k in state.stars) {
          state.stars[k] = '';
        }
        state.dialog = false;
      }
    };

    const getTimeStr = item => {
      let start = item.startTime.split(' ')[1].slice(0, 5),
        end = item.endTime.split(' ')[1].slice(0, 5);

      return `${start}~${end}`;
    };

    const fromDom = ref('');
    const createCourse = async () => {
      const valid = await fromDom.value.validate();
      if (valid) {
        let parmas = {
          classId: state.from.classId,
          className: state.classJson[state.from.classId],
          endTime: state.curRow.date + ' ' + state.from.endTime + ':00',
          semesterId: state.id,
          startTime: state.curRow.date + ' ' + state.from.startTime + ':00'
        };
        let res;
        if (state.curCourse?.id) {
          res = await getCommentScheduleDayUpdate(state.curCourse.id, parmas);
        } else {
          res = await getCommentScheduleDayCreate(parmas);
        }
        if (res.code == 200) {
          ElMessage({
            message: '添加成功',
            type: 'success'
          });
          state.addDialog = false;
          changeSemester();
        } else {
          ElMessage({
            message: res.msg,
            type: 'warning'
          });
        }
      }
    };

    const deleteCourse = () => {
      ElMessageBox.confirm(
        '<p style="text-align: left">删除课程后，该课程的点评数据也将被删除<br/>请确认是否删除</p>',
        '删除课程',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          center: true
        }
      ).then(() => {
        getCommentScheduleDayDelete(state.curCourse.id).then(
          ({ code, msg }) => {
            if (code == 200) {
              ElMessage({
                message: '删除成功',
                type: 'success'
              });
              state.addDialog = false;
              changeSemester();
            } else {
              ElMessage({
                message: msg,
                type: 'warning'
              });
            }
          }
        );
      });
    };

    const judgeTime = date => {
      let time = new Date().getTime() - 24 * 60 * 60 * 1000,
        thisTime = new Date(date).getTime();

      return time < thisTime;
    };

    const courseClick = (item, row) => {
      state.isEdit = 1;
      state.from.classId = '';
      state.from.date = [];
      state.from.startTime = '';
      state.from.endTime = '';
      state.curCourse = null;
      state.curRow = row;
      if (!judgeTime(row.date)) {
        state.curCourse = item;
        commentClick();
        return;
      }
      if (item) {
        state.isEdit = 2;
        state.curCourse = item;
        console.log(item);
        let dateStr = getTimeStr(item).split('~');
        state.from.classId = item.classId * 1;
        state.from.date = dateStr;
        state.from.startTime = dateStr[0];
        state.from.endTime = dateStr[1];
        state.isEdit = 0;
        let end = new Date(item.endTime).getTime(),
          start = new Date(item.startTime).getTime(),
          now = new Date().getTime();
        console.log(dateStr);
        if (now - end >= 0) {
          //课程已结束 -- 可评价
          commentClick();
          return;
        } else if (now - start >= 0 && now - end < 0) {
          //上课中 -- 可评价
          commentClick();
          return;
        } else if (now - start < 0) {
          //课程未开始 -- 不可评价
        }
      }
      state.addDialog = true;
    };
    const commentClick = async () => {
      const { code, data, msg } = await getCommentDay(state.curCourse.id);
      if (code != 200) {
        ElMessage({
          message: msg,
          type: 'warning'
        });
        return;
      }
      state.studentList = data;
      state.classDialog = true;
    };

    const dateChange = () => {
      state.from.startTime = state.from.date[0];
      state.from.endTime = state.from.date[1];
    };

    return {
      state,
      addMonth,
      cutMonth,
      batchComment,
      getTimeStr,
      changeSemester,
      createCourse,
      deleteCourse,
      courseClick,
      dateChange,
      commentClick,
      fromDom,
      judgeTime,
      hasClasses
    };
  }
});
</script>

<template>
  <div class="screen">
    <el-space wrap size="large">
      <div>
        <label for="">学期:</label>
        <el-select v-model="state.id" placeholder="请选择学期" size="small" @change="changeSemester">
          <el-option label="全部学期" value="" />
          <template v-for="item in state.semesterlist" :key="item.periodCode">
            <el-option :label="state.semesterJson[item.periodCode]" :value="item.id" />
          </template>
        </el-select>
      </div>
    </el-space>
  </div>
  <div class="sections">
    <div class="title">
      <span>日课程表</span>
      <span class="ml10">
        还有{{
          state.unCommentCount
        }}节课未点评，请点击日程表中对应班级课程，进行点评
      </span>
      <span style="float: right;font-size:14px;padding-right:20px">
        <p class="dotedGreen">已完成</p>
        <p class="dotedRed">未点评</p>
      </span>
    </div>
    <div class="palette">
      <el-space size="large">
        <span class="el-icon-arrow-left" @click="cutMonth" />
        {{ state.date }}
        <span class="el-icon-arrow-right" @click="addMonth" />
      </el-space>
    </div>
    <el-table :data="state.list" border cell-class-name="calendar-cell">
      <el-table-column label="时间" class="relative" width="80">
        <template #default="{ row }">
          {{ row.week }}
        </template>
      </el-table-column>
      <el-table-column label="星期一">
        <template #default="{ row }">
          <p>
            {{ row.day1.d }}
            {{ row.day1.date == state.startTime ? '开学' : '' }}
            {{ row.day1.date == state.endTime ? '学期结束' : '' }}
          </p>
          <div class="comment">
            <template v-for="item in row.day1.list" :key="item.id">
              <p class="dotedRed" :class="{ dotedGreen: item.isComment }" @click="courseClick(item, row.day1)">
                {{ getTimeStr(item) }} {{ item.className }}
              </p>
            </template>
          </div>
          <p v-if="row.day1 && judgeTime(row.day1.date)" class="addComment" @click="courseClick(null, row.day1)">
            新建课程
          </p>
        </template>
      </el-table-column>
      <el-table-column label="星期二">
        <template #default="{ row }">
          <p>
            {{ row.day2.d }}
            {{ row.day2.date == state.startTime ? '开学' : '' }}
            {{ row.day2.date == state.endTime ? '学期结束' : '' }}
          </p>
          <div class="comment">
            <template v-for="item in row.day2.list" :key="item.id">
              <p class="dotedRed" :class="{ dotedGreen: item.isComment }" @click="courseClick(item, row.day2)">
                {{ getTimeStr(item) }} {{ item.className }}
              </p>
            </template>
          </div>
          <p v-if="row.day2 && judgeTime(row.day2.date)" class="addComment" @click="courseClick(null, row.day2)">
            新建课程
          </p>
        </template>
      </el-table-column>
      <el-table-column label="星期三">
        <template #default="{ row }">
          <p>
            {{ row.day3.d }}
            {{ row.day3.date == state.startTime ? '开学' : '' }}
            {{ row.day3.date == state.endTime ? '学期结束' : '' }}
          </p>
          <div class="comment">
            <template v-for="item in row.day3.list" :key="item.id">
              <p class="dotedRed" :class="{ dotedGreen: item.isComment }" @click="courseClick(item, row.day3)">
                {{ getTimeStr(item) }} {{ item.className }}
              </p>
            </template>
          </div>
          <p v-if="row.day3 && judgeTime(row.day3.date)" class="addComment" @click="courseClick(null, row.day3)">
            新建课程
          </p>
        </template>
      </el-table-column>
      <el-table-column label="星期四">
        <template #default="{ row }">
          <p>
            {{ row.day4.d }}
            {{ row.day4.date == state.startTime ? '开学' : '' }}
            {{ row.day4.date == state.endTime ? '学期结束' : '' }}
          </p>
          <div class="comment">
            <template v-for="item in row.day4.list" :key="item.id">
              <p class="dotedRed" :class="{ dotedGreen: item.isComment }" @click="courseClick(item, row.day4)">
                {{ getTimeStr(item) }} {{ item.className }}
              </p>
            </template>
          </div>
          <p v-if="row.day4 && judgeTime(row.day4.date)" class="addComment" @click="courseClick(null, row.day4)">
            新建课程
          </p>
        </template>
      </el-table-column>
      <el-table-column label="星期五">
        <template #default="{ row }">
          <p>
            {{ row.day5.d }}
            {{ row.day5.date == state.startTime ? '开学' : '' }}
            {{ row.day5.date == state.endTime ? '学期结束' : '' }}
          </p>

          <div class="comment">
            <template v-for="item in row.day5.list" :key="item.id">
              <p class="dotedRed" :class="{ dotedGreen: item.isComment }" @click="courseClick(item, row.day5)">
                {{ getTimeStr(item) }} {{ item.className }}
              </p>
            </template>
          </div>
          <p v-if="row.day5 && judgeTime(row.day5.date)" class="addComment" @click="courseClick(null, row.day5)">
            新建课程
          </p>
        </template>
      </el-table-column>
      <el-table-column label="星期六">
        <template #default="{ row }">
          <p>
            {{ row.day6.d }}
            {{ row.day6.date == state.startTime ? '开学' : '' }}
            {{ row.day6.date == state.endTime ? '学期结束' : '' }}
          </p>

          <div class="comment">
            <template v-for="item in row.day6.list" :key="item.id">
              <p class="dotedRed" :class="{ dotedGreen: item.isComment }" @click="courseClick(item, row.day6)">
                {{ getTimeStr(item) }} {{ item.className }}
              </p>
            </template>
          </div>
          <p v-if="row.day6 && judgeTime(row.day6.date)" class="addComment" @click="courseClick(null, row.day6)">
            新建课程
          </p>
        </template>
      </el-table-column>
      <el-table-column label="星期日">
        <template #default="{ row }">
          <p>
            {{ row.day0.d }}
            {{ row.day0.date == state.startTime ? '开学' : '' }}
            {{ row.day0.date == state.endTime ? '学期结束' : '' }}
          </p>

          <div class="comment">
            <template v-for="item in row.day0.list" :key="item.id">
              <p class="dotedRed" :class="{ dotedGreen: item.isComment }" @click="courseClick(item, row.day0)">
                {{ getTimeStr(item) }} {{ item.className }}
              </p>
            </template>
          </div>
          <p v-if="row.day0 && judgeTime(row.day0.date)" class="addComment" @click="courseClick(null, row.day0)">
            新建课程
          </p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template #default="{ row, $index }">
          <el-button
            v-if="hasClasses($index)" type="text" @click="
              () => {
                state.index = $index
                state.dialog = true
                state.isBatch = 1
                state.commentTitle = row.week
              }
            "
          >
            批量点评
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="state.dialog" :title="state.commentTitle" width="500px" size="small" custom-class="yyDialog"
    center
  >
    <div class="dialog-body">
      <div
        v-if="state.isBatch == 2" style="margin-bottom: 20px" class="start" @click="
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
  <el-dialog
    v-model="state.addDialog" :title="
      state.isEdit == 1
        ? '新建课程'
        : state.isEdit == 2
          ? '修改课程'
          : '课程信息'
    " width="400px" size="small" custom-class="yyDialog"
  >
    <div class="dialog-body">
      <el-form ref="fromDom" :model="state.from" :rules="state.rules" label-width="120px" size="small">
        <el-form-item label="班级" prop="classId">
          <el-select v-if="state.isEdit" v-model="state.from.classId" placeholder="请选择班级" size="mini" class="inp">
            <template v-for="item in state.classList" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
          <p v-else>
            {{ state.classJson[state.from.classId] }}
            <span class="icon el-icon-edit-outline" @click="state.isEdit = 2" />
            <span class="icon el-icon-delete" @click="deleteCourse" />
          </p>
        </el-form-item>
        <el-form-item label="上课时间" prop="date">
          <el-time-picker
            v-if="state.isEdit" v-model="state.from.date" is-range range-separator="~"
            start-placeholder="开始时间" end-placeholder="结束时间" placeholder="请选择时间" format="HH:mm" value-format="HH:mm" size="mini"
            class="w180" @change="dateChange"
          />
          <span v-else>
            {{ state.from.startTime }}~{{ state.from.endTime }}
          </span>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="state.isEdit" size="small" @click="state.addDialog = false">
          取消
        </el-button>
        <el-button v-if="state.isEdit" size="small" type="primary" @click="createCourse">
          确定
        </el-button>
        <!-- <el-button
          size="small"
          type="primary"
          @click="commentClick"
          v-if="!state.isEdit"
        >
          点评
        </el-button> -->
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="state.classDialog" title="课堂点评" width="1400px" size="small" custom-class="yyDialog yyDialog2"
    center
  >
    <div class="dialog-body" style="text-align: left">
      <div style="margin-bottom: 30px">
        <el-space wrap :size="40">
          <span>
            学期:
            {{
              state.semesterJson[
                state.semesterlist.filter(
                  item => item.id == state.curCourse.semesterId
                )[0].periodCode
              ]
            }}
          </span>
          <span>班级: {{ state.curCourse.className }}</span>
          <span>开课时间: {{ state.curCourse.startTime }}</span>
        </el-space>
        <span class="fr">(1: 得分, 0: 未得分; 1星为1分)</span>
      </div>
      <el-scrollbar class="scrollbar">
        <el-space wrap :size="20">
          <template v-for="item in state.studentList" :key="item.id">
            <div class="studentCard">
              <div class="title">
                <p>{{ item.studentName }}</p>
                <p>{{ item.studentNo }}</p>
                <img v-if="item.isPraise" width="42" src="@/assets/img/hand.png">
              </div>
              <div
                class="body" @click="
                  () => {
                    state.stars.star1 = item.star1
                    state.stars.star2 = item.star2
                    state.stars.star3 = item.star3
                    state.stars.isPraise = item.isPraise
                    state.dialog = true
                    state.isBatch = 2
                    state.studentId = item.id
                    state.commentTitle = item.studentName
                  }
                "
              >
                <p>
                  <span>出勤率</span>
                  <em>：</em>
                  <img v-if="item.star1" width="36" src="@/assets/img/star.png">
                  <img v-else width="36" src="@/assets/img/star-outline.png">
                </p>
                <p>
                  <span>参与度</span>
                  <em>：</em>
                  <img v-if="item.star2" width="36" src="@/assets/img/star.png">
                  <img v-else width="36" src="@/assets/img/star-outline.png">
                </p>
                <p>
                  <span>学习作业</span>
                  <em>：</em>
                  <img v-if="item.star3" width="36" src="@/assets/img/star.png">
                  <img v-else width="36" src="@/assets/img/star-outline.png">
                </p>
              </div>
            </div>
          </template>
        </el-space>
      </el-scrollbar>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          size="small" type="primary" class="sbtn" @click="
            () => {
              state.dialog = true
              state.isBatch = 3
              state.commentTitle = `${state.curCourse.className} 共${state.studentList.length}位学生`
            }
          "
        >
          批量评分
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.ml10 {
  margin-left: 10px;
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

.icon {
  cursor: pointer;

  &:hover {
    color: #409eff;
  }

  margin-left: 10px;
}

.inp {
  width: 110px;
  margin-right: 5px;
}

.palette {
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 15px;

  span {
    width: 60px;
    line-height: 32px;
    text-align: center;
    display: inline-block;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }
}

.comment {
  height: 23 * 5px;

  p {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.addComment {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  color: #409eff;
  cursor: pointer;
  line-height: 30px;
  background: #fff;
  height: 0;
  transition: height linear 0.3;
}

.scrollbar {
  height: calc(100vh - 240px);
}

.sbtn {
  width: 120px;
  height: 40px;
  background: #3a82ff;
  border-radius: 6px;
}

.studentCard {
  text-align: left;
  width: 310px;
  border: 1px solid #ccc;
  color: #333;
  box-sizing: border-box;
  font-size: 16px;

  .title {
    padding: 16px 20px 0;
    background: #f2f4f5;
    height: 80px;
    box-sizing: border-box;
    position: relative;

    p {
      line-height: 1;
      margin-bottom: 12px;
    }

    img {
      position: absolute;
      right: 20px;
      top: 16px;
    }
  }

  .body {
    padding: 16px 20px;

    p {
      margin-bottom: 22px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    em {
      line-height: 35px;
      font-style: normal;
      float: left;
      margin-right: 20px;
    }

    span {
      float: left;
      line-height: 35px;
      height: 35px;
      overflow: hidden;
      width: 70px;
      text-align: justify;

      &::after {
        content: ' ';
        width: 100%;
        height: 0;
        overflow: hidden;
        display: inline-block;
      }
    }
  }
}

.dialog-body {
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
}

.dialog-body label {
  margin-right: 20px;
}

.dialog-body .el-form {
  text-align: left;
}

.start {
  text-align: center;
  cursor: pointer;

  span {
    font-size: 20px;
  }

  p {
    margin-bottom: 20px;
  }
}
</style>
<style>
.el-input.w220 {
  width: 220px;
}

.el-date-editor.w180 {
  width: 180px;
}

.yyDialog2.el-dialog {
  margin-top: 10px !important;
}

.yyDialog2 .el-dialog__header {
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
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

.el-table .calendar-cell {
  padding: 5px 0;
  vertical-align: top;
}

.el-table .calendar-cell .cell {
  position: relative;
  /*暂时兼容此时的高度的适配设置*/
  height: 200px;
}

/*增加一个hover的伪类，新建的时候*/
.el-table .calendar-cell .cell:hover .addComment {
  height: 30px;
}

/* .now-height-class {
  height: 200px;
} */
</style>
