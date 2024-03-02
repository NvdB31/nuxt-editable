import mongoose from 'mongoose'
import { EditableCollectionSchemaFieldType, type EditableCollectionSchema, type EditableCollectionKey, type EditableCollection } from '../../types/collections'

const defaultSchemaAttributes = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
}

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
        convertedSchema[key] = { ...field };
      }
    });
    return convertedSchema;
  }

/**
 * Generate models from the collections defined in the module config
 */

const sessionSchema = {
			_id: {
				type: String,
				required: true
			},
			user_id: {
				type: String,
				required: true
			},
			expires_at: {
				type: Date,
				required: true
			}
	}

const config = useRuntimeConfig()
const models = Object.entries(config.editable.collections).reduce((acc, [key, collection]: [EditableCollectionKey, EditableCollection]) => {

    const schema = convertSchemaTypes(collection.schema)
    acc[key] = mongoose.model(key, new mongoose.Schema(schema, defaultSchemaAttributes))
    return acc
}, {})
models.session = mongoose.model('session', new mongoose.Schema(sessionSchema, defaultSchemaAttributes))

export default models