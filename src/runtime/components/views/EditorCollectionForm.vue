<script setup lang="ts">
import EditorHeading from '../EditorHeading.vue';
import EditorSection from '../EditorSection.vue';
import EditorDeletionModal from '../EditorDeletionModal.vue';
import EditorRichTextEditor from '../EditorRichTextEditor.vue';
import { useEditor } from '../../composables/editor';
import * as yup from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { prettifyColumnLabel, formatTimestamps } from '../../utilities';
import { refreshNuxtData } from '#app'

const componentsForFieldTypes = {
    text: { label: 'Text', component: 'UInput', props: { type: 'text' }, defaultValue: '' },
    email: { label: 'Email address', component: 'UInput', props: { type: 'email' }, defaultValue: '' },
    file: { label: 'File', component: 'UInput', props: { type: 'file' }, defaultValue: '' },
    image: { label: 'Image', component: 'UInput', props: { type: 'file' }, defaultValue: '' },
    url: { label: 'URL', component: 'UInput', props: { type: 'url' }, defaultValue: '' },
    phone: { label: 'Phone number', component: 'UInput', props: { type: 'phone' }, defaultValue: '' },
    number: { label: 'Number', component: 'UInput', props: { type: 'number' }, defaultValue: 0 },
    date: { label: 'Date', component: 'UInput', props: { type: 'date' }, defaultValue: null },
    datetime: { label: 'Date and time', component: 'UInput', props: { type: 'datetime' }, defaultValue: null },
    options: { label: 'Options', component: 'USelectMenu', props: { options: [] }, defaultValue: [] },
  switch: { label: 'Switch', component: 'UToggle', props: { type: 'text' }, defaultValue: false },
    'rich-text': { label: 'Rich text', component: 'EditorRichTextEditor', props: { rows: 10 }, defaultValue: '' },
}

const { collections, view } = await useEditor()
const currentCollection = computed(() => {
    return collections[view.current.value]
})
const isNewPost = computed(() => view.item.value === 'new')

const getItem = async () => {
  if (!isNewPost.value) {
    return $fetch(`/api/editable/${view.current.value}/${view.item.value}`)
  } else {
    return {}
  }
}

const itemData = reactive(await getItem())
const state = reactive(Object.entries(currentCollection.value.schema).reduce((acc, [key, value]) => {
    acc[key] = itemData[key] || value.default || componentsForFieldTypes[value.type].defaultValue
    return acc
}, {}))

const getSchema = (schemaObject) => {
  const yupSchema = Object.keys(schemaObject).reduce((acc, key) => {
    const field = schemaObject[key];
    const type = field.type // Get the type name and convert it to lowercase

    if (yup[type]) { // Check if yup has a corresponding method for the type
      let validator = yup[type](); // Initialize the validator

      if (field.required) {
        validator = validator.required('This field is required.');
      }

      // Here you can add more customizations based on other Mongoose field properties

      acc[key] = validator; // Add the validator to the schema
    }

    return acc;
  }, {});

  return yup.object().shape(yupSchema);
}
const schema = getSchema(currentCollection.value.schema)

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
async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log('foo')
  if (isNewPost.value) {
    await $fetch(`/api/editable/${view.current.value}`, {
      method: 'POST',
      body: event.data
    })
  } else {
    await $fetch(`/api/editable/${view.current.value}/${view.item.value}`, {
      method: 'PUT',
      body: event.data
    })
  }
  view.go(view.current.value)
  refreshNuxtData()
}

async function onDelete() {
  await $fetch(`/api/editable/${view.current.value}/${view.item.value}`, {
    method: 'DELETE'
  })
  view.go(view.current.value)
}

const showDeletionModal = ref(false)

const updatedAt = computed(() => formatTimestamps(itemData.updated_at))
const createdAt = computed(() => formatTimestamps(itemData.created_at))
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
            @click="view.go('collections')"
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
            :help="item.schema.help"
            :hint="item.label"
          >
            <UInput
              v-if="item.component === 'UInput'"
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
            <USelectMenu
              v-else-if="item.component === 'USelectMenu'"
              v-model="state[key]"
              v-bind="item.props"
              :options="[]"
              size="lg"
            />
            <EditorRichTextEditor
              v-else-if="item.component === 'EditorRichTextEditor'"
              v-model="state[key]"
              v-bind="item.props"
              size="lg"
            />
          </UFormGroup>
        </div>
        <template
          v-if="!isNewPost"
          #footer
        >
          <ul class="text-xs text-gray-500 leading-relaxed">
            <li>Item ID: {{ itemData._id }}</li>
            <li v-if="itemData.created_at">Created at: {{ createdAt }}</li>
            <li v-if="itemData.updated_at">Updated at: {{ updatedAt }}</li>
          </ul>
          <div class="flex gap-4 mt-4">
            <UButton color="white" @click="showDeletionModal = true">
              Delete
            </UButton>
          </div>
        </template>
      </UCard>
    </UForm>
    <EditorDeletionModal v-model="showDeletionModal" @delete="onDelete"/>
  </EditorSection>
</template>