/*!
 * byui前端敏捷开发平台 : vue-admin-beautiful
 *  copyright:1204505056@qq.com 
 *  author: chuzhixin <1204505056@qq.com> 
 *  participants: liyanna,songmeiyu,lizhenguo
 *  time: 2020-4-9 21:4:20
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[72],{

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

/***/ "./src/views/byui/codeGenerator/components/snippetTable.js":
/*!*****************************************************************!*\
  !*** ./src/views/byui/codeGenerator/components/snippetTable.js ***!
  \*****************************************************************/
/*! exports provided: genTableSnippet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genTableSnippet", function() { return genTableSnippet; });
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/_core-js@3.6.4@core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _snippetTableColumn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snippetTableColumn */ "./src/views/byui/codeGenerator/components/snippetTableColumn.js");


var genTableSnippet = function genTableSnippet() {
  var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "getList";
  return "<template>\n  <div class=\"\u6539\u6210\u4F60\u7684\u7EC4\u4EF6\u540D-container\">\n    <byui-query-form>\n      <byui-query-form-left-panel :span=\"12\">\n        <el-button icon=\"el-icon-plus\" type=\"primary\">\u6DFB\u52A0</el-button>\n        <el-button icon=\"el-icon-edit\" type=\"warning\">\u4FEE\u6539</el-button>\n        <el-button\n          icon=\"el-icon-delete\"\n          type=\"danger\"\n          @click=\"handleDelete\"\n        >\u6279\u91CF\u5220\u9664\n        </el-button\n        >\n      </byui-query-form-left-panel>\n      <byui-query-form-right-panel :span=\"12\">\n        <el-form :inline=\"true\" :model=\"queryForm\">\n          <el-form-item>\n            <el-input\n              v-model.trim=\"queryForm.".concat(headers[0].key, "\"\n              placeholder=\"\u8BF7\u8F93\u5165\u67E5\u8BE2\u6761\u4EF6\"\n              clearable\n            />\n          </el-form-item>\n          <el-form-item>\n            <el-button\n              native-type=\"submit\"\n              icon=\"el-icon-search\"\n              type=\"primary\"\n              @click=\"queryData\"\n            >\u67E5\u8BE2\n            </el-button\n            >\n          </el-form-item>\n        </el-form>\n      </byui-query-form-right-panel>\n    </byui-query-form>\n\n    <el-table\n      v-loading=\"listLoading\"\n      :height=\"height\"\n      :data=\"list\"\n      :element-loading-text=\"elementLoadingText\"\n      @selection-change=\"setSelectRows\"\n    >\n      <el-table-column type=\"selection\"></el-table-column>\n      ").concat(Object(_snippetTableColumn__WEBPACK_IMPORTED_MODULE_1__["genTableColumnSnippet"])(headers), "\n      <el-table-column label=\"\u64CD\u4F5C\" width=\"150\" fixed=\"right\">\n        <template v-slot=\"scope\">\n          <el-button type=\"text\" @click=\"editList(scope.row)\"\n          >\u7F16\u8F91\n          </el-button\n          >\n          <el-button type=\"text\" @click=\"tableDelete(scope.row)\"\n          >\u5220\u9664\n          </el-button\n          >\n        </template>\n      </el-table-column>\n    </el-table>\n    <el-pagination\n      :background=\"background\"\n      :current-page=\"queryForm.pageNo\"\n      :page-size=\"queryForm.pageSize\"\n      :layout=\"layout\"\n      :total=\"total\"\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n    ></el-pagination>\n  </div>\n</template>\n\n<script>\n\n  import { getList } from \"@/api/table\";\n\n  export default {\n    name: \"\u4F60\u7684view\u540D\u79F0\u4E0E\u6587\u4EF6\u5939\u540D\u79F0\u76F8\u540C\u4E0D\u8981\u5FD8\u4E86\u9996\u5B57\u6BCD\u5927\u5199,\u4E14\u552F\u4E00\",\n    data() {\n      return {\n        list: null,\n        listLoading: true,\n        layout: \"total, sizes, prev, pager, next, jumper\",\n        total: 0,\n        background: true,\n        height: 0,\n        selectRows: \"\",\n        elementLoadingText: \"\u6B63\u5728\u52A0\u8F7D...\",\n        queryForm: {\n          pageNo: 1,\n          pageSize: 10\n      ").concat(headers[0].key, "\n    :\n      \"\",\n    }\n    }\n      ;\n    },\n    created() {\n      this.fetchData();\n      this.height = this.baseTableHeight(1);\n    },\n    methods: {\n      setSelectRows(val) {\n        this.selectRows = val;\n      },\n      editList(row) {\n      },\n      handleDelete() {\n        if (this.selectRows.length > 0) {\n          const ids = this.selectRows.map(item => item.id).join();\n          this.baseConfirm(\n            \"\u4F60\u786E\u5B9A\u8981\u5220\u9664\u9009\u4E2D\u9879\u5417\",\n            null,\n            () => {\n              alert(ids);\n            },\n            () => {\n              alert(\"\u70B9\u51FB\u4E86\u53D6\u6D88\");\n            },\n          );\n        } else {\n          this.baseMessage(\"\u672A\u9009\u4E2D\u4EFB\u4F55\u884C\", \"error\");\n          return false;\n        }\n      },\n      tableDelete(row) {\n        alert(row.id);\n      },\n      handleSizeChange(val) {\n        this.queryForm.pageSize = val;\n        this.fetchData();\n      },\n      handleCurrentChange(val) {\n        this.queryForm.pageNo = val;\n        this.fetchData();\n      },\n      queryData() {\n        this.queryForm.pageNo = 1;\n        this.fetchData();\n      },\n      fetchData() {\n        this.listLoading = true;\n        getList(this.queryForm).then(res => {\n          this.list = res.data;\n          this.total = res.totalCount;\n          setTimeout(_ => {\n            this.listLoading = false;\n          }, 300);\n        });\n      },\n    },\n  };\n</script>\n<style lang=\"scss\" scoped></style>\n");
};

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
//# sourceMappingURL=72.js.map