import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Todo } from '@/types/todo';

export const useTodosStore = defineStore('todos', () => {
  // STATE
  const list = ref<Todo[]>([]);

  // ACTIONS
  function setTodos(todos: Todo[]) {
    list.value = todos;
  }

  function addTodo(newTodo: Todo) {
    list.value.push(newTodo);
  }

  function deleteTodo(id: string) {
    list.value = list.value.filter((item) => item.id !== id);
  }

  function markAsDone(id: string) {
    list.value = list.value.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }

      return item;
    });
  }

  return { list, addTodo, setTodos, deleteTodo, markAsDone };
});
