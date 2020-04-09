/*!
 * byui前端敏捷开发平台 : vue-admin-beautiful
 *  copyright:1204505056@qq.com 
 *  author: chuzhixin <1204505056@qq.com> 
 *  participants: liyanna,songmeiyu,lizhenguo
 *  time: 2020-4-9 21:4:20
 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[57],{

/***/ "./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?!./node_modules/_babel-loader@8.1.0@babel-loader/lib/index.js!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.9.1@vue-loader/lib/index.js?!./src/views/byui/player/index.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_babel-loader@8.1.0@babel-loader/lib!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.1@vue-loader/lib??vue-loader-options!./src/views/byui/player/index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_byuiPlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/plugins/byuiPlayer.js */ "./src/plugins/byuiPlayer.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Player",
  components: {
    byuiPlayerMp4: _plugins_byuiPlayer_js__WEBPACK_IMPORTED_MODULE_0__["byuiPlayerMp4"],
    byuiPlayerHls: _plugins_byuiPlayer_js__WEBPACK_IMPORTED_MODULE_0__["byuiPlayerHls"],
    byuiPlayerFlv: _plugins_byuiPlayer_js__WEBPACK_IMPORTED_MODULE_0__["byuiPlayerFlv"],
    byuiPlayerCustom: _plugins_byuiPlayer_js__WEBPACK_IMPORTED_MODULE_0__["byuiPlayerCustom"]
  },
  data: function data() {
    return {
      config1: {
        id: "mse1",
        url: "/video/boyun.mp4"
      },
      Player1: null,
      config2: {
        id: "mse2",
        url: "/video/boyun.m3u8"
      },
      Player2: null,
      config3: {
        id: "mse3",
        url: "/video//boyun.flv"
      },
      Player3: null,
      config4: {
        id: "mse4",
        url: "/video/boyun.mp4"
      },
      Player4: null
    };
  },
  created: function created() {},
  mounted: function mounted() {},
  methods: {
    getImgSrc: function getImgSrc(src) {}
  }
});

/***/ }),

