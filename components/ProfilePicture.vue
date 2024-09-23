<template>
  <div class="text-center my-6">
    <img :src="imageSrc" alt="Profile Image" class="w-24 h-24 rounded-full mx-auto mb-3" :style="{background: props.background}"/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: false,
    default: '#fff'
  },
});
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
