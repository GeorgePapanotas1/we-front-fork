<template>
  <div class="min-h-screen bg-white flex flex-col justify-between items-center px-6 py-8">
    <!-- Completed Title Section -->
    <div class="text-center">
      <h1 class="text-3xl font-bold">{{ gameStore.currentLevel?.name }}</h1>
      <h1 class="text-2xl font-bold mt-5">Completed!</h1>
    </div>

    <!-- Gems Section -->
    <div class="mt-6">
      <div class="flex justify-center space-x-4">
        <NuxtImg :src="`/img/${completionState?.gem ?? 'GreyDiamond'}.svg`" alt="Gold Gem" class="h-12 w-12" />
      </div>
      <p class="text-center font-bold mt-4 text-lg">{{ completionTitle }}</p>
    </div>

    <!-- Score and Time Section -->
    <div class="flex justify-center space-x-8 mt-6">
      <div class="flex items-center space-x-2 bg-blue-100 rounded-lg px-4 py-2">
        <span class="text-lg font-bold">+ {{ Math.round(completionState?.points * 10) / 10}}</span>
        <NuxtImg src="/img/black-leaf.svg" alt="Leaf" class="h-6 w-6" />
      </div>
      <div class="flex items-center space-x-2 bg-blue-100 rounded-lg px-4 py-2">
        <span class="text-lg font-bold">{{completionState?.time}}</span>
        <NuxtImg src="/img/black-clock.svg" alt="Clock" class="h-6 w-6" />
      </div>
    </div>

    <!-- Description Section -->
    <div class="mt-6 text-center text-gray-600 text-base leading-relaxed">
      {{ level.outro }}
    </div>

    <!-- Buttons Section -->
    <div class="flex justify-center space-x-4 mt-8 w-full">
      <button class="bg-blue-100 text-blue-500 py-3 rounded-full w-1/2 text-lg font-semibold" @click="retry">Try Again</button>
      <button class="bg-blue-500 text-white py-3 rounded-full w-1/2 text-lg font-semibold" @click="nextLevel">Next Level</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import Retry from "~/components/game/retry.vue";
import {GameService} from "~/utils/services/GameService";

const gameService: GameService = new GameService()

const gameStore = useGameStore()
const levelStore = useLevelsStore()

const completionState = ref(null)
const completionTitle = ref(null)

const level = gameStore.currentLevel

watch(() => gameStore.levelId, async () => {
  const r = await gameService.getLevelCompleted(gameStore.levelId, useAuthStore().token)
  completionState.value = r.data
  completionTitle.value = defineTitle(r.data.gem)

  gameStore.pointsToLose = r.data.points
})

const retry = () => {
  gameStore.changeScene(Retry)
}

const nextLevel = () => {
  const nextLevel = levelStore.filterLevel(gameStore.levelId + 1)

  if (nextLevel) {
    gameStore.levelId = nextLevel.id
    gameStore.currentLevel = nextLevel
  } else {
    navigateTo('/dashboard')
  }

}

onMounted(async () => {
  const r = await gameService.getLevelCompleted(level?.id, useAuthStore().token)
  completionState.value = r.data
  completionTitle.value = defineTitle(r.data.gem)

  gameStore.pointsToLose = r.data.points
})

const defineTitle = (diamond: string) => {
  if (diamond === 'BlueDiamond') {
    return 'Beginner';
  }

  if (diamond === 'GreyDiamond') {
    return 'Intermediate';
  }

  return 'Expert'
}
// You can define props here if you want to pass dynamic data like score, time, or gems
</script>

<style scoped>
/* Add any custom styling if necessary */
</style>
