<template>
  <div class="p-6">
    <!-- Profile Picture Component -->
    <h2 class="text-xl font-semibold text-center mb-8">Profile</h2>

    <div class="m-8">
      <NuxtLink to="/avatar">
        <ProfilePicture :imageSrc="`/img/${authStore.user.avatar}.svg`" background="#d1e7f8" />

      </NuxtLink>
    </div>

    <div>
      <ProfileItem label="First Name" v-model=profileItems.firstname />
      <ProfileItem label="Last Name" v-model=profileItems.lastname />
      <label class="block text-sm font-semibold">Email</label>
      <div class="border py-2 px-3 border-gray-300">
        {{authStore.user.email}}
      </div>
<!--      <ProfileItem label="Country" v-model=profileItems.country />-->
    </div>

    <!-- Action Buttons -->
    <div class="mt-8 space-y-4">
      <ActionButton label="Save changes" buttonType="primary" @click="save"/>
      <ActionButton label="Change Password" buttonType="secondary" @click="navigateTo('/password')"/>
      <ActionButton label="Delete Account" buttonType="danger" @click="deleteProfile"/>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

useSeoMeta({
  title: "WE Platform - Profile",
  description: "WE Platform - Profile",
})

const authStore = useAuthStore()

const profileItems = ref({
  firstname: authStore.user.name,
  lastname: authStore.user.surname,
  // country: 'Greece'
})

const save = () => {
  authStore.updateUser(profileItems.value)
}

const deleteProfile = async () => {
  await authStore.deleteProfile();
  authStore.logout()
  navigateTo('/login')

}
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
