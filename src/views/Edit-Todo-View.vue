<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTodosStore } from '@/stores/todos';
// @ts-expect-error package does not have types
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import CustomButton from '@/components/Custom-Button.vue';
import axios from 'axios';
import { BASE_API_URL } from '@/utils/constants';

const form = reactive({
  text: '',
});

const router = useRouter();
const route = useRoute();
const todoStore = useTodosStore();

const todoId = route.params.id;
const isLoading = ref(true);

const handleSubmit = async () => {
  const updatedTodo = {
    ...form,
    done: false,
  };

  try {
    const response = await axios.put(`${BASE_API_URL}/todos/${todoId}`, updatedTodo);
    todoStore.addTodo(response.data);

    if (response?.data) {
      router.push(`/todos`);
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/todos/${todoId}`);

    // populate
    form.text = response.data.text;
  } catch (error) {
    console.error('Error getting post', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main>
    <h1>Edit Todo</h1>

    <div v-if="isLoading">
      <PulseLoader />
    </div>

    <form v-else @submit.prevent="handleSubmit">
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

      <button type="submit">Update</button>
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
  .flex-vertical();
  align-items: center;

  max-width: 450px;
  width: 100%;
  gap: @spacing[sp2];
}

.input-container {
  .flex-vertical();
  background-color: @white;
  width: 100%;
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
  display: flex;
  .flex-place();

  background-color: @majorelle-blue;
  color: @white;
  font-size: @fontSize[xl];
  width: 330px;
  height: 50px;
  border-radius: @cornerRadius[cr14];
}
</style>
