import { type EditableCollectionSchema } from '../types/collections'

/**
 * Emits an event to request data for a given schema field if it is of type options and if it refers to a collection
 */
export const requestDataForSchemaFields = async (schema: EditableCollectionSchema, emit: any) => {
    Object.values(schema).forEach(async (field) => {
        if (field.type === 'options' && field.options?.collection) {
            emit('requestData', { collection: field.options.collection })
        }
    })
}

/**
 * Static information needed to render the field types
 */
export const componentsForFieldTypes = {
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