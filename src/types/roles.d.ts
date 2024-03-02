import { EditableCollectionSchemaFieldKey } from './collections';

export type EditableRoleKey = string;

export type EditableRole = {
    label: string;
    description: string;
};

export type EditableRolesConfig = {
    [key: EditableCollectionSchemaFieldKey]: EditableRole
};