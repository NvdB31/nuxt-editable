import { useFetch } from '#imports'

/**
 * Use a collection of items
 */
export const useCollection = (collection: string, query: any, options?: any, fetchOptions?: any) => {
    return useFetch(`/api/editable/${collection}`, {
        ...fetchOptions || {},
        query: {
            query: JSON.stringify(query),
            options: JSON.stringify(options),
        }
    })
}

/**
 * Use an item from a collection by id
 */
export const useItem = (collection: string, id: string, options?: any) => {
    return useFetch(`/api/editable/${collection}/${id}`, options)
}