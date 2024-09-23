<script setup lang="ts">
import { ref, watch } from 'vue';

// State to control the drawer visibility
const drawerOpen = ref(false);

// Open the drawer
const openDrawer = () => {
  drawerOpen.value = true;
};

// Close the drawer
const closeDrawer = () => {
  drawerOpen.value = false;
};

// Function to handle adding and removing classes for animations
const toggleDrawerAnimation = () => {
  const drawerElement = document.querySelector('.drawer');
  if (drawerElement) {
    if (drawerOpen.value) {
      drawerElement.classList.remove('slide-out');
      drawerElement.classList.add('slide-in');
    } else {
      drawerElement.classList.remove('slide-in');
      drawerElement.classList.add('slide-out');
    }
  }
};

// Watch for drawer state changes and apply the appropriate animation class
watch(drawerOpen, toggleDrawerAnimation);
</script>

<template>
  <div>
    <!-- Header with Button -->
    <div class="flex justify-between items-center px-6 py-4">
      <div class="flex items-center space-x-1 gap-1 bg-blue-500 p-3 rounded-full">
        <div class="text-white">
          <span class="text-sm font-bold">{{ useAuthStore().user.points }}</span>
        </div>
        <NuxtImg src="/img/leaf.svg" alt="Leaf" class="h-5 w-5"></NuxtImg>
      </div>
      <div class="h-6 w-6">
        <NuxtImg src="/img/menu-burger.svg" alt="Menu" class="h-full w-full" @click="openDrawer"></NuxtImg>
      </div>
    </div>

    <div class="p-5">
      <NuxtPage />

      <!-- Background overlay -->
      <div
          v-if="drawerOpen"
          class="fixed inset-0 bg-black bg-opacity-30"
          :class="{ 'fade-in': drawerOpen, 'fade-out': !drawerOpen }"
          @click="closeDrawer"
      ></div>

      <!-- Drawer with Slide Animations -->
      <div
          v-show="drawerOpen"
          class="drawer fixed top-0 left-0 h-full w-3/4 max-w-sm bg-blue-500 shadow-lg"
          @click.self="closeDrawer"
      >
        <Drawer :isOpen="drawerOpen" @close="closeDrawer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Initial state for the drawer, hidden off-screen */
.drawer {
  transform: translateX(-100%);
  opacity: 0;
}

/* Animation for sliding in from the left */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Animation for sliding out to the left */
@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

/* Apply the slide-in animation */
.slide-in {
  animation: slideIn 0.3s forwards; /* Use forwards to retain the final state */
}

/* Apply the slide-out animation */
.slide-out {
  animation: slideOut 0.3s; /* No forwards, so it returns to its initial state */
}

/* Background overlay animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-in {
  animation: fadeIn 0.3s forwards;
}

.fade-out {
  animation: fadeOut 0.3s forwards;
}
</style>
