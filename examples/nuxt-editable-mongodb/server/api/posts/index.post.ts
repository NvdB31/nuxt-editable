import models from '../../models'

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const model = models.posts

    const item = new model(body)
    return item.save()
})