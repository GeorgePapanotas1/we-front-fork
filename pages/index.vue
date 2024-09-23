<template>
  <div class="min-h-screen flex flex-col justify-center gap-12 items-center bg-white p-6">
    <!-- Top Image -->
    <div class="mt-10">
      <NuxtImg src="/img/globe-full.svg" alt="Globe" class="h-64 w-full" />
    </div>

    <!-- Welcome Text -->
    <div class="text-center mt-6">
      <h1 class="text-4xl font-bold">Welcome to World Education</h1>
      <p class="text-gray-600 mt-4 px-6">
        Dive into an interactive journey to boost your environmental awareness and make a positive impact on the world!
      </p>
    </div>

    <!-- Let's Start Button -->
    <div class="w-full max-w-md mb-10">
      <NuxtLink to="/login">
        <button
            class="w-full py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-lg rounded-lg shadow-lg"
        >
          Let’s Start
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "WE Platform - Welcome!",
  description: "WE Platform - Welcome!",
})
</script>

<style scoped>
/* Optional scoped styles */
</style>
