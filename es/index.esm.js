/*!
 * postmessager v1.1.2
 * postmessage集成方案
 * (c) 2021-2021 saqqdy 
 * Released under the MIT License.
 */
// export interface CustomEvent extends Event {
//     returnValue: boolean
//     cancelBubble: boolean
// }

/**
 * addEvent()事件委托，支持多次委托
 *
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
function addEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    //为每一个事件处理函数分派一个唯一的ID
    if (!handler.$$guid) handler.$$guid = addEvent.guid++; //为元素的事件类型创建一个哈希表

    if (!element.events) element.events = {}; //为每一个"元素/事件"对创建一个事件处理程序的哈希表

    var handlers = element.events[type];

    if (!handlers) {
      handlers = element.events[type] = {}; //存储存在的事件处理函数(如果有)

      if (element['on' + type]) {
        handlers[0] = element['on' + type];
      }
    } //将事件处理函数存入哈希表


    handlers[handler.$$guid] = handler; //指派一个全局的事件处理函数来做所有的工作

    element['on' + type] = handleEvent;
  }
} // a counter used to create unique IDs


addEvent.guid = 1;
/**
 * handleEvent()执行事件
 *
 * @private
 * @param event - 事件类型
 * @returns returnValue
 */

function handleEvent(event) {
  var returnValue = true; //抓获事件对象(IE使用全局事件对象)
  // @ts-ignore

  event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event); // 取得事件处理函数的哈希表的引用
  // @ts-ignore

  var handlers = this.events[event.type]; //执行每一个处理函数

  for (var i in handlers) {
    this.$$handleEvent = handlers[i]; // @ts-ignore

    if (this.$$handleEvent(event) === false) {
      returnValue = false;
    }
  }

  return returnValue;
}
/**
 * 为IE的事件对象添加一些“缺失的”函数
 *
 * @private
 * @param event - 事件类型
 * @returns event 返回补齐了缺失方法的的event
 */


function fixEvent(event) {
  //添加标准的W3C方法
  event.preventDefault = fixEvent.preventDefault;
  event.stopPropagation = fixEvent.stopPropagation;
  return event;
}

fixEvent.preventDefault = function () {
  this.returnValue = false;
};

fixEvent.stopPropagation = function () {
  this.cancelBubble = true;
};

var addEvent_1 = addEvent;

/**
 * removeEvent移除由addEvent创建的事件委托
 *
 * @param element - js dom对象
 * @param type - 事件类型。不需要加on
 * @param handler - 回调方法
 */
function removeEvent(element, type, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler, false);
  } else {
    //从哈希表中删除事件处理函数
    if (element.events && element.events[type]) {
      delete element.events[type][handler.$$guid];
    }
  }
}

var removeEvent_1 = removeEvent;

// import { readonly } from 'core-decorators'
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
    constructor(instance = {}, type = 'invokeCustomEvent') {
        this.messager = {};
        this.instance = instance;
        this.type = type;
        // 创建message监听
        if (typeof window === 'undefined') {
            console.error('仅支持在浏览器端运行');
            return;
        }
        addEvent_1(window, 'message', this.createEventHandler.bind(this));
    }
    // 订阅消息
    subscribe(actionName, handler) {
        if ('actionName' in this.messager)
            console.warn('订阅方法名重复，已覆盖旧的订阅');
        this.messager[actionName] = handler;
    }
    // 取消订阅
    unsubscribe(action) {
        delete this.messager[action];
    }
    // 创建message监听
    createEventHandler({ data }) {
        try {
            data && typeof data === 'string' && (data = JSON.parse(data));
        }
        catch (_a) {
            console.warn('不是标准的JSON对象');
        }
        let { type, content = {} } = data;
        // 优先读取content下面的actionName
        if (this.type && 'actionName' in content)
            type = content.actionName;
        if (!type || !Object.keys(this.messager).includes(type))
            return false;
        // 执行方法
        if (type in this.messager)
            this.messager[type](content);
        else if (type in this.instance)
            this.instance[type](content);
        else
            console.warn('没有注册type的执行方法');
    }
    // 移除message监听
    removeEventHandler() {
        removeEvent_1(window, 'message', this.createEventHandler);
    }
    // 向上发送message
    postMessageUp(actionName, content = {}, pageId) {
        let type = actionName;
        if (this.type) {
            content.actionName = actionName;
            type = this.type;
        }
        window !== parent.window &&
            parent.window.postMessage(JSON.stringify({
                type,
                content,
                pageId
            }), '*');
    }
    // 向下发送message
    postMessageDown(name, actionName, content, pageId) {
        let type = actionName;
        if (this.type) {
            content.actionName = actionName;
            type = this.type;
        }
        if (name) {
            window.frames[name].postMessage(JSON.stringify({
                type,
                content,
                pageId
            }), '*');
        }
        else {
            for (let i = 0; i < window.frames.length; i++) {
                window.frames[i].postMessage(JSON.stringify({
                    type,
                    content,
                    pageId
                }), '*');
            }
        }
    }
}

export { PostMessager as default };
