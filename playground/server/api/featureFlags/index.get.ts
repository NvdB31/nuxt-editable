import models from '../../models'

export default defineEventHandler( async () => {
    const model = models.featureFlags
    return model.find();
})