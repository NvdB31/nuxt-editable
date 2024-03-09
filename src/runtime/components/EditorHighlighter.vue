<script setup lang="ts">
import { useState } from '#imports'
import { useEditor } from '../composables/editor'

const { collections } = useEditor()

const highlightedItem = useState('highlightedItem', () => { })

const highlightedData = computed(() => {
  if (!highlightedItem.value) return
  const collection = collections[highlightedItem.value.collection]
  return {
    collection,
    rect: highlightedItem.value.rect
  }
})
</script>

<template>
  <div
    v-if="highlightedData"
    class="border-2 bg-primary/10 border-primary/50 fixed z-[1000] pointer-events-none"
    :style="{
      top: highlightedData.rect.top + 'px',
      left: highlightedData.rect.left + 'px',
      width: highlightedData.rect.width + 'px',
      height: highlightedData.rect.height + 'px'
    }"
  >
    <div class="absolute -right-0.5 -top-5 text-xs bg-primary font-medium text-white p-0.5 px-1 rounded-t flex items-center gap-1">
      <UIcon
        :name="highlightedData.collection.icon"
        size="12"
      />
      {{ highlightedData.collection.name.singular }}
    </div>
  </div>
</template>
