<template>
  <div class="min-h-screen bg-white flex flex-col justify-between items-center px-6 py-12">
    <!-- Image Section -->
    <div class="mt-8 text-center">
      <NuxtImg :src="level?.image" alt="Goal Image" class="w-auto m-auto" width="225" height="229" style="width: 225px; height: 229px;"/>
    </div>

    <!-- Title Section -->
    <div class="text-center mt-4">
      <h1 class="text-3xl font-bold">
        {{ level?.name }}
      </h1>
    </div>

    <!-- Description Section -->
    <div class="mt-20 text-center text-gray-600 text-base leading-relaxed font-light">
      {{ level?.intro }}
    </div>

    <!-- Button Section -->
    <div class="mt-20 w-full">
      <button class="bg-blue-500 text-white py-3 rounded-full w-full text-lg font-semibold" @click="changeScene">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import type {Level} from "~/utils/types/types";
import ScenarioIntro from "~/components/game/scenario-intro.vue";

const gameStore = useGameStore()

const level = computed((): Level|null => {
  return gameStore.currentLevel
});

const changeScene = () => {
  gameStore.changeScene(ScenarioIntro)
}

</script>

<style scoped>
/* Optional: If you need custom styles */
</style>
