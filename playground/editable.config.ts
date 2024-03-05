import type { EditableConfig, EditableCollection, EditableCollectionSchema } from '../src/types'

export default <EditableConfig>{
  collections: {
    posts: {
      name: {
        singular: 'Post',
        plural: 'Posts'
      },
      icon: 'i-heroicons-newspaper',
      schema: {
        title: {
          type: 'text',
          help: 'A title for the post',
          required: true
        },
        slug: {
          type: 'text',
          help: 'A URL-friendly slug for the post page',
          required: true
        },
        excerpt: {
          type: 'text',
          help: 'A short excerpt of the post'
        },
        content: {
          type: 'rich-text',
          help: 'The content of the post'
        }
      } as EditableCollectionSchema // Add type assertion here
    } as EditableCollection // Add type assertion here
  },
  
  log: true
}
