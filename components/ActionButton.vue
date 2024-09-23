<template>
  <button
      :class="['w-full py-3 rounded-full font-semibold', colorClass]"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  buttonType: {
    type: String,
    default: 'primary', // 'primary' for blue, 'secondary' for black
    validator: value => ['primary', 'secondary', 'danger'].includes(value)
  }
});

const colorClass = computed(() => {
  if (props.buttonType === 'primary') return 'bg-blue-500 text-white'
  if (props.buttonType === 'secondary') return 'bg-indigo-500 text-white'
  if (props.buttonType === 'danger') return 'bg-red-500 text-white'
  return 'bg-blue-500 text-white'
})
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
