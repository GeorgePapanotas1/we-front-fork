<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo and Title -->
      <div class="text-center">
        <img src="/img/logo.svg" alt="World Education Logo" class="mx-auto h-24 w-auto" />
        <h2 class="mt-16 text-center text-3xl font-extrabold text-gray-900">
          Let's create your account!
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Already have an account?
          <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Sign In</NuxtLink>
        </p>
      </div>

      <!-- Registration Form -->
      <form class="mt-8 space-y-6">
        <!-- First and Last Name -->
        <div class="flex align-bottom justify-between" style="gap: 16px">
          <div class="relative">
            <input type="text" placeholder="First Name" v-model="registration.firstname"
                   class="w-full py-3 px-4 text-gray-700 bg-white rounded-xl shadow-lg
                          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div v-if="errors.firstname">
              <p class="text-red-500 text-md pt-1" style="font-size: 11px">
                {{ errors.firstname }}
              </p>
            </div>
          </div>
          <div class="relative">
            <input type="text" placeholder="Last Name" v-model="registration.lastname"
                   class="w-full py-3 px-4 text-gray-700 bg-white rounded-xl shadow-lg
                          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div v-if="errors.lastname">
              <p class="text-red-500 text-md pt-1" style="font-size: 11px">
                {{ errors.lastname }}
              </p>
            </div>
          </div>
        </div>

        <!-- Email Address -->
        <div class="relative">
          <input type="email" placeholder="Email Address" v-model="registration.email"
                 class="w-full py-3 px-4 text-gray-700 bg-white rounded-xl shadow-lg
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div v-if="errors.email">
            <p class="text-red-500 text-md pt-1" style="font-size: 11px">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <!-- Password -->
        <div class="relative">
          <input type="password" placeholder="Password" v-model="registration.password"
                 class="w-full py-3 px-4 text-gray-700 bg-white rounded-xl shadow-lg
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <div v-if="errors.password">
            <p class="text-red-500 text-md pt-1" style="font-size: 11px">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <input type="password" placeholder="Confirm Password" v-model="registration.password_confirmation"
                 class="w-full py-3 px-4 text-gray-700 bg-white rounded-xl shadow-lg
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <div v-if="errors.password_confirmation">
            <p class="text-red-500 text-md pt-1" style="font-size: 11px">
              {{ errors.password_confirmation }}
            </p>
          </div>
        </div>

        <!-- Terms of Use and Privacy Policy -->
        <div class="flex items-start">
          <input id="agree" name="agree" type="checkbox" required v-model="registration.terms"
                 class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
          <label for="agree" class="ml-2 block text-sm text-gray-900">
            I agree to the <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms of Use & Privacy Policy</a>.
          </label>
        </div>

        <!-- Sign Up Button -->
        <div>
          <button @click.prevent="register"
                  class="group relative w-full flex justify-center py-3 px-4 border border-transparent
                         text-sm font-medium rounded-md text-white bg-gradient-to-r
                         from-green-400 to-blue-500 hover:bg-gradient-to-l focus:outline-none
                         focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Sign Up
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const registration = ref({
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  password_confirmation: null,
  terms: null
})

const errors = ref({
  firstname: null,
  lastname: null,
  email: null,
  password: null,
  password_confirmation: null,
  terms: null,
})

const register = () => {

  errors.value = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    password_confirmation: null,
    terms: null,
  }

  authStore.register(registration.value)
      .then(async () => {
        await navigateTo('/login')
      })
      .catch(e => {


        Object.keys(e.response._data.errors).forEach((key) => {
          errors.value[key] = e.response._data.errors[key][0]
        })
      })
}
</script>

<style scoped>
/* Add additional styling if needed */
</style>
