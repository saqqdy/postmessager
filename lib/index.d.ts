/**
 * postmessage集成方案
 *
 * @example
 * ```js
 * let messager = new PostMessager();
 * messager.subscribe('action', (content) => { console.log(21, content); });
 * messager.postMessageUp('action', { up: 201 });
 * ```
 */
declare class PostMessager {
    messager: {
        [type: string]: any;
    };
    uuid: string;
    instance: {
        [type: string]: any;
    };
    type: string;
    constructor(instance?: object, type?: string);
    subscribe(actionName: string, handler: any): void;
    unsubscribe(action: string): void;
    createEventHandler({ data }: any): boolean | void;
    removeEventHandler(): void;
    postMessageUp(actionName: string, content: any, pageId: string): void;
    postMessageDown(name: string | null, actionName: string, content: any, pageId: string): void;
}
export default PostMessager;

export { }
