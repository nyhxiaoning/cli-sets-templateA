<template>
  <div>
    <page-title></page-title>
    <page-toggle-transition class="box" :disabled="animate.disabled" :animate="animate.name" :direction="animate.direction">
      <router-view />
    </page-toggle-transition>
  </div>
</template>

<script>
import PageTitle from '../components/page/title/title.vue'
import PageToggleTransition from '../components/transition/PageToggleTransition';
import {mapState} from 'vuex'

export default {
  name: 'BlankView',
  components: {PageToggleTransition, PageTitle},
  computed: {
    ...mapState('setting', ['multiPage', 'animate'])
  }
}
</script>

<style scoped>
.box{
  flex: 1;
}
</style>
