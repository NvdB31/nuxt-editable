import type { EditableCollectionKey } from '~/src/types'
import models from '../../models'

export default defineEventHandler( async (event) => {
    const collectionKey: EditableCollectionKey | undefined = getRouterParam(event, 'collection')
    const model = models[collectionKey]

    const { query: rawQuery, options: rawOptions } = getQuery(event)
    const query = rawQuery ? JSON.parse(rawQuery) : {}
    const options = rawOptions ? JSON.parse(rawOptions) : {}

    try {
        return model.find(query, null, options)
    } catch (error) {
        console.log('error', error);
    }
})