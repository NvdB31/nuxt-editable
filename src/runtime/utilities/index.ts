import { type EditableCollection, type EditableCollectionKey } from '../../types/collections'

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
  if (!timestamps) return '';
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(timestamps))
}