<template>
  <a-layout :class="['admin-layout', 'beauty-scroll']">
    <drawer v-if="isMobile" v-model="drawerOpen">
      <side-menu
        :theme="theme.mode"
        :menuData="menuData"
        :collapsed="false"
        :collapsible="false"
        @menuSelect="onMenuSelect"
      />
    </drawer>
    <side-menu
      :class="[fixedSideBar ? 'fixed-side' : '']"
      :theme="theme.mode"
      v-else-if="layout === 'side' || layout === 'mix'"
      :menuData="sideMenuData"
      :collapsed="collapsed"
      :collapsible="true"
    />
    <div
      v-if="fixedSideBar && !isMobile"
      :style="
        `width: ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`
      "
      class="virtual-side"
    ></div>
    <drawer v-if="!hideSetting" v-model="showSetting" placement="right">
      <div class="setting" slot="handler">
        <a-icon :type="showSetting ? 'close' : 'setting'" />
      </div>
      <setting />
    </drawer>
    <a-layout class="admin-layout-main beauty-scroll">
      <admin-header
        :class="[
          {
            'fixed-tabs': fixedTabs,
            'fixed-header': fixedHeader,
            'multi-page': multiPage,
          },
        ]"
        :style="headerStyle"
        :menuData="headMenuData"
        :collapsed="collapsed"
        @toggleCollapse="toggleCollapse"
      />
      <a-layout-header
        :class="[
          'virtual-header',
          {
            'fixed-tabs': fixedTabs,
            'fixed-header': fixedHeader,
            'multi-page': multiPage,
          },
        ]"
        v-show="fixedHeader"
      ></a-layout-header>
      <a-layout-content
        class="admin-layout-content"
        :style="`min-height: ${minHeight}px;`"
      >
        <div style="position: relative;height:100%">
          <slot></slot>
        </div>
      </a-layout-content>
      <!-- <a-layout-footer style="padding: 0px">
        <page-footer :link-list="footerLinks" :copyright="copyright" />
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script>
import AdminHeader from "./header/AdminHeader";
import Drawer from "../components/tool/Drawer";
import SideMenu from "../components/menu/SideMenu";
import Setting from "../components/setting/Setting";
import { mapState, mapMutations, mapGetters } from "vuex";
import {loadRoutes, loadGuards, setAppOptions} from '@/utils/routerUtil'

