<script setup lang="ts">
import ActionButton from './Action-Button.vue';
import type { Todo } from '@/types/todo';

defineProps<{
  todo: Todo;
}>();

defineEmits<{
  (event: 'delete'): void;
  (event: 'edit'): void;
  (event: 'done'): void;
}>();
</script>

<template>
  <li>
    <p :class="`${todo.done ? 'done' : ''}`">{{ todo.text }}</p>

    <div v-if="todo.done">
      <ActionButton action="EDIT" @click="$emit('done')">
        <i class="pi pi-undo"></i>
      </ActionButton>
    </div>

    <div v-else>
      <ActionButton action="DONE" @click="$emit('done')">
        <i class="pi pi-check"></i>
      </ActionButton>
      <ActionButton action="EDIT" @click="$emit('edit')">
        <i class="pi pi-pen-to-square"></i>
      </ActionButton>
      <ActionButton action="DELETE" @click="$emit('delete')">
        <i class="pi pi-trash"></i>
      </ActionButton>
    </div>
  </li>
</template>

<style lang="less" scoped>
@import '../styles/index.less';

li {
  box-shadow: 11px 15px 51px -14px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 11px 15px 51px -14px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 11px 15px 51px -14px rgba(0, 0, 0, 0.75);

  width: 100%;
  background-color: @white;
  border-radius: @cornerRadius[cr14];
  text-transform: capitalize;

  min-width: 330px;
  height: 60px;

  display: flex;
  .flex-place(space-between);
  padding: @spacing[sp4] @spacing[sp2] @spacing[sp4] @spacing[sp4];
}

div {
  display: flex;
  gap: @spacing[sp2];
}

.done {
  text-decoration: line-through;
}
</style>
