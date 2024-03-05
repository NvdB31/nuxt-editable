/**
 * A type for a field in the schema.
 */
export enum EditableCollectionSchemaFieldType {
    text = 'text',
    'multiline-text' = 'multiline-text',
    number = 'number',
    image = 'image',
    file = 'file',
    url = 'url',
    date = 'date',
    datetime = 'datetime',
    options = 'options',
    switch = 'switch',
    email = 'email',
    phone = 'phone',
    'rich-text' = 'rich-text',
    password = 'password'
}

export interface EditableCollectionSchemaFieldValidator {
    required: true | false,
    length: number,
    lessThan: number,
    moreThan: number,
    positive: true | false,
    negative: true | false,
    min: number | Date,
    max: number | Date,
    matches: RegExp,
    email: true | false,
    url: true | false,
    phone: true | false,
    datetime: true | false,
    date: true | false,
    lowercase: true | false,
    uppercase: true | false,
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

export type EditableCollectionSchemaFieldOption = {
    value: string,
    label: string
}

export type EditableCollectionSchemaFieldOptionsSource = {
    collection: EditableCollectionKey

    // A field in the collection to use as the label for the options
    labelField: string

    // A field in the collection to use as the value for the options
    valueField: string
}

export interface BaseEditableCollectionSchemaField {
    type: EditableCollectionSchemaFieldType;
    help?: EditableCollectionSchemaFieldHelp;
    options?: EditableCollectionSchemaFieldOptionsSource | EditableCollectionSchemaFieldOption[];
}


export type EditableCollectionSchemaField = BaseEditableCollectionSchemaField & {
    [key: string]: EditableCollectionSchemaFieldValidator
};

/**
 * A schema for a collection.
 */
export interface EditableCollectionSchema {
    [key: EditableCollectionSchemaFieldKey]: EditableCollectionSchemaField
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

}

export type EditableCollectionKey = string;
export interface EditableCollectionsConfig {
    [key: EditableCollectionKey]: EditableCollection
}