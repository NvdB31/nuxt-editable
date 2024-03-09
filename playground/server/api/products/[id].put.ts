export default defineEventHandler( async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event)
    
    return $fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
})