export const convertCollectionsToStringSchemas = (collections) => {
  return Object.entries(collections).reduce((acc, [key, collection]) => {
    acc[key] = collection;
    acc[key].schema = convertSchemaTypes(collection.schema);
    return acc;
  }, {});
};
export const prettifyColumnLabel = (str) => {
  let result = str.replace(/[-_]+/g, " ");
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
};
export const formatTimestamps = (timestamps) => {
  if (!timestamps)
    return "";
  return new Intl.DateTimeFormat(void 0, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }).format(new Date(timestamps));
};
