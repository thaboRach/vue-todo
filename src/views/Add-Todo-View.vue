<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useTodosStore } from '@/stores/todos';
import CustomButton from '@/components/Custom-Button.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const form = reactive({
  text: '',
});

const router = useRouter();
const toast = useToast();
const todoStore = useTodosStore();

const handleSubmit = async () => {
  const newTodo = {
    ...form,
    done: false,
  };

  try {
    const response = await axios.post('http://localhost:5000/todos', newTodo);
    todoStore.addTodo(response.data);

    if (response?.data) {
      toast.success('New todo added successfully');
      router.push(`/todos`);
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <main>
    <h1>Add Todo</h1>

    <form @submit.prevent="handleSubmit">
      <div class="input-container">
        <label for="title">Title</label>
        <input
          v-model="form.text"
          type="text"
          name="title"
          id="title"
          placeholder="Enter a new title"
          required
          autofocus
        />
      </div>

      <button type="submit">Save</button>
      <CustomButton to="/todos" variant="secondary">Cancel</CustomButton>
    </form>
  </main>
</template>

<style lang="less" scoped>
@import '../styles/index.less';

main {
  .flex-vertical();
  align-items: center;
  padding: @spacing[sp8];
  gap: @spacing[sp6];
}

form {
  max-width: 450px;
  width: 100%;
  .flex-vertical();
  align-items: center;
  gap: @spacing[sp2];
}

.input-container {
  .flex-vertical();
  width: 100%;
  background-color: white;
  min-width: 330px;
  height: 60px;
  border-radius: @cornerRadius[cr14];
  padding: @spacing[sp2];
}

input {
  height: 45px;
}

label {
  color: @old-lavender;
}

button {
  background-color: @majorelle-blue;
  color: @white;
  font-size: @fontSize[xl];
  display: flex;
  .flex-place();
  width: 330px;
  height: 50px;
  border-radius: @cornerRadius[cr14];
}
</style>
