<template>
    <div>
        <Header>
            <span slot="left" @click="$router.back()">
                <van-icon  name="arrow-left" @click="$router.back()" />
            </span>
            <span>服务器设置</span>
            <span slot="right" @click="onClickRight">保存</span>
        </Header>
        <div class="box">
            <van-cell-group>
                <van-field v-model="adress" label="服务器地址" placeholder="点击输入文本" />
                <van-field v-model="id" label="端口号" placeholder="点击输入文本" />
            </van-cell-group>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.box {
    div {
        padding: 10px 0 10px 10px;
    }
}
input {
    width: 130px;
    border: none;
    float: right;
}
</style>
<script>
import Header from '../components/Header'
export default {
    components: { Header },
        data() {
            return {
                adress: '',
                ip: '',
            };
        },
    methods: {
        onClickRight() {
            console.log(111);
        },
    }
}
</script>