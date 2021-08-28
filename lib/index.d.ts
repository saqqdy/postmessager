
export declare interface Content {
    actionName?: string;
}

export declare interface Instance {
    [type: string]: any;
}

export declare interface PostMessageEvent {
    data: {
        type?: string;
        content: {
            actionName?: string;
        };
    };
}

declare interface PostMessager {
    messager: object;
    uuid: string;
    instance: Instance;
    type: string;
}

declare class PostMessager implements Instance {
    messager: object;
    uuid: string;
    constructor(instance?: object, type?: string);
    subscribe(actionName: any, handler: any): void;
    unsubscribe(action: string): void;
    createEventHandler({ data }: PostMessageEvent): boolean;
    removeEventHandler(): void;
    postMessageUp(actionName: any, content: any, pageId: any): void;
    postMessageDown(name: string, actionName: string, content: Content, pageId: string): void;
}
export default PostMessager;

export { }
