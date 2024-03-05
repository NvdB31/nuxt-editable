import { defineNuxtModule, createResolver, addPlugin, addImportsDir, addComponent, installModule } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "nuxt-editable",
    configKey: "editable"
  },
  defaults: {
    configPath: "editable.config"
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const configPath = resolver.resolve(nuxt.options.rootDir, options.configPath);
    const config = await import(configPath);
    nuxt.options.runtimeConfig.editable = config;
    nuxt.options.runtimeConfig.public.editable = {
      ui: config.ui || {},
      log: config.log || false,
      // @todo: Add a secure way of exposing the collections
      collections: config.collections || {}
    };
    addPlugin(resolver.resolve("./runtime/plugin"));
    addImportsDir(resolver.resolve("./runtime/composables"));
    addComponent({
      name: "NuxtEditableEditor",
      filePath: resolver.resolve("./runtime/components/Editor.vue")
    });
    nuxt.hook("tailwindcss:config", function(tailwindConfig) {
      tailwindConfig.content = tailwindConfig.content ?? { files: [] };
      (Array.isArray(tailwindConfig.content) ? tailwindConfig.content : tailwindConfig.content.files).push(resolver.resolve("./runtime/components/**/*.{vue,mjs,ts}"));
    });
    await installModule("@nuxtjs/google-fonts", {
      families: {
        "DM+Sans": {
          wght: [400, 500, 700, 900]
        }
      }
    });
    await installModule("@nuxt/ui");
  }
});

export { module as default };
