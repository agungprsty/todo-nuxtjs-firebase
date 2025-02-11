<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const user = useCurrentUser()
const router = useRouter()

onMounted(() => {
  watch(user, (currentUser, prevUser) => {
    if (prevUser && !currentUser) {
      router.replace('/login')
    }
  })
})

</script>