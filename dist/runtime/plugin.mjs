import { defineNuxtPlugin } from "#app";
import { useEditor } from "./composables/editor.mjs";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("editable", {
    created(el, binding) {
      const { collection, id } = binding.value;
      if (collection)
        el.setAttribute("data-editable-collection", collection);
      if (id)
        el.setAttribute("data-editable-id", id);
      const highlightedItem = useState("highlightedItem", () => null);
      const { view, collections } = useEditor();
      const collectionInfo = collections[collection];
      el.addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        el.style.cursor = "pointer";
        highlightedItem.value = { rect: el.getBoundingClientRect(), collection: collectionInfo };
      });
      el.addEventListener("mouseleave", (e) => {
        highlightedItem.value = null;
        el.style.cursor = "default";
        e.stopPropagation();
      });
      el.addEventListener("click", (e) => {
        highlightedItem.value = null;
        e.stopPropagation();
        view.go({ view: "collections", collection, item: id });
      });
    }
  });
});
