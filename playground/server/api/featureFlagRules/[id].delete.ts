import mongoose from 'mongoose';
import models from '../../models'

export default defineEventHandler( async (event) => {
    const id = getRouterParam(event, 'id');
    const model = models.featureFlagRules

    return model.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
})