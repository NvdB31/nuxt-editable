import { defineNuxtPlugin } from '#app/nuxt'
import { LazyIcon, LazyIconCSS } from '#components'
const lazyGlobalComponents = [
  ["Icon", LazyIcon],
["IconCSS", LazyIconCSS],
  
]

export default defineNuxtPlugin({
  name: 'nuxt:global-components',
  setup (nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component)
      nuxtApp.vueApp.component('Lazy' + name, component)
    }
  }
})
