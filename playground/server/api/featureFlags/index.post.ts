import models from '../../models'

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const model = models.featureFlags

    const item = new model(body)
    return item.save()
})