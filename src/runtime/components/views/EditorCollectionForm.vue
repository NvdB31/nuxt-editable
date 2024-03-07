<script setup lang="ts">
import EditorHeading from '../EditorHeading.vue';
import EditorSection from '../EditorSection.vue';
import EditorDeletionModal from '../EditorDeletionModal.vue';
import { useEditor } from '../../composables/editor';
//import * as yup from 'yup'
import { string, date, number, array, boolean, object } from 'yup'
import { prettifyColumnLabel, formatTimestamps } from '../../utilities';
import type { EditableData } from '../../types'
import { defineProps, computed, ref, watch, onMounted } from 'vue'

// Fields
import EditorRichTextField from '../fields/EditorRichTextField.vue';
import EditorOptionsField from '../fields/EditorOptionsField.vue';

// Utilities
import { requestDataForSchemaFields } from '../../utilities/form'


const props = defineProps<{
  data: EditableData;
}>();

const emit = defineEmits<{
  change: [payload: any];
  requestData: [payload: any];
}>()

const componentsForFieldTypes = {
  text: { label: 'Text', component: 'UInput', props: { type: 'text' }, defaultValue: '' },
    'multiline-text': { label: 'Multi-line Text', component: 'UTextarea', props: { rows: 5 }, defaultValue: '' },
    email: { label: 'Email address', component: 'UInput', props: { type: 'email' }, defaultValue: '' },
    file: { label: 'File', component: 'UInput', props: { type: 'file' }, defaultValue: '' },
    image: { label: 'Image', component: 'UInput', props: { type: 'file' }, defaultValue: '' },
    url: { label: 'URL', component: 'UInput', props: { type: 'url' }, defaultValue: '' },
    phone: { label: 'Phone number', component: 'UInput', props: { type: 'phone' }, defaultValue: '' },
    number: { label: 'Number', component: 'UInput', props: { type: 'number' }, defaultValue: 0 },
    date: { label: 'Date', component: 'UInput', props: { type: 'date' }, defaultValue: null },
    datetime: { label: 'Date and time', component: 'UInput', props: { type: 'datetime' }, defaultValue: null },
    options: { label: 'Options', component: 'EditorOptionsField', props: { }, defaultValue: [] },
  switch: { label: 'Switch', component: 'UToggle', props: { type: 'text' }, defaultValue: false },
    'rich-text': { label: 'Rich text', component: 'EditorRichTextField', props: { rows: 10 }, defaultValue: '' },
}

const defaultValidatorsForFieldTypes = {
  text: string(),
  'multiline-text': string(),
  email: string().email(),
  file: string(),
  image: string(),
  url: string().url(),
  phone: string().matches(/^[0-9]+$/, 'This field must be a valid phone number.'),
  number: number(),
  date: date(),
  datetime: date(),
  options: array(),
  switch: boolean(),
  'rich-text': string(),
}

const { collections, view, log } = useEditor()
const currentCollection = computed(() => {
    return collections[view.current.value.collection]
})
const isNewPost = computed(() => view.current.value.item === 'new')
const itemData = computed(() => {
  const itemsForCurrentCollection = props.data[view.current.value.collection]
  return itemsForCurrentCollection?.find(item => item._id === view.current.value.item) || {}
})

const setFormState = () => {
  return Object.entries(currentCollection.value.schema).reduce((acc, [key, value]) => {
    acc[key] = itemData.value[key] || value.default || componentsForFieldTypes[value.type].defaultValue
    return acc
}, {})
}

const state = ref(setFormState())

watch(itemData, () => {
  state.value = setFormState()
})

/**
 * Get the Yup schema for the current collection
 * Applies the validators from defaultValidatorsForFieldTypes to create a Yup schema with default validators
 * Additionally, applies custom validators from the configuration, as defined in the validators property
 */
function applyValidators(validator, validators) {
  Object.keys(validators).forEach(key => {
    const value = validators[key];

    switch (key) {
      case 'required':
        if (value) validator = validator.required();
        break;
      case 'length':
        validator = validator.length(value);
        break;
      case 'lessThan':
        validator = validator.lessThan(value);
        break;
      case 'moreThan':
        validator = validator.moreThan(value);
        break;
      case 'positive':
        if (value) validator = validator.positive();
        break;
      case 'negative':
        if (value) validator = validator.negative();
        break;
      case 'min':
        validator = validator.min(value);
        break;
      case 'max':
        validator = validator.max(value);
        break;
      case 'matches':
        validator = validator.matches(value);
        break;
      case 'email':
        if (value) validator = string().email();
        break;
      case 'url':
        if (value) validator = string().url();
        break;
      case 'phone':
        if (value) validator = string().matches(/^[0-9]+$/);
        break;
      case 'datetime':
        if (value) validator = date();
        break;
      case 'date':
        if (value) validator = date();
        break;
      case 'lowercase':
        if (value) validator = validator.lowercase();
        break;
      case 'uppercase':
        if (value) validator = validator.uppercase();
        break;
    }
  });

  return validator;
}

