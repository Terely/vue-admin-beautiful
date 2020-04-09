/*!
 * byui前端敏捷开发平台 : vue-admin-beautiful
 *  copyright:1204505056@qq.com 
 *  author: chuzhixin <1204505056@qq.com> 
 *  participants: liyanna,songmeiyu,lizhenguo
 *  time: 2020-4-9 21:4:20
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[83],{

/***/ "./src/directive/clipboard/clipboard.js":
/*!**********************************************!*\
  !*** ./src/directive/clipboard/clipboard.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Clipboard = __webpack_require__(/*! clipboard */ "./node_modules/_clipboard@2.0.6@clipboard/dist/clipboard.js");

if (!Clipboard) {
  throw new Error("you should npm install `clipboard` --save at first ");
}

/* harmony default export */ __webpack_exports__["default"] = ({
  bind: function bind(el, binding) {
    if (binding.arg === "success") {
      el._v_clipboard_success = binding.value;
    } else if (binding.arg === "error") {
      el._v_clipboard_error = binding.value;
    } else {
      var clipboard = new Clipboard(el, {
        text: function text() {
          return binding.value;
        },
        action: function action() {
          return binding.arg === "cut" ? "cut" : "copy";
        }
      });
      clipboard.on("success", function (e) {
        var callback = el._v_clipboard_success;
        callback && callback(e);
      });
      clipboard.on("error", function (e) {
        var callback = el._v_clipboard_error;
        callback && callback(e);
      });
      el._v_clipboard = clipboard;
    }
  },
  update: function update(el, binding) {
    if (binding.arg === "success") {
      el._v_clipboard_success = binding.value;
    } else if (binding.arg === "error") {
      el._v_clipboard_error = binding.value;
    } else {
      el._v_clipboard.text = function () {
        return binding.value;
      };

      el._v_clipboard.action = function () {
        return binding.arg === "cut" ? "cut" : "copy";
      };
    }
  },
  unbind: function unbind(el, binding) {
    if (binding.arg === "success") {
      delete el._v_clipboard_success;
    } else if (binding.arg === "error") {
      delete el._v_clipboard_error;
    } else {
      el._v_clipboard.destroy();

      delete el._v_clipboard;
    }
  }
});

/***/ })

}]);
//# sourceMappingURL=83.js.map