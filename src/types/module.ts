import type { EditableUIConfig, EditableCollectionsConfig } from '.'

export interface EditableConfig {
    collections: EditableCollectionsConfig;
    ui?: EditableUIConfig;
    log?: 'info' | 'warn' | 'error' | boolean;
}

export interface EditableModuleOptions {
    configPath: string;
}