export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    return $fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
})