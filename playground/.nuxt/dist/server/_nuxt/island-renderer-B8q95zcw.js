import { defineComponent, onErrorCaptured, createVNode } from "vue";
import { c as createError } from "../server.mjs";
import "#internal/nitro";
import "ofetch";
import "hookable";
import "unctx";
import "h3";
import "ufo";
import "unhead";
import "@unhead/shared";
import "defu";
import "klona";
import "devalue";
import "@vueuse/core";
import "tailwind-merge";
import "destr";
import "vue/server-renderer";
import "ohash";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "@vueuse/math";
import "scule";
import "yup";
import "@tiptap/vue-3";
import "@tiptap/starter-kit";
import "@tiptap/extension-underline";
import "@tiptap/extension-link";
import "@tiptap/extension-image";
import "@tanstack/vue-virtual";
const islandComponents = {};
const islandRenderer = defineComponent({
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const component = islandComponents[props.context.name];
    if (!component) {
      throw createError({
        statusCode: 404,
        statusMessage: `Island component not found: ${props.context.name}`
      });
    }
    onErrorCaptured((e) => {
      console.log(e);
    });
    return () => createVNode(component || "span", { ...props.context.props, "data-island-uid": "" });
  }
});
export {
  islandRenderer as default
};
//# sourceMappingURL=island-renderer-B8q95zcw.js.map
