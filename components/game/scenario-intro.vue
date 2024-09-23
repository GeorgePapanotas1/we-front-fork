<template>
  <div class="min-h-screen bg-white flex flex-col justify-between items-center px-6 py-8">
    <!-- Title Section with Progress Bar -->
    <div class="w-full">
      <div class="text-center mt-4">
        <h1 class="text-2xl font-bold">
          {{ level.name }}
        </h1>
      </div>

      <!-- Progress Bar -->
      <div class="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
        <div class="bg-blue-500 h-2.5 rounded-full" :style="{ width: level.progress.progress + 33 + '%' }"></div>
      </div>
    </div>

    <div>
      <!-- Image Section -->
      <div class="mt-8 text-center m-auto">
        <img :src="scenario.image" alt="Goal Image" class="h-60 w-full" />
      </div>

      <!-- Description Section -->
      <div class="mt-16 text-center text-gray-600 text-base leading-relaxed">
        {{ scenario.intro }}
      </div>
    </div>


    <!-- Button Section -->
    <div class="mt-6 w-full">
      <button class="bg-blue-500 text-white py-3 rounded-full w-full text-lg font-semibold" @click="changeScene">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import Scenario from "~/components/game/scenario.vue";

const gameStore = useGameStore()

const scenario = gameStore.currentScenario
const level = gameStore.currentLevel


const changeScene = () => {
  gameStore.changeScene(Scenario)
}

</script>

<style scoped>
/* Custom styling for dots */
.h-2 {
  height: 8px;
}
.w-6 {
  width: 24px;
}
</style>
