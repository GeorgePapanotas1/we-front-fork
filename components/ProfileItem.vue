<template>
  <div class="py-4 border-b border-gray-200">
    <!-- Label -->
    <label :for="label" class="block text-sm font-semibold">{{ label }}</label>

    <!-- Input Field -->
    <input
        v-if="!disabled"
        :id="label"
        type="text"
        v-model="inputValue"
        class="mt-1 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        :placeholder="placeholder"
    />
    <div v-else class="border py-2 px-3 border-gray-300">
      {{inputValue}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

// Internal ref for the input value
const inputValue = ref(props.modelValue);

// Watch for changes in the prop and update the internal value
watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});

// Emit the updated value when the input changes
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<style scoped>
/* Optional additional styles */
</style>
