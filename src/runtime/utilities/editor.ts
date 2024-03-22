import type { EditableCollectionsConfig, EditableUIConfig } from "../types";
import { uiDefaults } from "../types";

// For evert collection, merge the collection-specific UI config with the global UI config
export const resolveUIConfig = (collections: EditableCollectionsConfig, uiConfig: EditableUIConfig) => {
    const newConfig = {
        ...uiDefaults
    }
    
    Object.entries(collections).forEach(([key, collection]) => {
        newConfig.collections[key] = {
            search: true,
            create: true,
            delete: true,
            update: true,
            ...uiConfig.collections[key]
        }
    })
    return newConfig
}