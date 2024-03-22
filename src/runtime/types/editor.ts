import type { EditableCollectionKey, EditableUser } from ".";

export enum EditableChangeEventType {
  Create = 'create',
  Update = 'update',
  Delete = 'delete'
}


export interface EditableChangeEventPayload {
  collection: string;
  data: any;
}

export interface EditableChangeEvent {
  type: EditableChangeEventType
  payload: EditableChangeEventPayload
}

export type EditableViewType = 'collections' | 'signup' | 'login' | 'error' | 'not-found'
export type EditableView = {
  view: EditableViewType
  collection?: EditableCollectionKey
  item?: string
}


export type EditableViewChangeEvent = EditableView

export type EditableLoginEvent = {
  email: string
  password: string
}

export type EditableSignupEvent = {
  email: string
  password: string
}

export type EditableRequestDataEvent = {
  collection: EditableCollectionKey
  search?: string
}

export type EditableEditorEvents = {
  /**
     * An event that is fired when an item in the editor is updated.
     * You should use this event to create, update or delete the items in your database.
     * @example { type: 'create', payload: { collection: 'posts', item: { title: 'Hello World' } } }
   */
  change: [payload: EditableChangeEvent]

  /**
   * An event that is fired when the view in the editor is changed
   * @example { view: 'posts' } – Fetch all posts
   * @example { view: 'post', id: '123' } – Fetch a single post
   */
  viewChange: [payload: EditableViewChangeEvent]

  /**
   * An event that is fired when the editor requests data.
   * You should use this to load up the data from your database and return it to the editor via the data prop.
   */
  requestData: [payload: EditableRequestDataEvent]

  /**
   * An event that is fired when the editor is collapsed
   */
  collapse: [value: boolean]

  /**
   * An event that is fired when the editor is logged into
   */
  login: [payload: EditableLoginEvent]

  /**
   * An event that is fired when the editor is logged out
   */
  logout: []

  /**
   * An event that is fired when the editor is signed up
   */
  signup: [payload: EditableSignupEvent]
}

/**
 * A map with the current data the editor has access to, with the key being your collection, and items as values conforming to the scheme of that collection
 * @example { 
 *    posts: [{ id: '123', title: 'Hello World' }, ...],
 * }
 */
export type EditableData = {
    [key: EditableCollectionKey]: EditableItem[];
}

export interface EditableItem {
    id: string;
    [key: string]: any;
}

export interface EditableLogEvent {
  severity: 'info' | 'warn' | 'error';
  message: string;
  context?: any;
}

export interface EditableEditorProps {
    /**
     * Tells the editor that items are currently being loaded
     */
    pending: boolean;

    user: EditableUser;

    data: EditableData;

}