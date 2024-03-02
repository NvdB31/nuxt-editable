import type { EditableCollectionKey, EditorUser } from ".";

export type EditableUpdateEventType = 'create' | 'update' | 'delete'

// export interface EditableUpdateEventQuery {
    
// }

export interface EditableUpdateEventPayload {
  collection: string;
  item: any;
  query: EditableUpdateEventQuery;
}

export interface EditableUpdateEvent {
  type: EditableUpdateEventType
  payload: EditableUpdateEventPayload
}

export type EditableView = EditableCollectionKey | 'signup' | 'login' | 'error'

export interface EditableViewChangeEvent {
    view: EditableView;
}

export type EditableEditorEvents = {
  /**
     * An event that is fired when an item in the editor is updated.
     * You should use this event to create, update or delete the items in your database.
     * @example { type: 'create', payload: { collection: 'posts', item: { title: 'Hello World' } } }
   */
  change: [payload: EditableUpdateEvent]

  /**
   * An event that is fired when the view in the editor is changed
   * You should use this event to load up the items for the new view
   * @example { view: 'posts' } – Fetch all posts
   * @example { view: 'post', id: '123' } – Fetch a single post
   */
  viewChange: [payload: EditableViewChangeEvent]

  /**
   * An event that is fired when the editor is collapsed
   */
  collapse: [value: boolean]
}

export interface EditableItem {
    id: string;
    [key: string]: any;
}

export interface EditableEditorProps {
    /**
     * Tells the editor that items are currently being loaded
     */
    pending: boolean;

    /**
     * The current user of the editor
     * This is used to display the user's name and avatar in the UI
     */
    user: EditableUser;

    /**
     * The current items in the editor
     */
    items: EditableItem[];

}