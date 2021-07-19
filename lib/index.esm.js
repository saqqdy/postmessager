import 'core-js/modules/es.function.bind.js';
import 'core-js/modules/es.array.includes.js';
import 'core-js/modules/es.string.includes.js';
import 'core-js/modules/es.object.keys.js';
import addEvent from 'js-cool/lib/addEvent';
import removeEvent from 'js-cool/lib/removeEvent';

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

    addEvent(window, 'message', this.createEventHandler.bind(this), false);
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
    var content = _ref.content;
    var type = content.type;

    if (!type || !Object.keys(this.messager).includes(type)) {
      return false;
    }

    if (type in this.messager) this.messager[type](content);else if (type in this.instance) this.instance[type](content);else console.warn('没有注册type的执行方法');
  } // 移除message监听
  ;

  _proto.removeEventHandler = function removeEventHandler() {
    removeEvent(window, 'message', this.createEventHandler, false);
  } // 向上发送message
  ;

  _proto.postMessageUp = function postMessageUp(type, content) {
    window !== parent.window && parent.window.postMessage({
      type: type,
      content: content
    }, '*');
  } // 向下发送message
  ;

  _proto.postMessageDown = function postMessageDown(name, type, content) {
    if (name) {
      window.frames[name].postMessage({
        type: type,
        content: content
      }, '*');
    } else {
      for (var i = 0; i < window.frames.length; i++) {
        window.frames[i].postMessage({
          type: type,
          content: content
        }, '*');
      }
    }
  };

  return PostMessager;
}();

export default PostMessager;
