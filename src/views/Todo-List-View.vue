<script lang="ts" setup>
import TodoItem from '@/components/Todo-Item.vue';
// @ts-expect-error package does not have types
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useTodosStore } from '@/stores/todos';
import { computed, onMounted, ref } from 'vue';
import BackButton from '@/components/Back-Button.vue';
import { BASE_API_URL } from '@/utils/constants';
// @ts-expect-error types not correct
import { useToast } from 'vue-toastification';
import axios from 'axios';

const todoStore = useTodosStore();
const isLoading = ref(true);
const toast = useToast();

const todosDone = computed(() => {
  return (todoStore.list ?? []).filter((item) => item.done);
});

const onClearDone = async () => {
  const confirm = window.confirm('Are you sure you want to clear all items marked as done?');

  try {
    if (confirm) {
      todosDone.value.forEach(async (todo) => {
        const response = await axios.delete(`${BASE_API_URL}/todos/${todo.id}`);
        if (response.data) {
          todoStore.deleteTodo(todo.id);
        }
      });
      toast.success('All marked items deleted');
    }
  } catch (error) {
    console.error('Error deleting item', error);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/todos`);
    todoStore.setTodos(response.data?.list ?? response.data);
  } catch (error) {
    console.error('Error fetching todos', error);
    toast.error('Error fetching list. Please try again');
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main>
    <BackButton to="/" />
    <button v-if="todosDone.length > 0" type="button" @click="onClearDone">Clear Done</button>
    <h1>To Do's</h1>
    <div v-if="isLoading && todoStore.list.length === 0">
      <PulseLoader />
    </div>
    <ul v-else-if="!isLoading && todoStore.list.length > 0">
      <TodoItem v-for="todo in todoStore.list" :key="todo.id" :todo="todo" />
    </ul>

    <p v-else>Nothing in list.</p>
  </main>

  <RouterLink class="add-button" to="/todo/add"> <i class="pi pi-plus"></i> </RouterLink>
</template>

<style lang="less" scoped>
@import '../styles/colors.less';
@import '../styles/cornerRadius.less';
@import '../styles/spacing.less';
@import '../styles/layout.less';

main {
  .flex-vertical();
  align-items: center;
  padding: @spacing[sp8];
  gap: @spacing[sp6];
}

ul {
  .flex-vertical();
  list-style: none;
  gap: @spacing[sp4];
  max-height: 700px;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #888 @white;

  background: @dark-pastel-purple;
  background: linear-gradient(135deg, @dark-pastel-purple, @lavender);
  padding: 0 @spacing[sp4];
}

ul::-webkit-scrollbar {
  width: 6px;
}

ul::-webkit-scrollbar-track {
  background: @white;
}

.add-button {
  display: flex;
  .flex-place();

  position: absolute;
  bottom: @spacing[sp4];
  left: 0;
  right: 0;
  border-radius: @cornerRadius[crFull];
  background-color: @majorelle-blue;
  color: @black;
  margin: 0 auto;
  width: 60px;
  height: 60px;

  text-decoration: none;
  z-index: 1;
}

button {
  position: absolute;
  right: @spacing[sp8];
  background-color: @majorelle-blue;
  border-radius: @cornerRadius[cr14];
  padding: @spacing[sp4];
}
</style>
