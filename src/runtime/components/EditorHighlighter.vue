<script setup lang="ts">
const highlightedItem = useState('highlightedItem', () => {}) as Ref<DOMRect | object>
</script>

<template>
  <div
    v-if="highlightedItem"
    class="border-2 bg-primary/10 border-primary/50 fixed z-[1000] pointer-events-none"
    :style="{
      top: highlightedItem.rect.top + 'px',
      left: highlightedItem.rect.left + 'px',
      width: highlightedItem.rect.width + 'px',
      height: highlightedItem.rect.height + 'px'
    }"
  >
    <div class="absolute -right-0.5 -top-5 text-xs bg-primary font-medium text-white p-0.5 px-1 rounded-t flex items-center gap-1">
      <UIcon
        :name="highlightedItem.collection.icon"
        size="12"
      />
      {{ highlightedItem.collection.name.singular }}
    </div>
  </div>
</template>
