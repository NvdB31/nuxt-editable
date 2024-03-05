<script setup lang="ts">
import EditorHeading from '../EditorHeading.vue';
import EditorSection from '../EditorSection.vue';
import { useEditor } from '../../composables/editor';
import { computed, defineProps, defineEmits, ref, onMounted } from 'vue';
import { prettifyColumnLabel, formatTimestamps } from '../../utilities'
import { EditableChangeEventType, type EditableChangeEvent, type EditableCollection, type EditableData, type EditableRequestDataEvent } from '../../../types';

const { collections, view, log } = useEditor()
const currentCollection: Ref<EditableCollection> = computed(() => {
  return collections[view.current.value.collection]
})

const emit = defineEmits<{
  change: [event: EditableChangeEvent];
  requestData: [event: EditableRequestDataEvent];
}>()

const props = defineProps<{
  data: EditableData;
  pending?: boolean;
}>();

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
  
const selected = ref([])

watch(() => view.current.value.collection, () => {
  emit('requestData', { collection: view.current.value.collection })
  log({ severity: 'info', message: `Requesting data for ${view.current.value.collection}` })
})


const rows = computed(() => {
  const collectionData = props.data?.[view.current.value.collection] || []
  if (!collectionData.length) return []
  return collectionData.map(row => {
    return {
      ...row,
      created_at: row.created_at ? formatTimestamps(row.created_at) : '',
      updated_at: row.updated_at ? formatTimestamps(row.updated_at) : ''
    }
  })
})

const deleteItems = async () => {
  emit('change', { type: EditableChangeEventType.Delete, payload: { collection: view.current.value.collection, data: selected.value } })
  log({ severity: 'info', message: `Deleting data for ${view.current.value.collection}, ${selected.value}` })
  selected.value = []
}

onMounted(() => {
  emit('requestData', { collection: view.current.value.collection })
  log({ severity: 'info', message: `Requesting data for ${view.current.value.collection}` })
})
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
        <UButton
          v-if="selected.length"
          size="lg"
          color="gray"
          icon="i-heroicons-trash"
          @click="deleteItems"
        >
          Delete
        </UButton>
        <UButton
          size="lg"
          icon="i-heroicons-plus"
          @click="view.go({view: 'collections', collection: view.current.value.collection, item: 'new'})"
        >
          New {{ currentCollection.name.singular }}
        </UButton>
      </div>
    </div>
    <div
      v-if="currentCollection.description"
      class="text-sm text-gray-500 dark:text-gray-300 mb-4"
    >
      {{ currentCollection.description }}
    </div>
    <UTable
      v-model="selected"
      :rows="rows"
      :columns="columns"
      :loading="pending"
      class="border dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950"
      :empty-state="{ icon: 'i-heroicons-queue-list', label: `No ${currentCollection.name.plural}.` }"
      @select="row => view.go({ view: 'collections', collection: view.current.value.collection, item: row._id })"
    >
      <template #name-data="{ row }">
        <span class="capitalize">{{ row.name }}</span>
      </template>
    </UTable>
  </EditorSection>
</template>