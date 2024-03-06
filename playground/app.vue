<script setup lang="ts">
import { type EditableChangeEvent, EditableChangeEventType, type EditableRequestDataEvent } from '../src/runtime/types'

// Your currently logged in user
const currentEditorUser = computed(() => ({ id: 0, name: 'John Doe' }))

// Your currently edited data
const currentEditorData = ref({
    posts: []
})

const isPendingEditorData = ref(false)

// Handle data requests by fetching the data from your server
const onEditorRequestData = async (event: EditableRequestDataEvent) => {
  currentEditorData.value[event.collection] = await $fetch(`/api/${event.collection}`)
}

// Handle data changes by sending the new data to your server
const onEditorDataChange = async (event: EditableChangeEvent) => {
  const { type, payload } = event

  switch (type) {
    case EditableChangeEventType.Create:
      $fetch(`/api/${payload.collection}`, {
        method: 'POST',
        body: payload.data
      })
      break

    case EditableChangeEventType.Update:
      await $fetch(`/api/${payload.collection}/${payload.data._id}`, {
        method: 'PUT',
        body: payload.data
      })
      break

    case EditableChangeEventType.Delete:
      if (payload.data.length) {
        await $fetch(`/api/${payload.collection}`, {
          method: 'DELETE',
          body: { ids: payload.data.map(i => i._id) }
        })
      } else {
        await $fetch(`/api/${payload.collection}/${payload.data._id}`, {
          method: 'DELETE'
        })
      }
      break
  }

  refreshNuxtData()
}
</script>

<template>
  <NuxtEditableWelcome />
  <NuxtEditableEditor
    :user="currentEditorUser"
    :data="currentEditorData"
    :pending="isPendingEditorData"
    @change="onEditorDataChange"
    @request-data="onEditorRequestData"
  />
</template>../src/runtime/types