<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{ to: string }>();
</script>

<template>
  <RouterLink :to="to" class="back-button">
    <i class="pi pi-arrow-left"></i>
  </RouterLink>
</template>

<style lang="less" scoped>
@import '../styles/index.less';

.back-button {
  position: absolute;
  top: @spacing[sp6];
  left: @spacing[sp6];
}
</style>
