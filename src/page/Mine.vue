<template>
    <div>
        <div class="nav">
            <Header>
                <div slot="left">
                    <van-icon  name="arrow-left" @click="$router.back()" />
                </div>
                <div class="center">
                    我的
                </div>
                <div slot="right" class="right" @click="$router.push('./password')">
                    修改密码
                </div>
            </Header>
        </div>
        <div class="content">
            <van-cell-group>
                <van-field v-model="mine.touxiang" label="头像"  input-align="right" >
                    <template slot="right-icon">
                        <span>图片</span>
                        <van-icon name="arrow" style="display: inline-block" />
                    </template>
                </van-field> 
                <van-field v-model="mine.name" label="姓名" input-align="right"  />
                <van-field  label="性别" readonly>
                    <template slot="right-icon">
                        <van-radio-group v-model="mine.sex" direction="horizontal">
                            <van-radio name="1">男</van-radio>
                            <van-radio name="2">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>  
                <van-field v-model="mine.kehsi" label="所属科室"  input-align="right" >
                    <template slot="right-icon">
                        <van-icon name="arrow" />
                    </template>
                </van-field> 
                <van-field v-model="mine.tel" label="电话" input-align="right"  />
                <van-field  label="急诊类型权限" readonly>
                    <template slot="right-icon">
                        <van-radio-group v-model="mine.quanxian" direction="horizontal">
                            <van-radio name="1">胸痛</van-radio>
                            <van-radio name="2">卒中</van-radio>
                            <van-radio name="3">创伤</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
            </van-cell-group>
        </div>
        <div class="footer">
            <van-button  round color="#4676FB" size="large" >保存</van-button>
            <van-button  round color="#4676FB" size="small" >切换账号</van-button>
            <van-button  round color="#4676FB" size="small" >退出登录</van-button>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import url("../assets/css/base.scss");
.van-button--small {
    height: 35px;
    padding: 0px 56px;
    font-size: 12px;
    margin-top: 10px;
    margin-right: 4px;
}
.right {
    padding-right: 10px;
    text-align: center;
    font-size: 12px;
}
.footer {
    height: 80px;
}
</style>
<script>
import Header from '../components/Header';
export default {
    components: {Header},
    data() {
        return {
            mine: {
                touxiang: '',
                name: '',
                sex: '',
                kehsi: '',
                tel: '',
                quanxian: '',
            }
        }
    }
}
</script>