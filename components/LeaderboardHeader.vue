<template>
  <div class="flex items-center gap-10 justify-between mt-4 px-6 py-3 rounded-lg" style="gap: 21px">
    <!-- Levels -->
    <div class="flex items-center bg-white shadow rounded-lg py-3 px-4 gap-10 w-1/2" style="gap: 14px; background: #D1E6F84D; height: 79px">
      <div>
        <NuxtImg src="img/level-image.svg" alt="Levels" style="width: 40px;height: 40px;" />
      </div>
      <div>
        <p class="text-xs font-semibold text-gray-700">Levels</p>
        <p class="text-sm text-gray-600">{{ levelsCompleted }}/{{ totalLevels }}</p>
      </div>
    </div>

    <!-- Time -->
    <div class="flex items-center bg-white shadow rounded-lg py-2 px-3 w-1/2" style="gap: 14px; background: #D1E6F84D; height: 79px">
      <div>
        <NuxtImg src="img/time-image.svg" alt="Time" style="width: 40px;height: 40px;" />
      </div>
      <div>
        <p class="text-xs font-semibold text-gray-700">Time</p>
        <p class="text-sm text-gray-600">{{ time }}</p>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  levelsCompleted: {
    type: Number,
    required: true
  },
  totalLevels: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
/* Add any custom styling here if necessary */
</style>
