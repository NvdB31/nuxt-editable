import type { EditableCollectionKey } from ".";

export interface EditableUIConfig {
    /**
     * Globally enables search field in the UI
     * @default false
     */
    search?: boolean;

    collections: {
        [key: EditableCollectionKey]: {
            /**
             * Enables a search field in the UI for this collection
             * @default false
             */
            search?: boolean;

            /**
             * Enables a create item button in the UI for this collection
             * @default true
             */
            create?: boolean;

            /**
             * Enables a delete item button in the UI for this collection
             * @default true
             */
            delete?: boolean;

            /**
             * Enables the user to edit an item in the UI for this collection
             * @default true
             */
            update?: boolean;
        }
    }
}