export default defineEventHandler( async () => {
    const data = await $fetch('https://dummyjson.com/products/')
    return data.products
})