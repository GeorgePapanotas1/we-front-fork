<script setup lang="ts">

const gameStore = useGameStore()


onBeforeMount(() => {
  if (gameStore.currentLevel === null) {
    navigateTo('/dashboard')
  }
})

definePageMeta({
  middleware: ['auth']
})

useSeoMeta({
  title: "WE Platform - Game time!",
  description: "WE Platform - Game time!",
})
</script>

<template>
  <section>
    <component :is="gameStore.currentScene"></component>

  </section>
</template>

<style scoped>

</style>