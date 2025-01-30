<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Your Todo List:</h2>
    
    <div v-if="todos.length === 0" class="text-center text-gray-500">
      <p>No Todo Available</p>
    </div>
    
    <ul v-else>
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="p-4 mb-4 border border-gray-300 rounded-lg shadow-sm flex flex-col"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              v-model="todo.completed"
              @change="toggleComplete(todo)"
              class="form-checkbox h-5 w-5 text-purple-500"
            />
            <p
              :class="{'line-through text-gray-500': todo.completed}"
              class="font-semibold"
            >
              {{ todo.title }}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="deleteTodo(todo.id)"
              class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
        <!-- Collapse / Expand description -->
        <div>
          <button
            @click="toggleDescription(todo)"
            class="text-sm text-purple-600 hover:underline"
          >
            {{ todo.isDescriptionVisible ? 'Hide' : 'Show' }} Description
          </button>
          <div v-show="todo.isDescriptionVisible" class="mt-2 text-gray-600 text-sm">
            <p>{{ todo.description }}</p>
          </div>
        </div>
      </li>
      
      <!-- Pagination Controls -->
      <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }}</span>
        <button @click="nextPage">Next</button>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '~/stores/todos'

const todoStore = useTodoStore()
const todos = ref([])
const currentPage = ref(1)    // Current page
const perPage = ref(2)        // Items per page
const lastVisible = ref(null) // Last visible document for pagination

onMounted(() => {
  todoStore.fetchTodos()
})

todoStore.$subscribe(() => {
  todos.value = todoStore.todos
})

const toggleComplete = async (todo) => {
  await todoStore.updateTodo(todo.id, { completed: todo.completed })
}

const toggleDescription = (todo) => {
  todo.isDescriptionVisible = !todo.isDescriptionVisible
}

const deleteTodo = async (id) => {
  await todoStore.deleteTodo(id)
}
</script>
