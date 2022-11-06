<template>
    <div>
        <div class="nav">
            <Header>
                <div slot="left">
                    <van-icon  name="arrow-left" @click="$router.back()" />
                </div>
                <div class="center" >
                    修改密码
                </div>
            </Header>
        </div>
        <div class="content">
            <div class="content">
                <van-cell-group>
                    <van-field v-model="old" label="原始密码" placeholder="点击输入文本" />
                    <van-field v-model="news" label="新密码" placeholder="点击输入文本" />
                    <van-field v-model="confirm" label="确认新密码" placeholder="点击输入文本" />
                    <p class="tips">密码必须是8-16位的数字、字符组合(不能是纯数字)</p>
                </van-cell-group>
            </div>
        </div>
        <div class="footer">
            <van-button  round color="#4676FB" size="large" >保存</van-button>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import url("../assets/css/base.scss");
.tips {
    font-size: 14px;
    margin-left: 15px;
}
</style>
<script>
import Header from '../components/Header';
export default {
    components: {Header},
    data() {
        return {
            old: '',
            news: '',
            confirm: '',
        }
    }
}
</script>