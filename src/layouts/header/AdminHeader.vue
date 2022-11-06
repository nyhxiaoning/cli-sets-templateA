<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout, pageWidth]">
      <!-- <router-link
        v-if="isMobile || layout === 'head'"
        to="/"
        :class="['logo', isMobile ? null : 'pc', headerTheme]"
      >
        <img width="32" src="@/assets/img/logo.png" />
        <h1 v-if="!isMobile">{{ systemName }}</h1>
      </router-link> -->
      <a-divider v-if="isMobile" type="vertical" />
      <span v-if="layout !== 'head'" class="headerImage">
        <img src="../../assets/set/Group 1707477975.svg" >
        <!-- <span>物栖小应用开发者平台</span> -->
      </span>
      <!-- <header-select class="selectComp" v-if="showSelect"></header-select> -->
      <!-- <a-icon v-if="layout !== 'head'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse"/> -->
      <div
        v-if="layout !== 'side' && !isMobile"
        class="admin-header-menu"
        :style="`width: ${menuWidth};`"
      >
        <i-menu
          class="head-menu"
          :theme="headerTheme"
          mode="horizontal"
          :options="menuData"
          @select="onSelect"
        />
      </div>
      <div :class="['admin-header-right', headerTheme]">
        <!-- <span class="header-item fileStyle">文档</span> -->
        <!-- <header-search class="header-item" @active="val => searchActive = val" /> -->
        <!-- <div class="header-item">
            <img src="@/assets/img/themeIcon.png" width="16" height="16"  @click="handleChangeTheme" style="margin-top:-2px">
          </div> -->
        <!-- <header-notice class="header-item"/> -->
        <header-avatar class="header-item" />
        <!-- <a-dropdown class="lang header-item">
            <div>
              <a-icon type="global"/> {{langAlias}}
            </div>
            <a-menu @click="val => setLang(val.key)" :selected-keys="[lang]" slot="overlay">
              <a-menu-item v-for=" lang in langList" :key="lang.key">{{lang.key.toLowerCase() + ' ' + lang.name}}</a-menu-item>
            </a-menu>
          </a-dropdown> -->
      </div>
    </div>
  </a-layout-header>
</template>

<script>
// import HeaderSearch from './HeaderSearch'
import HeaderNotice from "./HeaderNotice";
import HeaderSelect from "./HeaderSelect";
import HeaderAvatar from "./HeaderAvatar";
import IMenu from "@/components/menu/menu";
import { mapState, mapMutations } from "vuex";

export default {
  name: "AdminHeader",
  components: { IMenu, HeaderAvatar, HeaderNotice, HeaderSelect },
  props: ["collapsed", "menuData"],
  data() {
    return {
      langList: [
        { key: "CN", name: "简体中文", alias: "简体" },
        { key: "HK", name: "繁體中文", alias: "繁體" },
        { key: "US", name: "English", alias: "English" },
      ],
      searchActive: false,
    };
  },
  computed: {
    ...mapState("setting", [
      "theme",
      "isMobile",
      "layout",
      "systemName",
      "lang",
      "pageWidth",
    ]),
    headerTheme() {
      if (
        this.layout == "side" &&
        this.theme.mode == "dark" &&
        !this.isMobile
      ) {
        return "light";
      }
      return this.theme.mode;
    },
    langAlias() {
      let lang = this.langList.find((item) => item.key == this.lang);
      return lang.alias;
    },
    menuWidth() {
      const { layout, searchActive } = this;
      const headWidth = layout === "head" ? "100% - 188px" : "100%";
      const extraWidth = searchActive ? "600px" : "400px";
      return `calc(${headWidth} - ${extraWidth})`;
    },
    showSelect() {
      if (this.$route.path == "/appCenter") {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    toggleCollapse() {
      this.$emit("toggleCollapse");
    },
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    },
    handleChangeTheme() {
      if (this.theme.mode === "light") {
        this.setTheme({ ...this.theme, mode: "night" });
      } else {
        this.setTheme({ ...this.theme, mode: "light" });
      }
    },
    ...mapMutations("setting", ["setTheme", "setLang"]),
  },
};
</script>

<style lang="less" scoped>
@import "index";
.headerImage {
  // cursor: pointer;
  font-size: 20px;
  font-family: PingFang SC, PingFang SC-Medium;
  font-weight: 500;
  text-align: LEFT;
  color: #1d2129;
  // line-height: 32px;
}
.admin-header-right{
  height: 48px;
  line-height: 42px;
}
.selectComp {
  margin-left: 120px;
  padding-top: 5px;
  cursor: pointer;
}
</style>
