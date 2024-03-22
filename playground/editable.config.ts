import { EditableCollectionSchemaFieldType, type EditableConfig } from "../src/runtime/types";

const config: EditableConfig = {
  ui: {
    collections: {
      products: {
        search: false
      }
    }
  },

  collections: {
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
        stock: {
          type: EditableCollectionSchemaFieldType.Number,
          help: 'The stock of the product',
          required: true
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
