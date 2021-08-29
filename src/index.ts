
import { readonly } from 'core-decorators';
import addEvent from 'js-cool/lib/addEvent'
import removeEvent from 'js-cool/lib/removeEvent'
import uuid from 'js-cool/lib/uuid'

// export interface Content {
//     actionName?: string
// }

// export interface PostMessageEvent {
//     data: {
//         type?: string
//         content: {
//             actionName?: string
//         }
//     }
// }

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
class PostMessager {
    messager: {
        [type: string]: any
    } = {}
    @readonly
    uuid: string = uuid()
    instance: {
        [type: string]: any
    }
    type
    constructor(instance: object = {}, type: string = 'invokeCustomEvent') {
        this.instance = instance
        this.type = type
        // 创建message监听
        if (typeof (window as any) === 'undefined') {
            console.error('仅支持在浏览器端运行')
            return
        }
        addEvent((window as any), 'message', this.createEventHandler.bind(this))
    }
    // 订阅消息
    subscribe(actionName: string, handler: any): void {
        if ('actionName' in this.messager) console.warn('订阅方法名重复，已覆盖旧的订阅')
        this.messager[actionName] = handler
    }
    // 取消订阅
    unsubscribe(action: string): void {
        delete this.messager[action]
    }
    // 创建message监听
    createEventHandler({ data }: any): boolean | void {
        try {
            data && typeof data === 'string' && (data = JSON.parse(data))
        } catch {
            console.warn('不是标准的JSON对象')
        }
        let { type, content = {} } = data
        // 优先读取content下面的actionName
        if (this.type && 'actionName' in content) type = content.actionName
        if (!type || !Object.keys(this.messager).includes(type)) return false
        // 执行方法
        if (type in this.messager) this.messager[type](content)
        else if (type in this.instance) this.instance[type](content)
        else console.warn('没有注册type的执行方法')
    }
    // 移除message监听
    removeEventHandler(): void {
        removeEvent(window, 'message', this.createEventHandler)
    }
    // 向上发送message
    postMessageUp(actionName: string, content: any = {}, pageId: string): void {
        let type = actionName
        if (this.type) {
            content.actionName = actionName
            type = this.type
        }
        (window as any) !== (parent as any).window &&
            (parent as any).window.postMessage(
                JSON.stringify({
                    type,
                    content,
                    pageId,
                    uuid: this.uuid
                }),
                '*'
            )
    }
    // 向下发送message
    postMessageDown(name: string | null, actionName: string, content: any, pageId: string): void {
        let type = actionName
        if (this.type) {
            content.actionName = actionName
            type = this.type
        }
        if (name) {
            (window as any).frames[name].postMessage(
                JSON.stringify({
                    type,
                    content,
                    pageId,
                    uuid: this.uuid
                }),
                '*'
            )
        } else {
            for (let i = 0; i < (window as any).frames.length; i++) {
                (window as any).frames[i].postMessage(
                    JSON.stringify({
                        type,
                        content,
                        pageId,
                        uuid: this.uuid
                    }),
                    '*'
                )
            }
        }
    }
}

export default PostMessager
