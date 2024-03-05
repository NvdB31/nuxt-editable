
import type { ModuleOptions, ModuleHooks, RuntimeModuleHooks, ModuleRuntimeHooks, ModuleRuntimeConfig, ModulePublicRuntimeConfig } from './module.js'

declare module '#app' {
  interface RuntimeNuxtHooks extends RuntimeModuleHooks, ModuleRuntimeHooks {}
}

declare module '@nuxt/schema' {
  interface NuxtConfig { ['editable']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['editable']?: ModuleOptions }
  interface NuxtHooks extends ModuleHooks {}
  interface RuntimeConfig extends ModuleRuntimeConfig {}
  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {}
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['editable']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['editable']?: ModuleOptions }
  interface NuxtHooks extends ModuleHooks {}
  interface RuntimeConfig extends ModuleRuntimeConfig {}
  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {}
}


export type { default } from './module.js'
