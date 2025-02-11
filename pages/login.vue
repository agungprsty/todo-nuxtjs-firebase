<template>
  <main
  class="w-full h-screen flex flex-col items-center justify-center px-4"
>
  <div class="max-w-sm w-full text-gray-600 space-y-5">
    <div class="text-center pb-8">
      <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">
        Log in to your account
      </h3>
    </div>
    <button
      @click="signInWithGoogle"
      class="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
    >
      <!-- SVG for Google Sign In -->
      <img
        src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
        alt="Google"
        class="w-5 h-5"
      />
      <!-- Comment: Google Icon SVG here -->
      Continue with Google
    </button>
  </div>
</main>
</template>

<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const auth = useFirebaseAuth()
const route = useRouter()

const signInWithGoogle = () => {
  if (auth) {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        route.replace('/')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>