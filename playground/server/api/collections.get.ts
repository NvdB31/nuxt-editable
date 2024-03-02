import type { EditableCollectionsConfig } from "~/src/types"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const collections: EditableCollectionsConfig = config.editable.collections
    return collections
})