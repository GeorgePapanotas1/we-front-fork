<template>
  <div v-show="visible" class="fixed inset-0 z-50 flex items-end justify-center">
    <!-- Overlay Background -->
    <div class="absolute inset-0 bg-black opacity-50" @click="close"></div>

    <!-- Bottom Sheet Content -->
    <div class="relative w-full bg-amber-600 rounded-t-xl shadow-lg max-w-md" :class="animationClass">
      <slot name="content">

      </slot>


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: 'Got it'
  }
});

const isMounted = ref(false)

const emit = defineEmits(['close', 'action']);
const visible = ref(false);
const animationClass = ref('animate-slide-up');

const close = () => {
  animationClass.value = 'animate-slide-down'; // Trigger the slide-down animation
  setTimeout(() => {
    visible.value = false;
    emit('close');
  }, 300); // Ensure this matches the animation duration
};

const action = () => {
  emit('action');
};

watch(
    () => props.show,
    (newVal) => {
      if (newVal) {
        visible.value = true;
        animationClass.value = 'animate-slide-up';
      } else if (isMounted.value) {
        close(); // Trigger close only after component is mounted
      }
    }
);
</script>

<style scoped>
/* CSS Animation for Slide Up */
@keyframes slideUp {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

/* CSS Animation for Slide Down */
@keyframes slideDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

/* Apply the animations */
.animate-slide-up {
  animation: slideUp 0.3s ease;
}

.animate-slide-down {
  animation: slideDown 0.3s ease;
}
</style>
