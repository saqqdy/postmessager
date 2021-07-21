'use strict';

require('core-js/modules/es.function.bind.js');
require('core-js/modules/es.array.includes.js');
require('core-js/modules/es.string.includes.js');
require('core-js/modules/es.object.keys.js');
var addEvent = require('js-cool/lib/addEvent');
var removeEvent = require('js-cool/lib/removeEvent');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var addEvent__default = /*#__PURE__*/_interopDefaultLegacy(addEvent);
var removeEvent__default = /*#__PURE__*/_interopDefaultLegacy(removeEvent);

var PostMessager = /*#__PURE__*/function () {
  function PostMessager(instance) {
    if (instance === void 0) {
      instance = {};
    }

    this.messager = {};
    this.instance = instance; // 创建message监听

    if (typeof window === 'undefined') {
      console.error('仅支持在浏览器端运行');
      return;
    }

    addEvent__default['default'](window, 'message', this.createEventHandler.bind(this), false);
  } // 订阅消息


  var _proto = PostMessager.prototype;

  _proto.subscribe = function subscribe(action, handler) {
    this.messager[action] = handler;
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
        content = _data.content;

    if (!type || !Object.keys(this.messager).includes(type)) {
      return false;
    }

    if (type in this.messager) this.messager[type](content);else if (type in this.instance) this.instance[type](content);else console.warn('没有注册type的执行方法');
  } // 移除message监听
  ;

  _proto.removeEventHandler = function removeEventHandler() {
    removeEvent__default['default'](window, 'message', this.createEventHandler, false);
  } // 向上发送message
  ;

  _proto.postMessageUp = function postMessageUp(type, content, pageId) {
    window !== parent.window && parent.window.postMessage({
      type: type,
      content: content,
      pageId: pageId
    }, '*');
  } // 向上发送message
  // postMessageUp(data) {
  //     window !== parent.window && parent.window.postMessage(data, '*')
  // }
  // 向下发送message
  ;

  _proto.postMessageDown = function postMessageDown(name, type, content, pageId) {
    if (name) {
      window.frames[name].postMessage({
        type: type,
        content: content,
        pageId: pageId
      }, '*');
    } else {
      for (var i = 0; i < window.frames.length; i++) {
        window.frames[i].postMessage({
          type: type,
          content: content,
          pageId: pageId
        }, '*');
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
