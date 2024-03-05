import { EditableCollectionSchemaFieldType } from "../../types/collections";
export const requestDataForSchemaFields = async (schema, emit) => {
  Object.values(schema).forEach(async (field) => {
    if (field.type === EditableCollectionSchemaFieldType.options && field.options?.collection) {
      emit("requestData", { collection: field.options.collection });
    }
  });
};
