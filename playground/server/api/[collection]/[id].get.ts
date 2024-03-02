import mongoose from 'mongoose';
import models from '../../models'

export default defineEventHandler( async (event) => {
    const id = getRouterParam(event, 'id');
    
    const collectionKey = getRouterParam(event, 'collection')
    const model = models[collectionKey]
    try {
        return model.findOne({ _id: new mongoose.Types.ObjectId(id) });
    } catch (error) {
        console.log('error', error);
    }
})