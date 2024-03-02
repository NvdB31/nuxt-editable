<script setup lang="ts">
const rect = useState('highlightedItem', () => null) as Ref<DOMRect | null>
</script>

<template>
    <div v-if="rect" class="border-2 border-primary/50 fixed z-[1000]" :style="{
        top: rect.top + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px'
    }">
    <div class="absolute -right-0.5 -top-5 text-xs bg-primary font-medium text-white p-0.5 px-1 rounded-t flex items-center gap-1">
        <UIcon name="i-heroicons-pencil" size="12" />
        Click to Edit
    </div>
    </div>
</template>
