<template>
  <div :style="`background: ${useRouter().currentRoute.value.meta.bgColor};`">
    <router-view />
  </div>
</template>


<script setup>
import { useRouter } from "vue-router";
</script>