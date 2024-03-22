<script setup lang="ts">
import { type EditableChangeEvent, EditableChangeEventType, type EditableRequestDataEvent } from '../src/runtime/types'

const currentEditorUser = computed(() => ({ id: 0, name: 'John Doe' }))
const currentEditorData = ref({
    posts: []
})
const isPendingEditorData = ref(false)

// Handle data requests by fetching the data from your server
const onEditorRequestData = async (event: EditableRequestDataEvent) => {
  isPendingEditorData.value = true
  currentEditorData.value[event.collection] = await $fetch(`/api/${event.collection}`, {
    params: {
      search: event.search,
    }
  })
  isPendingEditorData.value = false
}

// Handle data changes by sending the new data to your server
const onEditorChangeData = async (event: EditableChangeEvent) => {
  const { type, payload } = event
  isPendingEditorData.value = true

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
  isPendingEditorData.value = false
  refreshNuxtData()
}
</script>

<template>
  <NuxtEditableWelcome />
  <NuxtEditableEditor :user="currentEditorUser" :data="currentEditorData" :pending="isPendingEditorData"
    @change="onEditorChangeData" @request-data="onEditorRequestData">
  </NuxtEditableEditor>
</template>