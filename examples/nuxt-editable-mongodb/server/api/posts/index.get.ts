import models from '../../models'

export default defineEventHandler( async () => {
    const model = models.posts
    return model.find();
})