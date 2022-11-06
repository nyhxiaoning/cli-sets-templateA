<template>
  <div class="pageTitle">
    <!-- <a-icon type="bars" />
    <span class="barsLine">/</span> -->
    <a-breadcrumb>
      <a-breadcrumb-item :key="index" v-for="(item, index) in breadcrumb">
        <span v-if="breadcrumb.length>2&&index==1" class="router" @click="routerClick">{{ item }}</span>
        <span v-else>{{ item }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import { getI18nKey } from "@/utils/routerUtil";
export default {
  data() {
    return {
      page: {},
    };
  },
  props: {
    title: {
      type: String,
      required: false,
    },
    showBackIcon: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    $route() {
      this.page = this.$route.meta.page;
    },
  },
  created() {
    this.page = this.$route.meta.page;
  },
  computed: {
    breadcrumb() {
      let page = this.page;
      let breadcrumb = page && page.breadcrumb;
      if (breadcrumb) {
        let i18nBreadcrumb = [];
        breadcrumb.forEach((item) => {
          i18nBreadcrumb.push(this.$t(item));
        });
        return i18nBreadcrumb;
      } else {
        return this.getRouteBreadcrumb();
      }
    },
  },
  methods: {
    routerClick(){
      if (
        this.$route.path == "/testing/detail"
      ) {
       this.$router.push("/testing/record");
      }
      if(this.$route.path == '/application/addApplication'){
        this.$router.push("/application/applicationDebugging");
      }
      if(this.$route.path == '/manage/deviceInfo'){
        this.$router.push("/manage/deviceManage");
      }
    },
    getRouteBreadcrumb() {
      let routes = this.$route.matched;
      const path = this.$route.path;
      let breadcrumb = [];
      routes
        .filter((item) => path.includes(item.path))
        .forEach((route) => {
          // const path = route.path.length === 0 ? '/home' : route.path
          const path = route.path;
          if (path) {
            breadcrumb.push(this.$t(getI18nKey(path)));
          }
        });
      let pageTitle = this.page && this.page.title;
      if (this.customTitle || pageTitle) {
        breadcrumb[breadcrumb.length - 1] = this.customTitle || pageTitle;
      }
      if (this.$route.path == "/testing/detail") {
        if (this.$route.query.id) {
          breadcrumb = ["检测", "检测记录", "检测详情"];
        } else {
          breadcrumb = ["检测", "检测记录", "检测详情"];
        }
      }
      return breadcrumb;
    },
  },
};
</script>

<style lang="less" scoped>
.pageTitle {
  padding: 20px 0 15px 0;
  display: flex;
  align-items: center;
  .barsLine {
    padding: 0 10px;
  }
}
.router{
  cursor: pointer;
}
</style>
