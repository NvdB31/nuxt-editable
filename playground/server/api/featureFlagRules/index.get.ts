import models from '../../models'

export default defineEventHandler( async () => {
    const model = models.featureFlagRules
    return model.find();
})