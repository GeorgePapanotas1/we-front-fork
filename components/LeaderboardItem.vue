<template>
  <div class="flex justify-between items-center rounded-lg mb-3 p-3" :class="{ 'bg-blue-50' : userId == useAuthStore().user.id}">
    <!-- Rank -->
    <span class="text-lg font-bold">{{ rank }}</span>

    <!-- Avatar -->
    <img :src="avatar" alt="Avatar" class="rounded-full" width="50" height="50" style="width: 50px;height: 50px"/>


    <div class="flex items-center space-x-1 gap-1 bg-blue-500 p-3 rounded-full">
      <div class="text-white">
        <span class="text-sm font-light">{{ score }}</span>
      </div>
      <NuxtImg src="/img/leaf.svg" alt="Leaf" class="h-5 w-5"></NuxtImg>
    </div>

    <!-- Gems -->
    <div class="flex items-center space-x-2" style="gap:10px">
      <div class="flex items-center relative">
        <NuxtImg src="img/BlueDiamond.svg" alt="Blue Gem" style="width: 30px; height: 24px" />
        <span class="text-sm ml-1 gem-points">{{ blueGem }}</span>
      </div>
      <div class="flex items-center relative">
        <NuxtImg src="img/GreyDiamond.svg" alt="Silver Gem" style="width: 30px; height: 24px" />
        <span class="text-sm ml-1 gem-points">{{ silverGem }}</span>
      </div>
      <div class="flex items-center relative">
        <NuxtImg src="img/OrangeDiamond.svg" alt="Gold Gem" style="width: 30px; height: 24px" />
        <span class="text-sm ml-1 gem-points">{{ goldGem }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rank: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  blueGem: {
    type: Number,
    required: true
  },
  silverGem: {
    type: Number,
    required: true
  },
  goldGem: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true

  }
});
</script>

<style scoped>

.gem-points {
  background: #077BFF;;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  color: white;
  font-size: 10px;
  position: absolute;
  top: -7px;
  right: -6px;
}
</style>
