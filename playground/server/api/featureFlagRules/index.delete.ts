import mongoose from 'mongoose';
import models from '../../models'

export default defineEventHandler(async (event) => {
    const { ids } = await readBody(event)
    const model = models.featureFlagRules

    return model.deleteMany({ _id: { $in: ids.map(id => new mongoose.Types.ObjectId(id)) } });
})