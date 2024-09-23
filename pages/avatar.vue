<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-white px-4 py-6">
    <!-- Title -->
    <h1 class="text-center text-xl font-bold mb-6">Choose your avatar</h1>

    <!-- Avatar Selection -->
    <div class="grid grid-cols-2 gap-6 mt-10">
      <div
          v-for="(avatar, index) in avatars"
          :key="index"
          @click="selectAvatar(avatar)"
          :class="[
          'flex justify-center items-center border-4 p-2 rounded-full cursor-pointer transition-all',
          selectedAvatar === avatar ? 'border-blue-500' : 'border-transparent'
        ]"
      >
        <NuxtImg :src="`/img/${avatar.src}.svg`" :alt="'Avatar ' + (index + 1)" class="h-24 w-24 rounded-full bg-blue-100" :class="{'bg-blue-500' : avatar.src === selectedAvatar?.src}" />
      </div>
    </div>

    <!-- Select Button -->
    <button
        @click="confirmSelection"
        :disabled="!selectedAvatar"
        class="mt-10 bg-blue-500 text-white font-semibold py-3 px-10 rounded-full disabled:bg-gray-300"
    >
      Select
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const authStore = useAuthStore()
const avatars = [
  { src: 'Woman1' },
  { src: 'Woman2' },
  { src: 'Woman3' },
  { src: 'Man1' },
  { src: 'Man2' },
  { src: 'Man3' },
];

// Ref to hold the selected avatar
const selectedAvatar = ref({src: `${authStore.user.avatar}`});

// Method to select avatar
const selectAvatar = (avatar: any) => {
  selectedAvatar.value = avatar;
};

// Method to confirm selection (you can add actual functionality here)
const confirmSelection = () => {
  if (selectedAvatar.value) {
    authStore.updateUser({avatar: selectedAvatar.value.src})
        .then(r => {
          navigateTo('/profile')
        })
  }
};

definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

useSeoMeta({
  title: "WE Platform - Change Avatar",
  description: "WE Platform - Change Avatar",
})
</script>

<style scoped>
/* Optional styling */
</style>
