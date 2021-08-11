/**
 * @description postmessager
 * @example let messager = new PostMessager(); messager.subscribe('action', (content) => { console.log(21, content); }); messager.postMessageUp('action', { up: 201 });
 */
import addEvent from 'js-cool/lib/addEvent'
import removeEvent from 'js-cool/lib/removeEvent'
import uuid from 'js-cool/lib/uuid'

class PostMessager {
    constructor(instance = {}, type = 'invokeCustomEvent') {
        this.messager = {}
        this.instance = instance
        this.type = type
        this.uuid = uuid()
        // 创建message监听
        if (typeof window === 'undefined') {
            console.error('仅支持在浏览器端运行')
            return
        }
        addEvent(window, 'message', this.createEventHandler.bind(this), false)
    }
    // 订阅消息
    subscribe(actionName, handler) {
        if ('actionName' in this.messager) console.warn('订阅方法名重复，已覆盖旧的订阅')
        this.messager[actionName] = handler
    }
    // 取消订阅
    unsubscribe(action) {
        delete this.messager[action]
    }
    // 创建message监听
    createEventHandler({ data }) {
        try {
            data && (data = JSON.parse(data))
        } catch (e) {
            console.error('不是标准的JSON对象')
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
    removeEventHandler() {
        removeEvent(window, 'message', this.createEventHandler, false)
    }
    // 向上发送message
    postMessageUp(actionName, content = {}, pageId) {
        let type = actionName
        if (this.type) {
            content.actionName = actionName
            type = this.type
        }
        window !== parent.window &&
            parent.window.postMessage(
                JSON.stringify({
                    type,
                    content,
                    pageId,
                    uuid: this.uuid
                }),
                '*'
            )
    }
    // 向上发送message
    // postMessageUp(data) {
    //     window !== parent.window && parent.window.postMessage(data, '*')
    // }
    // 向下发送message
    postMessageDown(name, actionName, content, pageId) {
        let type = actionName
        if (this.type) {
            content.actionName = actionName
            type = this.type
        }
        if (name) {
            window.frames[name].postMessage(
                JSON.stringify({
                    type,
                    content: {},
                    pageId,
                    uuid: this.uuid
                }),
                '*'
            )
        } else {
            for (let i = 0; i < window.frames.length; i++) {
                window.frames[i].postMessage(
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
    // 向下发送message data={pageName,pageID,type,content}
    // postMessageDown(data) {
    //     if (data.pageID) {
    //         // id不要直接写在iframe上
    //         document.getElementById(data.pageID).querySelector('iframe').postMessage(data, '*')
    //     } else if (data.pageName) {
    //         window.frames[data.pageName].postMessage(data, '*')
    //     } else {
    //         for (let i = 0; i < window.frames.length; i++) {
    //             window.frames[i].postMessage(data, '*')
    //         }
    //     }
    // }
}

export default PostMessager
