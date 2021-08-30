import 'core-js/modules/es.function.bind.js';
import 'core-js/modules/es.array.includes.js';
import 'core-js/modules/es.string.includes.js';
import 'core-js/modules/es.object.keys.js';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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

var PostMessager = /*#__PURE__*/function () {
  function PostMessager() {
    var instance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'invokeCustomEvent';

    _classCallCheck(this, PostMessager);

    this.messager = {};
    this.instance = instance;
    this.type = type; // 创建message监听

    if (typeof window === 'undefined') {
      console.error('仅支持在浏览器端运行');
      return;
    }

    addEvent_1(window, 'message', this.createEventHandler.bind(this));
  } // 订阅消息


  _createClass(PostMessager, [{
    key: "subscribe",
    value: function subscribe(actionName, handler) {
      if ('actionName' in this.messager) console.warn('订阅方法名重复，已覆盖旧的订阅');
      this.messager[actionName] = handler;
    } // 取消订阅

  }, {
    key: "unsubscribe",
    value: function unsubscribe(action) {
      delete this.messager[action];
    } // 创建message监听

  }, {
    key: "createEventHandler",
    value: function createEventHandler(_ref) {
      var data = _ref.data;

      try {
        data && typeof data === 'string' && (data = JSON.parse(data));
      } catch (_a) {
        console.warn('不是标准的JSON对象');
      }

      var _data = data,
          type = _data.type,
          _data$content = _data.content,
          content = _data$content === void 0 ? {} : _data$content; // 优先读取content下面的actionName

      if (this.type && 'actionName' in content) type = content.actionName;
      if (!type || !Object.keys(this.messager).includes(type)) return false; // 执行方法

      if (type in this.messager) this.messager[type](content);else if (type in this.instance) this.instance[type](content);else console.warn('没有注册type的执行方法');
    } // 移除message监听

  }, {
    key: "removeEventHandler",
    value: function removeEventHandler() {
      removeEvent_1(window, 'message', this.createEventHandler);
    } // 向上发送message

  }, {
    key: "postMessageUp",
    value: function postMessageUp(actionName) {
      var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var pageId = arguments.length > 2 ? arguments[2] : undefined;
      var type = actionName;

      if (this.type) {
        content.actionName = actionName;
        type = this.type;
      }
      window !== parent.window && parent.window.postMessage(JSON.stringify({
        type: type,
        content: content,
        pageId: pageId
      }), '*');
    } // 向下发送message

  }, {
    key: "postMessageDown",
    value: function postMessageDown(name, actionName, content, pageId) {
      var type = actionName;

      if (this.type) {
        content.actionName = actionName;
        type = this.type;
      }

      if (name) {
        window.frames[name].postMessage(JSON.stringify({
          type: type,
          content: content,
          pageId: pageId
        }), '*');
      } else {
        for (var i = 0; i < window.frames.length; i++) {
          window.frames[i].postMessage(JSON.stringify({
            type: type,
            content: content,
            pageId: pageId
          }), '*');
        }
      }
    }
  }]);

  return PostMessager;
}();

export { PostMessager as default };
