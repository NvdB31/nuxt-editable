<script setup lang="ts">
import EditorLogo from "./EditorLogo.vue"
import { useEditor } from "../composables/editor";
import type { EditableUser } from '../types'
import { computed, defineProps } from 'vue'
const { view, collections } = useEditor();

const emit = defineEmits<{
  logout: []
}>()

const collectionNavItems = computed(() => {
  return Object.entries(collections).map(([collectionKey, collection]) => {
    return {
      label: collection.name.plural,
      icon: collection.icon,
      click: () => view.go({ view: 'collections', collection: collectionKey }),
      open: true
    }
  }) || []
})

const items = [
  [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-right-end-on-rectangle',
    click: () => emit('logout')
  }]
]

defineProps<{
  user: EditableUser
}>()

</script>

<template>
  <div class="flex items-center border-t border-x dark:divide-gray-800 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-800 w-full rounded-t-xl">
    <EditorLogo
      class="px-4"
      size="sm"
    />
    <UHorizontalNavigation
      :links="collectionNavItems"
      class="py-1 px-2 border-x"
    />
    <UDropdown
      :items="items"
      class="flex-none p-4"
    >
      <button class="flex items-center gap-2 text-gray-500 text-sm font-medium">
        <UAvatar
          :src="user.avatar"
          :alt="user.name"
          size="xs"
        />
        <span class="hidden sm:block">{{ user.name }}</span>
        <UIcon name="i-heroicons-chevron-down" />
      </button>
    </UDropdown>
  </div>
</template>