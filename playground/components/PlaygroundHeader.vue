
<script setup lang="ts">
    const links = [{
        label: 'About me',
        to: '/'
    },
        {
        label: 'Articles',
        to: '#'
        },
    {
        label: 'Projects',
        to: '#'
    },
    ]
</script>

<template>
    <header>
        <PlaygroundContainer class="py-4">
            <div class="flex justify-center">
                <div class="rounded-full border shadow-xl px-4 py-2 flex gap-8 text-sm">
                    <ULink
                        :to="link.to"
                        active-class="text-primary"
                        inactive-class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        v-for="link in links"
                    >
                        {{ link.label }}
                    </ULink>
                </div>
            </div>
        </PlaygroundContainer>
    </header>
</template>