import { EditableCollectionSchemaFieldType, type EditableConfig } from "../src/types";

const config: EditableConfig = {
  collections: {
    featureFlags: {
      name: {
        singular: 'Feature Flag',
        plural: 'Feature Flags'
      },
      icon: 'i-heroicons-flag',
      schema: {
        name: {
          type: EditableCollectionSchemaFieldType.Text,
          help: 'A name for the feature flag',
          required: true
        },
        key: {
          type: EditableCollectionSchemaFieldType.Text,
          help: 'A unique key for the feature flag',
          required: true
        },
        environment: {
          type: EditableCollectionSchemaFieldType.Options,
          help: 'The environment the feature flag is for',
          options: [
            { value: 'development', label: 'Development' },
            { value: 'staging', label: 'Staging' },
            { value: 'production', label: 'Production' }
          ]
        },
        rules: {
          type: EditableCollectionSchemaFieldType.Options,
          options: {
            collection: 'featureFlagRules',
            labelField: 'name',
            valueField: '_id'
          },
          help: 'All the rules for the feature flag'
        },
        enabled: {
          type: EditableCollectionSchemaFieldType.Switch,
          help: 'Whether the feature flag is active or not'
        }
      }
    },
    featureFlagRules: {
        name: {
          singular: 'Rule',
          plural: 'Rules'
      },
      icon: 'i-heroicons-adjustments-horizontal',
      schema: {
        name: {
          type: EditableCollectionSchemaFieldType.Text,
          help: 'A descriptive name for the rule',
          required: true
        },
        key: {
          type: EditableCollectionSchemaFieldType.Options,
          help: 'A unique key for the rule',
          options: [
            { value: 'title', label: 'Title' },
            { value: 'mid', label: 'Mid' },
            { value: 'date', label: 'Date' }
          ],
          required: true
        },
        operator: {
          type: EditableCollectionSchemaFieldType.Options,
          options: [
            { value: 'eq', label: 'Equal to' },
            { value: 'ne', label: 'Not equal to' },
            { value: 'gt', label: 'Greater than' },
            { value: 'lt', label: 'Less than' },
            { value: 'gte', label: 'Greater than or equal to' },
            { value: 'lte', label: 'Less than or equal to' },
            { value: 'contains', label: 'Contains' },
            { value: 'notContains', label: 'Does not contain' }
          ],
        },
        value: {
          type: EditableCollectionSchemaFieldType.Text,
          help: 'The value to compare'
        }
      },
      
    },
    posts: {
      name: {
        singular: 'Post',
        plural: 'Posts'
      },
      icon: 'i-heroicons-newspaper',
      schema: {
        title: {
          type: EditableCollectionSchemaFieldType.Text,
          help: 'A title for the post',
          required: true
        },
        slug: {
          type: EditableCollectionSchemaFieldType.Text,
          help: 'A URL-friendly slug for the post page',
          required: true
        },
        excerpt: {
          type: EditableCollectionSchemaFieldType.Text,
          help: 'A short excerpt of the post'
        },
        content: {
          type: EditableCollectionSchemaFieldType.RichText,
          help: 'The content of the post'
        }
      }
    },
  },

  log: true
};

export default config;
