import { EditableCollectionSchemaFieldType, type EditableConfig } from "../../src/runtime/types";

const config: EditableConfig = {
  collections: {
    posts: {
      primaryKey: '_id',
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
