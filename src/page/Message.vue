<template>
  <div>
    <div class="nav">
      <headerCom>
        <div slot="left">
          <van-icon name="arrow-left" @click="$router.back()" />
        </div>
        <div class="center">消息</div>
      </headerCom>
      <div class="content" v-for="(item,index) in list" :key='index'>
        <div class="time">{{item.time}}</div>
        <div class="content_con">
          <div>
            <span style="font-weight:bold">{{item.name}}</span>
            <span>{{item.sex}}</span>
            <span>{{item.age}}</span>
            <span>{{item.symptom}}</span>
          </div>
          <span style="display:inline-block">首份心电图未执行还剩{{item.minute}}分钟</span>
        </div>
        
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url("../assets/css/base.scss");
.content{
    .content_con{
        background: white;
        padding-left: 10px;
        span{
            margin-right: 10px;
            color:black;
        }
    }
    .time{
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
}
</style>
<script>
import headerCom from '../components/Header';
export default {
    components: {headerCom},
    data() {
        return {
            list:[
                {
                    time:'2021-06-28',
                    name:'李佳航',
                    age:'26岁',
                    sex:'男',
                    symptom:'STEMI',
                    minute:'3'
                },
                {
                    time:'2021-06-27',
                    name:'李佳',
                    age:'25岁',
                    sex:'男',
                    symptom:'STEMI',
                    minute:'3'
                },
            ]
        }
    }
}
</script>
