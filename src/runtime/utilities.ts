import { EditableCollectionSchemaFieldType, type EditableCollectionSchema, type EditableCollection, type EditableCollectionKey } from '../types/collections'
/**
 * Convert schema types to string equivalent for usage in Vue environments
 */
export const convertSchemaTypes = (schemaObject: EditableCollectionSchema) => {
  
    const convertedSchema = {};
  
    Object.keys(schemaObject).forEach(key => {
      const field = schemaObject[key];
      // Check if the type is in the mapping
      if (field.type && EditableCollectionSchemaFieldType[field.type]) {
        // Convert to the string equivalent
        convertedSchema[key] = { ...field, type: EditableCollectionSchemaFieldType[field.type] };
      } else {
        // Copy as is if no conversion is needed
        convertedSchema[key] = field;
      }
    });
    return convertedSchema;
  }

// Convert the schema types to string equivalent by reducing and calling the conversion function
export const convertCollectionsToStringSchemas = (collections: EditableCollection[]) => {
    return Object.entries(collections).reduce((acc, [key, collection]: [EditableCollectionKey, EditableCollection]) => {
        acc[key] = collection
        acc[key].schema = convertSchemaTypes(collection.schema);
        return acc;
    }, {});
}
  
export const prettifyColumnLabel = (str: string) => {
  // Replace all occurrences of '-' and '_' with spaces
  let result = str.replace(/[-_]+/g, ' ');

  // Uppercase the first character of the first word
  result = result.charAt(0).toUpperCase() + result.slice(1);

  return result;
}

export const formatTimestamps = (timestamps: any) => {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(timestamps))
}