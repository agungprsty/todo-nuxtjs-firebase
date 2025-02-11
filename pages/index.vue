<template>
  <div class="mx-auto p-6 max-w-2xl">
    <div class="text-center mb-4">
      <h1 class="text-4xl font-bold">Todo App</h1>
      <!-- displey account name -->
      <h5 class="mt-2">Account: {{ auth?.currentUser?.displayName }}</h5>
      <button
        @click="handleSignOut"
        class="text-red-500 hover:text-white hover:bg-red-500 transition-colors duration-200 px-2 rounded"
      >
        Logout
      </button>
    </div>
    
    <TodoForm />
    <TodoList />
  </div>
</template>

<script setup lang="ts">
import { signOut } from 'firebase/auth'

const auth = useFirebaseAuth()

const handleSignOut = () => {
  if (auth) {
    signOut(auth)
      .then(() => {
        console.log('Sign out successful')
      })
      .catch((error) => {
        console.error(error);
      })
  }
}
</script>