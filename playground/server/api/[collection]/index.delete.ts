import mongoose from 'mongoose';
import models from '../../models'

export default defineEventHandler(async (event) => {
    const { ids } = await readBody(event)

    const collectionKey = getRouterParam(event, 'collection')
    const model = models[collectionKey]
    try {
        return model.deleteMany({ _id: { $in: ids.map(id => new mongoose.Types.ObjectId(id)) } });
    } catch (error) {
        console.log('error', error);
    }
})