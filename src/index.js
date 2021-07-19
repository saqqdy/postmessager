/**
 * @description postmessager
 * @example let messager = new PostMessager(); messager.subscribe('action', (data) => { console.log(21, data); }); messager.postMessageUp('action', { up: 201 });
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
    createEventHandler({ data }) {
        const { event } = data
        if (!event || !Object.keys(this.messager).includes(event)) {
            return false
        }
        if (event in this.messager) this.messager[event](data)
        else if (event in this.instance) this.instance[event](data)
        else console.warn('没有注册event的执行方法')
    }
    // 移除message监听
    removeEventHandler() {
        removeEvent(window, 'message', this.createEventHandler, false)
    }
    // 向上发送message
    postMessageUp(event, data) {
        window !== parent.window &&
            parent.window.postMessage(
                {
                    event,
                    data
                },
                '*'
            )
    }
    // 向下发送message
    postMessageDown(name, event, data) {
        if (name) {
            window.frames[name].postMessage(
                {
                    event,
                    data
                },
                '*'
            )
        } else {
            for (let i = 0; i < window.frames.length; i++) {
                window.frames[i].postMessage(
                    {
                        event,
                        data
                    },
                    '*'
                )
            }
        }
    }
}

export default PostMessager
