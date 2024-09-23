<template>
  <div class="min-h-screen bg-white">
    <!-- Header Section -->

    <div class="text-center mt-4 mb-12">
      <h1 class="text-2xl font-bold">It's Time To Play</h1>
    </div>

    <!-- Goals List -->
    <div class="mt-12 px-2">
      <div class="h-lvh overflow-y-auto">
        <LevelListItem
            v-for="(goal, index) in levelStore.levels"
            :key="index"
            :index="index + 1"
            :title="goal.name"
            :progress="goal.progress.progress"
            :gem="goal.progress.gem"
            @click="selectLevel(goal.id)"

        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


import {useGameStore} from "~/stores/gameStore";

definePageMeta({
  layout: 'auth',
  middleware: 'auth'
})

useSeoMeta({
  title: "WE Platform - Dashboard",
  description: "WE Platform - Dashboard",
})

const levelStore = useLevelsStore()
const gameStore = useGameStore()
const authStore = useAuthStore()



const selectLevel = (levelId: string) => {

  gameStore.levelId = levelId;
  gameStore.currentLevel = levelStore.filterLevel(levelId)

  navigateTo('/game')
}


onBeforeMount(() => {
  levelStore.fetchLevels()
  authStore.me()
})
</script>

<style scoped>
/* Additional styling if necessary */
</style>
