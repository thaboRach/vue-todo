import HomeView from '@/views/Home-View.vue';
import { createRouter, createWebHistory } from 'vue-router';
import TodoListView from '@/views/Todo-List-View.vue';
import AddTodoView from '@/views/Add-Todo-View.vue';
import '@/main.css';
import NotFoundView from '@/views/Not-Found-View.vue';
import EditTodoView from '@/views/Edit-Todo-View.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodoListView,
    },
    {
      path: '/todo/add',
      name: 'add-todo',
      component: AddTodoView,
    },
    {
      path: '/todo/edit/:id',
      name: 'edit-todo',
      component: EditTodoView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
