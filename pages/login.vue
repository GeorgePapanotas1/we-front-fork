<script setup lang="ts">

const authStore = useAuthStore()

onBeforeMount(() => {
  if (authStore.isAuthenticated) {
    navigateTo('/dashboard')
  }
})


useSeoMeta({
  title: "WE Platform - Login",
  description: "WE Platform - Login"
})
</script>

<template>
  <login></login>
</template>

<style scoped>

</style>