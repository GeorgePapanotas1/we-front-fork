// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  },

  modules: ['@nuxt/image', '@pinia/nuxt'],

    runtimeConfig: {
      public:  {
          env: process.env.NODE_ENV || 'local',
          backendUrl: process.env.BACKEND_URL || 'http://localhost'
      }
    }
})