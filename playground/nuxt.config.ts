import config from './editable.config'

export default defineNuxtConfig({
  modules: [
    ['../src/module', config],
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    database: process.env.MONGODB_URI,
  },
})
