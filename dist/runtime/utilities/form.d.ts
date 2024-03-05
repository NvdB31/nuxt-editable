import { type EditableCollectionSchema } from '../../types/collections';
/**
 * Emits an event to request data for a given schema field if it is of type options and if it refers to a collection
 */
export declare const requestDataForSchemaFields: (schema: EditableCollectionSchema, emit: any) => Promise<void>;
