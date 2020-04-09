/*!
 * byui前端敏捷开发平台 : vue-admin-beautiful
 *  copyright:1204505056@qq.com 
 *  author: chuzhixin <1204505056@qq.com> 
 *  participants: liyanna,songmeiyu,lizhenguo
 *  time: 2020-4-9 21:4:20
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[89],{

/***/ "./src/utils/auth.js":
/*!***************************!*\
  !*** ./src/utils/auth.js ***!
  \***************************/
/*! exports provided: getToken, setToken, removeToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getToken", function() { return getToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToken", function() { return setToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeToken", function() { return removeToken; });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/settings */ "./src/settings.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_settings__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ "./node_modules/_js-cookie@2.2.1@js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_1__);


/**
 * @description 获取token
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */

function getToken() {
  if (_settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
    if ("localStorage" === _settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
      return localStorage.getItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"]);
    } else if ("sessionStorage" === _settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
      return sessionStorage.getItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"]);
    } else if ("cookie" === _settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
      return js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.get(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"]);
    } else {
      return localStorage.getItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"]);
    }
  } else {
    return localStorage.getItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"]);
  }
}
/**
 * @description 存储token
 * @param accessToken
 * @returns {void|*}
 */

function setToken(accessToken) {
  if (_settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
    if ("localStorage" === _settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
      return localStorage.setItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"], accessToken);
    } else if ("sessionStorage" === _settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
      return sessionStorage.setItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"], accessToken);
    } else if ("cookie" === _settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
      return js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.set(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"], accessToken);
    } else {
      return localStorage.setItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"], accessToken);
    }
  } else {
    return localStorage.setItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"], accessToken);
  }
}
/**
 * @description 移除token
 * @returns {void|Promise<void>}
 */

function removeToken() {
  if (_settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
    if ("localStorage" === _settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
      return localStorage.removeItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"]);
    } else if ("sessionStorage" === _settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
      return sessionStorage.clear();
    } else if ("cookie" === _settings__WEBPACK_IMPORTED_MODULE_0__["storage"]) {
      return js_cookie__WEBPACK_IMPORTED_MODULE_1___default.a.remove(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"]);
    } else {
      return localStorage.removeItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"]);
    }
  } else {
    return localStorage.removeItem(_settings__WEBPACK_IMPORTED_MODULE_0__["tokenTableName"]);
  }
}

/***/ })

}]);
//# sourceMappingURL=89.js.map