<template>
    <div id="home-air">
        <!-- 第一部分：图片按钮展示 -->
        <div class="home-air-first">
            <div class="first-pic">
                <div style="padding:20px;font-weight:700;font-size: 24px;color:#fff;text-align: center;">空气净化器</div>
                <div>
                    <van-image width="245px" height="245px" :src=" getAssetsFile(states.logoFirstSrc,'png')">
                        <template v-slot:error>加载失败</template>
                    </van-image>
                </div>
            </div>
            <div class="air-info-details">
                <div v-for="(items,index) in states.airInfo" :key="index" class="info-context">
                    <p style="width:56px;height:20px;font-weight:700;color:#fff">{{items.text}}</p>
                    <p style="font-weight:700;color:#fff">{{items.value}}</p>
                </div>

            </div>

        </div>
        <!-- 第二部分：功能按钮部分 -->
        <div class="btn-feature">
            <div class="btn-details-info">
                <span class="font-color-solid">开关</span>
                <span  class="switch-style">
                    <van-switch v-model="checked" active-color="#6AD9D7" />
                </span>
            </div>

            <div class="btn-details-info-two">
                <span class="font-color-solid">模式</span>
                <div class="special-two">
                    <div v-for="(items,index) in states.modelInfo" :key="index" class="info-context">
                        <p @click="changeImages(index,items,'model')">
                            <van-image width="44px" height="44px" :src="getAssetsFile(items.imageSrc,'svg')">
                                <template v-slot:error>加载失败</template>
                            </van-image>
                        </p>
                        <p>{{items.text}}</p>
                    </div>
                </div>
            </div>
            <!-- 2-3风速 -->
            <div>
                <div class="btn-details-info-two">
                    <span class="font-color-solid">风速</span>
                    <div class="special-two">
                        <div v-for="(items,index) in states.windInfo" :key="index" class="info-context">
                            <p @click="changeImages(index,items,'wind')">
                                <van-image width="44px" height="44px" :src="getAssetsFile(items.imageSrc,'svg')">
                                    <template v-slot:error>加载失败</template>
                                </van-image>
                            </p>
                            <p>{{items.text}}</p>
                        </div>
                    </div>
                </div>
                <div class="btn-details-info">
                    <span class="font-color-solid">暖风</span>
                    <span class="switch-style">
                        <van-switch v-model="twoChecked" active-color="#6AD9D7" />
                    </span>
                </div>
            </div>

            <div class="btn-details-info">
                <span class="btn-four-details-first font-color-solid">定时关闭</span>
                <span class="btn-four-details-second">
                    <!-- <van-field v-model="result" input-align="right" :formatter="formatter" is-link name="datetimePicker"
                        placeholder="" @click="showPicker = true">
                    </van-field> -->
                    <van-popup v-model:show="showPicker" position="bottom">
                        <van-datetime-picker type="time" @confirm="onConfirm" @cancel="showPicker = false" />
                    </van-popup>
                </span>
                <span  class="switch-style">
                    <span style="color:#999999;font-weight:700" @click="showPicker = true">
                        {{result}}&nbsp;后关闭
                    </span>
                    <van-icon name="arrow" color="#1989fa" />
                </span>


            </div>
        </div>
    </div>
</template>
<!-- 增加一个名称 -->
<script>
export default {
    name: 'airHome'
};
</script>
<script setup>

// 引入api-hook部分

import {
    reactive,
    onUpdated
} from 'vue'; // 引入需要的
import { repairBlur } from '@/hooks/useFixedInput.js'; // 解决ios不回弹的问题




const checked = ref(true);
const twoChecked = ref(true);
const result = ref('');
const showPicker = ref(false);
const states = reactive({
    logoFirstSrc: "firstLogo",
    airInfo: [{
        value: "20",
        text: "室内温度"
    }, {
        value: "20",
        text: "PM10"
    }, {
        value: "0.08mg/m3",
        text: "甲醛浓度"
    }, {
        value: "10%",
        text: "滤芯寿命"
    }],
    modelInfo: [
        {
            text: "自动",
            imageSrc: "model0"
        },
        {
            text: "手动",
            imageSrc: "model1"
        },
        {
            text: "睡眠",
            imageSrc: "model2"
        }
    ],
    windInfo: [
        { text: "低", imageSrc: "speed0" },
        { text: "中", imageSrc: "speed1" },
        { text: "高", imageSrc: "speed2" }

    ]
});
/**
 * 更新当前的页面的样式:切换当前的图片
 * @param {*} val
 * @param items 当前操作的项目
 * @param type 当前的切换图片
 */
const changeImages = (val, items, type) => {
    const len = items.imageSrc.split(val).length - 1;
    if (type === 'wind') {
        if (len == 1) {
            states.windInfo[val].imageSrc = items.imageSrc + val;
        } else {
            states.windInfo[val].imageSrc = items.imageSrc.split(val)[0] + val;
            console.log(states.windInfo[val].imageSrc);
        }
    } else {
        console.log(len, ' items.imageSrc.split(val)', items.imageSrc.split(val));
        if (len == 1) {
            states.modelInfo[val].imageSrc = items.imageSrc + val;
        } else {
            states.modelInfo[val].imageSrc = items.imageSrc.split(val)[0] + val;
        }
    };
};

const onConfirm = (value) => {
    result.value = value;
    showPicker.value = false;
};
/**
 * 获取静态url地址获取
 * @param {*} url
 */
const getAssetsFile = (url, picStyle) => {
    //  new URL('./img.png', import.meta.url).href
    return new URL(`../../common/images/${url}.${picStyle}`, import.meta.url).href;
};

onUpdated(() => {
    repairBlur();
});
</script>
<style lang='scss' scoped>
/*背景实现*/
#home-air {
    background-color: #4dd1ca !important;
}

.first-pic {

    text-align: center;
    flex: 1;
}

.btn-feature {
    flex: 6;
    display: flex;
    flex-direction: column;

    .btn-details-info {
        border-radius: 10px;
        margin: 10px;
        align-items: center;
        background-color: #fff;
        flex: 1;
        display: flex;
        justify-content: space-between;
    }

    .btn-details-info-two {
        background-color: #fff;
        border-radius: 10px;
        margin: 10px;

        display: flex;
        flex-direction: column;

        .special-two {
            display: flex;
            justify-content: space-around;

            .info-context {
                margin: 10px;

                p {
                    text-align: center;
                }
            }
        }
    }

    .btn-details-info-four {
        border-radius: 10px;
        margin: 10px;
        background-color: #fff;
        flex: 1;
        display: flex;
        justify-content: space-between;

        .btn-four-details-thrid {
            flex: 2;
        }

        .btn-four-details-second {
            flex: 2.5;
        }

        .btn-four-details-first {
            flex: 5;
        }
    }
}

.font-color-solid {
    margin: 20px;
    font-weight: 700
}

/* 第一部分展示详情样式配置 */
.air-info-details {
    display: flex;
    margin: 20px;
    justify-content: space-around;

    .info-context {
        margin: 10px;

        p {
            text-align: center;
        }
    }
}

.single-line-text {
    height: 50px;
    line-height: 25px;
}

.switch-style{
    margin-right: 20px;
}

// :deep()
</style>
