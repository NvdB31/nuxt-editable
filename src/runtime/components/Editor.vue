<script setup lang="ts">
import EditorNavbar from './EditorNavbar.vue'
import EditorView from './EditorView.vue'
import EditorCollections from './views/EditorCollections.vue';
import EditorBody from './EditorBody.vue'
import EditorCollectionList from './views/EditorCollectionList.vue';
import EditorCollectionForm from './views/EditorCollectionForm.vue';
import { useEditor } from '../composables/editor';
import EditorSignupForm from './views/EditorSignupForm.vue';
import EditorLoginForm from './views/EditorLoginForm.vue';
import EditorHighlighter from './EditorHighlighter.vue';

import type { EditableEditorEvents, EditableEditorProps, EditableView } from '../../types'

defineProps<EditableEditorProps>()
const emit = defineEmits<EditableEditorEvents>()

const { collections: editorCollections, view, toggle, isCollapsed, isEnabled, toast } = useEditor()


const isCollectionDetailView = computed(() => {
  return view.current.value.view === 'collections' && editorCollections[view.current.value.collection] !== undefined && !view.current.value.item
})
const isAuthView = computed(() => {
  return ['signup', 'login', 'reset-password'].includes(view.current.value.view)
})

defineShortcuts({
  meta_e: {
    usingInput: true,
    handler: () => {
      toggle()
    }
  }
})

// Watchers to emit events
watch(isCollapsed, (collapsed: boolean) => {
  emit('collapse', collapsed)
})

watch(view.current, (view: EditableView) => {
  emit('viewChange', view)
})

</script>

<template>
  <div
    v-if="isEnabled"
    class="overflow-hidden px-4 fixed w-screen flex flex-col justify-end transition-colors"
    :class="{'h-26 pt-0 bottom-0': isCollapsed, 'bg-black/10 dark:bg-black/5 h-screen inset-0': !isCollapsed}"
    v-bind="$attrs"
  >
    <UButton
      color="white"
      class="mx-auto mb-4"
      :icon="isCollapsed ? 'i-heroicons-arrow-up-solid' : 'i-heroicons-arrow-down-solid'"
      :ui="{ rounded: 'rounded-full' }"
      @click="toggle"
    >
      {{ !isCollapsed ? 'Hide Editor' : 'Show Editor' }} 
    </UButton>

    <UContainer class="w-full">
      <UNotification
        v-for="msg in toast.messages.value"
        :key="msg.id"
        :ui="{ rounded: 'rounded-none rounded-t-lg' }"
        v-bind="msg"
        :callback="() => toast.remove(msg.id)"
      />
    </UContainer>

    <EditorBody>
      <EditorNavbar
        v-if="!isAuthView && user"
        :user="user"
      />
      <EditorView :class="{'!h-0': isCollapsed }">
        <UContainer>
          <EditorCollectionList
            v-if="isCollectionDetailView"
            :data="data"
            :pending="pending"
            @change="payload => emit('change', payload)"
            @request-data="payload => emit('requestData', payload)"
          />
          <EditorCollectionForm
            v-else-if="view.current.value.item"
            :data="data"
            :pending="pending"
            @change="payload => emit('change', payload)"
            @request-data="payload => emit('requestData', payload)"
          />
          <EditorSignupForm
            v-else-if="view.current.value.view === 'signup'"
            :pending="pending"
          />
          <EditorLoginForm
            v-else-if="view.current.value.view === 'login'"
            :pending="pending"
          />
          <EditorCollections v-else />
        </UContainer>
      </EditorView>
    </EditorBody>
  </div>
  <EditorHighlighter />
</template>