
export default defineEventHandler( async (event) => {
    const id = getRouterParam(event, 'id');
    return $fetch(`https://dummyjson.com/products/${id}`)
})