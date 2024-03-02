<script setup lang="ts">
import EditorLogo from './EditorLogo.vue';

defineProps<{
    title: string;
}>()

</script>

<template>
    <div class="grid grid-cols-4 gap-8 h-full items-end">
            <div class="col-span-1">
                <EditorLogo class="mb-2" size="md" />
                <h1 class="font-medium text-xl">{{title}}</h1>
            </div>
            <slot/>
        </div>
</template>