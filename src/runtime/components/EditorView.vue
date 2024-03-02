<script setup lang="ts">
const { view } = await useEditor()

const isNotLoggedInView = computed(() => {
  return ['signup', 'login', 'reset-password'].includes(view.current.value)
})
</script>

<template>
  <div class="border-t border-x transition-[height] ease-in-out duration-[425ms] w-full bg-gray-50 dark:bg-gray-900 dark:border-gray-800 overflow-y-scroll" :class="{
    'h-42 rounded-t-lg': isNotLoggedInView,
    'h-[calc(100vh-25vh)]': !isNotLoggedInView
  }">
    <slot />
  </div>
</template>