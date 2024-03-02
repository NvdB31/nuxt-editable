export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig: {
    database: process.env.MONGODB_URI,
  },
  vite: {
    build: {
      target: ['es2022', 'edge89', 'firefox89', 'chrome89', 'safari15'],
    },
  },
  nitro: {
    esbuild: {
      options: {
        target: 'es2022',
      },
    },
  },
})
