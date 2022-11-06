<template>
  <a-popover v-model="visible" trigger="click" placement="bottom" overlayClassName="popoverStyle">
    <span type="link">{{showAppName}}</span>
    <a-icon type="down" style="margin-left:10px"/>
    <div slot="content" class="popoverWrapper">
      <a-input ref="userNameInput" v-model="userName" placeholder="搜索应用" @change="searchInputChange" class="inputBox">
        <a-icon slot="prefix" type="search" style="margin-left:5px"/>
      </a-input>
      <div class="listBox">
        <div class="listItem" v-for="(item, index) in productListRst" :key="index" :class="{haveBg: item.flag}" @click="handleClickItem(item)">
          <div>{{item.appName}}</div>
          <a-icon type="check" class="selectFlag" v-if="item.flag"/>
        </div>
      </div>
    </div>
  </a-popover>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  inject: ['reload'],
  data() {
    return {
      visible: false,
      userName: '',
      productList: [],
      productListRst: '',
      showAppName: JSON.parse(localStorage.getItem('appInfo')).appName
    }
  },
  methods: {
    ...mapMutations('appInfo', ['setAppId', 'setAppCode', 'setAppInfo']),
    hide() {
      this.visible = false;
    },
    handleClickItem(item) {
      this.setAppId(item.id)
      this.setAppCode(item.appCode)
      this.setAppInfo(JSON.stringify(item))
      this.reload()
    },
    searchInputChange() {
      let value = this.userName
      // 若未输入值，则展示所有数据
      if(null === value || undefined === value || '' === value){
        this.productListRst = this.productList;
      } else {
        this.productListRst = []; // 结果列表置空
        let regStr =  '';
        // 初始化正则表达式
        for(let i=0; i<value.length; i++){
          regStr = regStr + '(' + value[i] + ')([\\s]*)'; //跨字匹配
        }
        let reg = new RegExp(regStr);
        for(let i=0; i<this.productList.length; i++){
          let name = this.productList[i].appName; //按照名字匹配
          let regMatch = name.match(reg);
          if(null !== regMatch) {// 将匹配的数据放入结果列表中
             this.productListRst.push(this.productList[i]);
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.inputBox{
  padding: 10px;
}
.listBox{
  margin-top: 10px;
  height: 100px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0 !important
  }
  .listItem{
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #1d2129;
    cursor: pointer;
  }
  .haveBg{
    background: #f5f5f5;
  }
  .selectFlag{
    color: #1890FF;
  }
}
  
</style>
<style>
.popoverStyle .ant-popover-inner-content
  {
    padding: 10px 0!important;
  }
</style>