/***/ "./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"60f6bac0-vue-loader-template\"}!./node_modules/_vue-loader@15.9.1@vue-loader/lib/loaders/templateLoader.js?!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.9.1@vue-loader/lib/index.js?!./src/views/byui/player/index.vue?vue&type=template&id=67ffdfde&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"60f6bac0-vue-loader-template"}!./node_modules/_vue-loader@15.9.1@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.1@vue-loader/lib??vue-loader-options!./src/views/byui/player/index.vue?vue&type=template&id=67ffdfde&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "player-container" },
    [
      _c(
        "el-row",
        { attrs: { gutter: 15 } },
        [
          _c(
            "el-col",
            { attrs: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 } },
            [
              _c(
                "el-card",
                { attrs: { shadow: "hover" } },
                [
                  _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                    _vm._v("播放传统MP4")
                  ]),
                  _c("byui-player-mp4", {
                    attrs: { config: _vm.config1 },
                    on: {
                      player: function($event) {
                        _vm.Player1 = $event
                      }
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _c(
            "el-col",
            { attrs: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 } },
            [
              _c(
                "el-card",
                { attrs: { shadow: "hover" } },
                [
                  _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                    _vm._v("播放m3u8,且不暴露视频地址")
                  ]),
                  _c("byui-player-hls", {
                    attrs: { config: _vm.config2 },
                    on: {
                      player: function($event) {
                        _vm.Player2 = $event
                      }
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _c(
            "el-col",
            { attrs: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 } },
            [
              _c(
                "el-card",
                { attrs: { shadow: "hover" } },
                [
                  _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                    _vm._v("播放flv,且不暴露视频地址")
                  ]),
                  _c("byui-player-flv", {
                    attrs: { config: _vm.config3 },
                    on: {
                      player: function($event) {
                        _vm.Player3 = $event
                      }
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _c(
            "el-col",
            { attrs: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 } },
            [
              _c(
                "el-card",
                { attrs: { shadow: "hover" } },
                [
                  _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                    _vm._v("视频大数据专用")
                  ]),
                  _c("byui-player-custom", {
                    attrs: { config: _vm.config4, "jump-num": 10 },
                    on: {
                      getImgSrc: _vm.getImgSrc,
                      player: function($event) {
                        _vm.Player4 = $event
                      }
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/plugins/byuiPlayer.js":
/*!***********************************!*\
  !*** ./src/plugins/byuiPlayer.js ***!
  \***********************************/
/*! exports provided: byuiPlayerMp4, byuiPlayerHls, byuiPlayerFlv, byuiPlayerCustom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byuiPlayerMp4", function() { return byuiPlayerMp4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byuiPlayerHls", function() { return byuiPlayerHls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byuiPlayerFlv", function() { return byuiPlayerFlv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "byuiPlayerCustom", function() { return byuiPlayerCustom; });
/* harmony import */ var zx_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zx-player */ "./node_modules/_zx-player@0.9.0@zx-player/components/export.js");

var byuiPlayerMp4 = zx_player__WEBPACK_IMPORTED_MODULE_0__["mp4"];
var byuiPlayerHls = zx_player__WEBPACK_IMPORTED_MODULE_0__["hls"];
var byuiPlayerFlv = zx_player__WEBPACK_IMPORTED_MODULE_0__["flv"];
var byuiPlayerCustom = zx_player__WEBPACK_IMPORTED_MODULE_0__["custom"];


/***/ }),

/***/ "./src/views/byui/player/index.vue":
/*!*****************************************!*\
  !*** ./src/views/byui/player/index.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_67ffdfde_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=67ffdfde&scoped=true& */ "./src/views/byui/player/index.vue?vue&type=template&id=67ffdfde&scoped=true&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./src/views/byui/player/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_15_9_1_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/_vue-loader@15.9.1@vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/_vue-loader@15.9.1@vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_15_9_1_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_67ffdfde_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_67ffdfde_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "67ffdfde",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/byui/player/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/byui/player/index.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./src/views/byui/player/index.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_4_1_0_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_8_1_0_babel_loader_lib_index_js_node_modules_cache_loader_4_1_0_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_1_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--12-0!../../../../node_modules/_babel-loader@8.1.0@babel-loader/lib!../../../../node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!../../../../node_modules/_vue-loader@15.9.1@vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?!./node_modules/_babel-loader@8.1.0@babel-loader/lib/index.js!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.9.1@vue-loader/lib/index.js?!./src/views/byui/player/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_4_1_0_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_8_1_0_babel_loader_lib_index_js_node_modules_cache_loader_4_1_0_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_1_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/byui/player/index.vue?vue&type=template&id=67ffdfde&scoped=true&":
/*!************************************************************************************!*\
  !*** ./src/views/byui/player/index.vue?vue&type=template&id=67ffdfde&scoped=true& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_4_1_0_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_60f6bac0_vue_loader_template_node_modules_vue_loader_15_9_1_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_4_1_0_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_1_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_67ffdfde_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"60f6bac0-vue-loader-template"}!../../../../node_modules/_vue-loader@15.9.1@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!../../../../node_modules/_vue-loader@15.9.1@vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=67ffdfde&scoped=true& */ "./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"60f6bac0-vue-loader-template\"}!./node_modules/_vue-loader@15.9.1@vue-loader/lib/loaders/templateLoader.js?!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?!./node_modules/_vue-loader@15.9.1@vue-loader/lib/index.js?!./src/views/byui/player/index.vue?vue&type=template&id=67ffdfde&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_4_1_0_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_60f6bac0_vue_loader_template_node_modules_vue_loader_15_9_1_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_4_1_0_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_1_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_67ffdfde_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_4_1_0_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_60f6bac0_vue_loader_template_node_modules_vue_loader_15_9_1_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_4_1_0_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_15_9_1_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_67ffdfde_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=57.js.map