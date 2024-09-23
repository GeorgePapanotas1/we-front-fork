<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 gap-16 text-center p-6">
    <div class="mt-10">
      <NuxtImg src="/img/globe-full.svg" alt="Globe" class="h-64 w-full" />
    </div>

    <!-- Error Code -->
    <h1 class="text-6xl font-bold text-red-400git remote add origin git@github.com:GeorgePapanotas1/we-front-fork.git mb-4">
      {{ error.statusCode ? error.statusCode : 'Error' }}
    </h1>

    <p class="text-xl text-gray-700 mb-6" v-if="error.statusCode === 404">
      Whoops! This page doesn't exist! 😕
    </p>

    <p class="text-xl text-gray-700 mb-6" v-else>
      Hey! That wasn't meant to happen! <br> We are currently trying to fix the problem! 👩‍💻 🧑‍💻<br> Try again in a while
    </p>

    <div class="w-full max-w-md mb-10">
      <NuxtLink to="/login">
        <button
            class="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-lg rounded-lg shadow-lg"
        >
          Go Back
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useError, useRouter } from '#app';

const error = useError();  // Get the error object
const router = useRouter();

console.log(error)
// Function to navigate back to the home page
const goBackHome = () => {
  router.push('/');
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
