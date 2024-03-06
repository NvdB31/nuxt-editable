<template>
  <component
    :is="tag"
    :class="headingClasses[tag] || headingClasses.base"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

withDefaults(defineProps<{
    tag: string
}>(), {
    tag: 'div'
})

const headingClasses = {
    base: 'text-2xl font-bold',
    h1: 'text-3xl font-semibold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    h5: 'text-lg font-semibold',
    h6: 'text-base',
    p: 'text-base'
}
</script>