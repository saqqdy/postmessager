'use strict';

var _rollupPluginBabelHelpers = require('./_virtual/_rollupPluginBabelHelpers.js');
require('core-js/modules/es.function.bind.js');
require('core-js/modules/es.array.includes.js');
require('core-js/modules/es.string.includes.js');
require('core-js/modules/es.object.keys.js');
var addEvent = require('js-cool/lib/addEvent');
var removeEvent = require('js-cool/lib/removeEvent');
var uuid = require('js-cool/lib/uuid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var addEvent__default = /*#__PURE__*/_interopDefaultLegacy(addEvent);
var removeEvent__default = /*#__PURE__*/_interopDefaultLegacy(removeEvent);
var uuid__default = /*#__PURE__*/_interopDefaultLegacy(uuid);

var PostMessager = /*#__PURE__*/function () {
  function PostMessager(instance, type) {
    if (instance === void 0) {
      instance = {};
    }

    if (type === void 0) {
      type = 'invokeCustomEvent';
    }

    this.messager = {};
    this.instance = instance;
    this.type = type;
    this.uuid = uuid__default['default'](); // 创建message监听

    if (typeof window === 'undefined') {
      console.error('仅支持在浏览器端运行');
      return;
    }

    addEvent__default['default'](window, 'message', this.createEventHandler.bind(this), false);
  } // 订阅消息


  var _proto = PostMessager.prototype;

  _proto.subscribe = function subscribe(actionName, handler) {
    if ('actionName' in this.messager) console.warn('订阅方法名重复，已覆盖旧的订阅');
    this.messager[actionName] = handler;
  } // 取消订阅
  ;

  _proto.unsubscribe = function unsubscribe(action) {
    delete this.messager[action];
  } // 创建message监听
  ;

  _proto.createEventHandler = function createEventHandler(_ref) {
    var data = _ref.data;

    try {
      data && (data = JSON.parse(data));
    } catch (e) {
      console.error('不是标准的JSON对象');
    }

    var _data = data,
        type = _data.type,
        _data$content = _data.content,
        content = _data$content === void 0 ? {} : _data$content; // 优先读取content下面的actionName

    if (this.type && 'actionName' in content) content.actionName, _rollupPluginBabelHelpers.readOnlyError("type");
    if (!type || !Object.keys(this.messager).includes(type)) return false; // 执行方法

    if (type in this.messager) this.messager[type](content);else if (type in this.instance) this.instance[type](content);else console.warn('没有注册type的执行方法');
  } // 移除message监听
  ;

  _proto.removeEventHandler = function removeEventHandler() {
    removeEvent__default['default'](window, 'message', this.createEventHandler, false);
  } // 向上发送message
  ;

  _proto.postMessageUp = function postMessageUp(actionName, content, pageId) {
    if (content === void 0) {
      content = {};
    }

    var type = actionName;

    if (this.type) {
      content.actionName = actionName;
      type = this.type;
    }

    window !== parent.window && parent.window.postMessage(JSON.stringify({
      type: type,
      content: content,
      pageId: pageId,
      uuid: this.uuid
    }), '*');
  } // 向上发送message
  // postMessageUp(data) {
  //     window !== parent.window && parent.window.postMessage(data, '*')
  // }
  // 向下发送message
  ;

  _proto.postMessageDown = function postMessageDown(name, actionName, content, pageId) {
    var type = actionName;

    if (this.type) {
      content.actionName = actionName;
      type = this.type;
    }

    if (name) {
      window.frames[name].postMessage(JSON.stringify({
        type: type,
        content: {},
        pageId: pageId,
        uuid: this.uuid
      }), '*');
    } else {
      for (var i = 0; i < window.frames.length; i++) {
        window.frames[i].postMessage(JSON.stringify({
          type: type,
          content: content,
          pageId: pageId,
          uuid: this.uuid
        }), '*');
      }
    }
  } // 向下发送message data={pageName,pageID,type,content}
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
  ;

  return PostMessager;
}();

module.exports = PostMessager;
