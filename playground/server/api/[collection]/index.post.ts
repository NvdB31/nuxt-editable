import mongoose from 'mongoose';
import models from '../../models'

export default defineEventHandler( async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    const collectionKey = getRouterParam(event, 'collection')
    const model = models[collectionKey]
    try {
        const item = new model(body)
        return item.save()
    } catch (error) {
        console.log('error', error);
    }
})