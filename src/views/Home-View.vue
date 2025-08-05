<script setup lang="ts">
import HeroIcon from '@/assets/HeroImage.svg';
import CustomButton from '@/components/Custom-Button.vue';
</script>

<template>
  <main>
    <img :src="HeroIcon" alt="female sitting on the floor with cup in hand and laptop on leg" />
    <section>
      <h1>To-Do List</h1>
      <p>
        This productive tool is designed to help you better manage your task project-wise
        conveniently!
      </p>

      <CustomButton to="/todos"> Let's start </CustomButton>
    </section>
  </main>
</template>

<style lang="less" scoped>
@import '../styles/spacing.less';
@import '../styles/typography.less';
@import '../styles/layout.less';

main {
  .flex-vertical();
  align-items: center;
  padding: @spacing[sp8];
}

img {
  width: 100%;
  max-width: 600px;
  height: 450px;
}

h1 {
  font-weight: @fontWeight[bold];
  font-size: @fontSize[4xl];
}

p {
  font-size: @fontSize[xl];
}

section {
  .flex-vertical();
  align-items: center;
  row-gap: @spacing[sp4];
}
</style>
