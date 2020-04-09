/*!
 * byui前端敏捷开发平台 : vue-admin-beautiful
 *  copyright:1204505056@qq.com 
 *  author: chuzhixin <1204505056@qq.com> 
 *  participants: liyanna,songmeiyu,lizhenguo
 *  time: 2020-4-9 21:4:20
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[92],{

/***/ "./src/utils/simulationRequest.js":
/*!****************************************!*\
  !*** ./src/utils/simulationRequest.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.includes */ "./node_modules/_core-js@3.6.4@core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/_core-js@3.6.4@core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.includes */ "./node_modules/_core-js@3.6.4@core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/_axios@0.19.2@axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/settings */ "./src/settings.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_settings__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! element-ui */ "./node_modules/_element-ui@2.13.0@element-ui/lib/element-ui.common.js");
/* harmony import */ var element_ui__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(element_ui__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/store */ "./src/store/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! qs */ "./node_modules/_qs@6.9.3@qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/router */ "./src/router/index.js");









var service = axios__WEBPACK_IMPORTED_MODULE_3___default.a.create({
  baseURL: "/",
  timeout: _settings__WEBPACK_IMPORTED_MODULE_4__["requestTimeout"],
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  }
});
var loadingInstance;
service.interceptors.request.use(function (config) {
  if (_store__WEBPACK_IMPORTED_MODULE_6__["default"].getters.accessToken) {
    config.headers[_settings__WEBPACK_IMPORTED_MODULE_4__["tokenName"]] = _store__WEBPACK_IMPORTED_MODULE_6__["default"].getters.accessToken;
  } //RSA加密不走qs转义,默认传json给后端


  if (config.data && !config.data.param) {
    config.data = qs__WEBPACK_IMPORTED_MODULE_7___default.a.stringify(config.data);
  }

  if (config.url.includes("add") || config.url.includes("edit") || config.url.includes("update") || config.url.includes("import") || config.url.includes("export")) {
    loadingInstance = element_ui__WEBPACK_IMPORTED_MODULE_5__["Loading"].service();
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

var errorMsg = function errorMsg(message) {
  return Object(element_ui__WEBPACK_IMPORTED_MODULE_5__["Message"])({
    message: message,
    type: "error",
    duration: _settings__WEBPACK_IMPORTED_MODULE_4__["messageDuration"]
  });
};

service.interceptors.response.use(function (response) {
  if (loadingInstance) {
    loadingInstance.close();
  }

  var status = response.status,
      data = response.data;
  var code = data.code,
      msg = data.msg;

  if (code !== _settings__WEBPACK_IMPORTED_MODULE_4__["successCode"]) {
    if (code == _settings__WEBPACK_IMPORTED_MODULE_4__["invalidCode"]) {
      errorMsg(msg || "后端接口402异常");
      _store__WEBPACK_IMPORTED_MODULE_6__["default"].dispatch("user/resetToken");
    } else if (code == _settings__WEBPACK_IMPORTED_MODULE_4__["errorCode"]) {
      errorMsg(msg || "后端接口500异常");
    } else if (code == _settings__WEBPACK_IMPORTED_MODULE_4__["noPermissionCode"]) {
      _router__WEBPACK_IMPORTED_MODULE_8__["default"].push({
        path: "/401"
      });
    } else {
      errorMsg(msg || "后端接口code异常");
    }

    return Promise.reject(new Error(msg || "Error"));
  } else {
    return data;
  }
}, function (error) {
  if (loadingInstance) {
    loadingInstance.close();
  }
  /*网络连接过程异常处理*/


  var message = error.message;

  if (message == "Network Error") {
    message = "后端接口连接异常";
  }

  if (message.includes("timeout")) {
    message = "后端接口请求超时";
  }

  if (message.includes("Request failed with status code")) {
    message = "后端接口" + message.substr(message.length - 3) + "异常";
  }

  errorMsg(message || "后端接口未知异常");
  return Promise.reject(error);
});
/* harmony default export */ __webpack_exports__["default"] = (service);

/***/ })

}]);
//# sourceMappingURL=92.js.map