<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
    modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue', 'delete'])

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <UModal v-model="isOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="font-semibold text-lg">
          Delete item?
        </div>
      </template>

      Deleting an item cannot be undone. You will lose all data associated with this item.

      <template #footer>
        <div class="flex gap-2 justify-end">
          <UButton
            label="Cancel"
            color="white"
            @click="isOpen = false"
          />
          <UButton
            label="Delete"
            color="red"
            @click="emit('delete')"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>