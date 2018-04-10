/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/extendme/dist/Pluggable.js":
/*!**************************************************!*\
  !*** ../node_modules/extendme/dist/Pluggable.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if (\"value\" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;\n  };\n}();\n\nvar _helpers = __webpack_require__(/*! ./helpers.js */ \"../node_modules/extendme/dist/helpers.js\");\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\n/**\n * The Pluggable object\n */\nvar Pluggable = function () {\n\n  /**\n   * Create a pluggable instance\n   */\n  function Pluggable() {\n    _classCallCheck(this, Pluggable);\n\n    this.listeners = [];\n    this.plugins = {};\n\n    this.$id = 0;\n  }\n\n  /**\n   * Emits new event inside pluggable object and processes input data through\n   * all the listeners\n   */\n\n  _createClass(Pluggable, [{\n    key: 'emit',\n    value: function emit(event, data) {\n      return this.listeners\n      /* Leave only matching listeners */\n      .filter(function (l) {\n        return l.mask.test(event);\n      })\n      /* Sort them by priority */\n      .sort(function (a, b) {\n        return b.priority - a.priority;\n      })\n      /* Compute result */\n      .reduce(function (result, listener) {\n        return result.then(function (intermediateResult) {\n          return listener.cb(intermediateResult, event.match(listener.mask));\n        });\n      }, Promise.resolve(data));\n    }\n  }, {\n    key: 'emitSync',\n    value: function emitSync(event, data) {\n      return this.listeners\n      /* Leave only matching listeners */\n      .filter(function (l) {\n        return l.mask.test(event);\n      })\n      /* Sort them by priority */\n      .sort(function (a, b) {\n        return b.priority - a.priority;\n      })\n      /* Compute result */\n      .reduce(function (result, listener) {\n        return listener.cb(result);\n      }, data);\n    }\n\n    /**\n     * Add a new listener to pluggable object\n     */\n\n  }, {\n    key: 'on',\n    value: function on(mask, cb) {\n      var _this = this;\n\n      var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n\n      var id = this.$id++;\n\n      this.listeners.push({\n        mask: (0, _helpers.normalizeMask)(mask),\n        priority: priority,\n        cb: cb,\n        $id: id\n      });\n\n      return function () {\n        return _this.listeners = _this.listeners.filter(function (_ref) {\n          var $id = _ref.$id;\n          return $id !== id;\n        });\n      };\n    }\n\n    /**\n     * Add a new self-removing listener\n     */\n\n  }, {\n    key: 'once',\n    value: function once(mask, cb, priority) {\n      var removed = false;\n\n      var removeListener = this.on(mask, function (d) {\n        var res = removed ? d : cb(d);\n        removeListener();\n        removed = true;\n        return res;\n      }, priority);\n\n      return removeListener;\n    }\n  }, {\n    key: 'has',\n\n    /**\n     * Check the Pluggable for having listeners for such an event\n     */\n    value: function has(event) {\n      return this.listeners.filter(function (l) {\n        return l.mask.test(event);\n      }).length;\n    }\n  }, {\n    key: 'off',\n\n    /**\n     * Remove listeners for this event\n     */\n    value: function off(event) {\n      return this.listeners = this.listeners.filter(function (l) {\n        return !l.mask.test(event);\n      });\n    }\n  }, {\n    key: 'plugin',\n\n    /**\n     * Adds a plugin to pluggable instance\n     */\n    value: function plugin(pl, options) {\n      var _this2 = this;\n\n      /* Check the plugin for being currently installed */\n      if (this.plugins[pl.plugin.name]) throw new Error('Plugin ' + pl.plugin.name + ' is already installed!');\n\n      /* Check plugins dependencies */\n      Object.keys(pl.plugin.dependencies).forEach(function (key) {\n        if (!_this2.plugins[key]) {\n          throw new Error(\"Plugin '\" + key + \"' is requred by '\" + pl.plugin.name + \"', but not installed!\");\n        } else {\n          var versionNeeded = pl.plugin.dependencies[key];\n          var versionProvided = _this2.plugins[key].version;\n\n          if ((0, _helpers.compareVersion)(versionNeeded, versionProvided) > 0) {\n            throw new Error(\"Plugin '\" + key + \"' version \" + versionNeeded + \" is requred by '\" + pl.plugin.name + \"', but only \" + versionProvided + \" is provided!\");\n          }\n        }\n      });\n\n      /* Insert plugin */\n      pl(this, options);\n\n      /* Register plugin */\n      this.plugins[pl.plugin.name] = pl.plugin;\n    }\n  }]);\n\n  return Pluggable;\n}();\n\nexports.default = Pluggable;\n;\n\n//# sourceURL=webpack:///../node_modules/extendme/dist/Pluggable.js?");

/***/ }),

/***/ "../node_modules/extendme/dist/helpers.js":
/*!************************************************!*\
  !*** ../node_modules/extendme/dist/helpers.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * A function that transforms any mask to a regexp\n */\nvar normalizeMask = function normalizeMask(mask) {\n  return typeof mask === 'string' ? new RegExp('^' + mask + '$') : mask;\n};\n\nvar compareVersion = function compareVersion(versionA, versionB) {\n  var tokensA = versionA.split('.').map(function (token) {\n    return parseInt(token, 10);\n  });\n  var tokensB = versionB.split('.').map(function (token) {\n    return parseInt(token, 10);\n  });\n\n  var index = 0;\n\n  while (index < 3) {\n    var numberA = index < tokensA.length ? tokensA[index] : 0;\n    var numberB = index < tokensB.length ? tokensB[index] : 0;\n\n    if (numberA !== numberB) {\n      return numberA > numberB ? 1 : -1;\n    }\n\n    index++;\n  }\n\n  return 0;\n};\n\n/* */\nexports.normalizeMask = normalizeMask;\nexports.compareVersion = compareVersion;\n\n//# sourceURL=webpack:///../node_modules/extendme/dist/helpers.js?");

/***/ }),

/***/ "../node_modules/extendme/dist/index.js":
/*!**********************************************!*\
  !*** ../node_modules/extendme/dist/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n                                        value: true\n});\n\nvar _Pluggable = __webpack_require__(/*! ./Pluggable.js */ \"../node_modules/extendme/dist/Pluggable.js\");\n\nvar _Pluggable2 = _interopRequireDefault(_Pluggable);\n\nfunction _interopRequireDefault(obj) {\n                                        return obj && obj.__esModule ? obj : { default: obj };\n}\n\n/* */\nexports.default = _Pluggable2.default; /**\n                                        * Pluggable library\n                                        *\n                                        * A base library yo make your code easily pluggble\n                                        *\n                                        */\n\n/* */\n\n//# sourceURL=webpack:///../node_modules/extendme/dist/index.js?");

/***/ }),

/***/ "./index.html":
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"index.html\";\n\n//# sourceURL=webpack:///./index.html?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./index.html */ \"./index.html\");\n\nvar _jarvisChart = __webpack_require__(/*! ./jarvis-chart */ \"./jarvis-chart/index.js\");\n\nvar _jarvisChart2 = _interopRequireDefault(_jarvisChart);\n\nvar _values = __webpack_require__(/*! ./values */ \"./values.js\");\n\nvar _values2 = _interopRequireDefault(_values);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar node = document.getElementById('chart');\n\n/* Just copy pasted from internet, ignore it */\nvar getParameterByName = function getParameterByName(name, url) {\n  if (!url) url = window.location.href;\n\n  name = name.replace(/[\\[\\]]/g, \"\\\\$&\");\n\n  var regex = new RegExp(\"[?&]\" + name + \"(=([^&#]*)|&|#|$)\");\n  var results = regex.exec(url);\n\n  if (!results) return null;\n  if (!results[2]) return '';\n\n  return decodeURIComponent(results[2].replace(/\\+/g, \" \"));\n};\n\n/* Retrieve render from url */\nvar render = getParameterByName('render') || 'canvas';\n\nvar chart = (0, _jarvisChart2.default)(node, {\n  render: render,\n  values: _values2.default,\n  /* Do not request animation frame */\n  // redrawContinuously: false,\n  /* Do not process clicks less then 100ms long */\n  clickThreshold: 100\n});\n\nconsole.log(chart);\n\n/* Attach events to UI */\n\ndocument.getElementById('mode-view').addEventListener('click', function () {\n  chart.mode.set('view');\n});\n\n// document.getElementById('mode-points').addEventListener('click', () => {\n//   chart.mode.set('points');\n// });\n\ndocument.getElementById('mode-brush').addEventListener('click', function () {\n  chart.mode.set('brush');\n});\n\ndocument.getElementById('mode-ellipse').addEventListener('click', function () {\n  chart.mode.set('ellipse');\n});\n\ndocument.getElementById('auto-zoom').addEventListener('click', function (e) {\n  chart.chartWindow.setAutoZoom(e.target.checked);\n});\n\n// document.getElementById('show-indicator').addEventListener('click', (e) => {\n//   chart.setShowIndicator(e.target.checked);\n// });\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./jarvis-chart/index.js":
/*!*******************************!*\
  !*** ./jarvis-chart/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extendme = __webpack_require__(/*! extendme */ \"../node_modules/extendme/dist/index.js\");\n\nvar _extendme2 = _interopRequireDefault(_extendme);\n\nvar _Handler = __webpack_require__(/*! ./plugins/Handler */ \"./jarvis-chart/plugins/Handler/index.js\");\n\nvar _Handler2 = _interopRequireDefault(_Handler);\n\nvar _Render = __webpack_require__(/*! ./plugins/Render */ \"./jarvis-chart/plugins/Render/index.js\");\n\nvar _Render2 = _interopRequireDefault(_Render);\n\nvar _State = __webpack_require__(/*! ./plugins/State */ \"./jarvis-chart/plugins/State/index.js\");\n\nvar _State2 = _interopRequireDefault(_State);\n\nvar _Primitives = __webpack_require__(/*! ./plugins/Primitives */ \"./jarvis-chart/plugins/Primitives/index.js\");\n\nvar _Primitives2 = _interopRequireDefault(_Primitives);\n\nvar _AdvancedEvents = __webpack_require__(/*! ./plugins/AdvancedEvents */ \"./jarvis-chart/plugins/AdvancedEvents/index.js\");\n\nvar _AdvancedEvents2 = _interopRequireDefault(_AdvancedEvents);\n\nvar _ChartModes = __webpack_require__(/*! ./plugins/ChartModes */ \"./jarvis-chart/plugins/ChartModes/index.js\");\n\nvar _ChartModes2 = _interopRequireDefault(_ChartModes);\n\nvar _ChartWindow = __webpack_require__(/*! ./plugins/ChartWindow */ \"./jarvis-chart/plugins/ChartWindow/index.js\");\n\nvar _ChartWindow2 = _interopRequireDefault(_ChartWindow);\n\nvar _ChartValues = __webpack_require__(/*! ./plugins/ChartValues */ \"./jarvis-chart/plugins/ChartValues/index.js\");\n\nvar _ChartValues2 = _interopRequireDefault(_ChartValues);\n\nvar _ChartContent = __webpack_require__(/*! ./plugins/ChartContent */ \"./jarvis-chart/plugins/ChartContent/index.js\");\n\nvar _ChartContent2 = _interopRequireDefault(_ChartContent);\n\nvar _ViewMode = __webpack_require__(/*! ./plugins/ViewMode */ \"./jarvis-chart/plugins/ViewMode/index.js\");\n\nvar _ViewMode2 = _interopRequireDefault(_ViewMode);\n\nvar _Elements = __webpack_require__(/*! ./plugins/Elements */ \"./jarvis-chart/plugins/Elements/index.js\");\n\nvar _Elements2 = _interopRequireDefault(_Elements);\n\nvar _Brush = __webpack_require__(/*! ./plugins/Brush */ \"./jarvis-chart/plugins/Brush/index.js\");\n\nvar _Brush2 = _interopRequireDefault(_Brush);\n\nvar _Ellipse = __webpack_require__(/*! ./plugins/Ellipse */ \"./jarvis-chart/plugins/Ellipse/index.js\");\n\nvar _Ellipse2 = _interopRequireDefault(_Ellipse);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (node, options) {\n  var p = new _extendme2.default();\n\n  /* Basic plugins */\n  p.plugin(_Handler2.default, options);\n  p.plugin(_Render2.default, options);\n  p.plugin(_State2.default, options);\n\n  p.plugin(_AdvancedEvents2.default, options);\n\n  /* Primitive figures plugins */\n  p.plugin(_Primitives2.default, options);\n\n  p.plugin(_ChartValues2.default, options);\n\n  /* Chart Window (translation, zoom) plugin */\n  p.plugin(_ChartWindow2.default, options);\n  p.plugin(_ChartModes2.default, options);\n\n  /* Content */\n  p.plugin(_ChartContent2.default, options);\n\n  p.plugin(_ViewMode2.default, options);\n\n  p.plugin(_Elements2.default, options);\n  p.plugin(_Brush2.default, options);\n  p.plugin(_Ellipse2.default, options);\n\n  /* Emit mount action */\n\n  p.emitSync('mount', { node: node });\n\n  return p.emitSync('api', {});\n};\n\n//# sourceURL=webpack:///./jarvis-chart/index.js?");

