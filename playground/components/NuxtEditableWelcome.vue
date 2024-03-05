<script setup lang="ts">

const { data: posts } = useFetch('/api/posts')
</script>

<template>
  <section class="py-32">
    <UContainer class="max-w-6xl">
      <h1 class="text-center text-5xl font-bold mb-10">
        👋 Welcome to Nuxt Editable!
      </h1>
      <div class="grid grid-cols-2 gap-8">
        <UCard>
          <h2 class="font-bold mb-4 text-xl">
            Get started
          </h2>
          <ol class="list-decimal leading-loose pl-8">
            <li>Open up <code>editable.config.ts</code> and define your collection schemas.</li>
            <li>In <code>app.vue</code>, replace the <code>$fetch</code> calls with your own server routes to fetch and update content.</li>
            <li>Add the <code>v-editable</code> attribute wherever you render your content to make it live previewable.</li>
            <li>That's it! You're ready to go!</li>
          </ol>
        </UCard>

        <UCard class="row-span-2">
          <h2 class="font-bold mb-4 text-xl">
            🕹️ Try the editor
          </h2>
          <p class="mb-4">
            There's a simple Posts collection setup for you to play around with. Try enabling the edit mode and hover over the posts below!
          </p>
          <UButton
            to="?editable=true"
            color="black"
            size="lg"
            class="mb-4"
          >
            Enable Editor
          </UButton>
          <UDivider class="my-8" />
          <ul class="divide-y divide-gray-200 dark:divide-gray-800"> 
            <li
              v-for="post in posts"
              :key="post._id"
              v-editable="{ id: post._id, collection: 'posts' }"
              class="py-4"
            >
              <client-only><small class="mb-2 block">{{ new Date(post.created_at).toLocaleDateString() }}</small></client-only>
              <h3 class="text-lg font-bold mb-4">
                {{ post.title }}
              </h3>
              <p class="text-gray">
                {{ post.excerpt }}
              </p>
            </li>
          </ul>
        </UCard>

        <UCard>
          <h2 class="font-bold mb-4 text-xl">
            Integration Examples
          </h2>
          <p class="mb-4">
            Check out these examples to get up and running in no time:
          </p>
          <ul class="leading-loose mb-4">
            <li>
              <ULink>
                <UIcon
                  name="i-devicon:firebase"
                  class="mr-2"
                /> Firebase
              </ULink>
            </li>
            <li>
              <ULink>
                <UIcon
                  name="i-devicon:mongodb"
                  class="mr-2"
                /> MongoDB
              </ULink>
            </li>
            <li>
              <ULink>
                <UIcon
                  name="i-devicon:postgresql"
                  class="mr-2"
                /> PostgreSQL
              </ULink>
            </li>
          </ul>
          <UButton
            to="https://github.com/NvdB31/nuxt-editable/blob/main/README.md"
            icon="i-heroicons-document-text"
            color="gray"
          >
            Go to Docs
          </UButton>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<style lang="postcss">
body {
  @apply bg-gray-100 dark:bg-gray-950;
}
</style>