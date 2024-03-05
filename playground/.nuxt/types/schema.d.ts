import { NuxtModule, RuntimeConfig } from 'nuxt/schema'
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["googleFonts"]?: typeof import("@nuxtjs/google-fonts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["icon"]?: typeof import("nuxt-icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["ui"]?: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["editable"]?: typeof import("./../../../src/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/google-fonts", Exclude<NuxtConfig["googleFonts"], boolean>] | ["nuxt-icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxt/ui", Exclude<NuxtConfig["ui"], boolean>] | ["./../../../src/module", Exclude<NuxtConfig["editable"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   database: string,

   editable: {
      collections: {
         posts: {
            name: {
               singular: string,

               plural: string,
            },

            icon: string,

            schema: {
               title: {
                  type: string,

                  help: string,

                  required: boolean,
               },

               slug: {
                  type: string,

                  help: string,

                  required: boolean,
               },

               excerpt: {
                  type: string,

                  help: string,
               },

               content: {
                  type: string,

                  help: string,
               },
            },
         },

         products: {
            name: {
               singular: string,

               plural: string,
            },

            icon: string,

            schema: {
               title: {
                  type: string,

                  help: string,

                  required: boolean,
               },

               description: {
                  type: string,

                  help: string,
               },

               discountPercentage: {
                  type: string,

                  help: string,
               },

               price: {
                  type: string,

                  help: string,

                  required: boolean,
               },

               image: {
                  type: string,

                  help: string,
               },

               stock: {
                  type: string,

                  help: string,

                  required: boolean,
               },

               category: {
                  type: string,

                  help: string,

                  options: {
                     source: string,
                  },
               },

               rating: {
                  type: string,

                  help: string,

                  min: number,

                  max: number,
               },

               brand: {
                  type: string,

                  help: string,
               },
            },
         },
      },

      ui: any,

      log: boolean,
   },
  }
  interface PublicRuntimeConfig {
   editable: {
      ui: any,

      log: boolean,

      collections: {
         posts: {
            name: {
               singular: string,

               plural: string,
            },

            icon: string,

            schema: {
               title: {
                  type: string,

                  help: string,

                  required: boolean,
               },

               slug: {
                  type: string,

                  help: string,

                  required: boolean,
               },

               excerpt: {
                  type: string,

                  help: string,
               },

               content: {
                  type: string,

                  help: string,
               },
            },
         },

         products: {
            name: {
               singular: string,

               plural: string,
            },

            icon: string,

            schema: {
               title: {
                  type: string,

                  help: string,

                  required: boolean,
               },

               description: {
                  type: string,

                  help: string,
               },

               discountPercentage: {
                  type: string,

                  help: string,
               },

               price: {
                  type: string,

                  help: string,

                  required: boolean,
               },

               image: {
                  type: string,

                  help: string,
               },

               stock: {
                  type: string,

                  help: string,

                  required: boolean,
               },

               category: {
                  type: string,

                  help: string,

                  options: {
                     source: string,
                  },
               },

               rating: {
                  type: string,

                  help: string,

                  min: number,

                  max: number,
               },

               brand: {
                  type: string,

                  help: string,
               },
            },
         },
      },
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }