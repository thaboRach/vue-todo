<script setup lang="ts">
import { RouterLink } from 'vue-router';

withDefaults(defineProps<{ to: string; variant?: 'primary' | 'secondary' }>(), {
  to: '/',
  variant: 'primary',
});
</script>

<template>
  <RouterLink :class="`button ${variant}`" :to="to"><slot></slot></RouterLink>
</template>

<style lang="less" scoped>
@import '../styles/index.less';

.button {
  display: flex;
  .flex-place();
  text-decoration: none;
  font-size: @fontSize[xl];
  width: 330px;
  height: 50px;
  border-radius: @cornerRadius[cr14];
}

.primary {
  background-color: @majorelle-blue;
  color: @white;
}

.secondary {
  background-color: @white;
  color: @black;
}
</style>
