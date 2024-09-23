<template>
  <div class="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow-md mb-4">
    <div class="w-10/12">
      <h3 class="text-md font-semibold">{{ index }} {{ title }}</h3>
      <div class="mt-2">
        <div class="h-2 bg-gray-300 rounded-full w-full">
          <div :style="{ width: progress + '%' }"
               class="h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
    <div v-if="gem">
      <img :src="`/img/${gem}.svg`" alt="Diamond" class="h-6 w-6">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    gem: {
      type: String,
      default: '',
    }
  }
}
</script>

<style scoped>
/* Add additional scoped styling if needed */
</style>
