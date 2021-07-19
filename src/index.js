/**
 * @description postmessager
 * @example let messager = new PostMessager(); messager.subscribe('action', (content) => { console.log(21, content); }); messager.postMessageUp('action', { up: 201 });
 */
import addEvent from 'js-cool/lib/addEvent'
import removeEvent from 'js-cool/lib/removeEvent'

class PostMessager {
    constructor(instance = {}) {
        this.messager = {}
        this.instance = instance
        // 创建message监听
        if (typeof window === 'undefined') {
            console.error('仅支持在浏览器端运行')
            return
        }
        addEvent(window, 'message', this.createEventHandler.bind(this), false)
    }
    // 订阅消息
    subscribe(action, handler) {
        this.messager[action] = handler
    }
    // 取消订阅
    unsubscribe(action) {
        delete this.messager[action]
    }
    // 创建message监听
    createEventHandler({ content }) {
        const { type } = content
        if (!type || !Object.keys(this.messager).includes(type)) {
            return false
        }
        if (type in this.messager) this.messager[type](content)
        else if (type in this.instance) this.instance[type](content)
        else console.warn('没有注册type的执行方法')
    }
    // 移除message监听
    removeEventHandler() {
        removeEvent(window, 'message', this.createEventHandler, false)
    }
    // 向上发送message
    postMessageUp(type, content) {
        window !== parent.window &&
            parent.window.postMessage(
                {
                    type,
                    content
                },
                '*'
            )
    }
    // 向下发送message
    postMessageDown(name, type, content) {
        if (name) {
            window.frames[name].postMessage(
                {
                    type,
                    content
                },
                '*'
            )
        } else {
            for (let i = 0; i < window.frames.length; i++) {
                window.frames[i].postMessage(
                    {
                        type,
                        content
                    },
                    '*'
                )
            }
        }
    }
}

export default PostMessager
