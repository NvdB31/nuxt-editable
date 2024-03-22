import { defineNuxtPlugin, useState } from '#app'
import { useEditor } from './composables/editor'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("editable", {
    created(el: HTMLElement, binding: any) {
      const highlightedItem = useState('highlightedItem', () => null)
      const { view, log, collections } = useEditor()

      const bindings = binding.value;
      const collection = binding.value.collection;
      
      if (!collection) {
        log({ severity: "warn", message: "v-editable directive is missing a 'collection' binding:", context: el });
        return;
      }
      el.setAttribute('data-editable-collection', collection)
      
      const primaryKey = collections[collection].primaryKey || 'id';
      const id = bindings[primaryKey];
      if (!id) {
        log({ severity: "warn", message: `v-editable directive is missing primary key "${primaryKey}" binding configured for ${collection} collection:`, context: el });
        return;
      }
      el.setAttribute('data-editable-id', id)

      el.addEventListener("mouseover", (e) => {
        el.style.cursor = "pointer";
        highlightedItem.value = { rect: el.getBoundingClientRect(), collection }
      });

      el.addEventListener("mouseleave", (e) => {
        highlightedItem.value = null
        el.style.cursor = "default";
      });

      el.addEventListener("click", (e) => {
        highlightedItem.value = null
        view.go({ view: 'collections', collection, item: id })
      });
    }
  });
})
