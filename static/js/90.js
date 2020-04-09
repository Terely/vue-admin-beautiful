/*!
 * byui前端敏捷开发平台 : vue-admin-beautiful
 *  copyright:1204505056@qq.com 
 *  author: chuzhixin <1204505056@qq.com> 
 *  participants: liyanna,songmeiyu,lizhenguo
 *  time: 2020-4-9 21:4:20
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[90],{

/***/ "./src/utils/clipboard.js":
/*!********************************!*\
  !*** ./src/utils/clipboard.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return handleClipboard; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/_vue@2.6.11@vue/dist/vue.esm.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clipboard */ "./node_modules/_clipboard@2.0.6@clipboard/dist/clipboard.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_1__);



function clipboardSuccess() {
  vue__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.baseMessage("复制成功", "success");
}

function clipboardError() {
  vue__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.baseMessage("复制失败", "error");
}
/**
 * @description 复制数据
 * @param text
 * @param event
 */


function handleClipboard(_text, event) {
  var clipboard = new clipboard__WEBPACK_IMPORTED_MODULE_1___default.a(event.target, {
    text: function text() {
      return _text;
    }
  });
  clipboard.on("success", function () {
    clipboardSuccess();
    clipboard.destroy();
  });
  clipboard.on("error", function () {
    clipboardError();
    clipboard.destroy();
  });
  clipboard.onClick(event);
}

/***/ })

}]);
//# sourceMappingURL=90.js.map