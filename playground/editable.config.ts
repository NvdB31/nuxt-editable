import type { EditableConfig } from '../src/types/module'

export default <EditableConfig>{
  collections: {
    work: {
      name: {
        singular: 'Client',
        plural: 'Clients'
      },
      icon: 'i-heroicons-document-text',
      schema: {
        name: {
          type: 'text',
          help: 'The name of the client'
        },
        role: {
          type: 'text',
          help: 'The role at the client'
        },
        start_date: {
          type: 'date',
          help: 'The start date of the project'
        },
        end_date: {
          type: 'date',
          help: 'The end date of the project'
        },
      },
    },
    projects: {
      name: {
        singular: 'Project',
        plural: 'Projects'
      },
      icon: 'i-heroicons-document-text',
      schema: {
        title: {
          type: 'text',
          help: 'A title for the project'
        },
        description: {
          type: 'text',
          help: 'A description of the project'
        },
        client: {
          type: 'text',
          help: 'The client for the project'
        },
      }
    },
      posts: {
        name: {
          singular: 'Post',
          plural: 'Posts'
        },
        icon: 'i-heroicons-document-text',
        schema: {
          title: {
            type: 'text',
            help: 'A title for the post'
          },
          author: {
            type: 'text',
            help: 'The author of the post'
          },
          reading_time: {
            type: 'number',
            help: 'The time it takes to read the post in minutes'
          },
          attachmend: {
            type: 'file'
          },
          read_more: {
            type: 'url',
            help: 'A link to the full post'
          },
          content: {
            type: 'rich-text',
            help: 'The content of the post'
          }
        }
      },
    }
  }