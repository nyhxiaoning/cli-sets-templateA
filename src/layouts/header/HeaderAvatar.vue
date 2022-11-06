<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <!-- <span>{{ userName }}</span> -->
      <a-avatar class="avatar" size="small" shape="circle" :src="avatarImg"/>
      <!-- <img src="../../assets/img/header-img-box.svg" alt=""> -->
      <!-- <span class="name">{{user.name}}</span>
      <a-icon type="caret-down" theme="filled" class="avatar"/> -->
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <a-menu-item class="account-box">
        <div>{{userAccount}}</div>
      </a-menu-item>
      <a-menu-item @click="manageFun">
        <a-icon style="margin-right: 8px;" type="setting" />
        <span>账号管理</span>
      </a-menu-item>
      <a-menu-item @click="logout">
        <!-- <img src="../../assets/set/interactive-button_Export.svg" alt="" style="margin-right: 5px"> -->
        <!-- <a-icon style="margin-right: 8px;" type="poweroff" /> -->
        <span style="margin-left: 20px;">退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import {mapGetters} from 'vuex'
import {logout , userinfo} from '@/services/user'
export default {
  name: 'HeaderAvatar',
  data() {
    return {
      userAccount: '',
      userName: JSON.parse(localStorage.getItem("userAccount")),
      avatarImg: 'https://devstorage.jeejio.com/initialImgs/imgs/userdefaultheadimg.png',
    };
  },
  computed: {
    ...mapGetters('account', ['user']),
  },
  methods: {
    // 退出
    logout() {
      logout();
      this.$router.push('/login')
    },
    // 获取用户信息
    userinfo() {
        userinfo().then(res => {
          console.log(res,'res');
          if(res.data.resultValue) {
            localStorage.setItem('headPortrait',res.data.resultValue.headPortrait)
            this.avatarImg = localStorage.getItem('headPortrait');
            this.avatarImg = res.data.resultValue.headPortrait == null ? 'https://devstorage.jeejio.com/initialImgs/imgs/userdefaultheadimg.png' : res.data.resultValue.headPortrait
          }
        }).catch(err => {
          console.log(err,'err');
        })
    },
    // 账户管理
    manageFun() {
      this.$router.push('/manage/account-info')
    }
  },
  mounted() {
    let a = JSON.parse(localStorage.getItem("userAccount")).slice(0,3);
    let b = JSON.parse(localStorage.getItem("userAccount")).slice(7,11);
    this.userAccount = a + '****' + b;
    this.userinfo()
  },
}
</script>

<style lang="less" scoped>
  .header-avatar{
    height: 48px;
    // display: inline-flex;
    span {
      font-size: 14px;
      font-weight: 500;
      color: #1d2129;
      margin-right: 5px;
    }
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      width: 36px;
      height: 36px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 124px;
    float: right;
    padding: 0 0px!important;
    .account-box:hover {
      background-color: #fff!important;
    }
  }
  .ant-dropdown-menu-item {
    padding: 0 16px!important;
  }
  .ant-dropdown-menu-item:nth-child(1) {
    cursor: auto;
  }
  .ant-dropdown-menu-item:nth-child(2) {
    height: 40px;
    line-height: 46px;
    &:hover {
      font-size: 14px;
      background-color: #fff!important;
      color: #006fd0;
    }
  }
  .ant-dropdown-menu-item:nth-child(3) {
    height: 40px;
    line-height: 40px;
    background-image: url('../../assets/set/interactive-button_Export.svg');
    background-repeat: no-repeat;
    background-position: 14%;
    &:hover {
      font-size: 14px;
      background-color: #fff!important;
      color: #006fd0;
      background-image: url('../../assets/set/interactive-button_Export1.svg');
    }
  }
 
  .account-box {
    height: 38px;
    border-bottom: 1px solid #e8e8e8;;
    >div:nth-child(1) {
      font-size: 14px;
      color: #333333;
      padding-top: 8px;
    }
    >div:nth-child(2) {
      font-size: 10px;
      color: #999999;
    }
  }
  /deep/ .ant-dropdown-open {

  }
  
</style>