/***/ }),

/***/ "./jarvis-chart/lib/event-emitter.js":
/*!*******************************************!*\
  !*** ./jarvis-chart/lib/event-emitter.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar createEventEmitter = function createEventEmitter() {\n  var listeners = [];\n\n  return {\n    on: function on(name, listener) {\n      listeners.push({ name: name, listener: listener });\n    },\n    emit: function emit(name, data) {\n      listeners.filter(function (listener) {\n        return listener.name === name;\n      }).forEach(function (_ref) {\n        var listener = _ref.listener;\n        return listener(data);\n      });\n    }\n  };\n};\n\nexports.default = createEventEmitter;\n\n//# sourceURL=webpack:///./jarvis-chart/lib/event-emitter.js?");

/***/ }),

/***/ "./jarvis-chart/lib/matrix.js":
/*!************************************!*\
  !*** ./jarvis-chart/lib/matrix.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Matrix\n *\n * [ a,  b, 0]\n * [ c,  d, 0]\n * [tx, ty, 1]\n *\n */\nvar Matrix = function () {\n  function Matrix(a, b, c, d, tx, ty) {\n    _classCallCheck(this, Matrix);\n\n    this.matrix = [[a, b, 0], [c, d, 0], [tx, ty, 1]];\n  }\n\n  _createClass(Matrix, [{\n    key: \"get\",\n    value: function get(x, y) {\n      return this.matrix[y][x];\n    }\n  }, {\n    key: \"getValues\",\n    value: function getValues() {\n      var _matrix = _slicedToArray(this.matrix, 3),\n          _matrix$ = _slicedToArray(_matrix[0], 3),\n          a = _matrix$[0],\n          b = _matrix$[1],\n          _0 = _matrix$[2],\n          _matrix$2 = _slicedToArray(_matrix[1], 3),\n          c = _matrix$2[0],\n          d = _matrix$2[1],\n          _1 = _matrix$2[2],\n          _matrix$3 = _slicedToArray(_matrix[2], 3),\n          tx = _matrix$3[0],\n          ty = _matrix$3[1],\n          _2 = _matrix$3[2];\n\n      return { a: a, b: b, c: c, d: d, tx: tx, ty: ty };\n    }\n  }, {\n    key: \"toCss\",\n    value: function toCss() {\n      var _matrix2 = _slicedToArray(this.matrix, 3),\n          _matrix2$ = _slicedToArray(_matrix2[0], 3),\n          a = _matrix2$[0],\n          b = _matrix2$[1],\n          _0 = _matrix2$[2],\n          _matrix2$2 = _slicedToArray(_matrix2[1], 3),\n          c = _matrix2$2[0],\n          d = _matrix2$2[1],\n          _1 = _matrix2$2[2],\n          _matrix2$3 = _slicedToArray(_matrix2[2], 3),\n          tx = _matrix2$3[0],\n          ty = _matrix2$3[1],\n          _2 = _matrix2$3[2];\n\n      return \"matrix(\" + a + \", \" + b + \", \" + c + \", \" + d + \", \" + tx + \", \" + ty + \")\";\n    }\n\n    /* Получить детерминант этой матрицы */\n\n  }, {\n    key: \"determinator\",\n    value: function determinator() {\n      var _matrix3 = _slicedToArray(this.matrix, 3),\n          _matrix3$ = _slicedToArray(_matrix3[0], 3),\n          a = _matrix3$[0],\n          b = _matrix3$[1],\n          _0 = _matrix3$[2],\n          _matrix3$2 = _slicedToArray(_matrix3[1], 3),\n          c = _matrix3$2[0],\n          d = _matrix3$2[1],\n          _1 = _matrix3$2[2],\n          _matrix3$3 = _slicedToArray(_matrix3[2], 3),\n          tx = _matrix3$3[0],\n          ty = _matrix3$3[1],\n          _2 = _matrix3$3[2];\n\n      return a * d - c * b;\n    }\n\n    /* Получить матрицу миноров из этой матрицы */\n\n  }, {\n    key: \"minors\",\n    value: function minors() {\n      var _matrix4 = _slicedToArray(this.matrix, 3),\n          _matrix4$ = _slicedToArray(_matrix4[0], 3),\n          a = _matrix4$[0],\n          b = _matrix4$[1],\n          _0 = _matrix4$[2],\n          _matrix4$2 = _slicedToArray(_matrix4[1], 3),\n          c = _matrix4$2[0],\n          d = _matrix4$2[1],\n          _1 = _matrix4$2[2],\n          _matrix4$3 = _slicedToArray(_matrix4[2], 3),\n          tx = _matrix4$3[0],\n          ty = _matrix4$3[1],\n          _2 = _matrix4$3[2];\n\n      var result = Matrix.identity();\n\n      result.matrix = [[d, c, c * ty - d * tx], [b, a, a * ty - b * tx], [0, 0, a * d - c * b]];\n\n      return result;\n    }\n\n    /* Получить матрицу алгебраических дополнений из этой */\n\n  }, {\n    key: \"additions\",\n    value: function additions() {\n      var _matrix5 = _slicedToArray(this.matrix, 3),\n          _matrix5$ = _slicedToArray(_matrix5[0], 3),\n          a = _matrix5$[0],\n          b = _matrix5$[1],\n          _0 = _matrix5$[2],\n          _matrix5$2 = _slicedToArray(_matrix5[1], 3),\n          c = _matrix5$2[0],\n          d = _matrix5$2[1],\n          _1 = _matrix5$2[2],\n          _matrix5$3 = _slicedToArray(_matrix5[2], 3),\n          tx = _matrix5$3[0],\n          ty = _matrix5$3[1],\n          _2 = _matrix5$3[2];\n\n      var result = Matrix.identity();\n\n      result.matrix = [[a, -b, _0], [-c, d, -_1], [tx, -ty, _2]];\n\n      return result;\n    }\n\n    /* Получить транспонированную матрицу из этой */\n\n  }, {\n    key: \"transpose\",\n    value: function transpose() {\n      var _matrix6 = _slicedToArray(this.matrix, 3),\n          _matrix6$ = _slicedToArray(_matrix6[0], 3),\n          a = _matrix6$[0],\n          b = _matrix6$[1],\n          _0 = _matrix6$[2],\n          _matrix6$2 = _slicedToArray(_matrix6[1], 3),\n          c = _matrix6$2[0],\n          d = _matrix6$2[1],\n          _1 = _matrix6$2[2],\n          _matrix6$3 = _slicedToArray(_matrix6[2], 3),\n          tx = _matrix6$3[0],\n          ty = _matrix6$3[1],\n          _2 = _matrix6$3[2];\n\n      var result = Matrix.identity();\n\n      result.matrix = [[a, c, tx], [b, d, ty], [_0, _1, _2]];\n\n      return result;\n    }\n  }, {\n    key: \"reverse\",\n    value: function reverse() {\n      var k = 1 / this.determinator();\n\n      var result = this.minors().additions().transpose();\n\n      var _result$matrix = _slicedToArray(result.matrix, 3),\n          _result$matrix$ = _slicedToArray(_result$matrix[0], 3),\n          a = _result$matrix$[0],\n          b = _result$matrix$[1],\n          _0 = _result$matrix$[2],\n          _result$matrix$2 = _slicedToArray(_result$matrix[1], 3),\n          c = _result$matrix$2[0],\n          d = _result$matrix$2[1],\n          _1 = _result$matrix$2[2],\n          _result$matrix$3 = _slicedToArray(_result$matrix[2], 3),\n          tx = _result$matrix$3[0],\n          ty = _result$matrix$3[1],\n          _2 = _result$matrix$3[2];\n\n      result.matrix = [[a * k, b * k, _0 * k], [c * k, d * k, _1 * k], [tx * k, ty * k, _2 * k]];\n\n      return result;\n    }\n  }]);\n\n  return Matrix;\n}();\n\nMatrix.identity = function (x, y) {\n  return new Matrix(1, 0, 0, 1, 0, 0);\n};\n\nMatrix.scale = function (x, y) {\n  return new Matrix(x, 0, 0, y, 0, 0);\n};\nMatrix.translate = function (x, y) {\n  return new Matrix(1, 0, 0, 1, x, y);\n};\n\nMatrix.rotate = function (alpha) {\n  var cos = Math.cos(alpha);\n  var sin = Math.sin(alpha);\n\n  return new Matrix(cos, sin, -sin, cos, 0, 0);\n};\n\nMatrix.resetScale = function (matrix) {\n  var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n  var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;\n\n  var a = x ? 1 / matrix.get(0, 0) : 1;\n  var b = 0;\n  var c = 0;\n  var d = y ? 1 / matrix.get(1, 1) : 1;\n  var tx = 0;\n  var ty = 0;\n\n  return new Matrix(a, b, c, d, tx, ty);\n};\n\nMatrix.dropScale = function (matrix) {\n  var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n  var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;\n\n  var _matrix$getValues = matrix.getValues(),\n      a = _matrix$getValues.a,\n      b = _matrix$getValues.b,\n      c = _matrix$getValues.c,\n      d = _matrix$getValues.d,\n      tx = _matrix$getValues.tx,\n      ty = _matrix$getValues.ty;\n\n  a = 1;\n  d = 1;\n\n  return new Matrix(a, b, c, d, tx, ty);\n};\n\nMatrix.resetTranslate = function (matrix) {\n  var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n  var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;\n  return Matrix.translate(x ? -matrix.get(0, 2) : 0, y ? -matrix.get(1, 2) : 0);\n};\n\nvar matrixMultiplicationStep = function matrixMultiplicationStep(A, B, x, y) {\n  return A.get(0, y) * B.get(x, 0) + A.get(1, y) * B.get(x, 1) + A.get(2, y) * B.get(x, 2);\n};\n\nMatrix.multiply = function (A, B) {\n  var a = matrixMultiplicationStep(A, B, 0, 0);\n  var b = matrixMultiplicationStep(A, B, 1, 0);\n  var c = matrixMultiplicationStep(A, B, 0, 1);\n  var d = matrixMultiplicationStep(A, B, 1, 1);\n\n  var tx = matrixMultiplicationStep(A, B, 0, 2);\n  var ty = matrixMultiplicationStep(A, B, 1, 2);\n\n  return new Matrix(a, b, c, d, tx, ty);\n};\n\nArray.prototype.reduceRight = function (predicate, defaultValue) {\n  var result = defaultValue;\n\n  for (var i = this.length - 1; i >= 0; --i) {\n    result = predicate(result, this[i], i, this);\n  }\n\n  return result;\n};\n\nMatrix.join = function () {\n  for (var _len = arguments.length, matrixes = Array(_len), _key = 0; _key < _len; _key++) {\n    matrixes[_key] = arguments[_key];\n  }\n\n  return matrixes.reduceRight(function (result, matrix) {\n    return Matrix.multiply(matrix, result);\n  }, Matrix.identity());\n};\n\nMatrix.apply = function (A, B) {\n  var _A = _slicedToArray(A, 2),\n      a = _A[0],\n      b = _A[1];\n\n  var areal = a * B.get(0, 0) + b * B.get(0, 1) + 1 * B.get(0, 2);\n  var breal = a * B.get(1, 0) + b * B.get(1, 1) + 1 * B.get(1, 2);\n\n  return [areal, breal];\n};\n\nMatrix.transformRight = function (B) {\n  return function (A) {\n    return Matrix.multiply(A, B);\n  };\n};\nMatrix.transformLeft = function (A) {\n  return function (B) {\n    return Matrix.multiply(A, B);\n  };\n};\n\nMatrix.toRad = function (alpha) {\n  return alpha / 360 * Math.PI * 2;\n};\n\nexports.default = Matrix;\n\n//# sourceURL=webpack:///./jarvis-chart/lib/matrix.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/AdvancedEvents/index.js":
/*!******************************************************!*\
  !*** ./jarvis-chart/plugins/AdvancedEvents/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar getCoords = function getCoords(e) {\n  var rect = e.target.getBoundingClientRect();\n\n  var x = e.clientX - rect.left;\n  var y = e.clientY - rect.top;\n\n  return { x: x, y: y };\n};\n\n/**\n * AdvancedEvents плагин\n *\n * Добавляет \"продвинутые\" ивенты на шину событий (p.handler), такие как pathstart, pathend, zoom, drag\n * Также пробрасывает \"обычные\" на p.handler ивенты: click, mousedown, mouseup, mousemove\n *\n * Чтобы подписаться на ивенты используйте p.handler.on('click', () => console.log('click')). См Handler плагин\n *\n * Использует сокеты: handler/attack\n * Использует API: p.handler\n * Создаёт сокеты: нет\n * Создаёт API: нет\n *\n */\nvar AdvancedEvents = function AdvancedEvents(p, options) {\n\n  var inside = false;\n  var mousedown = false;\n  var lastpos = null;\n  var lasttime = null;\n\n  p.on('handler/attach', function () {\n    p.handler.attach('wheel', function (e) {\n      e.preventDefault();\n      p.handler.emit('zoom', { delta: e.deltaY, e: e });\n    });\n\n    p.handler.attach('click', function (e) {\n      if (new Date() - lasttime > options.clickThreshold) return;\n\n      var rect = e.target.getBoundingClientRect();\n\n      var x = e.clientX - rect.left;\n      var y = e.clientY - rect.top;\n\n      p.handler.emit('click', { x: x, y: y, e: e });\n    });\n\n    p.handler.attach('mousedown', function (e) {\n      var _getCoords = getCoords(e),\n          x = _getCoords.x,\n          y = _getCoords.y;\n\n      p.handler.emit('mousedown', { x: x, y: y, e: e });\n      p.handler.emit('pathstart', { x: x, y: y, e: e });\n\n      mousedown = true;\n      lastpos = { x: x, y: y };\n      lasttime = new Date();\n    });\n\n    p.handler.attach('mouseup', function (e) {\n      var _getCoords2 = getCoords(e),\n          x = _getCoords2.x,\n          y = _getCoords2.y;\n\n      p.handler.emit('mouseup', { x: x, y: y, e: e });\n      p.handler.emit('pathend', { x: x, y: y, e: e });\n      mousedown = false;\n      lastpos = false;\n    });\n\n    p.handler.attach('mouseover', function (e) {\n      p.handler.emit('mouseover', e);\n      inside = true;\n    });\n\n    p.handler.attach('mouseout', function (e) {\n      p.handler.emit('mouseout', e);\n      mousedown = false;\n      inside = false;\n    });\n\n    p.handler.attach('mousemove', function (e) {\n      p.handler.emit('mousemove', e);\n\n      if (mousedown) {\n        var _getCoords3 = getCoords(e),\n            x = _getCoords3.x,\n            y = _getCoords3.y;\n\n        if (lastpos) {\n          p.handler.emit('path', { x: x, y: y, e: e });\n          p.handler.emit('drag', { x: x - lastpos.x, y: y - lastpos.y, e: e });\n        }\n\n        lastpos = { x: x, y: y };\n      }\n    });\n  });\n};\n\nAdvancedEvents.plugin = {\n  name: 'advanced-events',\n  version: '1.0.0',\n  dependencies: {\n    'handler': '1.0.0'\n  }\n};\n\nexports.default = AdvancedEvents;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/AdvancedEvents/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Brush/index.js":
/*!*********************************************!*\
  !*** ./jarvis-chart/plugins/Brush/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar drawBrush = function drawBrush(p, context, brush) {\n  brush.forEach(function (curr, index) {\n    if (index > 0) {\n      var prev = brush[index - 1];\n      p.render.primitives.line(context, { x0: prev.x, y0: prev.y, x1: curr.x, y1: curr.y, color: 'red' });\n    }\n  });\n};\n\n/**\n * Brush плагин\n *\n * Создаёт инструмент \"произвольная кисть\" или просто \"кисть\":\n *   Добавляет режим работы \"brush\" (см ChartModes плагин)\n *   Добавляет brush поле в состояние (см State плагин)\n *   Добавляет элемент brush (см Elements плагин)\n *   Добавляет обработчики path* события для режима brush и редактирует в них элементы/поле brush (см ChartModes плагин)\n *\n * Использует сокеты: state/default, chart-window/inside, chart-modes/brush/path*\n * Создаёт сокеты: нет\n * Использует API: p.elements, p.render\n * Создаёт API: нет\n *\n */\nvar Brush = function Brush(p) {\n  /* Создаём элемент кисть */\n  p.elements.register('brush', function (context, brush) {\n    drawBrush(p, context, brush);\n  });\n\n  /* Создаём поле brush в стейте для хранения кисти, которую мы сейчас редактируем */\n  p.on('state/default', function (state) {\n    return _extends({}, state, { brush: null });\n  });\n\n  /* Выводим кисть, которую мы сейчас редактируем  */\n  p.on('chart-window/inside', function (_ref) {\n    var context = _ref.context,\n        state = _ref.state;\n    var brush = state.brush;\n\n\n    if (brush) {\n      drawBrush(p, context, brush);\n    }\n\n    return { context: context, state: state };\n  });\n\n  /* Обрабатываем события для режима brush */\n\n  p.on('chart-modes/brush/pathstart', function (_ref2) {\n    var x = _ref2.x,\n        y = _ref2.y,\n        e = _ref2.e;\n\n    p.state.update(function (state) {\n      state.brush = [];\n      return state;\n    });\n  });\n\n  p.on('chart-modes/brush/pathend', function (_ref3) {\n    var x = _ref3.x,\n        y = _ref3.y,\n        e = _ref3.e;\n\n    p.elements.push('brush', p.state.get().brush);\n    p.state.update(function (state) {\n      state.brush = null;\n      return state;\n    });\n  });\n\n  p.on('chart-modes/brush/path', function (_ref4) {\n    var x = _ref4.x,\n        y = _ref4.y,\n        e = _ref4.e;\n\n    var _p$chartWindow$toWorl = p.chartWindow.toWorld([x, y]),\n        _p$chartWindow$toWorl2 = _slicedToArray(_p$chartWindow$toWorl, 2),\n        xreal = _p$chartWindow$toWorl2[0],\n        yreal = _p$chartWindow$toWorl2[1];\n\n    p.state.update(function (state) {\n      state.brush.push({ x: xreal, y: yreal });\n      return state;\n    });\n  });\n};\n\nBrush.plugin = {\n  name: 'brush',\n  version: '1.0.0',\n  dependencies: {\n    'render': '1.0.0',\n    'state': '1.0.0',\n    'elements': '1.0.0',\n    'chart-modes': '1.0.0',\n    'chart-window': '1.0.0'\n  }\n};\n\nexports.default = Brush;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Brush/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/ChartContent/dataset/index.js":
/*!************************************************************!*\
  !*** ./jarvis-chart/plugins/ChartContent/dataset/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _matrix = __webpack_require__(/*! ../../../lib/matrix */ \"./jarvis-chart/lib/matrix.js\");\n\nvar _matrix2 = _interopRequireDefault(_matrix);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar candle = function candle(p, context, _ref) {\n  var x = _ref.x,\n      y = _ref.y,\n      min = _ref.min,\n      max = _ref.max,\n      open = _ref.open,\n      close = _ref.close;\n\n  var marginBottom = min;\n  var lineHeight = max - min;\n  var bodyHeight = Math.abs(open - close);\n  var paddingBottom = Math.min(open, close) - min;\n\n  var direction = open > close ? 'down' : 'up';\n  var color = direction === 'up' ? '#15E6C1' : '#FA2C50';\n\n  p.render.primitives.line(context, { x0: 3.5 + x, y0: marginBottom + y, x1: 3.5 + x, y1: marginBottom + lineHeight + y, color: color });\n  p.render.primitives.rectangle(context, { x: x, y: marginBottom + paddingBottom + y, width: 7, height: bodyHeight, color: color });\n};\n\nexports.default = function (p, context, _ref2) {\n  var values = _ref2.values;\n\n  /* Do not draw elements that are outside the screen */\n  var _context$matrix$scree = context.matrix.screen([0, 0]),\n      _context$matrix$scree2 = _slicedToArray(_context$matrix$scree, 1),\n      screenFirst = _context$matrix$scree2[0];\n\n  var _context$matrix$scree3 = context.matrix.screen([10, 0]),\n      _context$matrix$scree4 = _slicedToArray(_context$matrix$scree3, 1),\n      screenSecond = _context$matrix$scree4[0];\n\n  var screenStart = -screenFirst;\n  var screenWidth = screenSecond - screenFirst;\n\n  var offset = Math.floor(Math.max(screenStart / screenWidth - 1, 0));\n  var count = Math.ceil(context.matrix.screen.dimensions().width / screenWidth) + 2;\n\n  values.forEach(function (_ref3, index) {\n    var min = _ref3.min,\n        max = _ref3.max,\n        open = _ref3.open,\n        close = _ref3.close;\n\n    if (index < offset || index > offset + count) return;\n\n    candle(p, context, { x: index * 10, y: 0, min: min, max: max, open: open, close: close });\n  });\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/ChartContent/dataset/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/ChartContent/grid/index.js":
/*!*********************************************************!*\
  !*** ./jarvis-chart/plugins/ChartContent/grid/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _priceline = __webpack_require__(/*! ./priceline */ \"./jarvis-chart/plugins/ChartContent/grid/priceline.js\");\n\nvar _priceline2 = _interopRequireDefault(_priceline);\n\nvar _timeline = __webpack_require__(/*! ./timeline */ \"./jarvis-chart/plugins/ChartContent/grid/timeline.js\");\n\nvar _timeline2 = _interopRequireDefault(_timeline);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (p, context, _ref) {\n  var values = _ref.values,\n      prices = _ref.prices,\n      showIndicator = _ref.showIndicator;\n\n  (0, _timeline2.default)(p, context, { values: values, showIndicator: showIndicator });\n  (0, _priceline2.default)(p, context, {});\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/ChartContent/grid/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/ChartContent/grid/priceline.js":
/*!*************************************************************!*\
  !*** ./jarvis-chart/plugins/ChartContent/grid/priceline.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _matrix = __webpack_require__(/*! ../../../lib/matrix */ \"./jarvis-chart/lib/matrix.js\");\n\nvar _matrix2 = _interopRequireDefault(_matrix);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError(\"Cannot destructure undefined\"); }\n\nvar matrixForTimeline = function matrixForTimeline(matrix, position) {\n  return _matrix2.default.join(_matrix2.default.translate(position, 0), _matrix2.default.resetTranslate(matrix, true, false), _matrix2.default.resetScale(matrix, true, false));\n};\n\nvar matrixForTimepoint = function matrixForTimepoint(matrix, price) {\n  return _matrix2.default.join(_matrix2.default.resetScale(matrix), _matrix2.default.translate(0, price));\n};\n\nexports.default = function (p, context, _ref) {\n  _objectDestructuringEmpty(_ref);\n\n  p.render.primitives.group(context, { matrix: matrixForTimeline(context.matrix.get(), context.matrix.screen.dimensions().width - 50) }, function () {\n\n    /* Do not draw elements that are outside the screen */\n    var _context$matrix$scree = context.matrix.screen([0, 0]),\n        _context$matrix$scree2 = _slicedToArray(_context$matrix$scree, 2),\n        _0 = _context$matrix$scree2[0],\n        screenFirst = _context$matrix$scree2[1];\n\n    var _context$matrix$scree3 = context.matrix.screen([0, -1]),\n        _context$matrix$scree4 = _slicedToArray(_context$matrix$scree3, 2),\n        _1 = _context$matrix$scree4[0],\n        screenSecond = _context$matrix$scree4[1];\n\n    var screenStart = context.matrix.screen.dimensions().height - screenFirst;\n    var screenHeight = screenSecond - screenFirst;\n\n    var offset = Math.floor(-screenStart / screenHeight) - 1;\n    var count = Math.max(Math.ceil(context.matrix.screen.dimensions().height / screenHeight) + 2, 1);\n\n    var nth = Math.abs(Math.floor(count / 10));\n\n    p.render.primitives.rectangle(context, { x: 0, y: -2000, width: 50, height: 4000, color: 'white' });\n    p.render.primitives.line(context, { x0: 0, y0: -2000, x1: 0, y1: 2000, color: '#ccc' });\n\n    new Array(count).fill(0).map(function (v, i) {\n      return i + offset;\n    }).forEach(function (price) {\n      if (Math.abs(price) % nth > 0) return;\n\n      p.render.primitives.group(context, { matrix: matrixForTimepoint(context.matrix.get(), price) }, function () {\n        p.render.primitives.text(context, { x: 10, y: -5, text: price.toFixed(2), font: '100 13px Open Sans', color: '#4A4A4A', textAlign: 'left', crop: false });\n        p.render.primitives.line(context, { x0: -context.matrix.screen.dimensions().width, y0: 0, x1: 0, y1: 0, color: '#ddd' });\n      });\n    });\n  });\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/ChartContent/grid/priceline.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/ChartContent/grid/timeline.js":
/*!************************************************************!*\
  !*** ./jarvis-chart/plugins/ChartContent/grid/timeline.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _matrix = __webpack_require__(/*! ../../../lib/matrix */ \"./jarvis-chart/lib/matrix.js\");\n\nvar _matrix2 = _interopRequireDefault(_matrix);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar OFFSET = 10;\n\nvar matrixForTimeline = function matrixForTimeline(matrix, position) {\n  return _matrix2.default.join(_matrix2.default.translate(0, position), _matrix2.default.resetTranslate(matrix, false, true), _matrix2.default.resetScale(matrix, false, true));\n};\n\nvar matrixForTimepoint = function matrixForTimepoint(matrix, index) {\n  return _matrix2.default.join(_matrix2.default.resetScale(matrix), _matrix2.default.translate(index * OFFSET + 3.5, 0));\n};\n\nexports.default = function (p, context, _ref) {\n  var values = _ref.values,\n      matrix = _ref.matrix,\n      showIndicator = _ref.showIndicator;\n\n\n  p.render.primitives.group(context, { matrix: matrixForTimeline(context.matrix.get(), context.matrix.screen.dimensions().height - 40) }, function () {\n    p.render.primitives.line(context, { x0: -20000, y0: 0, x1: 20000, y1: 0, color: '#ccc' });\n\n    /* Do not draw elements that are outside the screen */\n\n    var _context$matrix$scree = context.matrix.screen([0, 0]),\n        _context$matrix$scree2 = _slicedToArray(_context$matrix$scree, 1),\n        screenFirst = _context$matrix$scree2[0];\n\n    var _context$matrix$scree3 = context.matrix.screen([OFFSET, 0]),\n        _context$matrix$scree4 = _slicedToArray(_context$matrix$scree3, 1),\n        screenSecond = _context$matrix$scree4[0];\n\n    var screenStart = -screenFirst;\n    var screenWidth = screenSecond - screenFirst;\n\n    var offset = Math.floor(Math.max(screenStart / screenWidth - 1, 0));\n    var count = Math.ceil(context.matrix.screen.dimensions().width / screenWidth) + 2;\n\n    /* Draw only ten timepoints per screen */\n    var nth = Math.floor(count / 10);\n\n    if (showIndicator) {\n      values.forEach(function (_ref2, index) {\n        var max = _ref2.max,\n            min = _ref2.min,\n            time = _ref2.time;\n\n        /* Draw only visible elements */\n        if (index < offset || index > offset + count) return;\n\n        p.render.primitives.group(context, { matrix: matrixForTimepoint(context.matrix.get(), index) }, function () {\n          var v = (max - min) / 4;\n\n          p.render.primitives.rectangle(context, { x: 0, y: -v, width: 7, height: v, color: '#15E6C155' });\n        });\n      });\n    }\n\n    values.forEach(function (_ref3, index) {\n      var time = _ref3.time;\n\n      /* Draw only visible elements */\n      if (index < offset || index > offset + count) return;\n      /* Draw only every nth element */\n      if (index % nth > 0) return;\n\n      p.render.primitives.group(context, { matrix: matrixForTimepoint(context.matrix.get(), index) }, function () {\n        p.render.primitives.circle(context, { cx: 0, cy: 0, radius: 3, color: '#15E6C1', crop: false });\n        p.render.primitives.text(context, { x: 0, y: 20, text: time, color: '#ccc', crop: false });\n        p.render.primitives.line(context, { x0: 0, y0: -2000, x1: 0, y1: 2000, color: '#ddd' });\n      });\n    });\n  });\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/ChartContent/grid/timeline.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/ChartContent/index.js":
/*!****************************************************!*\
  !*** ./jarvis-chart/plugins/ChartContent/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _dataset = __webpack_require__(/*! ./dataset */ \"./jarvis-chart/plugins/ChartContent/dataset/index.js\");\n\nvar _dataset2 = _interopRequireDefault(_dataset);\n\nvar _grid = __webpack_require__(/*! ./grid */ \"./jarvis-chart/plugins/ChartContent/grid/index.js\");\n\nvar _grid2 = _interopRequireDefault(_grid);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * ChartContent плагин\n *\n * Добавляется в chart-window и рисует сетку и значения (собственно сам чарт)\n *\n * Использует сокеты: chart-window/inside\n * Создаёт сокеты: нет\n * Использует API: p.render (неявно)\n * Создаёт API: нет\n *\n */\nvar ChartContent = function ChartContent(p, options) {\n  p.on('chart-window/inside', function (_ref) {\n    var context = _ref.context,\n        state = _ref.state;\n\n\n    var values = p.values.get();\n\n    (0, _dataset2.default)(p, context, { values: values });\n    (0, _grid2.default)(p, context, { values: values, showIndicator: false });\n\n    return { context: context, state: state };\n  });\n};\n\nChartContent.plugin = {\n  name: 'chart-content',\n  version: '1.0.0',\n  dependencies: {\n    'chart-values': '1.0.0',\n    'chart-window': '1.0.0',\n    'state': '1.0.0'\n  }\n};\n\nexports.default = ChartContent;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/ChartContent/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/ChartModes/index.js":
/*!**************************************************!*\
  !*** ./jarvis-chart/plugins/ChartModes/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/**\n * ChartModes плагин\n *\n * Добавляет \"режимы работы\" чарта - создаёт поле \"режим\" в состоянии чарта (см. State) и дублирует некоторые события с именем текущего режима\n *\n * Использует сокеты: state/default, handler/attach\n * Создаёт сокеты: chart-modes/default\n * Использует API: p.handler, p.state\n * Создаёт API: p.mode\n *\n * chart-modes/default - сокет для задания дефолтного \"режима работы\" чарта\n *\n */\nvar ChartModes = function ChartModes(p) {\n\n  /* Добавляем параметр \"режим\" в состояние чарта */\n  p.on('state/default', function (state) {\n    return _extends({}, state, { mode: p.emitSync('chart-modes/default', null) });\n  });\n\n  /* Дублируем события с именем режима */\n  p.on('handler/attach', function () {\n    var emitModeEvent = function emitModeEvent(event, data) {\n      var mode = p.state.get().mode;\n\n      p.emitSync('chart-modes/' + mode + '/' + event, data);\n    };\n\n    p.handler.on('drag', function (data) {\n      return emitModeEvent('drag', data);\n    });\n    p.handler.on('click', function (data) {\n      return emitModeEvent('click', data);\n    });\n    p.handler.on('zoom', function (data) {\n      return emitModeEvent('zoom', data);\n    });\n    p.handler.on('path', function (data) {\n      return emitModeEvent('path', data);\n    });\n    p.handler.on('pathstart', function (data) {\n      return emitModeEvent('pathstart', data);\n    });\n    p.handler.on('pathend', function (data) {\n      return emitModeEvent('pathend', data);\n    });\n  });\n\n  /* Создаём API */\n  p.mode = {\n    set: function set(mode) {\n      return p.state.update(function (state) {\n        return _extends({}, state, { mode: mode });\n      });\n    },\n    get: function get() {\n      return p.state.get().mode;\n    }\n  };\n\n  /* Добавляем метод во внешний API (для работы с чартом извне) */\n  p.on('api', function (api) {\n    return _extends({}, api, { mode: p.mode });\n  });\n};\n\nChartModes.plugin = {\n  name: 'chart-modes',\n  version: '1.0.0',\n  dependencies: {\n    'handler': '1.0.0',\n    'state': '1.0.0'\n  }\n};\n\nexports.default = ChartModes;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/ChartModes/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/ChartValues/index.js":
/*!***************************************************!*\
  !*** ./jarvis-chart/plugins/ChartValues/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/**\n * ChartValues плагин\n *\n * Добавляет поле values в стейт. Values являются хранилищем для значений чарта\n * Дефолтное значение values подхватывается из опций\n *\n * Использует сокеты: state/default\n * Создаёт сокеты: нет\n * Использует API: нет\n * Создаёт API: p.values\n *\n */\nvar ChartValues = function ChartValues(p, options) {\n  p.on('state/default', function (state) {\n    return _extends({}, state, { values: options.values });\n  });\n\n  p.values = {\n    get: function get() {\n      return p.state.get().values;\n    },\n    set: function set(values) {\n      return p.state.update(function (state) {\n        return _extends({}, state, { values: values });\n      });\n    }\n  };\n};\n\nChartValues.plugin = {\n  name: 'chart-values',\n  version: '1.0.0',\n  dependencies: {\n    'state': '1.0.0'\n  }\n};\n\nexports.default = ChartValues;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/ChartValues/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/ChartWindow/calc-matrix.js":
/*!*********************************************************!*\
  !*** ./jarvis-chart/plugins/ChartWindow/calc-matrix.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _matrix = __webpack_require__(/*! ../../lib/matrix */ \"./jarvis-chart/lib/matrix.js\");\n\nvar _matrix2 = _interopRequireDefault(_matrix);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar calcNormalMatrix = function calcNormalMatrix(state, options) {\n  return _matrix2.default.join(_matrix2.default.translate(state.chartWindow.translate.x - options.width / 2, state.chartWindow.translate.y - options.height / 2), _matrix2.default.scale(state.chartWindow.zoom.x, state.chartWindow.zoom.y), _matrix2.default.translate(-state.chartWindow.translate.x + options.width / 2, -state.chartWindow.translate.y + options.height / 2), _matrix2.default.translate(state.chartWindow.translate.x, state.chartWindow.translate.y), _matrix2.default.translate(0, -options.height), _matrix2.default.scale(1, -1));\n};\n\nvar calcAutoMatrix = function calcAutoMatrix(state, options) {\n  var normalMatrix = calcNormalMatrix(state, options);\n\n  var _Matrix$apply = _matrix2.default.apply([0, 0], normalMatrix),\n      _Matrix$apply2 = _slicedToArray(_Matrix$apply, 1),\n      screenFirst = _Matrix$apply2[0];\n\n  var _Matrix$apply3 = _matrix2.default.apply([10, 0], normalMatrix),\n      _Matrix$apply4 = _slicedToArray(_Matrix$apply3, 1),\n      screenSecond = _Matrix$apply4[0];\n\n  var screenStart = -screenFirst;\n  var screenWidth = screenSecond - screenFirst;\n\n  var offset = Math.floor(screenStart / screenWidth);\n  var count = Math.ceil(options.width / screenWidth);\n\n  var min = state.values.slice(Math.max(0, offset), offset + count).reduce(function (acc, value) {\n    return Math.min(acc, value.min);\n  }, Infinity);\n  var max = state.values.slice(Math.max(0, offset), offset + count).reduce(function (acc, value) {\n    return Math.max(acc, value.max);\n  }, -Infinity);\n\n  return _matrix2.default.join(\n  // Scale relative to screen center by X and at 0 by Y (since we translate on -min)\n  _matrix2.default.translate(-options.width / 2, -0), _matrix2.default.translate(state.chartWindow.translate.x, -0), _matrix2.default.scale(state.chartWindow.zoom.x, options.height / (max - min)), _matrix2.default.translate(options.width / 2, 0), _matrix2.default.translate(-state.chartWindow.translate.x, 0),\n\n  // Move where we want\n  _matrix2.default.translate(state.chartWindow.translate.x, -(min * options.height / (max - min))),\n\n  // Transform coordinate system\n  _matrix2.default.translate(0, -options.height), _matrix2.default.scale(1, -1));\n};\n\nvar calcMatrix = function calcMatrix(state, options) {\n  return state.chartWindow.autoZoom ? calcAutoMatrix(state, options) : calcNormalMatrix(state, options);\n};\n\nexports.default = calcMatrix;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/ChartWindow/calc-matrix.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/ChartWindow/index.js":
/*!***************************************************!*\
  !*** ./jarvis-chart/plugins/ChartWindow/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _matrix = __webpack_require__(/*! ../../lib/matrix */ \"./jarvis-chart/lib/matrix.js\");\n\nvar _matrix2 = _interopRequireDefault(_matrix);\n\nvar _calcMatrix = __webpack_require__(/*! ./calc-matrix */ \"./jarvis-chart/plugins/ChartWindow/calc-matrix.js\");\n\nvar _calcMatrix2 = _interopRequireDefault(_calcMatrix);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ChartWindow = function ChartWindow(p, options) {\n\n  /* Add Chart Window parameters to state */\n  p.on('state/default', function (state) {\n    var defaultChartWindowState = {\n      translate: { x: 0, y: 0 },\n      zoom: { x: 1, y: 1 },\n      autoZoom: false\n    };\n\n    return _extends({}, state, { chartWindow: defaultChartWindowState });\n  });\n\n  var matrix = void 0;\n\n  /* Update matrix only when state got updated (or when default state) */\n\n  var recalcMatrix = function recalcMatrix(state) {\n    matrix = (0, _calcMatrix2.default)(state, options);\n  };\n\n  p.on('state/update', function (state) {\n    recalcMatrix(state);\n  });\n\n  p.on('state/default', function (state) {\n    recalcMatrix(state);\n    return state;\n  }, -1000);\n\n  /* Render chart window and allow stuff inside to render */\n\n  p.on('render/draw', function (_ref) {\n    var context = _ref.context,\n        state = _ref.state;\n\n    p.render.primitives.group(context, { matrix: matrix }, function () {\n      p.emitSync('chart-window/inside', { context: context, state: state });\n    });\n\n    return { context: context, state: state };\n  });\n\n  p.chartWindow = {\n    getMatrix: function getMatrix() {\n      return matrix;\n    },\n    setAutoZoom: function setAutoZoom(autoZoom) {\n      return p.state.update(function (state) {\n        state.chartWindow.autoZoom = autoZoom;\n        return state;\n      });\n    },\n    translate: {\n      get: function get() {\n        return p.state.get().chartWindow.translate;\n      },\n      set: function set(t) {\n        return p.state.update(function (state) {\n          state.chartWindow.translate = t;\n          return state;\n        });\n      }\n    },\n    zoom: {\n      get: function get() {\n        return p.state.get().chartWindow.zoom;\n      },\n      set: function set(z) {\n        return p.state.update(function (state) {\n          state.chartWindow.zoom = z;\n          return state;\n        });\n      }\n    },\n    toWorld: function toWorld(a) {\n      return _matrix2.default.apply(a, matrix.reverse());\n    }\n  };\n\n  p.on('api', function (api) {\n    return _extends({}, api, { chartWindow: p.chartWindow });\n  });\n};\n\nChartWindow.plugin = {\n  name: 'chart-window',\n  version: '1.0.0',\n  dependencies: {\n    'chart-values': '1.0.0',\n    'render': '1.0.0',\n    'state': '1.0.0'\n  }\n};\n\nexports.default = ChartWindow;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/ChartWindow/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Elements/index.js":
/*!************************************************!*\
  !*** ./jarvis-chart/plugins/Elements/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/* */\nvar Elements = function Elements(p) {\n  /* Elements handlers */\n  var elementsHandlers = {};\n\n  /* Elements API */\n  p.elements = {\n    register: function register(type, handler) {\n      return elementsHandlers[type] = handler;\n    },\n    push: function push(type, meta) {\n      return p.state.update(function (state) {\n        state.elements.push({ type: type, meta: meta });\n        return state;\n      });\n    }\n  };\n\n  /* Add elements array to the state */\n  p.on('state/default', function (state) {\n    return _extends({}, state, { elements: [] });\n  });\n\n  /* Render all elements from the state inside the chart window */\n  p.on('chart-window/inside', function (_ref) {\n    var context = _ref.context,\n        state = _ref.state;\n    var elements = state.elements;\n\n\n    elements.forEach(function (element) {\n      var type = element.type,\n          meta = element.meta;\n\n\n      elementsHandlers[type](context, meta);\n    });\n\n    return { context: context, state: state };\n  });\n};\n\nElements.plugin = {\n  name: 'elements',\n  version: '1.0.0',\n  dependencies: {\n    'state': '1.0.0',\n    'chart-window': '1.0.0'\n  }\n};\n\nexports.default = Elements;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Elements/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Ellipse/index.js":
/*!***********************************************!*\
  !*** ./jarvis-chart/plugins/Ellipse/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar distance = function distance(x0, y0, x1, y1) {\n  return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));\n};\n\nvar drawEllipse = function drawEllipse(p, context, _ref) {\n  var start = _ref.start,\n      radiusx = _ref.radiusx,\n      radiusy = _ref.radiusy;\n\n  p.render.primitives.ellipse(context, { cx: start.xreal, cy: start.yreal, radiusx: radiusx, radiusy: radiusy, color: '#ccc' });\n};\n\n/**\n * Fibonacci plugin\n *\n */\nvar Ellipse = function Ellipse(p) {\n\n  /* Register brush element */\n  p.elements.register('ellipse', function (context, meta) {\n    var start = meta.start,\n        radiusx = meta.radiusx,\n        radiusy = meta.radiusy;\n\n\n    if (start && radiusx && radiusy) {\n      drawEllipse(p, context, { start: start, radiusx: radiusx, radiusy: radiusy });\n    }\n  });\n\n  /* Add the brush we currently draw to the state */\n  p.on('state/default', function (state) {\n    return _extends({}, state, { ellipse: [] });\n  });\n\n  /* Render the brush we curently draw */\n  p.on('chart-window/inside', function (_ref2) {\n    var context = _ref2.context,\n        state = _ref2.state;\n    var ellipse = state.ellipse;\n\n\n    if (ellipse) {\n      var start = ellipse.start,\n          radiusx = ellipse.radiusx,\n          radiusy = ellipse.radiusy;\n\n\n      if (start && radiusx && radiusy) {\n        drawEllipse(p, context, { start: start, radiusx: radiusx, radiusy: radiusy });\n      }\n    }\n\n    return { context: context, state: state };\n  });\n\n  /* Process events */\n\n  p.on('chart-modes/ellipse/pathstart', function (_ref3) {\n    var x = _ref3.x,\n        y = _ref3.y,\n        e = _ref3.e;\n\n    var _p$chartWindow$toWorl = p.chartWindow.toWorld([x, y]),\n        _p$chartWindow$toWorl2 = _slicedToArray(_p$chartWindow$toWorl, 2),\n        xreal = _p$chartWindow$toWorl2[0],\n        yreal = _p$chartWindow$toWorl2[1];\n\n    p.state.update(function (state) {\n      state.ellipse = {\n        start: { x: x, y: y, xreal: xreal, yreal: yreal },\n        radiusx: null,\n        radiusy: null\n      };\n\n      return state;\n    });\n  });\n\n  p.on('chart-modes/ellipse/pathend', function (_ref4) {\n    var x = _ref4.x,\n        y = _ref4.y,\n        e = _ref4.e;\n\n    p.elements.push('ellipse', p.state.get().ellipse);\n\n    p.state.update(function (state) {\n      state.ellipse = null;\n      return state;\n    });\n  });\n\n  p.on('chart-modes/ellipse/path', function (_ref5) {\n    var x = _ref5.x,\n        y = _ref5.y,\n        e = _ref5.e;\n\n    var _p$chartWindow$toWorl3 = p.chartWindow.toWorld([x, y]),\n        _p$chartWindow$toWorl4 = _slicedToArray(_p$chartWindow$toWorl3, 2),\n        xreal = _p$chartWindow$toWorl4[0],\n        yreal = _p$chartWindow$toWorl4[1];\n\n    var _p$state$get = p.state.get(),\n        ellipse = _p$state$get.ellipse;\n\n    var radius = distance(ellipse.start.x, ellipse.start.y, x, y);\n\n    var radiusx = Math.abs(radius / p.chartWindow.getMatrix().getValues().a);\n    var radiusy = Math.abs(radius / p.chartWindow.getMatrix().getValues().d);\n\n    p.state.update(function (state) {\n      state.ellipse.radiusx = radiusx;\n      state.ellipse.radiusy = radiusy;\n      return state;\n    });\n  });\n};\n\nEllipse.plugin = {\n  name: 'ellipse',\n  version: '1.0.0',\n  dependencies: {\n    'render': '1.0.0',\n    'state': '1.0.0',\n    'elements': '1.0.0',\n    'chart-modes': '1.0.0',\n    'chart-window': '1.0.0'\n  }\n};\n\nexports.default = Ellipse;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Ellipse/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Handler/index.js":
/*!***********************************************!*\
  !*** ./jarvis-chart/plugins/Handler/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _eventEmitter = __webpack_require__(/*! ../../lib/event-emitter */ \"./jarvis-chart/lib/event-emitter.js\");\n\nvar _eventEmitter2 = _interopRequireDefault(_eventEmitter);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Handler Plugin\n *\n * Attaches handler node to the parent node and captures events.\n *\n * Sockets Used: mount\n * Sockets Provided: handler/attach\n * API Provided: handler\n */\nvar Handler = function Handler(p) {\n  /* Attach to the main node on mount */\n  p.on('mount', function (_ref) {\n    var node = _ref.node,\n        options = _ref.options;\n\n    var div = document.createElement('div');\n\n    div.style.width = \"100%\";\n    div.style.height = \"100%\";\n    div.style.position = \"absolute\";\n\n    node.appendChild(div);\n\n    var ee = (0, _eventEmitter2.default)();\n\n    /* Attach listeners API. Since we may need to add events later then now... */\n    p.handler = {\n      /* Listen to synthetic events */\n      on: ee.on,\n      /* Emit a synthetic event */\n      emit: ee.emit,\n      /* Listen to native event */\n      attach: function attach(name, listener) {\n        return div.addEventListener(name, listener);\n      }\n    };\n\n    p.emitSync('handler/attach');\n\n    return { node: node };\n  });\n};\n\nHandler.plugin = {\n  name: 'handler',\n  version: '1.0.0',\n  dependencies: {}\n};\n\nexports.default = Handler;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Handler/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Primitives/index.js":
/*!**************************************************!*\
  !*** ./jarvis-chart/plugins/Primitives/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _circle = __webpack_require__(/*! ./primitives/circle */ \"./jarvis-chart/plugins/Primitives/primitives/circle.js\");\n\nvar _circle2 = _interopRequireDefault(_circle);\n\nvar _line = __webpack_require__(/*! ./primitives/line */ \"./jarvis-chart/plugins/Primitives/primitives/line.js\");\n\nvar _line2 = _interopRequireDefault(_line);\n\nvar _rectangle = __webpack_require__(/*! ./primitives/rectangle */ \"./jarvis-chart/plugins/Primitives/primitives/rectangle.js\");\n\nvar _rectangle2 = _interopRequireDefault(_rectangle);\n\nvar _text = __webpack_require__(/*! ./primitives/text */ \"./jarvis-chart/plugins/Primitives/primitives/text.js\");\n\nvar _text2 = _interopRequireDefault(_text);\n\nvar _group = __webpack_require__(/*! ./primitives/group */ \"./jarvis-chart/plugins/Primitives/primitives/group.js\");\n\nvar _group2 = _interopRequireDefault(_group);\n\nvar _ellipse = __webpack_require__(/*! ./primitives/ellipse */ \"./jarvis-chart/plugins/Primitives/primitives/ellipse.js\");\n\nvar _ellipse2 = _interopRequireDefault(_ellipse);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Primitives plugin\n *\n * Attaches primitives to render API\n *\n * Sockets Used: render/collect-primitives\n *\n */\nvar Primitives = function Primitives(p) {\n  /* Extends render API */\n  p.on('render/collect-primitives', function () {\n    p.render.primitives = { circle: _circle2.default, line: _line2.default, rectangle: _rectangle2.default, text: _text2.default, group: _group2.default, ellipse: _ellipse2.default };\n  });\n};\n\nPrimitives.plugin = {\n  name: 'primitives',\n  version: '1.0.0',\n  dependencies: {\n    'render': '1.0.0'\n  }\n};\n\nexports.default = Primitives;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Primitives/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Primitives/primitives/circle.js":
/*!**************************************************************!*\
  !*** ./jarvis-chart/plugins/Primitives/primitives/circle.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (context, _ref) {\n  var cx = _ref.cx,\n      cy = _ref.cy,\n      radius = _ref.radius,\n      color = _ref.color,\n      matrix = _ref.matrix,\n      _ref$crop = _ref.crop,\n      crop = _ref$crop === undefined ? true : _ref$crop;\n\n  /* Auto Crop Element when invisible */\n  /* TODO does not work, screen coords are not calculated correctly */\n  // if (\n  //   crop &&\n  //   !context.matrix.crop(cx - radius, cy - radius) &&\n  //   !context.matrix.crop(cx + radius, cy + radius)\n  // ) return;\n\n  switch (context.type) {\n    case 'svg':\n      context.push('\\n        <circle cx=\\'' + cx + '\\' cy=\\'' + cy + '\\' r=\\'' + radius + '\\' fill=\\'' + color + '\\' transform=\\'' + (matrix ? matrix.toCss() : '') + '\\' />\\n      ');\n\n      break;\n    case 'canvas':\n      if (matrix) {\n        context.matrix.push(matrix);\n      }\n\n      context.beginPath();\n      context.arc(cx, cy, radius, 0, 2 * Math.PI);\n      context.fillStyle = color;\n      context.fill();\n\n      if (matrix) {\n        context.matrix.push(matrix);\n      }\n\n      break;\n    default:\n      throw 'Circle is not implemented for ' + options.render;\n  }\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Primitives/primitives/circle.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Primitives/primitives/ellipse.js":
/*!***************************************************************!*\
  !*** ./jarvis-chart/plugins/Primitives/primitives/ellipse.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (context, _ref) {\n  var cx = _ref.cx,\n      cy = _ref.cy,\n      radiusx = _ref.radiusx,\n      radiusy = _ref.radiusy,\n      color = _ref.color,\n      matrix = _ref.matrix,\n      _ref$crop = _ref.crop,\n      crop = _ref$crop === undefined ? true : _ref$crop;\n\n  /* Auto Crop Element when invisible */\n  /* TODO does not work, screen coords are not calculated correctly */\n  // if (\n  //   crop &&\n  //   !context.matrix.crop(cx - radius, cy - radius) &&\n  //   !context.matrix.crop(cx + radius, cy + radius)\n  // ) return;\n\n  switch (context.type) {\n    case 'svg':\n      context.push('\\n        <ellipse cx=\\'' + cx + '\\' cy=\\'' + cy + '\\' rx=\\'' + radiusx + '\\' ry=\\'' + radiusy + '\\' fill=\\'' + color + '\\' transform=\\'' + (matrix ? matrix.toCss() : '') + '\\' />\\n      ');\n\n      break;\n    case 'canvas':\n      if (matrix) {\n        context.matrix.push(matrix);\n      }\n\n      context.beginPath();\n      context.ellipse(cx, cy, radiusx, radiusy, 0, 0, 2 * Math.PI);\n      context.fillStyle = color;\n      context.fill();\n\n      if (matrix) {\n        context.matrix.push(matrix);\n      }\n\n      break;\n    default:\n      throw 'Circle is not implemented for ' + options.render;\n  }\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Primitives/primitives/ellipse.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Primitives/primitives/group.js":
/*!*************************************************************!*\
  !*** ./jarvis-chart/plugins/Primitives/primitives/group.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (context, _ref, cb) {\n  var matrix = _ref.matrix;\n\n  switch (context.type) {\n    case 'canvas':\n    case 'svg':\n      if (matrix) {\n        context.matrix.push(matrix);\n      }\n\n      cb(matrix);\n\n      if (matrix) {\n        context.matrix.pop();\n      }\n\n      break;\n    default:\n      throw 'Group is not implemented for ' + options.render;\n  }\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Primitives/primitives/group.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Primitives/primitives/line.js":
/*!************************************************************!*\
  !*** ./jarvis-chart/plugins/Primitives/primitives/line.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (context, _ref) {\n  var x0 = _ref.x0,\n      y0 = _ref.y0,\n      x1 = _ref.x1,\n      y1 = _ref.y1,\n      width = _ref.width,\n      color = _ref.color,\n      matrix = _ref.matrix;\n\n  switch (context.type) {\n    case 'svg':\n      context.push('\\n        <line x1=\\'' + x0 + '\\' y1=\\'' + y0 + '\\' x2=\\'' + x1 + '\\' y2=\\'' + y1 + '\\' style=\\'stroke: ' + color + '; strokeWidth: ' + width + '\\' transform=\\'' + (matrix ? matrix.toCss() : '') + '\\' />\\n      ');\n\n      break;\n    case 'canvas':\n      if (matrix) {\n        var _matrix$getValues = matrix.getValues(),\n            a = _matrix$getValues.a,\n            b = _matrix$getValues.b,\n            c = _matrix$getValues.c,\n            d = _matrix$getValues.d,\n            tx = _matrix$getValues.tx,\n            ty = _matrix$getValues.ty;\n\n        context.save();\n        context.transform(a, b, c, d, tx, ty);\n      }\n\n      context.beginPath();\n      context.moveTo(x0, y0);\n      context.lineTo(x1, y1);\n      context.lineWidth = width === 1 ? 0.6 : width;\n      context.strokeStyle = color;\n      context.stroke();\n\n      if (matrix) {\n        context.restore();\n      }\n\n      break;\n    default:\n      throw 'Line is not implemented for ' + options.render;\n  }\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Primitives/primitives/line.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Primitives/primitives/rectangle.js":
/*!*****************************************************************!*\
  !*** ./jarvis-chart/plugins/Primitives/primitives/rectangle.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.default = function (context, _ref) {\n  var x = _ref.x,\n      y = _ref.y,\n      width = _ref.width,\n      height = _ref.height,\n      color = _ref.color,\n      matrix = _ref.matrix;\n\n  switch (context.type) {\n    case 'svg':\n      context.push('\\n        <rect x=\\'' + x + '\\' y=\\'' + y + '\\' width=\\'' + width + '\\' height=\\'' + height + '\\' style=\\'fill: ' + color + '\\' transform=\\'' + (matrix ? matrix.toCss() : '') + '\\' />\\n      ');\n\n      break;\n    case 'canvas':\n      if (matrix) {\n        var _matrix$getValues = matrix.getValues(),\n            a = _matrix$getValues.a,\n            b = _matrix$getValues.b,\n            c = _matrix$getValues.c,\n            d = _matrix$getValues.d,\n            tx = _matrix$getValues.tx,\n            ty = _matrix$getValues.ty;\n\n        context.save();\n        context.transform(a, b, c, d, tx, ty);\n      }\n\n      context.beginPath();\n      context.rect(x, y, width, height);\n      context.fillStyle = color;\n      context.fill();\n\n      if (matrix) {\n        context.restore();\n      }\n\n      break;\n    default:\n      throw 'Rectangle is not implemented for ' + options.render;\n  }\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Primitives/primitives/rectangle.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Primitives/primitives/text.js":
/*!************************************************************!*\
  !*** ./jarvis-chart/plugins/Primitives/primitives/text.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar textAlignToTextAnchor = function textAlignToTextAnchor(textAlign) {\n  return { 'left': 'start', 'center': 'middle', 'right': 'end' }[textAlign];\n};\n\nexports.default = function (context, _ref) {\n  var x = _ref.x,\n      y = _ref.y,\n      _ref$font = _ref.font,\n      font = _ref$font === undefined ? \"13px arial\" : _ref$font,\n      text = _ref.text,\n      matrix = _ref.matrix,\n      _ref$textAlign = _ref.textAlign,\n      textAlign = _ref$textAlign === undefined ? 'center' : _ref$textAlign,\n      _ref$color = _ref.color,\n      color = _ref$color === undefined ? 'black' : _ref$color,\n      _ref$crop = _ref.crop,\n      crop = _ref$crop === undefined ? true : _ref$crop;\n\n  // if (\n  //   crop &&\n  //   !context.matrix.crop(x, y)\n  // ) return;\n\n  switch (context.type) {\n    case 'svg':\n      context.push('\\n        <text x=\\'' + x + '\\' y=\\'' + y + '\\' text-anchor=\\'' + textAlignToTextAnchor(textAlign) + '\\' fill=\\'' + color + '\\' style=\\'font: ' + font + '\\' transform=\\'' + (matrix ? matrix.toCss() : '') + '\\' >\\n          ' + text + '\\n        </text>\\n      ');\n\n      break;\n    case 'canvas':\n      if (matrix) {\n        var _matrix$getValues = matrix.getValues(),\n            a = _matrix$getValues.a,\n            b = _matrix$getValues.b,\n            c = _matrix$getValues.c,\n            d = _matrix$getValues.d,\n            tx = _matrix$getValues.tx,\n            ty = _matrix$getValues.ty;\n\n        context.save();\n        context.transform(a, b, c, d, tx, ty);\n      }\n\n      context.font = font;\n      context.textAlign = textAlign;\n      context.fillStyle = color;\n      context.fillText(text, x, y);\n\n      if (matrix) {\n        context.restore();\n      }\n\n      break;\n    default:\n      throw 'Text is not implemented for ' + options.render;\n  }\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Primitives/primitives/text.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Render/context.js":
/*!************************************************!*\
  !*** ./jarvis-chart/plugins/Render/context.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _transform = __webpack_require__(/*! ./transform */ \"./jarvis-chart/plugins/Render/transform.js\");\n\nvar _transform2 = _interopRequireDefault(_transform);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Svg Render Context\n */\nvar buildSvgContext = function buildSvgContext(node, options) {\n  var width = node.offsetWidth;\n  var height = node.offsetHeight;\n\n  var xmlns = \"http://www.w3.org/2000/svg\";\n  var svg = document.createElementNS(xmlns, \"svg\");\n\n  svg.setAttributeNS(null, \"width\", width);\n  svg.setAttributeNS(null, \"height\", height);\n\n  options.width = width;\n  options.height = height;\n\n  node.appendChild(svg);\n\n  var content = void 0;\n\n  var element = svg;\n  var context = {};\n\n  context.clear = function () {\n    return content = '';\n  };\n  context.flush = function () {\n    return element.innerHTML = content;\n  };\n\n  context.push = function (figure) {\n    return content += figure;\n  };\n\n  /* Attach matrix API */\n  context.matrix = (0, _transform2.default)({\n    width: width, height: height,\n    push: function push(matrix) {\n      return context.push(\"<g transform='\" + matrix.toCss() + \"'>\");\n    },\n    pop: function pop() {\n      return context.push('</g>');\n    }\n  });\n\n  context.type = 'svg';\n\n  return context;\n};\n\n/**\n * Canvas Render Context\n */\nvar buildCanvasContext = function buildCanvasContext(node, options) {\n  var width = node.offsetWidth;\n  var height = node.offsetHeight;\n\n  var canvas = document.createElement('canvas');\n  var buffer = document.createElement('canvas');\n\n  canvas.width = width;\n  canvas.height = height;\n\n  buffer.width = width;\n  buffer.height = height;\n\n  options.width = width;\n  options.height = height;\n\n  node.appendChild(canvas);\n\n  var realContext = canvas.getContext('2d');\n  var context = buffer.getContext('2d');\n  // const context = canvas.getContext('2d');\n  // const buffer  = document.createElement('canvas').getContext('2d');\n\n  context.clear = function () {\n    context.clearRect(0, 0, width, height);\n    realContext.clearRect(0, 0, width, height);\n  };\n  context.flush = function () {/* nope */};\n  context.flush = function () {\n    return realContext.drawImage(buffer, 0, 0);\n  };\n\n  /* Attach matrix API */\n  context.matrix = (0, _transform2.default)({\n    width: width, height: height,\n    push: function push(matrix) {\n      var _matrix$getValues = matrix.getValues(),\n          a = _matrix$getValues.a,\n          b = _matrix$getValues.b,\n          c = _matrix$getValues.c,\n          d = _matrix$getValues.d,\n          tx = _matrix$getValues.tx,\n          ty = _matrix$getValues.ty;\n\n      context.save();\n      context.transform(a, b, c, d, tx, ty);\n    },\n    pop: function pop() {\n      return context.restore();\n    }\n  });\n\n  context.type = 'canvas';\n\n  return context;\n};\n\n/**\n * Facade for context\n */\nvar buildContext = function buildContext(node, options) {\n  switch (options.render) {\n    case 'svg':\n      return buildSvgContext(node, options);\n    case 'canvas':\n      return buildCanvasContext(node, options);\n    default:\n      throw \"Context is not implemented for \" + options.render;\n  }\n};\n\nexports.default = buildContext;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Render/context.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Render/index.js":
/*!**********************************************!*\
  !*** ./jarvis-chart/plugins/Render/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _context = __webpack_require__(/*! ./context */ \"./jarvis-chart/plugins/Render/context.js\");\n\nvar _context2 = _interopRequireDefault(_context);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Render plugin\n *\n * Creates a Context node (depending on render method)\n *\n * TODO add redrawContinuously option support\n *\n * Sockets Used: state/default, mount\n * Sockets Provided: render/draw, render/collect-primitives\n * API Provided: render\n *\n */\nvar Render = function Render(p, options) {\n\n  /* Attach to the main node on mount */\n  p.on('mount', function (_ref) {\n    var node = _ref.node;\n\n\n    /* Create context */\n    var context = (0, _context2.default)(node, options);\n\n    var state = null;\n    var requested = false;\n\n    /* Declare Draw API - this is a mock for draw calls */\n    p.render = {\n      _draw: function _draw() {\n        context.clear();\n\n        p.emitSync('render/draw', { context: context, state: state });\n\n        context.flush();\n\n        requestAnimationFrame(p.render._draw);\n        requested = true;\n      },\n      draw: function draw(_state) {\n        state = _state;\n\n        if (!requested) p.render._draw();\n      }\n    };\n\n    p.emitSync('render/collect-primitives');\n\n    return { node: node };\n  });\n};\n\nRender.plugin = {\n  name: 'render',\n  version: '1.0.0',\n  dependencies: {}\n};\n\nexports.default = Render;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Render/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/Render/transform.js":
/*!**************************************************!*\
  !*** ./jarvis-chart/plugins/Render/transform.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _matrix = __webpack_require__(/*! ../../lib/matrix */ \"./jarvis-chart/lib/matrix.js\");\n\nvar _matrix2 = _interopRequireDefault(_matrix);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Since we need to keep track of what is the current matrix, we need\n * to substitue native contexts' APIs with our custom one.\n *\n */\nexports.default = function (options) {\n  var transforms = [];\n\n  var push = function push(matrix) {\n    transforms.push({ matrix: matrix, acc: null, crop: null });\n\n    options.push(matrix);\n  };\n\n  var pop = function pop() {\n    transforms.pop();\n\n    options.pop();\n  };\n\n  /**\n   * The reason - ability to have access to currently applied matrix.\n   * We need it to be able to resetScale to default when drawing text or circles\n   */\n  var get = function get() {\n    if (transforms.length === 0) return _matrix2.default.identity();\n\n    var last = transforms[transforms.length - 1];\n\n    if (!last.acc) {\n      transforms.forEach(function (transform, index) {\n        if (index === 0) {\n          transform.acc = transform.matrix;\n        } else {\n          if (!transform.acc) {\n            transform.acc = _matrix2.default.multiply(transforms[index - 1].acc, transform.matrix);\n          }\n        }\n      });\n    }\n\n    return last.acc;\n  };\n\n  /**\n   * Map point to the screen coords\n   */\n  var screen = function screen(point) {\n    return _matrix2.default.apply(point, get());\n  };\n\n  screen.dimensions = function () {\n    return { width: options.width, height: options.height };\n  };\n\n  /**\n   * Check point for visibility\n   *\n   * TODO works not right\n   */\n  var crop = function crop(x, y) {\n    var point = [x, y];\n\n    var _screen = screen(point),\n        _screen2 = _slicedToArray(_screen, 2),\n        x1 = _screen2[0],\n        y1 = _screen2[1];\n\n    return crop.raw(x1, y1);\n  };\n\n  /**\n   * Raw check for point in screen coords\n   */\n  crop.raw = function (x, y) {\n    return x >= 0 && x <= options.width && y >= 0 && y <= options.height;\n  };\n\n  return { push: push, pop: pop, get: get, crop: crop, screen: screen };\n};\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/Render/transform.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/State/index.js":
/*!*********************************************!*\
  !*** ./jarvis-chart/plugins/State/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n/**\n * State Plugin\n *\n * Creates a Store for the application State\n *\n * Sockets Used: mount, api\n * Sockets Provided: 'state/default'\n * API Provided: state\n *\n */\nvar State = function State(p) {\n  p.on('mount', function (_ref) {\n    var node = _ref.node;\n\n    var state = void 0;\n\n    p.state = {\n      update: function update(updater) {\n        state = updater(state);\n        p.emitSync('state/update', state);\n        p.render.draw(state);\n      },\n      get: function get() {\n        return state;\n      }\n    };\n\n    state = p.emitSync('state/default', {});\n\n    p.render.draw(state);\n\n    return { node: node };\n  });\n\n  p.on('api', function (api) {\n    return _extends({}, api, { state: p.state });\n  });\n};\n\nState.plugin = {\n  name: 'state',\n  version: '1.0.0',\n  dependencies: {\n    'render': '1.0.0'\n  }\n};\n\nexports.default = State;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/State/index.js?");

/***/ }),

/***/ "./jarvis-chart/plugins/ViewMode/index.js":
/*!************************************************!*\
  !*** ./jarvis-chart/plugins/ViewMode/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar ViewMode = function ViewMode(p) {\n\n  /* Set default mode to view */\n  p.on('chart-modes/default', function (mode) {\n    return 'view';\n  });\n\n  /* Handle drag when view mode */\n  p.on('chart-modes/view/drag', function (_ref) {\n    var x = _ref.x,\n        y = _ref.y,\n        e = _ref.e;\n\n    var _p$chartWindow$transl = p.chartWindow.translate.get(),\n        tx = _p$chartWindow$transl.x,\n        ty = _p$chartWindow$transl.y;\n\n    var _p$chartWindow$zoom$g = p.chartWindow.zoom.get(),\n        zx = _p$chartWindow$zoom$g.x,\n        zy = _p$chartWindow$zoom$g.y;\n\n    p.chartWindow.translate.set({\n      x: tx + x / zx,\n      y: ty - y / zy\n    });\n  });\n\n  p.on('chart-modes/view/zoom', function (_ref2) {\n    var delta = _ref2.delta,\n        e = _ref2.e;\n\n    var _p$chartWindow$zoom$g2 = p.chartWindow.zoom.get(),\n        zx = _p$chartWindow$zoom$g2.x,\n        zy = _p$chartWindow$zoom$g2.y;\n\n    p.chartWindow.zoom.set({\n      x: zx - delta / 1000,\n      y: zy - delta / 1000\n    });\n  });\n};\n\nViewMode.plugin = {\n  name: 'view-mode',\n  version: '1.0.0',\n  dependencies: {\n    'chart-window': '1.0.0',\n    'chart-modes': '1.0.0'\n  }\n};\n\nexports.default = ViewMode;\n\n//# sourceURL=webpack:///./jarvis-chart/plugins/ViewMode/index.js?");

/***/ }),

