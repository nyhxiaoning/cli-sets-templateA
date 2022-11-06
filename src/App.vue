<template>
  <div>
    <span>显示一个logo</span>
  </div>

  <router-view @click="routeFn" v-show="routerFlag" />
  <SET />
</template>
<script lang="ts">
import { defineComponent, nextTick, onMounted,ref,watch } from 'vue'
import SET from "@/components/set/set.vue";
import {useStore} from 'vuex'
import { useRoute,useRouter } from 'vue-router';
 export default defineComponent({
  setup(props) {
    const route = useRoute()
    const router = useRouter()
  console.log(router,'router',route)
    // watch(()=>router.name,(pre,cur)=>{
    //   console.log('地址变化',cur,pre)
    // })
    const store = useStore();
    let theme=window.localStorage.getItem("theme");
    theme&&window.document.documentElement.setAttribute("data-ming",theme);
    const routerFlag = ref(store.state.routeFlag)
    // 菜单触发
    const routeFn = ()=>{
      routerFlag.value = false
      console.log('菜单触发----------------------',store.state)
      setTimeout(()=>{
        routerFlag.value = true
      })
    }
    onMounted(()=>{
      debugger
    })

    return {
        routeFn,
        routerFlag
    }
  },
  components:{SET}
})
</script>

<style lang="scss">
  *{
    margin: 0;
  }
  
</style>
