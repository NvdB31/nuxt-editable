const isEditorCollapsed = ref(false)
const collections = await $fetch("/api/editable/collections")

export const useEditor = () => {
    const route = useRoute()
    const router = useRouter();
    const currentEditorView = computed(() => {
        // Return part after the hash from the route
        return route.query?.view || 'collections'
    })

    const toastMessages = useState('editorToasts', () => [])

    return {
        toggle: () => isEditorCollapsed.value = !isEditorCollapsed.value,
        isCollapsed: isEditorCollapsed,
        toast: {
            add: (message: any) => {
                const timeout = message.timeout || 3000
                const id = Math.random()
                toastMessages.value.push({
                    timeout, ...message, id
                })
            },
            remove: (id: number) => {
                const index = toastMessages.value.findIndex((message: any) => message.id === id)
                if (index > -1) toastMessages.value.splice(index, 1)
            },
            messages: toastMessages,
        },
        view: {
            current: currentEditorView,
            item: computed(() => route.query.item),
            go: (view: string, item?: string) => {
                router.push({ query: { editable: true, view, item } })
                isEditorCollapsed.value = false
            },
        },
        collections
    }
}

export const useEditorUser = async () => {
    const user = useState("editorUser", () => null);
	const data = await useRequestFetch()("/api/editable/auth/user");
	if (data) {
		user.value = data;
	}
	return user;
};