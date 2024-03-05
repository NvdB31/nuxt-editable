import mongoose from 'mongoose';
import models from '../../models'

export default defineEventHandler( async (event) => {
    const id = getRouterParam(event, 'id');
    const model = models.featureFlags

    return model.findOne({ _id: new mongoose.Types.ObjectId(id) });
})