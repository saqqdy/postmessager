'use strict';

require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');
require('core-js/modules/es.date.to-string.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/es.regexp.to-string.js');
require('core-js/modules/es.array.iterator.js');
require('core-js/modules/es.array-buffer.slice.js');
require('core-js/modules/es.typed-array.uint8-array.js');
require('core-js/modules/es.typed-array.copy-within.js');
require('core-js/modules/es.typed-array.every.js');
require('core-js/modules/es.typed-array.fill.js');
require('core-js/modules/es.typed-array.filter.js');
require('core-js/modules/es.typed-array.find.js');
require('core-js/modules/es.typed-array.find-index.js');
require('core-js/modules/es.typed-array.for-each.js');
require('core-js/modules/es.typed-array.includes.js');
require('core-js/modules/es.typed-array.index-of.js');
require('core-js/modules/es.typed-array.iterator.js');
require('core-js/modules/es.typed-array.join.js');
require('core-js/modules/es.typed-array.last-index-of.js');
require('core-js/modules/es.typed-array.map.js');
require('core-js/modules/es.typed-array.reduce.js');
require('core-js/modules/es.typed-array.reduce-right.js');
require('core-js/modules/es.typed-array.reverse.js');
require('core-js/modules/es.typed-array.set.js');
require('core-js/modules/es.typed-array.slice.js');
require('core-js/modules/es.typed-array.some.js');
require('core-js/modules/es.typed-array.sort.js');
require('core-js/modules/es.typed-array.subarray.js');
require('core-js/modules/es.typed-array.to-locale-string.js');
require('core-js/modules/es.typed-array.to-string.js');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var defineProperty = Object.defineProperty;


function handleDescriptor$1(target, key, descriptor) {
  var configurable = descriptor.configurable,
      enumerable = descriptor.enumerable,
      initializer = descriptor.initializer,
      value = descriptor.value;

  return {
    configurable: configurable,
    enumerable: enumerable,

    get: function get() {
      // This happens if someone accesses the
      // property directly on the prototype
      if (this === target) {
        return;
      }

      var ret = initializer ? initializer.call(this) : value;

      defineProperty(this, key, {
        configurable: configurable,
        enumerable: enumerable,
        writable: true,
        value: ret
      });

      return ret;
    },


    set: createDefaultSetter(key)
  };
}

function lazyInitialize() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return decorate(handleDescriptor$1, args);
}

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }


function isDescriptor(desc) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  var keys = ['value', 'initializer', 'get', 'set'];

  for (var i = 0, l = keys.length; i < l; i++) {
    if (desc.hasOwnProperty(keys[i])) {
      return true;
    }
  }

  return false;
}

function decorate(handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor.apply(undefined, _toConsumableArray(entryArgs).concat([[]]));
  } else {
    return function () {
      return handleDescriptor.apply(undefined, _toConsumableArray(Array.prototype.slice.call(arguments)).concat([entryArgs]));
    };
  }
}

(_class = function Meta() {
  _classCallCheck$1(this, Meta);

  _initDefineProp(this, 'debounceTimeoutIds', _descriptor, this);

  _initDefineProp(this, 'throttleTimeoutIds', _descriptor2, this);

  _initDefineProp(this, 'throttlePreviousTimestamps', _descriptor3, this);

  _initDefineProp(this, 'throttleTrailingArgs', _descriptor4, this);

  _initDefineProp(this, 'profileLastRan', _descriptor5, this);
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'debounceTimeoutIds', [lazyInitialize], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'throttleTimeoutIds', [lazyInitialize], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'throttlePreviousTimestamps', [lazyInitialize], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'throttleTrailingArgs', [lazyInitialize], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'profileLastRan', [lazyInitialize], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class);

function createDefaultSetter(key) {
  return function set(newValue) {
    Object.defineProperty(this, key, {
      configurable: true,
      writable: true,
      // IS enumerable when reassigned by the outside word
      enumerable: true,
      value: newValue
    });

    return newValue;
  };
}

function bind(fn, context) {
  if (fn.bind) {
    return fn.bind(context);
  } else {
    return function __autobind__() {
      return fn.apply(context, arguments);
    };
  }
}

var warn = function () {
  if ((typeof console === 'undefined' ? 'undefined' : _typeof$1(console)) !== 'object' || !console || typeof console.warn !== 'function') {
    return function () {};
  } else {
    return bind(console.warn, console);
  }
}();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GENERIC_FUNCTION_ERROR = '{child} does not properly override {parent}';
var FUNCTION_REGEXP = /^function ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?(\([^\)]*\))[\s\S]+$/;

