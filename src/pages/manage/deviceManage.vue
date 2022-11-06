<template>
  <div class="device-manage-box">
    <a-card class='device-app'>
      <inner-title title="设备列表" class="inner-title"></inner-title>
      <a-input-search
        class="search-input"
        v-model="searchKey"
        placeholder="设备名称/产品名称/SN"
        size="default"
        @search="onSearch"
        allowClear
        style="width: 220px;background: #f2f3f5;border-radius: 4px;"
      ></a-input-search>

      <div class="tableWrapper">
        <a-table
          :columns="columns"
          :data-source="tableData"
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
            onShowSizeChange: onSizeChange,}">
          <span slot="deviceName" slot-scope="text, record">
            <span style="cursor: pointer;color: #006fd0;">
              {{ record.deviceName }}
            </span>
          </span>
          <span slot="productName" slot-scope="text, record">{{ record.productName }}</span>
          <span slot="brandName" slot-scope="text, record">{{ record.brandName }}</span>
          <span slot="deviceSn" slot-scope="text, record">{{ record.deviceSn }}</span>
          <span slot="categoryName" slot-scope="text, record">{{ record.categoryName }}</span>
          <span slot="online" slot-scope="text, record">
            <span class="statusWrapper">
              <span
                class="status-box"
                :style="record.online == true ? 'background: #00B42A;' : 'background: #C9CDD4;'"></span>
              {{ record.online == true ? "在线" : '离线' }}
            </span>
          </span>
          <span slot="action" slot-scope="text, record">
            <a-space class="action">
              <a type="primary" @click="handleView(record)">查看</a>
            </a-space>
          </span>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
import innerTitle from "@/components/innerTitle/InnerTitle";
import {
  getDevieceManageList,
} from "@/services/deviceManage";
export default {
  components: { innerTitle },
  data() {
    return {
      searchKey: '',
      loading: false,
      columns: [
        {
          key: "deviceName",
          title: "设备名称",
          ellipsis: true,
          scopedSlots: { customRender: "deviceName" },
        },
        {
          key: "productName",
          title: "产品名称",
          ellipsis: true,
          scopedSlots: { customRender: "productName" },
        },
        {
          key: "brandName",
          title: "品牌",
          ellipsis: true,
          scopedSlots: { customRender: "brandName" },
        },
        {
          key: "deviceSn",
          title: "SN",
          ellipsis: true,
          scopedSlots: { customRender: "deviceSn" },
        },
        {
          key: "online",
          title: "状态",
          ellipsis: true,
          scopedSlots: { customRender: "online" },
        },
        {
          key: "categoryName",
          title: "产品类别",
          ellipsis: true,
          scopedSlots: { customRender: "categoryName" },
        },
        {
          title: "操作",
          key: "action",
          width: 130,
          ellipsis: true,
          scopedSlots: { customRender: "action" },
        },
      ],
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
    }
  },
  mounted(){
    // this.onSearch();
    this.getDevieceManageList();
  },
  methods: {
    // 搜索
    async onSearch(val) {
      this.searchKey = val;
      this.getDevieceManageList();
    },
    handleView(row) {
      this.$router.push({
        path: "deviceInfo",
        query: { 
          deviceCode: row.deviceCode,
          productId: row.productId
        },
      });
      // this.$router.push({
      //   path: "/testing/detail",
      //   query: {
      //     id: row.id
      //   },
      // });
    },
    // 列表
    getDevieceManageList() {
      let params = {
         pageNumber: this.page,
        pageSize: this.pageSize,
        deviceName: this.searchKey
      };
      getDevieceManageList(params).then(res => {
        console.log(res,'res');
        if(res.data.statusCode == 200 && res.data.resultValue) {
          this.total = res.data.resultValue.total;
          this.tableData = res.data.resultValue.list || [];
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err,'err');
      })
    },
    onPageChange(page, pageSize) {
      this.page = page;
      this.pageSize = pageSize;
      this.getDevieceManageList();
    },
    onSizeChange(page, size) {
      this.page = 1;
      this.pageSize = size;
      this.getDevieceManageList();
    },
  }
}
</script>

<style lang="less" scoped>
.device-manage-box {
  .device-app {
    ::v-deep {
      .ant-card-body {
        padding: 22px 0px;
        h2 {
          padding-left: 16px;
        }
      }
    }
  }
  .inner-title {
    margin-bottom: 22px;
    position: relative;
    &::after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -22px;
      display: block;
      content: "";
      border-bottom: 1px solid #e5e6eb;
      height: 1px;
    }
  }
  .search-input {
    height: 40px;
    line-height: 40px;
    margin-left: 16px;
    /deep/ .ant-input {
      height: 40px;
      line-height: 40px;
    }
    margin-top: 26px;
    margin-bottom: 18px;
  }
  .tableWrapper {
    padding: 0 16px;
  }
  .status-box {
      // background: rgb(255, 125, 0);
      width: 5px;
      height: 5px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 5px;
    }
}
</style>
