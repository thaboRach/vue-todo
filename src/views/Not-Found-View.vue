<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="">
    <i class="pi pi-exclamation-triangle"></i>
    <h1 class="">404 Not Found</h1>
    <p class="mb-5 text-xl">This page does not exist</p>
    <RouterLink to="/todos" class=""> Go Back </RouterLink>
  </section>
</template>

<style lang="less" scoped>
@import '../styles/spacing.less';
@import '../styles/layout.less';

section {
  .flex-vertical();
  align-items: center;
  width: 100%;
  gap: @spacing[sp2];
  padding-top: @spacing[sp8];
}
</style>
