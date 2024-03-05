    /**
     * The current user of the editor.
     * The user is used to determine if the editor is in a signed-in state, as well as to display the user's name and avatar in the UI
     */
export interface EditableUser {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
}