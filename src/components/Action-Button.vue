<script setup lang="ts">
defineProps<{ action: 'EDIT' | 'DELETE' | 'DONE'; onClick: () => void }>();

const colorMap = new Map([
  ['EDIT', { color: 'black', bgColor: '#808080', hint: 'Edit item' }],
  ['DONE', { color: 'green', bgColor: 'lightgreen', hint: 'Mark as done' }],
  ['DELETE', { color: 'red', bgColor: '#FF7276', hint: 'Delete item' }],
]);
</script>

<template>
  <button
    type="button"
    :style="{ color: colorMap.get(action)?.color, backgroundColor: colorMap.get(action)?.bgColor }"
    :title="colorMap.get(action)?.hint"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
@import '../styles/index.less';

button {
  width: 30px;
  height: 30px;

  border-radius: @cornerRadius[cr14];
}
</style>
