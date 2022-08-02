<script setup>
import { reactive } from "vue";
// 引用自己
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Tree from "@/components/tree/tree.vue";

const prop = defineProps({
  data: Array,
  props: Object,
  active: String,
  level: {
    type: Number,
    default: 0
  }
});
const emit = defineEmits(["change"]);

const state = reactive({
  children: "children",
  name: "name",
  level: prop.level + 1
});

if (prop.props) {
  state.children = prop.props.children || "children";
  state.name = prop.props.name || "name";
}

const change = (obj) => {
  emit("change", obj);
};
</script>
<template>
  <ul class="tree">
    <template v-for="item in data" :key="item.id">
      <li
        :class="{
          triangle: item[state.children] && item[state.children].length,
          active: item.height == undefined || item.height > 30,
          selected: item.id == active,
        }"
        :style="`height: ${
          item.height || item[state.children].length * 30 + 30
        }px`"
        @click.stop="
          () => {
            if (item.height && item.height == 30) {
              item.height = item[state.children].length * 30 + 30;
            } else {
              item.height = 30;
            }
            change({
              id: item.id,
              level: state.level,
            });
          }
        "
      >
        <span>{{ item[state.name] }}</span>
        <template v-if="item[state.children] && item[state.children].length">
          <Tree
            :data="item[state.children]"
            :level="state.level"
            :props="props"
            :active="active + ''"
            @change="change"
          />
        </template>
      </li>
    </template>
  </ul>
</template>
<style lang="less" scoped>
.tree {
  padding: 0 14px;
  li {
    line-height: 30px;
    overflow: hidden;
    font-size: 14px;
    transition: all linear 0.3s;
    cursor: pointer;
  }
  .selected > span {
    color: #409eff;
  }
}
.triangle {
  &::before {
    content: "";
    display: inline-block;
    width: 0px;
    height: 0px;
    border-top: 4px solid #333;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    margin-right: 6px;
    vertical-align: 3px;
    transform: rotate(-90deg);
    transition: all linear 0.3s;
  }
  &.active {
    &::before {
      transform: rotate(0deg);
    }
  }
}
</style>