function getYupValidationSchema(schema) {
  const yupSchemaFields = {};

  Object.keys(schema).forEach(key => {
    const { type, ...validators } = schema[key];
    const baseValidator = defaultValidatorsForFieldTypes[type] || string(); // Fallback to string validator
    yupSchemaFields[key] = applyValidators(baseValidator, validators);
  });

  return object(yupSchemaFields)
}

const schema = getYupValidationSchema(currentCollection.value.schema)

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
                ...component.props
            }
        }
    }
    return acc
}, {})

// Submission
async function onSubmit(event: any) {
  if (isNewPost.value) {
    emit('change', { type: 'create', payload: { collection: view.current.value.collection, data: event.data } })
  } else {
    emit('change', { type: 'update', payload: { collection: view.current.value.collection, data: { ...itemData.value, ...event.data } } })
  }
  log({ severity: 'info', message: `Submitting data for ${view.current.value.collection}, ${event.data}` })
  view.go({ view: 'collections', collection: view.current.value.collection })
}

async function onDelete() {
  emit('change', { type: 'delete', payload: { collection: view.current.value.collection, data: itemData.value } })
  log({ severity: 'info', message: `Deleting data for ${view.current.value.collection}, ${itemData.value}` })
  view.go({ view: 'collections', collection: view.current.value.collection })
}

const showDeletionModal = ref(false)

const updatedAt = computed(() => formatTimestamps(itemData.value.updated_at))
const createdAt = computed(() => formatTimestamps(itemData.value.created_at))

onMounted(() => {
  if (!isNewPost.value) {
    emit('requestData', { collection: view.current.value.collection })
    log({ severity: 'info', message: `Requesting data for ${view.current.value.collection}` })
  }
})
</script>

<template>
  <EditorSection>
    <UForm
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <div class="grid grid-cols-2 items-center mb-8">
        <EditorHeading
          tag="h1"
          class="capitalize"
        >
          {{ isNewPost ? 'New' : 'Edit' }} {{ currentCollection.name.singular }}
        </EditorHeading>
        <div class="flex justify-end gap-4">
          <UButton
            size="lg"
            color="gray"
            @click="view.go({ view: 'collections' })"
          >
            Cancel
          </UButton>
          <UButton
            size="lg"
            type="submit"
          >
            Save {{ currentCollection.name.singular }}
          </UButton>
        </div>
      </div>
      <UCard>
        <div class="space-y-4">
          <UFormGroup
            v-for="(item, key) in formComponents"
            :key="key"
            :label="item.props.label"
            :name="key"
            :help="item.schema.help"
            :hint="item.label"
          >
            <UInput
              v-if="item.component === 'UInput'"
              v-model="state[key]"
              v-bind="item.props"
              size="lg"
            />
            <UTextarea
              v-if="item.component === 'UTextarea'"
              v-model="state[key]"
              v-bind="item.props"
              size="lg"
            />
            <UToggle
              v-else-if="item.component === 'UToggle'"
              v-model="state[key]"
              v-bind="item.props"
              size="lg"
            />
            <EditorOptionsField
              v-else-if="item.component === 'EditorOptionsField'"
              v-model="state[key]"
              :data="data"
              :field="item.schema"
              :component-props="item.props"
              size="lg"
            />
            <EditorRichTextField
              v-else-if="item.component === 'EditorRichTextField'"
              v-model="state[key]"
              :component-props="item.props"
              size="lg"
            />
          </UFormGroup>
        </div>
        <template
          v-if="!isNewPost"
          #footer
        >
          <ul class="text-xs text-gray-500 leading-relaxed">
            <li v-if="itemData._id || itemData.id">
              Item ID: {{ itemData._id }}
            </li>
            <li v-if="itemData.created_at">
              Created at: {{ createdAt }}
            </li>
            <li v-if="itemData.updated_at">
              Updated at: {{ updatedAt }}
            </li>
          </ul>
          <div class="flex gap-4 mt-4">
            <UButton
              color="white"
              @click="showDeletionModal = true"
            >
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UForm>
    <EditorDeletionModal
      v-model="showDeletionModal"
      @delete="onDelete"
    />
  </EditorSection>
</template>