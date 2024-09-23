<template>
  <div class="min-h-screen bg-white">
    <!-- Header Section -->
    <LeaderboardHeader
        :levelsCompleted="parseInt(userLevels || 0)"
        :totalLevels="parseInt(totalLevels || 0)"
        :time="gameTime"
    />

    <div class="text-left mt-4">
      <h1 class="text-xl font-bold">Leaderboard</h1>
    </div>

    <div class="mt-4 px-6">
      <LeaderboardItem
          v-for="(user, index) in leaderboard"
          :key="index"
          :rank="user.userPosition"
          :avatar="`/img/${user.userAvatar}.svg`"
          :score="user.userPoints"
          :blueGem="user.blueDiamond"
          :silverGem="user.grayDiamond"
          :goldGem="user.orangeDiamond"
          :user-id="user.userId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import  {LeaderboardService} from "~/utils/services/LeaderboardService";

const leaderboardService: LeaderboardService = new LeaderboardService();

const leaderboard = ref([])

const totalLevels = ref('')
const userLevels = ref('')
const gameTime = ref('')

onBeforeMount(() => {
  leaderboardService.getLevels(useAuthStore().token).then((r) => {
      leaderboard.value = r.data.leaderboard

    totalLevels.value = r.data.totalLevels
    userLevels.value = r.data.userCompletedLevels
    gameTime.value = r.data.gameTime
    })
})

definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

useSeoMeta({
  title: "WE Platform - Leaderboard",
  description: "WE Platform - Leaderboard",
})
</script>

<style scoped>
/* Optional styles */
</style>
