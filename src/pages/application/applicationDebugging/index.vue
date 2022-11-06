<template>
  <div class="cloundCmpetitionPage">
    <a-card class='app-list'> 
      <inner-title title="应用列表" style='padding:0 16px'> </inner-title>
      <div class="line"></div>
      <a-button type="primary" icon="plus" @click="addApp" style="margin:26px 0 26px 16px;width: 110px;height: 32px;background: #006fd0;border-radius: 2px;">新增应用</a-button>
     
      <div class="tableWrapper">
        <a-table
          :columns="columns"
          :data-source="data"
          :loading="loading"
          rowKey="id"
          :pagination="{
            current: page,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showLessItems: true,
            showTotal: (total) => `共${total}条记录`,
            onChange: onPageChange,
            onShowSizeChange: onSizeChange,
          }"
        >
         <span slot="appName" slot-scope="text, record">
            <span style="cursor: pointer;color: #006fd0;" @click="handleView(record)">
              {{ record.appName }}
            </span>
          </span>
          <!-- <span slot="phoneNumber" slot-scope="text, record">
            <span style="cursor: pointer;">
              {{ record.phoneNumber }}
            </span>
          </span> -->
          <span slot="appDescribe" slot-scope="text, record">
            {{ record.appDescribe }}
          </span>
          <span slot="updateTime" slot-scope="text, record">
            {{ record.updateTime | dataFormat }}
          </span>

          <span slot="action" slot-scope="text, record">
            <a-space class="action">
              <a type="primary" @click="handleView(record)">调试</a>
              <a-dropdown>
                <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                  更多<a-icon type="down" style="margin-left:6px" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item >
                    <a href="javascript:;" @click="JumpDetail(record)">编辑</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" @click="deleteItem(record)"
                      >删除</a
                    >
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </a-space>
          </span>
        </a-table>
      </div>
    </a-card>
    <Dialog ref="baseDialog" @submitDate="submitDate"></Dialog>
  </div>
</template>

<script>
import innerTitle from "@/components/innerTitle/InnerTitle";
import Dialog from "./components/Ddialog";
import { getAppList, deleteApp } from "@/services/application";
import { parseTime } from "@/utils/util";
export default {
  components: { innerTitle, Dialog },
  data() {
    return {
      copyConfig: 'Sorry, you have copied nothing O(∩_∩)O~',
      visible: true,
      confirmLoading: false,
      searchForm: {
        phoneNumber: null,
        status: undefined,
      },
      columns: [
        {
          key: "appName",
          title: "应用名称",
          ellipsis: true,
          scopedSlots: { customRender: "appName" },
        },
        {
          key: "appDescribe",
          title: "描述",
          ellipsis: true,
          scopedSlots: { customRender: "appDescribe" },
        },
        {
          key: "updateTime",
          title: "更新日期",
          // sorter: (a, b) => a.createTime - b.createTime,
          // ellipsis: true,
          scopedSlots: { customRender: "updateTime" },
        },
        {
          title: "操作",
          key: "action",
          width: 130,
          ellipsis: true,
          scopedSlots: { customRender: "action" },
        },
      ],
      data: [],
      loading: false,
      page: 1,
      pageSize: 10,
      total: 30,
    };
  },
  filters: {
    dataFormat(time) {
      return time ? parseTime(time, "{y}-{m}-{d} {h}:{i}:{s}") : "";
    },
  },
  created() {
    this.pageList();
  },
  mounted(){},
  methods: {
    // 获取列表数据
    pageList() {
      let params = {
        pageNumber: this.page,
        pageSize: this.pageSize,
      };
      getAppList(params)
        .then((res) => {
          console.log('获取应用列表数据',res)
          if (res.data.statusCode === 200) {
            this.data = res.data.resultValue.list || [];
            this.total = res.data.resultValue.total;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          // this.$message.error("系统异常");
        });
    },
    // 删除
    deleteItem(item) {
      this.$refs.baseDialog.show();
      this.$refs.baseDialog.setValue(item.appId);
    },
    // 删除掉接口
    submitDate(value) {
      console.log(value,'oooooo')
      deleteApp(value).then((res) => {
        if (res.data.statusCode === 200) {
          this.pageList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 新建应用
    addApp() {
      this.$router.push({
        path: 'addApplication',
      })
    },
    // 编辑
    JumpDetail(scope) {
      console.log(scope,'scope编辑');
      this.$router.push({
        path: "addApplication",
        query: { appId: scope.appId },
      });
    },
    // 调试
    handleView(row) {
      this.$router.push({
        path: "/application/debugger",
        query: {
          id: row.appId,
          appName: row.appName
        },
      });
    },
    // 分页
    onPageChange(page, pageSize) {
      this.page = page;
      this.pageSize = pageSize;
      this.pageList();
    },
    onSizeChange(page, size) {
      this.page = 1;
      this.pageSize = size;
      this.pageList();
    },
  },
};
</script>

<style lang="less" scoped>
.cloundCmpetitionPage {
  height: 100%;
  background: #fff;
  .app-list {
    ::v-deep {
      .ant-card-body {
        padding: 22px 0px;
      }
    }
    .line {
      width: 100%;
      margin-top: 22px;
      border-bottom: 1px solid #e5e6eb;
    }
  }
  .tableWrapper {
    padding: 0 16px;
  }
  .statusWrapper {
    display: flex;
    align-items: center;
    .status-box {
      // background: rgb(255, 125, 0);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 8px;
    }
  }
  .action {
    // display: flex;
    // justify-content: space-between;
    a {
      padding-left: 4px;
      color: #006fd0;
    }
  }
  .deleteDialog {
    background: green;
    ::v-deep {
      .ant-modal {
        background: red;
      }
    }
    // ::v-deep {
    //   .ant-modal {
    //     background: red;
    //   }
    //   .ant-modal-header {
    //     width: 370px;
    //     height: 38px;
    //     background: #f0f1f5;
    //   }
    // }
  }
}
</style>
