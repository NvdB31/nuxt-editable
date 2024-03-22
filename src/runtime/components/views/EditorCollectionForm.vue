<script setup lang="ts">
// Components
import EditorHeading from '../EditorHeading.vue';
import EditorSection from '../EditorSection.vue';
import EditorDeletionModal from '../EditorDeletionModal.vue';
import { useEditor } from '../../composables/editor';

// Fields
import EditorRichTextField from '../fields/EditorRichTextField.vue';
import EditorOptionsField from '../fields/EditorOptionsField.vue';

// Utilities
import { defineProps, computed, ref, watch, onMounted } from 'vue'
import { requestDataForSchemaFields, componentsForFieldTypes } from '../../utilities/form'
import { getYupValidationSchema } from '../../utilities/validators'
import { prettifyColumnLabel, formatTimestamps } from '../../utilities';

// Types
import { EditableChangeEventType, type EditableData } from '../../types'

const props = defineProps<{
  data: EditableData;
}>();

const emit = defineEmits<{
  change: [payload: any];
  requestData: [payload: any];
}>()

const { collections, view, log, ui } = useEditor()

const currentCollectionKey = computed(() => view.current.value.collection)
const currentCollectionPrimaryKeyField = computed(() => collections[currentCollectionKey.value].primaryKey || 'id')
const currentCollection = computed(() => {
    return collections[currentCollectionKey.value]
})

// Form state
const isNewPost = computed(() => view.current.value.item === 'new')
const itemData = computed(() => {
  const itemsForCurrentCollection = props.data[currentCollectionKey.value]
  return itemsForCurrentCollection?.find(item => item[currentCollectionPrimaryKeyField.value] == view.current.value.item) || {}
})
const updatedAt = computed(() => formatTimestamps(itemData.value.updated_at))
const createdAt = computed(() => formatTimestamps(itemData.value.created_at))

const initialiseFormState = () => {
  return Object.entries(currentCollection.value.schema).reduce((acc, [key, value]) => {
    acc[key] = itemData.value[key] || value.default || componentsForFieldTypes[value.type].defaultValue
    return acc
}, {})
}

const state = ref(initialiseFormState())
const schema = getYupValidationSchema(currentCollection.value.schema)

watch(itemData, () => {
  state.value = initialiseFormState()
})

// Request data for option fields
requestDataForSchemaFields(currentCollection.value.schema, emit)

// Reduce the collection schema to an object that can be used to generate the form
const formComponents = Object.entries(currentCollection.value.schema).reduce((acc, [key, value]) => {
    const component = componentsForFieldTypes[value.type]
    if (component) {
      acc[key] = {
            label: component.label,
            schema: value,
            component: component.component,
            props: {
              label: prettifyColumnLabel(key),
                readonly: ui.collections[currentCollectionKey.value].create ? false : true,
                ...component.props,       
            }
        }
    } else {
      log({ severity: 'error', message: `No component found for field type ${value.type}` })
    }
    return acc
}, {})

// Form methods
async function onSubmit(event: any) {
  const submitType = isNewPost.value ? EditableChangeEventType.Create : EditableChangeEventType.Update
  emit('change', { type: submitType, payload: { collection: currentCollectionKey.value, data: { ...itemData.value, ...event.data } } })

  log({ severity: 'info', message: `Submitting data for ${currentCollectionKey.value}, ${event.data}` })
  view.go({ view: 'collections', collection: currentCollectionKey.value })
}

async function onDelete() {
  emit('change', { type: 'delete', payload: { collection: currentCollectionKey.value, data: itemData.value } })
  log({ severity: 'info', message: `Deleting data for ${currentCollectionKey.value}, ${itemData.value}` })
  view.go({ view: 'collections', collection: currentCollectionKey.value })
}

const showDeletionModal = ref(false)

onMounted(() => {
  if (!isNewPost.value) {
    emit('requestData', { collection: currentCollectionKey.value, item: view.current.value.item })
    log({ severity: 'info', message: `Requesting data for ${currentCollectionKey.value}, item: ${view.current.value.item}` })
  }
})
</script>

<template>
  <EditorSection>
    <UForm :schema="schema" :state="state" @submit="onSubmit">
      <div class="grid grid-cols-2 items-center mb-4 sm:mb-8">
        <EditorHeading tag="h1" class="capitalize">
          {{ isNewPost ? 'New' : 'Edit' }} {{ currentCollection.name.singular }}
        </EditorHeading>
        <div class="flex justify-end gap-4">
          <slot :name="`${view.current.value.collection}-form-actions`" />
          <UButton size="lg" color="gray" @click="view.go({ view: 'collections' })">
            Cancel
          </UButton>
          <UButton size="lg" type="submit" v-if="ui.collections[view.current.value.collection].create">
            Save {{ currentCollection.name.singular }}
          </UButton>
        </div>
      </div>
      <UCard>
        <div class="space-y-4">
          <UFormGroup v-for="(item, key) in formComponents" :key="key" :label="item.props.label" :name="key"
            :help="item.schema.help" :hint="item.label">
            <UInput v-if="item.component === 'UInput'" v-model="state[key]" v-bind="item.props" size="lg" />
            <UTextarea v-if="item.component === 'UTextarea'" v-model="state[key]" v-bind="item.props" size="lg" />
            <UToggle v-else-if="item.component === 'UToggle'" v-model="state[key]" v-bind="item.props" size="lg" />
            <EditorOptionsField v-else-if="item.component === 'EditorOptionsField'" v-model="state[key]" :data="data"
              :field="item.schema" :component-props="item.props" size="lg" />
            <EditorRichTextField v-else-if="item.component === 'EditorRichTextField'" v-model="state[key]"
              :component-props="item.props" size="lg" />
          </UFormGroup>
        </div>
        <template v-if="!isNewPost" #footer>
          <ul class="text-xs text-gray-500 leading-relaxed">
            <li v-if="itemData[currentCollectionPrimaryKeyField]">
              Item ID: {{ itemData[currentCollectionPrimaryKeyField] }}
            </li>
            <li v-if="itemData.created_at">
              Created at: {{ createdAt }}
            </li>
            <li v-if="itemData.updated_at">
              Updated at: {{ updatedAt }}
            </li>
          </ul>
          <div class="flex gap-4 mt-4" v-if="ui.collections[view.current.value.collection].delete">
            <UButton color="white" @click="showDeletionModal = true">
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UForm>
    <EditorDeletionModal v-model="showDeletionModal" @delete="onDelete" />
  </EditorSection>
</template>