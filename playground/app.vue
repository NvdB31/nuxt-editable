<script setup lang="ts">
const currentEditorUser = computed(() => ({ id: 0, name: 'Nick van den Berg '}))
const currentEditorItems = computed(() => [])


const onEditorViewChange = (event: any) => {
  console.log('onEditorUpdate', event)
}

const onCollapse = (val) => {
  console.log(val)
}
</script>

<template>
  <PlaygroundHeader />
  <PlaygroundSection>
    <PlaygroundContainer>
      <UAvatar size="2xl" class="mb-4" src="https://www.nickvandenberg.dev/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar.daa5137a.jpg&w=128&q=75"/>
      <h1 class="text-5xl font-bold mb-8" v-editable="{ collection: 'posts', id: '65e083cc5c599e0648ad0df8' }">👋 Hi, I'm a front-end developer</h1>
      <p class="mb-12">I’m Nick, a 29-year old freelance front-end developer and UI designer from Eindhoven, the Netherlands. I specialize in bridging the gap between design and engineering teams.</p>
      <div class="flex gap-4">
        <UButton icon="i-mdi:github" color="white"/>
        <UButton icon="i-mdi:instagram" color="white"/>
        <UButton icon="i-mdi:linkedin" color="white"/>
        <UButton icon="i-mdi:twitter" color="white"/>
      </div>
    </PlaygroundContainer>
  </PlaygroundSection>

  <PlaygroundSection>
      <PlaygroundContainer>
        
      </PlaygroundContainer>
    </PlaygroundSection>


  <NuxtEditableEditor @viewChange="onEditorViewChange" @collapse="onCollapse" :user="currentEditorUser" />
</template>

<style>

body {
  @apply bg-neutral-100;
}

</style>