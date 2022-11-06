<template>
  <div class="inner-title">
    <h2>{{title}}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'innerTitle',
  props: {
    title: {
      type: [String],
      required: true
    },
  },
  computed: {
  },
  mounted() {
    this.title
  },
}
</script>

<style lang="less" scoped>
  @import "index";
</style>
