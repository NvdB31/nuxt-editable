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

import type { EditableViewChangeEvent, EditableEditorEvents, EditableEditorProps } from '../../types'

const props = defineProps<EditableEditorProps>()
const emit = defineEmits<EditableEditorEvents>()

const { collections: editorCollections, view, toggle, isCollapsed, toast } = await useEditor()

const isCollectionView = computed(() => {
  return editorCollections[view.current.value] !== undefined
})
const isAuthView = computed(() => {
  return ['signup', 'login', 'reset-password'].includes(view.current.value)
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
watch(isCollapsed, (payload: boolean) => {
  emit('collapse', payload)
})

watch(view.current, (payload: EditableViewChangeEvent) => {
  emit('viewChange', payload)
})

</script>

<template>
  <div
    class="overflow-hidden px-4 fixed w-screen flex flex-col justify-end transition-colors"
    :class="{'h-26 pt-0 bottom-0': isCollapsed, 'bg-black/10 dark:bg-black/5 h-screen inset-0': !isCollapsed}"
    v-if="editorCollections"
    v-bind="$attrs"
  >
    
    <UButton
          color="white"
          class="mx-auto mb-4"
          :icon="isCollapsed ? 'i-heroicons:arrow-up-solid' : 'i-heroicons:arrow-down-solid'"
          :ui="{ rounded: 'rounded-full' }"
          @click="toggle"
        >
          {{ !isCollapsed ? 'Hide Editor' : 'Show Editor' }} 
        </UButton>

    <UContainer class="w-full">
      <UNotification :ui="{ rounded: 'rounded-none rounded-t-lg' }" v-for="msg in toast.messages.value" v-bind="msg" :callback="() => toast.remove(msg.id)" />
    </UContainer>

    <EditorBody>
      <EditorNavbar v-if="!isAuthView && user" :user="user" />
      <EditorView :class="{'!h-0': isCollapsed }">
        <UContainer>
          <EditorCollections v-if="view.current.value === 'collections'" />
          <EditorCollectionForm v-else-if="view.item.value" @change="payload => emit('change', payload)" />
          <EditorCollectionList v-else-if="isCollectionView" @change="payload => emit('change', payload)" />
          <EditorSignupForm v-else-if="view.current.value === 'signup'" />
          <EditorLoginForm v-else-if="view.current.value === 'login'" />
        </UContainer>
      </EditorView>
    </EditorBody>
  </div>
  <EditorHighlighter/>
</template>