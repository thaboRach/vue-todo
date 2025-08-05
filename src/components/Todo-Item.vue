<script setup lang="ts">
import axios from 'axios';
import ActionButton from './Action-Button.vue';
import { useTodosStore } from '@/stores/todos';
import type { Todo } from '@/types/todo';
import { useRouter } from 'vue-router';
import { BASE_API_URL } from '@/utils/constants';

const props = defineProps<{ todo: Todo }>();

const todoStore = useTodosStore();
const router = useRouter();

const deleteTodo = async () => {
  const confirm = window.confirm('Are you sure you want to delete this?');

  try {
    if (confirm) {
      const response = await axios.delete(`${BASE_API_URL}/todos/${props.todo.id}`);
      if (response.data) {
        todoStore.deleteTodo(props.todo.id);
      }
    }
  } catch (error) {
    console.error('Error deleting item', error);
  }
};

const onEditTodo = () => {
  router.push(`/todo/edit/${props.todo.id}`);
};

const onTodoDone = async () => {
  try {
    const response = await axios.put(`${BASE_API_URL}/todos/${props.todo.id}`, {
      ...props.todo,
      done: !props.todo.done,
    });

    if (response.data) {
      todoStore.markAsDone(props.todo.id);
    }
  } catch (error) {
    console.error('Error marking item as done', error);
  }
};
</script>

<template>
  <li>
    <p :class="`${todo.done ? 'done' : ''}`">{{ todo.text }}</p>

    <div v-if="todo.done">
      <ActionButton action="EDIT" v-on:click="onTodoDone">
        <i class="pi pi-undo"></i>
      </ActionButton>
    </div>

    <div v-else>
      <ActionButton action="DONE" v-on:click="onTodoDone">
        <i class="pi pi-check"></i>
      </ActionButton>
      <ActionButton action="EDIT" v-on:click="onEditTodo">
        <i class="pi pi-pen-to-square"></i>
      </ActionButton>
      <ActionButton action="DELETE" v-on:click="deleteTodo">
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
