<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 text-center">
    <!-- Error Code -->
    <h1 class="text-6xl font-bold text-blue-500 mb-4">{{ errorCode }}</h1>

    <!-- Error Message -->
    <p class="text-xl text-gray-700 mb-6">
      {{ errorMessage }}
    </p>

    <!-- Navigation Button -->
    <button
        @click="goBack"
        class="py-3 px-6 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-lg rounded-lg shadow-lg"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// Props to define error code and message
const props = defineProps({
  errorCode: {
    type: Number,
    required: true,
  },
  errorMessage: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: 'Go Back Home',
  },
});

// Function to navigate back to the home page
const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
/* Optional styles for further customization */
</style>
