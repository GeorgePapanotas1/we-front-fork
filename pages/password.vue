<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-white px-4 py-6 mt-20">
    <h1 class="text-center text-xl font-bold mb-6">Change Password</h1>

    <!-- Password Form -->
    <form @submit.prevent="submitForm" class="w-full max-w-sm space-y-4 mt-20">
      <div class="mb-20">
        <!-- New Password -->
        <div class="mb-10">
          <label class="block mb-1 font-semibold text-gray-700" for="password">New Password</label>
          <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Enter new password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>

        <!-- Confirm Password -->
        <div class="mt-10">
          <label class="block mb-1 font-semibold text-gray-700" for="confirm-password">Confirm Password</label>
          <input
              id="confirm-password"
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm your password"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
          />
        </div>
      </div>


      <!-- Submit Button -->
      <button
          type="submit"
          class="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition  mt-20"
      >
        Change Password
      </button>

      <!-- Error message (optional) -->
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

useSeoMeta({
  title: "WE Platform - Change Password",
  description: "WE Platform - Change Password",
})

import { ref } from 'vue';

const authStore = useAuthStore()
// Form data
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

// Handle form submission
const submitForm = async () => {
  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

  await authStore.changePassword({
    password: password.value,
    password_confirmation: confirmPassword.value
  })

  navigateTo('/profile')
};
</script>

<style scoped>
/* Add any optional custom styles here */
</style>
