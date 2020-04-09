/*!
 * byui前端敏捷开发平台 : vue-admin-beautiful
 *  copyright:1204505056@qq.com 
 *  author: chuzhixin <1204505056@qq.com> 
 *  participants: liyanna,songmeiyu,lizhenguo
 *  time: 2020-4-9 21:4:20
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[74],{

/***/ "./node_modules/_core-js@3.6.4@core-js/modules/es.array.join.js":
/*!**********************************************************************!*\
  !*** ./node_modules/_core-js@3.6.4@core-js/modules/es.array.join.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/_core-js@3.6.4@core-js/internals/export.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/_core-js@3.6.4@core-js/internals/indexed-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/_core-js@3.6.4@core-js/internals/to-indexed-object.js");
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/_core-js@3.6.4@core-js/internals/array-method-is-strict.js");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "./src/views/byui/codeGenerator/components/snippetTableColumn.js":
/*!***********************************************************************!*\
  !*** ./src/views/byui/codeGenerator/components/snippetTableColumn.js ***!
  \***********************************************************************/
/*! exports provided: genTableColumnSnippet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genTableColumnSnippet", function() { return genTableColumnSnippet; });
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/_core-js@3.6.4@core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/_core-js@3.6.4@core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.join */ "./node_modules/_core-js@3.6.4@core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/_core-js@3.6.4@core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_3__);




var timeFieldNeedHandle = {
  created_at: true,
  create_time: true,
  updated_at: true,
  update_time: true,
  start_time: true,
  end_time: true
};

var genTableColumnSnippetSimple = function genTableColumnSnippetSimple(key, label) {
  return "<el-table-column prop=\"".concat(key, "\" label=\"").concat(label, "\"/>");
};

var genTabeleColumnSinppetTemplate = function genTabeleColumnSinppetTemplate(key, label) {
  var val = "";

  if (timeFieldNeedHandle[key]) {
    val = "parseTime(row.".concat(key, ")");
  } else {
    val = "row.".concat(key);
  }

  return "<el-table-column label=\"".concat(label, "\">\n          <template v-slot={row}>\n            {{ ").concat(val, " }}\n          </template>\n        </el-table-column>");
};

var genTableColumnSnippet = function genTableColumnSnippet(headers) {
  return headers.filter(function (header) {
    return header.show;
  }).map(function (header) {
    if (timeFieldNeedHandle[header.key] || header.opt === "template") {
      return genTabeleColumnSinppetTemplate(header.key, header.label);
    } else {
      return genTableColumnSnippetSimple(header.key, header.label);
    }
  }).join("\n      ");
};

/***/ })

}]);
//# sourceMappingURL=74.js.map