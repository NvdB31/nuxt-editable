<script setup lang="ts">
import type { EditableCollectionSchemaField } from '../../types'
import { defineProps, computed } from 'vue'


const props = defineProps<{
    data: any;
    componentProps: any;
    field: EditableCollectionSchemaField
}>()
const model = defineModel<any>();

const fieldOptions = computed(() => {
    if (Array.isArray(props.field.options)) {
        return props.field.options
    } else if (typeof props.field.options?.collection === 'string') {
        // Assume a collection reference was given
        return props.data[props.field.options.collection]?.map(item => {
            return {
                value: props.field.options.valueField ? item[props.field.options.valueField] : item,
                label: item[props.field.options.labelField] || item.name || item.id || item
            }
        
        })
    } else {
        return []
    }
})

const selectedLabels = computed(() => {
  return fieldOptions.value?.filter(option => model.value.includes(option.value)).map(option => option.label)
})

const isCollectionOptionsField = computed(() => props.field.options.collection)
const options = computed(() => {
  return props.field.options.collection ? props.data[props.field.options.collection] : props.field.options
})

</script>

<template>
  <USelectMenu
    v-model="model"
    v-bind="componentProps"
    :options="options"
    multiple
    :value-attribute="isCollectionOptionsField ? props.field.options.valueField : 'value'"
    :option-attribute="isCollectionOptionsField ? props.field.options.labelField : 'label'"
    :by="isCollectionOptionsField ? props.field.options.keyField || 'id' : undefined"
    clear-search-on-close
    size="lg"
  >
    <template #label>
      <template v-if="selectedLabels?.length">
        <UBadge
          v-for="label in selectedLabels"
          :key="label"
          color="gray"
          variant="solid"
        >
          {{ label }}
        </UBadge>
      </template>
      <span v-else>Select items</span>
    </template>
  </USelectMenu>
</template>