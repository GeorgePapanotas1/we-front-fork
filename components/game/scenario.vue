<template>
  <div class="min-h-screen bg-white flex flex-col justify-between items-center px-6 py-12">
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

    <!-- Description Section -->
    <div class="mt-6 text-center text-gray-600  text-xl leading-relaxed font-bold" style="margin-top: 82px">
      {{ scenario.question }}
    </div>

    <div style=" margin-top: 90px" class="mb-20">
      <div class="bg-white shadow rounded-lg p-5 w-full font-light mb-5 choice" :class="{'selected-choice': selectedChoice === choice}" @click="selectedChoice=choice" v-for="choice in shuffledChoices">
        {{ choice.text }}
      </div>
    </div>

    <GameBottomSheet
        :show="showBottomSheet"
        title="Incorrect"
        buttonText="Got it"
        @close="closeAndContinue"
        @action="handleAction"
        v-if="selectedChoice"
    >
      <template #content v-if="!selectedChoice.isCorrect">
        <div class="bg-blue-500 p-7">
          <div class="flex justify-between items-center mb-4">
            <div class="flex align-baseline justify-center gap-3">
              <NuxtImg src="/img/add-circle.svg" width="30" height="30"></NuxtImg>
              <span class="text-lg font-bold">Incorrect</span>
            </div>
            <button class="text-gray-500" @click="close">&times;</button>
          </div>

          <div class="my-7">
            {{selectedChoice.explanation}}
          </div>

          <!-- Bottom Button -->
          <div class="mt-4 text-center">
            <button
                class="bg-black text-white w-1/2 m-auto py-3 rounded-full text-lg font-semibold"
                @click="handleAction"
            >
              Got it
            </button>
          </div>
        </div>
      </template>

      <template #content v-else>
        <div class="bg-green-600 p-7">
          <div class="flex justify-between items-center mb-4">
            <div class="flex align-baseline justify-center gap-3">
              <NuxtImg src="/img/tick-circle.svg" width="30" height="30"></NuxtImg>
              <span class="text-lg font-bold">Correct</span>
            </div>

            <div>
              <div class="flex items-center justify-center gap-3">
                <span class="text-xl font-bold">+{{pointsAwarded}}</span>
                <NuxtImg src="/img/black-leaf.svg" width="25" height="25"></NuxtImg>
              </div>
            </div>
          </div>

          <!-- Bottom Button -->
          <div class="mt-10 text-center">
            <button
                class="bg-white text-black w-1/2 m-auto py-3 rounded-full text-lg font-semibold"
                @click="handleAction"
            >
              Next
            </button>
          </div>
        </div>
      </template>

    </GameBottomSheet>

    <!-- Button Section -->
    <div class="mt-6 w-full">
      <button class="bg-blue-100 text-white py-3 rounded-full w-full text-lg font-semibold" disabled v-if="!selectedChoice">
        Submit
      </button>

      <button class="bg-blue-500 text-white py-3 rounded-full w-full text-lg font-semibold" @click="submitAnswer" v-else>
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Choice} from "~/utils/types/types";
import { GameService } from "~/utils/services/GameService";

const gameStore = useGameStore()

const scenario = gameStore.currentScenario
const level = gameStore.currentLevel

const timeStarted = ref<number|null>(null)
const selectedChoice = ref<Choice |null>(null)
const showBottomSheet = ref(false)
const pointsAwarded = ref(0)

const gameService: GameService = new GameService();

const handleAction = () => {
  gameStore.nextScenario()
}

const closeAndContinue = () => {
  showBottomSheet.value = false
  setTimeout(() => {
    gameStore.nextScenario()
  }, 100)
}

onMounted(() => {
  timeStarted.value = Date.now()
})
const submitAnswer = () => {

  if (selectedChoice.value?.id && timeStarted.value) {
    gameService.registerAnswer(parseInt(selectedChoice.value?.id), Math.floor(timeStarted.value / 1000), Math.floor(Date.now() / 1000), useAuthStore().token).then(r => {
      pointsAwarded.value = Math.round(r.answer.points * 10) / 10

      showBottomSheet.value = true
    })

  }

}

const shuffledChoices = computed(() => {
  return shuffleArray(scenario.choices)
})

function shuffleArray(array) {
  // Create a copy of the array to avoid mutating the original array
  let shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at index i and index j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
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

.choice {
  background: #D1E6F84D
}

.selected-choice {
  background: #D1E6F8
}
</style>
