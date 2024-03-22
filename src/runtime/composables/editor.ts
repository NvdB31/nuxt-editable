import type { EditableCollectionKey, EditableViewType, EditableView, EditableLogEvent } from "~/src/runtime/types";
import { ref, computed } from 'vue'
import { useRouter, useRoute, useState, useRuntimeConfig } from '#imports'
import { resolveUIConfig } from '../utilities/editor'

const isEditorCollapsed = ref(true)

export const useEditor = () => {
    const config = useRuntimeConfig();
    const collections = config.public.editable.collections
    const route = useRoute()
    const router = useRouter();
    
    const currentEditorView = computed(() => {
        return {
            view: route.query.view as EditableViewType,
            collection: route.query.collection as EditableCollectionKey,
            item: route.query.item as string
        }
    })
    // if (!currentEditorView.value.view) {
    //     router.replace({ query: { editable: true, view: 'collections' } })
    // }

    const toastMessages = useState('editorToasts', () => [])

    return {
        toggle: () => isEditorCollapsed.value = !isEditorCollapsed.value,
        isCollapsed: isEditorCollapsed,
        isEnabled: computed(() => route.query.editable === 'true'),
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
            go: (view: EditableView) => {
                router.push({ query: { editable: true, ...view } })
                isEditorCollapsed.value = false
            },
        },
        collections,
        ui: resolveUIConfig(config.public.editable.collections, config.public.editable.ui),

        log: (event: EditableLogEvent) => {
            if (!config.public.editable.log) return
            console[event.severity](`[Nuxt Editable] ${event.message}`)
        },

        user: useState('editableEditorUser', () => null)
    }
}