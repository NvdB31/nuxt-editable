export default defineEventHandler(async () => {
    return $fetch('https://dummyjson.com/products/categories')
});