<script setup lang="ts">
import { useEditor } from '../composables/editor';
import EditorHeading from './EditorHeading.vue';

const { view } = useEditor();
const props = defineProps<{
    error: any
    clearError: () => void
}>()

const onClear = async () => {
    props.clearError();
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center text-center flex-col gap-4">
    <UIcon
      name="i-heroicons-exclamation-circle"
      class="w-12 h-12"
    />
    <EditorHeading tag="h1">
      Something went wrong
    </EditorHeading>
    <code class="text-gray-500 dark:text-gray-300 p-1 px-2 bg-gray-100 dark:bg-gray-950 text-sm">
      {{ error }}
    </code>
    <UButton
      color="black"
      @click="onClear"
    >
      Go Back
    </UButton>
  </div>
</template>