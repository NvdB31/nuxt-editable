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