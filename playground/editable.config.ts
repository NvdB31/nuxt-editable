import { EditableCollectionSchemaFieldType, type EditableConfig } from "../src/runtime/types";

const config: EditableConfig = {
  collections: {
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
    products: {
      name: {
        singular: 'Product',
        plural: 'Products'
      },
      icon: 'i-heroicons-shopping-bag',
      schema: {
        title: {
          type: EditableCollectionSchemaFieldType.Text,
          help: 'A title for the product',
          required: true
        },
        description: {
          type: EditableCollectionSchemaFieldType.Text,
          help: 'A description of the product'
        },
        discountPercentage: {
          type: EditableCollectionSchemaFieldType.Number,
          help: 'The discount percentage of the product'
        },
        price: {
          type: EditableCollectionSchemaFieldType.Number,
          help: 'The price of the product',
          required: true
        },
        image: {
          type: EditableCollectionSchemaFieldType.Image,
          help: 'An image of the product'
        },
        stock: {
          type: EditableCollectionSchemaFieldType.Number,
          help: 'The stock of the product',
          required: true
        },
        category: {
          type: EditableCollectionSchemaFieldType.Options,
          help: 'The category of the product',
          options: {
            source: 'categories'
          }
        },
        rating: {
          type: EditableCollectionSchemaFieldType.Number,
          help: 'The rating of the product',
          min: 1,
          max: 5
        },
        brand: {
          type: EditableCollectionSchemaFieldType.Text,
          help: 'The brand of the product'
        }
      }
    }
  },

  log: true
};

export default config;
