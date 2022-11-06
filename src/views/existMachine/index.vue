<template>
    <MainLayout title="人体存在传感器" color="#333333" :show-back="true">
        <div class="home-index">
            <div class="home-index-banner">
                <img src="@/assets/index/existence-image.png" alt="" class="existence-image" />
                <div class="existence-status">存在状态</div>
                <div class="existence-status">无</div>
            </div>
            <div class="existence-warpper">
                <div class="existence-time value-box">
                    <div class="label">人体存在</div>
                    <div class="value">无</div>
                </div>
                <div class="detection-range value-box">
                    <div class="label">保持时间</div>
                    <div class="value">20s</div>
                </div>
                <div class="detection-range value-box">
                    <div class="label">探测距离</div>
                    <div class="value">100cm</div>
                </div>
            </div>
            <homeNav lable="探测距离" :value="detectionRange" unit="cm" @click="popupShow(1)" />
            <homeNav lable="探测灵敏度" :value="detectionSensitivity" @click="popupShow(2)" />
            <van-popup v-model:show="popupState.show" round position="bottom" :style="{ 'max-height': '5.3rem' }">
                <div class="popup-title">{{ popupState.title }}</div>
                <div class="popup-value">{{ popupState.value }}</div>
                <van-slider v-model="popupState.value" class="slider" bar-height="3px" active-color="#3D8CFF"
                    :max="popupState.max" :min="popupState.min" />
                <div class="control-panel">
                    <div class="control-cancel" @click="cancel">取消</div>
                    <div class="control-confirm" @click="confirm">确定</div>
                </div>
            </van-popup>
        </div>
    </MainLayout>
</template>
<script setup>
import { windowHeight, repairBlur } from '@/hooks/useFixedInput.js'; // 解决ios不回弹的问题
import MainLayout from '@/layout/MainLayout.vue';
import homeNav from './../../components/homeNav.vue';

onMounted(() => {
    windowHeight.value = window.innerHeight;
});

const popupState = reactive({
    type: 1,
    show: false,
    max: 100,
    min: 0,
    title: '探测最远距离(cm)',
    value: 600
});

const detectionRange = ref(0);
const detectionSensitivity = ref(0);

function confirm(params) {
    popupState.show = false;
    if (popupState.type === 1) {
        detectionRange.value = popupState.value;
    } else {
        detectionSensitivity.value = popupState.value;
    }
}

function cancel(params) {
    popupState.show = false;
}

function popupShow(params) {
    popupState.type = params;
    if (params === 1) {
        popupState.show = true;
        popupState.max = 1200;
        popupState.title = '探测最远距离(cm)';
        popupState.value = detectionRange.value;
    } else {
        popupState.show = true;
        popupState.max = 100;
        popupState.title = '探测灵敏度';
        popupState.value = detectionSensitivity.value;
    }
}

onUpdated(() => {
    repairBlur();
});
</script>
  
<style lang="scss" scoped>
::v-deep .main-container-slot {
    background: #f4f4f6;
}

.home-index {
    .home-index-banner {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0.2rem auto;
        width: 7.1rem;
        height: 3.2rem;
        background: url("@/assets/index/background-image.png") no-repeat;
        background-size: 100% 100%;

        .existence-image {
            margin: 0.79rem auto 0;
            width: 0.54rem;
            height: 0.54rem;
        }

        .existence-status {
            margin-top: 0.12rem;
            width: 1.28rem;
            height: 0.45rem;
            font-size: 0.32rem;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            text-align: center;
            color: #ffffff;
            line-height: 0.45rem;
        }

        .existence-status-value {
            width: 0.28rem;
            height: 0.4rem;
            font-size: 0.28rem;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 0.4rem;
            margin-top: 0.11rem;
        }
    }

    .existence-warpper {
        margin: 0.2rem auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.63rem;
        width: 7.1rem;
        height: 1.6rem;
        background: #ffffff;
        border-radius: 0.2rem;

        .value-box {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .label {
            width: 1.12rem;
            height: 0.37rem;
            font-size: 0.26rem;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #999999;
            line-height: 0.37rem;
        }

        .value {
            margin-top: 0.12rem;
            height: 0.45rem;
            font-size: 0.32rem;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: center;
            color: #333333;
            line-height: 0.45rem;
        }
    }

    .popup-title {
        height: 0.8rem;
        font-size: 0.28rem;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #333333;
        line-height: 0.8rem;
        border-bottom: 0.01rem solid #e5e5e5;
    }

    .popup-value {
        margin: 0.54rem auto;
        height: 1rem;
        font-size: 0.72rem;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        color: #333333;
        line-height: 1rem;
    }

    .slider {
        width: 5.6rem;
        margin: 0 auto;
    }

    .control-panel {
        width: 7.5rem;
        background: #ffffff;
        display: flex;
        flex-wrap: wrap;

        &::before {
            content: "";
            margin-top: 1rem;
            display: block;
            width: 7.5rem;
            height: 0.16rem;
            background: #f5f5f5;
        }

        .control-confirm {
            width: 50%;
            height: 1.14rem;
            font-size: 0.3rem;
            font-family: SourceHanSansCN, SourceHanSansCN-Regular;
            font-weight: 400;
            text-align: center;
            color: #3d8cff;
            line-height: 1.14rem;
            letter-spacing: 0.01rem;
        }

        .control-cancel {
            width: 50%;
            height: 1.14rem;
            font-size: 0.3rem;
            font-family: SourceHanSansCN, SourceHanSansCN-Regular;
            font-weight: 400;
            text-align: center;
            color: #333333;
            line-height: 1.14rem;
            letter-spacing: 0.01rem;
        }
    }
}
</style>
  