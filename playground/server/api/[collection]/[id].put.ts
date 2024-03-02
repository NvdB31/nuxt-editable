import mongoose from 'mongoose';
import models from '../../models'

export default defineEventHandler( async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event)
    
    const collectionKey = getRouterParam(event, 'collection')
    const model = models[collectionKey]
    try {
        return model.updateOne({ _id: new mongoose.Types.ObjectId(id) }, body);
    } catch (error) {
        console.log('error', error);
    }
})