export declare const useEditor: () => {
    toggle: () => boolean;
    isCollapsed: any;
    isEnabled: any;
    toast: {
        add: (message: any) => void;
        remove: (id: number) => void;
        messages: any;
    };
    view: {
        current: any;
        go: (view: EditableView) => void;
    };
    collections: any;
    ui: any;
    log: (event: EditableLogEvent) => void;
};
