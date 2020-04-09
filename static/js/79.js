/*!
 * byui前端敏捷开发平台 : vue-admin-beautiful
 *  copyright:1204505056@qq.com 
 *  author: chuzhixin <1204505056@qq.com> 
 *  participants: liyanna,songmeiyu,lizhenguo
 *  time: 2020-4-9 21:4:20
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[79],{

/***/ "./src/api/news.js":
/*!*************************!*\
  !*** ./src/api/news.js ***!
  \*************************/
/*! exports provided: getQdysjList, getFbzbList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQdysjList", function() { return getQdysjList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFbzbList", function() { return getFbzbList; });
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/request */ "./src/utils/request.js");

function getQdysjList(params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: "http://jskou.com:3003/contents/list?type=0",
    method: "get",
    params: params
  });
}
function getFbzbList(params) {
  return Object(_utils_request__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: "http://jskou.com:3003/contents/list?type=1",
    method: "get",
    params: params
  });
}

/***/ })

}]);
//# sourceMappingURL=79.js.map