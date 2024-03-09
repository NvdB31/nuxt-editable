import { defineNuxtPlugin } from '#app'
import { useEditor } from './composables/editor'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("editable", {
    created(el: HTMLElement, binding: any) {
        const { collection, id } = binding.value;

      if (collection) el.setAttribute("data-editable-collection", collection);
      if (id) el.setAttribute("data-editable-id", id);

      const highlightedItem = useState('highlightedItem', () => null)
      const { view } = useEditor()

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
