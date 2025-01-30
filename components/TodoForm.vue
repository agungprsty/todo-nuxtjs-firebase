<template>
  <form @submit.prevent="handleSubmit" class="mb-6 p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
    <input
      v-model="title"
      type="text"
      placeholder="Enter task title..."
      class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      required
    />
    <textarea
      v-model="description"
      placeholder="Enter task description..."
      class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      rows="3"
    ></textarea>
    <button
      type="submit"
      class="w-full p-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      Add Todo
    </button>
  </form>
</template>

<script setup>

import { ref } from 'vue'
import { useTodoStore } from '~/stores/todos'

const title = ref('')
const description = ref('')
const todoStore = useTodoStore()

const handleSubmit = async () => {
  if (title.value.trim()) {
    console.log(title.value);
    await todoStore.addTodo(title.value, description.value)
    title.value = ''
    description.value = ''
  }
}
</script>