export default {
  name: "AdminLayout",
  components: { Setting, SideMenu, Drawer, AdminHeader },
  data() {
    return {
      minHeight: window.innerHeight - 48,
      collapsed: false,
      showSetting: false,
      drawerOpen: false,
    };
  },
  provide() {
    return {
      adminLayout: this,
    };
  },
  watch: {
    $route(val) {
      this.setActivated(val);
    },
    layout() {
      this.setActivated(this.$route);
    },
    isMobile(val) {
      if (!val) {
        this.drawerOpen = false;
      }
    },
  },
  computed: {
    ...mapState("setting", [
      "isMobile",
      "theme",
      "layout",
      "footerLinks",
      "copyright",
      "fixedHeader",
      "fixedSideBar",
      "fixedTabs",
      "hideSetting",
      "multiPage",
    ]),
    ...mapGetters("setting", ["firstMenu", "subMenu", "menuData"]),
    sideMenuWidth() {
      return this.collapsed ? "80px" : "256px";
    },
    headerStyle() {
      // let width = (this.fixedHeader && this.layout !== 'head' && !this.isMobile) ? `calc(100% - ${this.sideMenuWidth})` : '100%'
      // let position = this.fixedHeader ? 'fixed' : 'static'
      let width = "100%";
      let position = "fixed";
      return `width: ${width}; position: ${position};height:48px`;
    },
    headMenuData() {
      const { layout, menuData, firstMenu } = this;
      return layout === "mix" ? firstMenu : menuData;
    },
    sideMenuData() {
      const { layout, menuData, subMenu } = this;
      return layout === "mix" ? subMenu : menuData;
    },
  },

  methods: {
    ...mapMutations("setting", ["correctPageMinHeight", "setActivatedFirst"]),
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    onMenuSelect() {
      this.toggleCollapse();
    },
    setActivated(route) {
      if (this.layout === "mix") {
        let matched = route.matched;
        matched = matched.slice(0, matched.length - 1);
        const { firstMenu } = this;
        for (let menu of firstMenu) {
          if (matched.findIndex((item) => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath);
            break;
          }
        }
      }
    },
  // getNavigation() {
  //   getNavigation()
  //     .then((res) => {
  //       if (res.data.statusCode === 200) {
  //         // let permissionsList=res.data.resultValue
  //         sessionStorage.setItem('permissions',JSON.stringify(res.data.resultValue))
  //         this.menuData.forEach((item,pIndex,pArr) => {
  //           let parentIndex=this.includePage({parentCode:item.meta.code,checkChild:false})
  //           if(parentIndex>-1){
  //             pArr[pIndex].meta.invisible=false
  //             item.children.forEach((childItem,cIndex,cArr) => {
  //               let childIndex=this.includePage( {parentCode:item.meta.code,childCode:childItem.meta.code,checkChild:true})
  //               if(childIndex>-1){
  //                  cArr[cIndex].meta.invisible=false

  //               }
  //             })
  //           }
  //         });
  //          loadRoutes()
  //       }
  //     })
  //     .catch((err) => {
  //       this.$message.error("系统异常");
  //     });
  // },
   includePage(data){
    //  let permissionsList=[{"name":"仪表盘","sort":1,"code":"instrument_panel","permissions":[{"name":"工作台","sort":1,"code":"workbench","resources":[{"name":"工作台","url":"/gzt"}]}]},{"name":"体育比赛","sort":2,"code":"athletic_contest","permissions":[{"name":"云比赛","sort":2,"code":"cloud_game","resources":[{"name":"云比赛","url":"/ybs"}],"permissions":[{"name":"新建比赛","sort":1,"code":"competitions_save"},{"name":"编辑比赛","sort":2,"code":"competitions_edit"},{"name":"查看比赛","sort":3,"code":"competitions_info"},{"name":"数据导出","sort":4,"code":"competitions_export"}]}]},{"name":"系统设置","sort":3,"code":"system_settings","permissions":[{"name":"成员管理","sort":3,"code":"users_management","resources":[{"name":"成员管理","url":"/cygl"}]},{"name":"组织管理","sort":4,"code":"organizations_management","resources":[{"name":"组织管理","url":"/zzgl"}]}]}]
    let permissionsList= sessionStorage.getItem('permissions')?JSON.parse(sessionStorage.getItem('permissions')):[]
     let {parentCode,childCode,checkChild=false}=data
      let parentIndex=permissionsList.findIndex((item) => item.code == parentCode);
     if(!checkChild){
       return parentIndex
     }else{
       let childIndex= permissionsList[parentIndex].permissions.findIndex((item) => item.code == childCode);
       return childIndex
     }
   }
  },
  created() {
   
    this.correctPageMinHeight(this.minHeight - 24);
    this.setActivated(this.$route);
  },
  beforeDestroy() {
    this.correctPageMinHeight(-this.minHeight + 24);
  },
};
</script>

<style lang="less" scoped>
.admin-layout {
  .side-menu {
    &.fixed-side {
      position: fixed;
      height: 100vh;
      left: 0;
      top: 0;
      box-shadow: -1px 0px 0px 0px #f0f0f0 inset;
    }
  }
  .virtual-side {
    transition: all 0.2s;
  }
  .virtual-header {
    transition: all 0.2s;
    opacity: 0;
    &.fixed-tabs.multi-page:not(.fixed-header) {
      height: 0;
    }
  }
  .admin-layout-main {
    .admin-header {
      top: 0;
      right: 0;
      overflow: hidden;
      transition: all 0.2s;
      &.fixed-tabs.multi-page:not(.fixed-header) {
        height: 0;
      }
    }
  }
  /deep/ .ant-layout-header,
  /deep/ .ant-layout-header {
    height: 48px;
    line-height: 48px;
  }
  .admin-layout-content {
    padding: 0 17px 25px 11px;
    padding-top: 0;
    /*overflow-x: hidden;*/
    /*min-height: calc(100vh - 64px - 122px);*/
    background: #f7f8fc;
  }
  .setting {
    background-color: @primary-color;
    color: @base-bg-color;
    border-radius: 5px 0 0 5px;
    line-height: 40px;
    font-size: 22px;
    width: 40px;
    height: 40px;
    box-shadow: -2px 0 8px @shadow-color;
  }
}
</style>
