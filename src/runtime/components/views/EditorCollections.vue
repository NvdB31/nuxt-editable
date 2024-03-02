<template>
  <EditorSection>
    <EditorHeading
      tag="h1"
      class="mb-8"
    >
      Collections
    </EditorHeading>
    <UTable
      :rows="collectionsRows"
      :columns="columns"
      class="border dark:border-gray-800 dark:shadow-lg rounded-lg bg-white dark:bg-gray-950"
      @select="row => view.go(row.key)"
    >
      <template #name-data="{ row }">
        <div class="flex items-center gap-2">
          <UIcon :name="row.icon" size="16"/>
          {{ row.name.plural }}
        </div>
      </template>
    </UTable>
  </EditorSection>
</template>

<script setup lang="ts">
import EditorHeading from '../EditorHeading.vue';
import EditorSection from '../EditorSection.vue';
import { useEditor } from '../../composables/editor';

const { collections, view } = await useEditor()

const collectionsRows = computed(() => {
    return Object.entries(collections).map(([key, collection]) => {
        return {
            key,
            ...collection
        }
    }
)})

const columns = [
    {
        label: 'Name',
        key: 'name',
    }
]
</script>