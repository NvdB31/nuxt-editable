import mongoose from 'mongoose'
import { type EditableCollectionSchema, type EditableCollectionKey, type EditableCollection } from '../../src/types/collections'

const defaultSchemaAttributes = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}

enum SchemaFieldType {
    text = 'string',
    'multiline-text' = 'string',
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
 * Convert schema types to string equivalent for usage in Vue environments
 */
export const convertSchemaTypes = (schemaObject: EditableCollectionSchema) => {
  
    const convertedSchema = {};
  
    Object.keys(schemaObject).forEach(key => {
      const field = schemaObject[key];
      // Check if the type is in the mapping
      if (field.type && SchemaFieldType[field.type]) {
        // Convert to the string equivalent
        convertedSchema[key] = { ...field, type: SchemaFieldType[field.type] };
      } else {
        // Copy as is if no conversion is needed
        convertedSchema[key] = { ...field };
      }
    });
    return convertedSchema;
  }


const config = useRuntimeConfig()
const models = Object.entries(config.editable.collections).reduce((acc, [key, collection]: [EditableCollectionKey, EditableCollection]) => {

    const schema = convertSchemaTypes(collection.schema)
    acc[key] = mongoose.model(key, new mongoose.Schema(schema, defaultSchemaAttributes))
    return acc
}, {})
export default models