/***/ "./values.js":
/*!*******************!*\
  !*** ./values.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar VALUES_SAMPLE_COUNT = 1000;\n\n/* Shortcut for the value */\nvar value = function value(min, max, open, close, time) {\n  return { min: min, max: max, open: open, close: close, time: time };\n};\n\n/* Just a string time helper */\nvar toTwo = function toTwo(v) {\n  return new Array(2 - v.length).fill('0').join('') + v;\n};\n\n/* Get time from index */\nvar getTime = function getTime(index) {\n  var hours = Math.floor(index / 60);\n  var minutes = index % 60;\n\n  return toTwo(hours.toString()) + ':' + toTwo(minutes.toString());\n};\n\n/* Values array */\nvar values = [];\n\nfor (var i = 0; i < VALUES_SAMPLE_COUNT; ++i) {\n  var open = i > 0 ? values[i - 1].close : Math.random() * 200 + 30;\n  var close = Math.max(20, open + Math.random() * 60 - 30);\n\n  var min = Math.min(open, close) - Math.random() * 20;\n  var max = Math.max(open, close) + Math.random() * 50;\n\n  var time = getTime(i);\n\n  values.push(value(min, max, open, close, time));\n}\n\nexports.default = values;\n\n//# sourceURL=webpack:///./values.js?");

/***/ })

/******/ });