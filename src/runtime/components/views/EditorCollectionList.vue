<script setup lang="ts">
import EditorHeading from '../EditorHeading.vue';
import EditorSection from '../EditorSection.vue';
import { useEditor } from '../../composables/editor';
import { useFetch } from '#app';
import { prettifyColumnLabel, formatTimestamps } from '../../utilities'
import type { EditableCollection } from '~/src/types';

const { collections, view } = await useEditor()
const currentCollection: Ref<EditableCollection> = computed(() => {
  return collections[view.current.value]
})
const selected = ref([])

const columns = computed(() => {
  const schemaColumns = Object.keys(currentCollection.value.schema).map(key => {
    return {
      key: key,
      label: prettifyColumnLabel(key),
      sortable: true
    }
  })

  return [
    ...schemaColumns,
    {
      label: 'Created at',
      key: 'created_at',
      sortable: true
    }, {
      label: 'Updated at',
      key: 'updated_at',
      sortable: true
    }]
})

const { data, pending, refresh } = await useFetch(`/api/editable/${view.current.value}`)

watch(() => view.current.value, async () => {
  await refresh()
  console.log(rows.value)
})


const rows = computed(() => {
  return data.value.map(row => {
    return {
      ...row,
      created_at: row.created_at ? formatTimestamps(row.created_at) : '',
      updated_at: row.updated_at ? formatTimestamps(row.updated_at) : ''
    }
  })
})

const deleteItems = async () => {
  await $fetch(`/api/editable/${view.current.value}`, {
    method: 'DELETE',
    body: { ids: selected.value.map(item => item._id) }
  })
  selected.value = []
  refresh();
}
</script>

<template>
  <EditorSection>
    <div class="grid grid-cols-2 items-end mb-8">
        <EditorHeading
          tag="h1"
          class="capitalize"
        >
          {{ currentCollection.name.plural }}
        </EditorHeading>
      <div class="flex justify-end gap-4">
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="lg"
          color="gray"
          :trailing="false"
          :placeholder="`Search ${currentCollection.name.plural.toLowerCase()}`"
        />
        <UButton size="lg" color="gray" icon="i-heroicons-trash" v-if="selected.length" @click="deleteItems">
          Delete
        </UButton>
        <UButton
          size="lg"
          icon="i-heroicons-plus"
          @click="view.go(view.current.value, 'new')"
        >
          New {{ currentCollection.name.singular }}
        </UButton>
      </div>
    </div>
    <div class="text-sm text-gray-500 dark:text-gray-300 mb-4" v-if="currentCollection.description">{{ currentCollection.description }}</div>
    <UTable
      :rows="rows"
      v-model="selected"
      :columns="columns"
      :loading="pending"
      class="border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950"
      :empty-state="{ icon: 'i-heroicons-queue-list', label: `No ${currentCollection.name.plural}.` }"
      @select="row => view.go(view.current.value, row._id)"
    >
      <template #name-data="{ row }">
        <span class="capitalize">{{ row.name }}</span>
      </template>
    </UTable>
  </EditorSection>
</template>