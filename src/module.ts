import { defineNuxtModule, addPlugin, createResolver, addImportsDir, installModule, addComponent } from '@nuxt/kit'
import { uiDefaults } from './runtime/types'
import defu from 'defu'

export * from './runtime/types'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-editable',
    configKey: 'editable'
  },
  defaults: {
    collections: {},
    ui: {},
    log: true
  },
  async setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    //const configPath = resolver.resolve(nuxt.options.rootDir, options.configPath)
    const config = options //await import(configPath)

    // Add the options to the private runtime config
    nuxt.options.runtimeConfig.editable = options

    // Add the options to the public runtime config
    nuxt.options.runtimeConfig.public.editable = {
      ui: defu(uiDefaults, config.ui),
      log: config.log,
      // @todo: Add a secure way of exposing the collections
      collections: config.collections || {}
    }
    
    
    // Add Editor plugin, components and composables
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImportsDir(resolver.resolve('./runtime/composables'))
    addComponent({
      name: 'NuxtEditableEditor',
      filePath: resolver.resolve('./runtime/components/Editor.vue'),
    })

    nuxt.hook('tailwindcss:config', function (tailwindConfig) {
      tailwindConfig.content = tailwindConfig.content ?? { files: [] };
      (Array.isArray(tailwindConfig.content) ? tailwindConfig.content : tailwindConfig.content.files).push(resolver.resolve('./runtime/components/**/*.{vue,mjs,ts}'))
    })
    
    await installModule('@nuxtjs/google-fonts', {
      families: {
        'DM+Sans': {
          wght: [400, 500, 700, 900]
        }
      }
    })
    
    await installModule('@nuxt/ui')

    // TODO: See if that could work for the esm build issue.
    //nuxt.options.build.transpile.push('@popperjs/core', '@headlessui/vue')


  }
})