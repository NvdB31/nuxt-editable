import { defineNuxtModule, addPlugin, createResolver, addImportsDir, addComponentsDir, installModule } from '@nuxt/kit'

import type { EditableModuleOptions } from './types/module'


export default defineNuxtModule<EditableModuleOptions>({
  meta: {
    name: 'nuxt-editable',
    configKey: 'editable'
  },
  defaults: {
    configPath: 'editable.config'
  },
  async setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const configPath = resolver.resolve(nuxt.options.rootDir, options.configPath)
    const config = await import(configPath)
    
    // Add the options to the private runtime config
    nuxt.options.runtimeConfig.editable = config
  
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImportsDir(resolver.resolve('./runtime/composables'))

    // Add Editor components
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: 'NuxtEditable'
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
  }
})
