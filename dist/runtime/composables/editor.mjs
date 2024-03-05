const isEditorCollapsed = ref(true);
export const useEditor = () => {
  const config = useRuntimeConfig();
  const collections = config.public.editable.collections;
  const route = useRoute();
  const router = useRouter();
  const currentEditorView = computed(() => {
    return {
      view: route.query.view,
      collection: route.query.collection,
      item: route.query.item
    };
  });
  const toastMessages = useState("editorToasts", () => []);
  return {
    toggle: () => isEditorCollapsed.value = !isEditorCollapsed.value,
    isCollapsed: isEditorCollapsed,
    isEnabled: computed(() => route.query.editable === "true"),
    toast: {
      add: (message) => {
        const timeout = message.timeout || 3e3;
        const id = Math.random();
        toastMessages.value.push({
          timeout,
          ...message,
          id
        });
      },
      remove: (id) => {
        const index = toastMessages.value.findIndex((message) => message.id === id);
        if (index > -1)
          toastMessages.value.splice(index, 1);
      },
      messages: toastMessages
    },
    view: {
      current: currentEditorView,
      go: (view) => {
        router.push({ query: { editable: true, ...view } });
        isEditorCollapsed.value = false;
      }
    },
    collections,
    ui: config.public.editable.ui,
    log: (event) => {
      if (config.public.editable.log !== true || event.severity !== config.public.editable.log)
        return;
      console[event.severity](`[Nuxt Editable] ${event.message}`);
    }
  };
};
