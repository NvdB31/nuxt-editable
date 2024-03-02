import { EditableUIConfig, EditableDatabaseConfig, EditableCollectionConfig } from './'

export interface EditableConfig {
    database: EditableDatabaseConfig;
    collections: EditableCollectionConfig;
    ui: EditableUIConfig;
}

export interface EditableModuleOptions extends ModuleOptions {
    config: {
        configPath: string;
    }
}