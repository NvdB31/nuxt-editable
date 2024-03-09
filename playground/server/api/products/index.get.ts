export default defineEventHandler( async (e) => {
    const { search, limit, skip } = getQuery(e);
    const query = {
        q: search,
        limit,
        skip
    }

    if ( search) {
        const data = await $fetch(`https://dummyjson.com/products/search`, { query })
        return data.products
    } else {
        const data = await $fetch('https://dummyjson.com/products', { query })
        return data.products
    }
    
})