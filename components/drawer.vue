<template>
  <div v-if="isOpen" class="fixed inset-0 flex z-50">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black opacity-30" @click="closeDrawer"></div>

    <!-- Drawer -->
    <div class="relative w-64 bg-blue-500 text-white shadow-lg">
      <!-- Close Button -->
      <div class="absolute top-4 right-4">
        <button @click="closeDrawer" class="text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Menu Items -->
      <div class="mt-12 px-6">

        <!-- Navigation Links -->
        <nav class="space-y-6">
          <NuxtLink to="/dashboard" class="flex items-center space-x-2 text-white hover:bg-blue-400 py-2 px-3 rounded-md" @click="closeDrawer">
            <NuxtImg src="/img/home-icon.svg" class="w-4 h-4 mr-2"></NuxtImg>
            <span>Home</span>
          </NuxtLink>
          <NuxtLink to="/profile" class="flex items-center space-x-2 text-white hover:bg-blue-400 py-2 px-3 rounded-md" @click="closeDrawer">
            <NuxtImg src="/img/user-icon.svg" class="w-4 h-4 mr-2"></NuxtImg>
            <span>Profile</span>
          </NuxtLink>
          <NuxtLink to="/leaderboard" class="flex items-center space-x-2 text-white hover:bg-blue-400 py-2 px-3 rounded-md" @click="closeDrawer">
            <NuxtImg src="/img/leaderboard-icon.svg" class="w-4 h-4 mr-2"></NuxtImg>
            <span>Leaderboard</span>
          </NuxtLink>
          <a @click.prevent="logout" class="flex items-center space-x-2 text-white hover:bg-blue-400 py-2 px-3 rounded-md">
            <NuxtImg src="/img/logout-icon.svg" class="w-4 h-4 mr-2"></NuxtImg>
            <span>Log Out</span>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['close'])

const closeDrawer = () => {
  emit('close')
}

const logout = async () => {
  useAuthStore().logout()
  await navigateTo('/login')
}
</script>

<style scoped>
/* Optional additional styles */
</style>
