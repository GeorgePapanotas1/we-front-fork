<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <img src="/img/logo.svg" alt="World Education Logo" class="mx-auto h-24 w-auto" />
        <h2 class="mt-16 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Don't have an account?
          <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</NuxtLink>
        </p>
      </div>

      <form class="mt-8 space-y-6">
        <div v-if="error">
          <p class="text-red-500 text-md text-center">
            {{ error }}
          </p>
        </div>
        <div class="space-y-4">
          <div class="relative">
            <input type="email" placeholder="Email Address" v-model="email"
                   class="w-full py-3 px-4 text-gray-700 bg-white rounded-xl shadow-lg
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div class="relative">
            <input :type="passwordInput" placeholder="Password" v-model="password"
                   class="w-full py-3 px-4 text-gray-700 bg-white rounded-xl shadow-lg
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <!-- Eye icon for password visibility -->
            <div class="absolute inset-y-0 right-0 flex items-center pr-4" @click="togglePasswordInput">
              <NuxtImg src="/img/eye.svg" style="width: 25px;height: 25px;"></NuxtImg>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
          </div>
        </div>

        <div>
          <button
                  @click.prevent="login"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent
                         text-sm font-medium rounded-md text-white bg-gradient-to-r
                         from-green-400 to-blue-500 hover:bg-gradient-to-l focus:outline-none
                         focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

const authStore = useAuthStore()
const email = ref<string|null>(null)
const password = ref<string|null>(null)
const error = ref<string|null>(null)
const passwordInput = ref('password')

const login = () => {
  error.value = null
  authStore.login(email.value, password.value)
      .then(async () => {
        await navigateTo('/dashboard')
      })
      .catch(e => {
        if (e.status === 401) {
          error.value = 'These credentials do not match our records'
        }
      })
}

const togglePasswordInput = () => {
  passwordInput.value = passwordInput.value !== 'password' ? 'password' : 'text';
}

</script>

<style scoped>
/* Add any additional styling if necessary */
</style>
