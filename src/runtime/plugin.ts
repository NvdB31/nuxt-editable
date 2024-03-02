import { defineNuxtPlugin } from '#app'
import { useEditor } from './composables/editor'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("editable", {
    created(el: HTMLElement, binding: any) {
        const { collection, id } = binding.value;

        // @todo: Add necessary checks to verify if element is eligible for editable.
      if (collection) el.setAttribute("data-editable-collection", collection);
      if (id) el.setAttribute("data-editable-id", id);

      const highlightedItem = useState('highlightedItem', () => null)
      const { view } = useEditor()

      el.addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        highlightedItem.value = el.getBoundingClientRect();
      });

      el.addEventListener("mouseleave", (e) => {
        highlightedItem.value = null
        e.stopPropagation();
      });

      el.addEventListener("click", (e) => {
        highlightedItem.value = null
        e.stopPropagation();
        view.go(collection, id)
      });
    }
  });
})
