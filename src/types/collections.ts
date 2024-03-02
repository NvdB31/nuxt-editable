import type { EditableRoleKey } from './roles';

/**
 * A type for a field in the schema.
 */
export enum EditableCollectionSchemaFieldType {
    text = 'string',
    number = 'number',
    richText = 'string',
    image = 'string',
    file = 'string',
    url = 'string',
    date = 'date',
    datetime = 'date',
    options = 'array',
    switch = 'boolean',
    email = 'string',
    phone = 'string',
    'rich-text' = 'string',
    password = 'string'
}

/**
 * A help message for a field in the schema.
 * @example 'A title for the post' for the title field
 */
export type EditableCollectionSchemaFieldHelp = string;

/**
 * A key for a field in the schema.
 * @example 'title', 'author', 'content'
 */
export type EditableCollectionSchemaFieldKey = string;

/**
 * A schema for a collection.
 */
export interface EditableCollectionSchema {
    [key: EditableCollectionSchemaFieldKey]: {
        type: EditableCollectionSchemaFieldType,
        help?: EditableCollectionSchemaFieldHelp,
        required: boolean
    }
}

/**
 * A configuration for the permissions for a given collection.
 * 
 */
export interface EditableCollectionPermissions {
        [key: EditableRoleKey]: {
            create: boolean,
            read: boolean,
            update: boolean,
            delete: boolean
        }
    }

export interface EditableCollection {
    /**
     * Define the name of the collection.
     * @example { singular: 'Post', plural: 'Posts'}
     */
    name: {
        singular: string,
        plural: string
    },

    /**
     * A description of the collection to show in the UI.
     */
    description?: string;
    
    /**
     * Define an icon to be used in the UI.
     * @see: https://ui.nuxt.com/components/icon
     */
    icon?: string;

    /**
     * Define if the collection is a single item. This will change the UI to be a single item view.
     * @default false
     */
    single?: boolean;

    /**
     * Define the schema for the collection.
     */
    schema: EditableCollectionSchema;

    // permissions?: EditableCollectionPermissions;

}

export type EditableCollectionKey = string;
export interface EditableCollectionsConfig {
    [key: EditableCollectionKey]: EditableCollection
}