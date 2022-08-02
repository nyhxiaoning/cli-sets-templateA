<script setup>
import { reactive } from "vue";

const props = defineProps({
  data: Array,
  active: String,
  props: Object
});
const emit = defineEmits(["change"]);

const state = reactive({
  children: "children",
  name: "name"
});

if (props?.props && props?.props?.children) state.children = props.props.children;
if (props?.props && props?.props?.name) state.children = props.props.name;

const treeClick = (item) => {
  if (item.height && item.height == 30) {
    item.height = item[state.children].length * 30 + 30;
  } else {
    item.height = 30;
  }
};

const change = (id) => {
  emit("change", id);
};
</script>
<template>
  <ul class="tree">
    <template v-for="item in data" :key="item.id">
      <li
        class="treeItem" :class="{
          active: item.height == undefined || item.height > 30,
        }" :style="`height: ${item.height || item[state.children].length * 30 + 30
        }px`"
      >
        <span @click="treeClick(item)">{{ item[state.name] }}</span>
        <ul class="subtree">
          <template v-for="e in item[state.children]" :key="e.id">
            <li class="subtreeItem" :class="{ active: active == e.id }" @click="change(e.id)">
              {{ e[state.name] }}
            </li>
          </template>
        </ul>
      </li>
    </template>
  </ul>
</template>
<style lang="less" scoped>
.tree {
  padding: 0 10px;
}

.treeItem {
  line-height: 30px;
  overflow: hidden;
  font-size: 14px;
  transition: all linear 0.3s;
  cursor: pointer;
}

.treeItem.active span::before {
  transform: rotate(-90deg);
}

.treeItem span::before {
  content: "";
  display: inline-block;
  width: 0px;
  height: 0px;
  border-top: 4px solid #333;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  margin-right: 6px;
  vertical-align: 3px;
  transform: rotate(0deg);
  transition: all linear 0.3s;
}

.subtreeItem {
  line-height: 30px;
  padding-left: 25px;
  cursor: pointer;
}

.subtreeItem.active {
  color: #409eff;
}
</style>