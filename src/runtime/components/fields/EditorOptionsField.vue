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
                value: item[props.field.options.valueField] || item.id || item._id,
                label: item[props.field.options.labelField] || item
            }
        
        })
    } else {
        return []
    }
})

const canHaveMultipleOptions = computed(() => {
  return props.field.min > 1 || props.field.moreThan === 1 || props.field.length > 1 || true
})

const selectedLabels = computed(() => {
    return fieldOptions.value?.filter(option => model.value.includes(option.value)).map(option => option.label)
})

</script>

<template>
  <USelectMenu
    v-model="model"
    v-bind="componentProps"
    :options="fieldOptions"
    :multiple="canHaveMultipleOptions"
    value-attribute="value"
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
</template>~/src/runtime/types