<template>
  <el-container>
    <el-header class="header"> </el-header>
    <el-container class="body">
      <router-view />
    </el-container>
  </el-container>
</template>
<style lang="less" scoped>
.header {
  height: 60px;
  background: #fff;
}
.body {
  padding-top: 15px;
}
</style>