(function () {
  _createClass(SyntaxErrorReporter, [{
    key: '_getTopic',
    value: function _getTopic(descriptor) {
      if (descriptor === undefined) {
        return null;
      }

      if ('value' in descriptor) {
        return descriptor.value;
      }

      if ('get' in descriptor) {
        return descriptor.get;
      }

      if ('set' in descriptor) {
        return descriptor.set;
      }
    }
  }, {
    key: '_extractTopicSignature',
    value: function _extractTopicSignature(topic) {
      switch (typeof topic === 'undefined' ? 'undefined' : _typeof(topic)) {
        case 'function':
          return this._extractFunctionSignature(topic);
        default:
          return this.key;
      }
    }
  }, {
    key: '_extractFunctionSignature',
    value: function _extractFunctionSignature(fn) {
      var _this = this;

      return fn.toString().replace(FUNCTION_REGEXP, function (match) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.key;
        var params = arguments[2];
        return name + params;
      });
    }
  }, {
    key: 'key',
    get: function get() {
      return this.childDescriptor.key;
    }
  }, {
    key: 'parentNotation',
    get: function get() {
      return this.parentKlass.constructor.name + '#' + this.parentPropertySignature;
    }
  }, {
    key: 'childNotation',
    get: function get() {
      return this.childKlass.constructor.name + '#' + this.childPropertySignature;
    }
  }, {
    key: 'parentTopic',
    get: function get() {
      return this._getTopic(this.parentDescriptor);
    }
  }, {
    key: 'childTopic',
    get: function get() {
      return this._getTopic(this.childDescriptor);
    }
  }, {
    key: 'parentPropertySignature',
    get: function get() {
      return this._extractTopicSignature(this.parentTopic);
    }
  }, {
    key: 'childPropertySignature',
    get: function get() {
      return this._extractTopicSignature(this.childTopic);
    }
  }]);

  function SyntaxErrorReporter(parentKlass, childKlass, parentDescriptor, childDescriptor) {
    _classCallCheck(this, SyntaxErrorReporter);

    this.parentKlass = parentKlass;
    this.childKlass = childKlass;
    this.parentDescriptor = parentDescriptor;
    this.childDescriptor = childDescriptor;
  }

  _createClass(SyntaxErrorReporter, [{
    key: 'assert',
    value: function assert(condition) {
      var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (condition !== true) {
        this.error(GENERIC_FUNCTION_ERROR + msg);
      }
    }
  }, {
    key: 'error',
    value: function error(msg) {
      var _this2 = this;

      msg = msg
      // Replace lazily, because they actually might not
      // be available in all cases
      .replace('{parent}', function (m) {
        return _this2.parentNotation;
      }).replace('{child}', function (m) {
        return _this2.childNotation;
      });
      throw new SyntaxError(msg);
    }
  }]);

  return SyntaxErrorReporter;
})();

function handleDescriptor(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

function readonly() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return decorate(handleDescriptor, args);
}

var labels = {};

// Exported for mocking in tests
({
  time: console.time ? console.time.bind(console) : function (label) {
    labels[label] = new Date();
  },
  timeEnd: console.timeEnd ? console.timeEnd.bind(console) : function (label) {
    var timeNow = new Date();
    var timeTaken = timeNow - labels[label];
    delete labels[label];
    console.log(label + ': ' + timeTaken + 'ms');
  }
});

// Exported for mocking in tests
({
  profile: console.profile ? bind(console.profile, console) : function () {},
  profileEnd: console.profileEnd ? bind(console.profileEnd, console) : function () {},
  warn: warn
});

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

/**
 * 浏览器端生成uuid，采用v4方法
 *
 * @example
 * ```js
 * uuid(); // '4222fcfe-5721-4632-bede-6043885be57d'
 * ```
 * @returns uuid
 */
// @ts-ignore
var uuid = function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};

var uuid_1 = uuid;

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
        this.uuid = uuid_1();
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
                pageId,
                uuid: this.uuid
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
                pageId,
                uuid: this.uuid
            }), '*');
        }
        else {
            for (let i = 0; i < window.frames.length; i++) {
                window.frames[i].postMessage(JSON.stringify({
                    type,
                    content,
                    pageId,
                    uuid: this.uuid
                }), '*');
            }
        }
    }
}
__decorate([
    readonly,
    __metadata("design:type", String)
], PostMessager.prototype, "uuid", void 0);

module.exports = PostMessager;
