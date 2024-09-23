<template>
  <div class="min-h-screen bg-white flex flex-col justify-between items-center px-6 pt-72 pb-44">
    <!-- Title Section -->
    <div class="text-center">
      <h1 class="text-2xl font-bold">Try Again!</h1>
      <p class="text-gray-600 mt-20 font-bold text-lg">
        Ready for another round? Let's see if you can do better!
      </p>
    </div>

    <!-- Warning Section -->
    <div class="text-center mt-4 text-gray-600">
      <p>
        By retrying, you will lose the points earned in this level. Do you wish to proceed?
      </p>

      <!-- Penalty Points Section -->
      <div class="mt-4 flex justify-center items-center bg-gray-100 rounded-full px-4 py-2">
        <span class="text-lg font-bold">-{{ Math.round(gameStore.pointsToLose * 10) / 10 }}</span>
        <NuxtImg src="/img/black-leaf.svg" alt="Leaf" class="h-6 w-6 ml-2" />
      </div>
    </div>

    <!-- Buttons Section -->
    <div class="flex justify-between space-x-4 mt-8 w-full">
      <button class="bg-blue-500 text-white py-3 rounded-full w-1/2 text-lg font-semibold" @click="retry">
        Yes
      </button>
      <button class="bg-black text-white py-3 rounded-full w-1/2 text-lg font-semibold" @click="back">
        No
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import Completion from "~/components/game/completion.vue";
import {GameService} from "~/utils/services/GameService";

const gameStore = useGameStore()
const levelStore = useLevelsStore()
const gameService: GameService = new GameService()

const back = () => {
  gameStore.changeScene(Completion)
}

const retry = async () => {
  await gameService.resetLevel(gameStore.levelId, useAuthStore().token)
  await levelStore.refreshLevel(gameStore.levelId)

  gameStore.currentLevel = levelStore.filterLevel(gameStore.levelId)
}
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
