(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"), require("d3-dispatch"));
	else if(typeof define === 'function' && define.amd)
		define(["d3-selection", "d3-dispatch"], factory);
	else if(typeof exports === 'object')
		exports["d3Kit"] = factory(require("d3-selection"), require("d3-dispatch"));
	else
		root["d3Kit"] = factory(root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.helper = exports.LayerOrganizer = exports.Chartlet = exports.Skeleton = undefined;

	var _Skeleton = __webpack_require__(1);

	Object.defineProperty(exports, 'Skeleton', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Skeleton).default;
	  }
	});

	var _chartlet = __webpack_require__(34);

	Object.defineProperty(exports, 'Chartlet', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_chartlet).default;
	  }
	});

	var _layerOrganizer = __webpack_require__(18);

	Object.defineProperty(exports, 'LayerOrganizer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_layerOrganizer).default;
	  }
	});

	var _helper2 = __webpack_require__(32);

	var _helper = _interopRequireWildcard(_helper2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var helper = exports.helper = _helper;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _d3Selection = __webpack_require__(2);

	var _d3Dispatch = __webpack_require__(3);

	var _debounce = __webpack_require__(4);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _FitWatcher = __webpack_require__(12);

	var _FitWatcher2 = _interopRequireDefault(_FitWatcher);

	var _Fitter = __webpack_require__(13);

	var _Fitter2 = _interopRequireDefault(_Fitter);

	var _layerOrganizer = __webpack_require__(18);

	var _layerOrganizer2 = _interopRequireDefault(_layerOrganizer);

	var _helper = __webpack_require__(32);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Skeleton = function () {
	  _createClass(Skeleton, null, [{
	    key: 'getCustomEventNames',
	    value: function getCustomEventNames() {
	      return [];
	    }
	  }]);

	  function Skeleton(selector, options) {
	    _classCallCheck(this, Skeleton);

	    var mergedOptions = (0, _helper.deepExtend)({}, Skeleton.DEFAULT_OPTIONS, options);

	    this.state = {
	      width: mergedOptions.initialWidth,
	      height: mergedOptions.initialHeight,
	      innerWidth: 0,
	      innerHeight: 0,
	      fitOptions: null,
	      options: mergedOptions,
	      data: null
	    };

	    this.container = (0, _d3Selection.select)(selector);
	    this.svg = this.container.append('svg');
	    this.rootG = this.svg.append('g');
	    this.layers = new _layerOrganizer2.default(this.rootG);

	    var customEvents = this.constructor.getCustomEventNames();
	    this.setupDispatcher(customEvents);

	    this.updateDimension = (0, _debounce2.default)(this.updateDimension.bind(this), 1);
	    this.dispatchData = (0, _debounce2.default)(this.dispatchData.bind(this), 1);
	    this.dispatchOptions = (0, _debounce2.default)(this.dispatchOptions.bind(this), 1);
	    this.dispatchResize = (0, _debounce2.default)(this.dispatchResize.bind(this), 1);

	    this.updateDimensionNow();
	  }

	  _createClass(Skeleton, [{
	    key: 'setupDispatcher',
	    value: function setupDispatcher() {
	      var customEventNames = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	      this.customEventNames = customEventNames;
	      this.eventNames = Skeleton.DEFAULT_EVENTS.concat(customEventNames);
	      this.dispatcher = _d3Dispatch.dispatch.apply(this, this.eventNames);
	    }
	  }, {
	    key: 'getCustomEventNames',
	    value: function getCustomEventNames() {
	      return this.customEventNames;
	    }
	  }, {
	    key: 'getInnerWidth',
	    value: function getInnerWidth() {
	      return this.state.innerWidth;
	    }
	  }, {
	    key: 'getInnerHeight',
	    value: function getInnerHeight() {
	      return this.state.innerHeight;
	    }
	  }, {
	    key: 'width',
	    value: function width() {
	      if (arguments.length === 0) return this.state.width;
	      var newValue = Math.floor(+(arguments.length <= 0 ? undefined : arguments[0]));
	      if (newValue !== this.state.width) {
	        this.state.width = newValue;
	        this.updateDimension();
	        this.dispatchResize();
	      }
	      return this;
	    }
	  }, {
	    key: 'height',
	    value: function height() {
	      if (arguments.length === 0) return this.state.height;
	      var newValue = Math.floor(+(arguments.length <= 0 ? undefined : arguments[0]));
	      if (newValue !== this.state.height) {
	        this.state.height = newValue;
	        this.updateDimension();
	        this.dispatchResize();
	      }
	      return this;
	    }
	  }, {
	    key: 'dimension',
	    value: function dimension() {
	      if (arguments.length === 0) {
	        return [this.state.width, this.state.height];
	      }

	      var _ref = arguments.length <= 0 ? undefined : arguments[0];

	      var _ref2 = _slicedToArray(_ref, 2);

	      var w = _ref2[0];
	      var h = _ref2[1];

	      this.width(w).height(h);
	      return this;
	    }
	  }, {
	    key: 'data',
	    value: function data() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      if (args.length === 0) return this.state.data;
	      var newData = args[0];

	      this.state.data = newData;
	      this.dispatchData();
	      return this;
	    }
	  }, {
	    key: 'margin',
	    value: function margin() {
	      if (arguments.length === 0) return this.state.options.margin;
	      var oldMargin = this.state.options.margin;
	      var newMargin = (0, _helper.extend)({}, this.state.options.margin, arguments.length <= 0 ? undefined : arguments[0]);
	      var changed = Object.keys(oldMargin).some(function (field) {
	        return oldMargin[field] !== newMargin[field];
	      });
	      if (changed) {
	        this.state.options.margin = newMargin;
	        this.updateDimension();
	        this.dispatchResize();
	      }
	      return this;
	    }
	  }, {
	    key: 'offset',
	    value: function offset() {
	      if (arguments.length === 0) return this.state.options.offset;
	      var oldOffset = this.state.options.offset;
	      var newOffset = _extends({}, this.state.offset, arguments.length <= 0 ? undefined : arguments[0]);
	      var changed = Object.keys(oldOffset).some(function (field) {
	        return oldOffset[field] !== newOffset[field];
	      });
	      if (changed) {
	        this.state.options.offset = newOffset;
	        this.updateDimension();
	        this.dispatchResize();
	      }
	      return this;
	    }
	  }, {
	    key: 'options',
	    value: function options() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      if (args.length === 0) return this.state.options;
	      var newOptions = args[0];

	      if (newOptions.margin) {
	        this.margin(newOptions.margin);
	      }
	      if (newOptions.offset) {
	        this.offset(newOptions.offset);
	      }
	      this.state.options = (0, _helper.deepExtend)(this.state.options, newOptions);
	      this.dispatchOptions();
	      return this;
	    }
	  }, {
	    key: 'updateDimension',
	    value: function updateDimension() {
	      var _state = this.state;
	      var width = _state.width;
	      var height = _state.height;
	      var _state$options = this.state.options;
	      var offset = _state$options.offset;
	      var margin = _state$options.margin;
	      var top = margin.top;
	      var right = margin.right;
	      var bottom = margin.bottom;
	      var left = margin.left;


	      this.state.innerWidth = width - left - right;
	      this.state.innerHeight = height - top - bottom;

	      this.svg.attr('width', width).attr('height', height);

	      this.rootG.attr('transform', 'translate(' + (left + offset.x) + ',' + (top + offset.y) + ')');

	      return this;
	    }
	  }, {
	    key: 'updateDimensionNow',
	    value: function updateDimensionNow() {
	      this.updateDimension();
	      this.updateDimension.flush();
	      return this;
	    }
	  }, {
	    key: 'hasData',
	    value: function hasData() {
	      var data = this.state.data;

	      return data !== null && data !== undefined;
	    }
	  }, {
	    key: 'hasNonZeroArea',
	    value: function hasNonZeroArea() {
	      var _state2 = this.state;
	      var innerWidth = _state2.innerWidth;
	      var innerHeight = _state2.innerHeight;

	      return innerWidth > 0 && innerHeight > 0;
	    }
	  }, {
	    key: 'fit',
	    value: function fit(fitOptions) {
	      if (fitOptions) {
	        this.state.fitOptions = fitOptions;
	      }

	      var fitter = new _Fitter2.default(fitOptions);

	      var _fitter$fit = fitter.fit(this.svg.node(), this.container.node());

	      var changed = _fitter$fit.changed;
	      var dimension = _fitter$fit.dimension;


	      if (changed) {
	        this.dimension([dimension.width, dimension.height]);
	      }
	      return this;
	    }
	  }, {
	    key: 'autoFit',
	    value: function autoFit(enable, fitOptions, watchOptions) {
	      var _this = this;

	      if (fitOptions) {
	        this.state.fitOptions = fitOptions;
	      }
	      if (enable) {
	        if (this.fitWatcher) {
	          this.fitWatcher.destroy();
	        }
	        this.fitWatcher = new _FitWatcher2.default(this.svg.node(), this.container.node(), this.state.fitOptions, watchOptions).on('change', function (dim) {
	          return _this.dimension([dim.width, dim.height]);
	        }).start();
	      } else if (this.fitWatcher) {
	        this.fitWatcher.destroy();
	        this.fitWatcher = null;
	      }
	      return this;
	    }
	  }, {
	    key: 'dispatchData',
	    value: function dispatchData() {
	      this.dispatcher.call('data', this, this.state.data);
	      return this;
	    }
	  }, {
	    key: 'dispatchOptions',
	    value: function dispatchOptions() {
	      this.dispatcher.call('options', this, this.state.options);
	      return this;
	    }
	  }, {
	    key: 'dispatchResize',
	    value: function dispatchResize() {
	      var _state3 = this.state;
	      var width = _state3.width;
	      var height = _state3.height;
	      var innerWidth = _state3.innerWidth;
	      var innerHeight = _state3.innerHeight;

	      this.dispatcher.call('resize', this, [width, height, innerWidth, innerHeight]);
	      return this;
	    }
	  }, {
	    key: 'on',
	    value: function on(name, listener) {
	      this.dispatcher.on(name, listener);
	      return this;
	    }
	  }, {
	    key: 'off',
	    value: function off(name) {
	      this.dispatcher.on(name, null);
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this2 = this;

	      this.eventNames.forEach(function (name) {
	        _this2.off(name);
	      });

	      if (this.fitWatcher) {
	        this.fitWatcher.destroy();
	        this.fitWatcher = null;
	      }
	    }
	  }]);

	  return Skeleton;
	}();

	Skeleton.DEFAULT_OPTIONS = {
	  initialWidth: 720,
	  initialHeight: 500,
	  margin: {
	    top: 30,
	    right: 30,
	    bottom: 30,
	    left: 30
	  },
	  offset: {
	    x: 0.5,
	    y: 0.5
	  }
	};

	Skeleton.DEFAULT_EVENTS = ['data', 'options', 'resize'];

	exports.default = Skeleton;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(5),
	    now = __webpack_require__(6),
	    toNumber = __webpack_require__(9);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;

	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	module.exports = debounce;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(7);

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function now() {
	  return root.Date.now();
	};

	module.exports = now;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var freeGlobal = __webpack_require__(8);

	/** Detect free variable `self`. */
	var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(5),
	    isSymbol = __webpack_require__(10);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? other + '' : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	module.exports = toNumber;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isObjectLike = __webpack_require__(11);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}

	module.exports = isSymbol;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	module.exports = isObjectLike;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Fitter = __webpack_require__(13);

	var _Fitter2 = _interopRequireDefault(_Fitter);

	var _Watcher2 = __webpack_require__(16);

	var _Watcher3 = _interopRequireDefault(_Watcher2);

	var _Helper = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FitWatcher = function (_Watcher) {
	  _inherits(FitWatcher, _Watcher);

	  function FitWatcher() {
	    var box = arguments.length <= 0 || arguments[0] === undefined ? (0, _Helper.isRequired)('box') : arguments[0];
	    var container = arguments.length <= 1 || arguments[1] === undefined ? (0, _Helper.isRequired)('container') : arguments[1];
	    var fitterOptions = arguments[2];
	    var watcherOptions = arguments[3];

	    _classCallCheck(this, FitWatcher);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FitWatcher).call(this, watcherOptions));

	    var fitter = new _Fitter2.default(fitterOptions);
	    _this.fit = function () {
	      return fitter.fit(box, container);
	    };
	    return _this;
	  }

	  _createClass(FitWatcher, [{
	    key: 'check',
	    value: function check() {
	      if (this.hasTargetChanged()) {
	        var fitResult = this.fit();
	        if (this.fitResult.changed) {
	          this.dispatcher.call('change', this, fitResult.dimension);
	        }
	      }
	      return this;
	    }
	  }]);

	  return FitWatcher;
	}(_Watcher3.default);

	exports.default = FitWatcher;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Dimension = __webpack_require__(14);

	var _Dimension2 = _interopRequireDefault(_Dimension);

	var _Helper = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Fitter = function () {
	  function Fitter() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Fitter);

	    var _options$mode = options.mode;
	    var mode = _options$mode === undefined ? Fitter.MODE_BASIC : _options$mode;
	    var _options$width = options.width;
	    var width = _options$width === undefined ? '100%' : _options$width;
	    var _options$height = options.height;
	    var height = _options$height === undefined ? null : _options$height;
	    var _options$ratio = options.ratio;
	    var ratio = _options$ratio === undefined ? 1 : _options$ratio;
	    var _options$maxWidth = options.maxWidth;
	    var maxWidth = _options$maxWidth === undefined ? null : _options$maxWidth;
	    var _options$maxHeight = options.maxHeight;
	    var maxHeight = _options$maxHeight === undefined ? null : _options$maxHeight;


	    if (mode === Fitter.MODE_ASPECT_RATIO) {
	      this.wFn = (0, _Helper.parseModifier)(maxWidth);
	      this.hFn = (0, _Helper.parseModifier)(maxHeight);
	      this.options = {
	        mode: mode,
	        ratio: ratio,
	        maxWidth: maxWidth,
	        maxHeight: maxHeight
	      };
	    } else {
	      this.wFn = (0, _Helper.parseModifier)(width);
	      this.hFn = (0, _Helper.parseModifier)(height);
	      this.options = {
	        mode: mode,
	        width: width,
	        height: height
	      };
	    }
	  }

	  _createClass(Fitter, [{
	    key: 'fit',
	    value: function fit() {
	      var box = arguments.length <= 0 || arguments[0] === undefined ? (0, _Helper.isRequired)('box') : arguments[0];
	      var container = arguments.length <= 1 || arguments[1] === undefined ? (0, _Helper.isRequired)('container') : arguments[1];

	      var boxDim = new _Dimension2.default(box);
	      var w = boxDim.width;
	      var h = boxDim.height;
	      var containerDim = new _Dimension2.default(container);
	      var cw = containerDim.width;
	      var ch = containerDim.height;

	      var dim = void 0;
	      if (this.options.mode === Fitter.MODE_ASPECT_RATIO) {
	        var ratio = this.options.ratio;
	        var maxW = this.wFn(cw, cw);
	        var maxH = this.hFn(ch, ch);
	        var newWFromHeight = Math.floor(ratio * maxH);
	        if (newWFromHeight <= maxW) {
	          dim = new _Dimension2.default(newWFromHeight, maxH);
	        } else {
	          dim = new _Dimension2.default(maxW, Math.floor(maxW / ratio));
	        }
	      } else {
	        dim = new _Dimension2.default(this.wFn(w, cw), this.hFn(h, ch));
	      }

	      return {
	        dimension: dim,
	        changed: !dim.isEqual(boxDim)
	      };
	    }
	  }]);

	  return Fitter;
	}();

	Fitter.MODE_BASIC = 'basic';
	Fitter.MODE_ASPECT_RATIO = 'aspectRatio';

	exports.default = Fitter;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Helper = __webpack_require__(15);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dimension = function () {
	  function Dimension() {
	    _classCallCheck(this, Dimension);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    if (args.length === 1) {
	      var inputOrGetter = args[0];
	      var input = (0, _Helper.isFunction)(inputOrGetter) ? inputOrGetter() : inputOrGetter;

	      if (input instanceof Dimension) {
	        this.width = input.width;
	        this.height = input.height;
	      } else if ((0, _Helper.isElement)(input)) {
	        this.width = input.clientWidth;
	        this.height = input.clientHeight;
	      } else if (Array.isArray(input)) {
	        this.width = input[0];
	        this.height = input[1];
	      } else if ((0, _Helper.isDefined)(input) && (0, _Helper.isDefined)(input.width) && (0, _Helper.isDefined)(input.height)) {
	        this.width = input.width;
	        this.height = input.height;
	      } else {
	        var err = new Error('Unsupported input. Must be either\n  DOMNode, Array or Object with field width and height,\n  or a function that returns any of the above.');
	        err.value = inputOrGetter;
	        throw err;
	      }
	    } else {
	      var width = args[0];
	      var height = args[1];

	      this.width = width;
	      this.height = height;
	    }
	  }

	  _createClass(Dimension, [{
	    key: 'isEqual',
	    value: function isEqual(x) {
	      if (x instanceof Dimension) {
	        return this.width === x.width && this.height === x.height;
	      }
	      var dim2 = new Dimension(x);
	      return this.width === dim2.width && this.height === dim2.height;
	    }
	  }, {
	    key: 'toArray',
	    value: function toArray() {
	      return [this.width, this.height];
	    }
	  }, {
	    key: 'toObject',
	    value: function toObject() {
	      return {
	        width: this.width,
	        height: this.height
	      };
	    }
	  }]);

	  return Dimension;
	}();

	exports.default = Dimension;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.isRequired = isRequired;
	exports.isDefined = isDefined;
	exports.isNotDefined = isNotDefined;
	exports.isElement = isElement;
	exports.parseModifier = parseModifier;
	function isRequired(name) {
	  throw new Error('Missing parameter ' + name);
	}

	function isDefined(x) {
	  return x !== null && x !== undefined;
	}

	function isNotDefined(x) {
	  return x === null || x === undefined;
	}

	var isFunction = exports.isFunction = function () {
	  if (typeof /./ !== 'function' && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) !== 'object') {
	    return function (obj) {
	      return typeof obj === 'function' || false;
	    };
	  }
	  return function (fn) {
	    var getType = {};
	    return fn && getType.toString.call(fn) === '[object Function]';
	  };
	}();

	function isElement(obj) {
	  return !!(obj && obj.nodeType === 1);
	}

	function parseModifier(value) {
	  // Return current value
	  if (isNotDefined(value)) {
	    return function (x, cx) {
	      return Math.min(x, cx);
	    };
	  }
	  // Return percent of container
	  var str = ('' + value).trim().toLowerCase();
	  if (str.indexOf('%') > -1) {
	    var _ret = function () {
	      var percent = +str.replace('%', '') / 100;
	      return {
	        v: function v(x, cx) {
	          return cx * percent;
	        }
	      };
	    }();

	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	  // Return fixed value
	  return function () {
	    return +str.replace('px', '');
	  };
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Dimension = __webpack_require__(14);

	var _Dimension2 = _interopRequireDefault(_Dimension);

	var _d3Dispatch = __webpack_require__(3);

	var _Helper = __webpack_require__(15);

	var _throttle = __webpack_require__(17);

	var _throttle2 = _interopRequireDefault(_throttle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Watcher = function () {
	  function Watcher() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var _ref$type = _ref.type;
	    var type = _ref$type === undefined ? Watcher.TYPE_WINDOW : _ref$type;
	    var _ref$target = _ref.target;
	    var target = _ref$target === undefined ? null : _ref$target;
	    var _ref$interval = _ref.interval;
	    var interval = _ref$interval === undefined ? 500 : _ref$interval;

	    _classCallCheck(this, Watcher);

	    if (type === Watcher.TYPE_POLLING && !target) {
	      (0, _Helper.isRequired)('options.target');
	    }

	    this.type = type;
	    this.target = target;
	    this.interval = interval;

	    this.dispatcher = (0, _d3Dispatch.dispatch)('change');
	    this.check = this.check.bind(this);
	    this.throttledCheck = (0, _throttle2.default)(this.check, this.interval);
	    this.isWatching = false;
	  }

	  _createClass(Watcher, [{
	    key: 'hasTargetChanged',
	    value: function hasTargetChanged() {
	      if (!this.target) {
	        return true;
	      }
	      var newDim = new _Dimension2.default(this.target);
	      if (!this.currentDim || !newDim.isEqual(this.currentDim)) {
	        this.currentDim = newDim;
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'check',
	    value: function check() {
	      if (this.hasTargetChanged()) {
	        this.dispatcher.call('change', this, this.currentDim);
	      }
	      return this;
	    }
	  }, {
	    key: 'on',
	    value: function on(name, listener) {
	      this.dispatcher.on(name, listener);
	      return this;
	    }
	  }, {
	    key: 'off',
	    value: function off(name) {
	      this.dispatcher.on(name, null);
	      return this;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      if (!this.isWatching) {
	        if (this.target) {
	          this.currentDim = new _Dimension2.default(this.target);
	        }
	        if (this.type === Watcher.TYPE_WINDOW) {
	          window.addEventListener('resize', this.throttledCheck);
	        } else if (this.type === Watcher.TYPE_POLLING) {
	          this.intervalId = window.setInterval(this.check, this.interval);
	        }
	        this.isWatching = true;
	      }
	      return this;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.isWatching) {
	        if (this.type === Watcher.TYPE_WINDOW) {
	          window.removeEventListener('resize', this.throttledCheck);
	        } else if (this.type === Watcher.TYPE_POLLING && this.intervalId) {
	          window.clearInterval(this.intervalId);
	          this.intervalId = null;
	        }
	        this.isWatching = false;
	      }
	      return this;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stop();
	      this.off('change');
	      return this;
	    }
	  }]);

	  return Watcher;
	}();

	Watcher.TYPE_WINDOW = 'window';
	Watcher.TYPE_POLLING = 'polling';

	exports.default = Watcher;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var debounce = __webpack_require__(4),
	    isObject = __webpack_require__(5);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide `options` to indicate whether `func`
	 * should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}

	module.exports = throttle;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	// EXAMPLE USAGE:
	//
	// var layers = new d3LayerOrganizer(vis);
	// layers.create([
	//   {'axis': ['bar', 'mark']},
	//   'glass',
	//   'label'
	// ]);
	//
	// Then access the layers via
	// layers.get('axis'),
	// layers.get('axis.bar'),
	// layers.get('axis.mark'),
	// layers.get('glass'),
	// layers.get('label')
	//

	exports.default = function (mainContainer) {
	  var layers = {};

	  function createLayerFromName(container, layerName) {
	    var prefix = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	    var chunks = layerName.split('.');
	    var name = void 0,
	        tag = void 0;
	    if (chunks.length > 1) {
	      tag = chunks[0].length > 0 ? chunks[0] : 'g';
	      name = chunks[1];
	    } else {
	      tag = 'g';
	      name = chunks[0];
	    }

	    var id = '' + prefix + name;
	    if (layers.hasOwnProperty(id)) {
	      throw new Error('invalid or duplicate layer id: ' + id);
	    }
	    var className = (0, _kebabCase2.default)(name) + '-layer';
	    var layer = container.append(tag).classed(className, true);

	    layers[id] = layer;
	    return layer;
	  }

	  function createLayerFromConfig(container, config) {
	    var prefix = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	    if (Array.isArray(config)) {
	      return config.map(function (info) {
	        return createLayerFromConfig(container, info, prefix);
	      });
	    } else if ((0, _isObject2.default)(config)) {
	      var _Object$keys = Object.keys(config);

	      var _Object$keys2 = _slicedToArray(_Object$keys, 1);

	      var parentKey = _Object$keys2[0];

	      var parentLayer = createLayerFromName(container, parentKey, prefix);
	      createLayerFromConfig(parentLayer, config[parentKey], '' + prefix + parentKey + '.');
	      return parentLayer;
	    }

	    return createLayerFromName(container, config, prefix);
	  }

	  function createLayer(config) {
	    return createLayerFromConfig(mainContainer, config);
	  }

	  function create(layerNames) {
	    return Array.isArray(layerNames) ? layerNames.map(createLayer) : createLayer(layerNames);
	  }

	  function get(layerName) {
	    return layers[layerName];
	  }

	  function has(layerName) {
	    return !!layers[layerName];
	  }

	  return {
	    create: create,
	    get: get,
	    has: has
	  };
	};

	var _isObject = __webpack_require__(5);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _kebabCase = __webpack_require__(19);

	var _kebabCase2 = _interopRequireDefault(_kebabCase);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createCompounder = __webpack_require__(20);

	/**
	 * Converts `string` to
	 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the kebab cased string.
	 * @example
	 *
	 * _.kebabCase('Foo Bar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('fooBar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('__FOO_BAR__');
	 * // => 'foo-bar'
	 */
	var kebabCase = createCompounder(function (result, word, index) {
	  return result + (index ? '-' : '') + word.toLowerCase();
	});

	module.exports = kebabCase;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayReduce = __webpack_require__(21),
	    deburr = __webpack_require__(22),
	    words = __webpack_require__(28);

	/** Used to compose unicode capture groups. */
	var rsApos = '[\'’]';

	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos, 'g');

	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function (string) {
	    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
	  };
	}

	module.exports = createCompounder;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array ? array.length : 0;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var deburrLetter = __webpack_require__(23),
	    toString = __webpack_require__(25);

	/** Used to match Latin Unicode letters (excluding mathematical operators). */
	var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0';

	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';

	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');

	/**
	 * Deburrs `string` by converting
	 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
	 * letters to basic Latin letters and removing
	 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
	}

	module.exports = deburr;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var basePropertyOf = __webpack_require__(24);

	/** Used to map Latin Unicode letters to basic Latin letters. */
	var deburredLetters = {
	  // Latin-1 Supplement block.
	  '\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C', '\xe7': 'c',
	  '\xd0': 'D', '\xf0': 'd',
	  '\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e', '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcc': 'I', '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xec': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N', '\xf1': 'n',
	  '\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss',
	  // Latin Extended-A block.
	  'Ā': 'A', 'Ă': 'A', 'Ą': 'A',
	  'ā': 'a', 'ă': 'a', 'ą': 'a',
	  'Ć': 'C', 'Ĉ': 'C', 'Ċ': 'C', 'Č': 'C',
	  'ć': 'c', 'ĉ': 'c', 'ċ': 'c', 'č': 'c',
	  'Ď': 'D', 'Đ': 'D', 'ď': 'd', 'đ': 'd',
	  'Ē': 'E', 'Ĕ': 'E', 'Ė': 'E', 'Ę': 'E', 'Ě': 'E',
	  'ē': 'e', 'ĕ': 'e', 'ė': 'e', 'ę': 'e', 'ě': 'e',
	  'Ĝ': 'G', 'Ğ': 'G', 'Ġ': 'G', 'Ģ': 'G',
	  'ĝ': 'g', 'ğ': 'g', 'ġ': 'g', 'ģ': 'g',
	  'Ĥ': 'H', 'Ħ': 'H', 'ĥ': 'h', 'ħ': 'h',
	  'Ĩ': 'I', 'Ī': 'I', 'Ĭ': 'I', 'Į': 'I', 'İ': 'I',
	  'ĩ': 'i', 'ī': 'i', 'ĭ': 'i', 'į': 'i', 'ı': 'i',
	  'Ĵ': 'J', 'ĵ': 'j',
	  'Ķ': 'K', 'ķ': 'k', 'ĸ': 'k',
	  'Ĺ': 'L', 'Ļ': 'L', 'Ľ': 'L', 'Ŀ': 'L', 'Ł': 'L',
	  'ĺ': 'l', 'ļ': 'l', 'ľ': 'l', 'ŀ': 'l', 'ł': 'l',
	  'Ń': 'N', 'Ņ': 'N', 'Ň': 'N', 'Ŋ': 'N',
	  'ń': 'n', 'ņ': 'n', 'ň': 'n', 'ŋ': 'n',
	  'Ō': 'O', 'Ŏ': 'O', 'Ő': 'O',
	  'ō': 'o', 'ŏ': 'o', 'ő': 'o',
	  'Ŕ': 'R', 'Ŗ': 'R', 'Ř': 'R',
	  'ŕ': 'r', 'ŗ': 'r', 'ř': 'r',
	  'Ś': 'S', 'Ŝ': 'S', 'Ş': 'S', 'Š': 'S',
	  'ś': 's', 'ŝ': 's', 'ş': 's', 'š': 's',
	  'Ţ': 'T', 'Ť': 'T', 'Ŧ': 'T',
	  'ţ': 't', 'ť': 't', 'ŧ': 't',
	  'Ũ': 'U', 'Ū': 'U', 'Ŭ': 'U', 'Ů': 'U', 'Ű': 'U', 'Ų': 'U',
	  'ũ': 'u', 'ū': 'u', 'ŭ': 'u', 'ů': 'u', 'ű': 'u', 'ų': 'u',
	  'Ŵ': 'W', 'ŵ': 'w',
	  'Ŷ': 'Y', 'ŷ': 'y', 'Ÿ': 'Y',
	  'Ź': 'Z', 'Ż': 'Z', 'Ž': 'Z',
	  'ź': 'z', 'ż': 'z', 'ž': 'z',
	  'Ĳ': 'IJ', 'ĳ': 'ij',
	  'Œ': 'Oe', 'œ': 'oe',
	  'ŉ': "'n", 'ſ': 'ss'
	};

	/**
	 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
	 * letters to basic Latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	var deburrLetter = basePropertyOf(deburredLetters);

	module.exports = deburrLetter;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function (key) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = basePropertyOf;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToString = __webpack_require__(26);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Symbol = __webpack_require__(27),
	    isSymbol = __webpack_require__(10);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}

	module.exports = baseToString;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var root = __webpack_require__(7);

	/** Built-in value references. */
	var _Symbol = root.Symbol;

	module.exports = _Symbol;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var asciiWords = __webpack_require__(29),
	    hasUnicodeWord = __webpack_require__(30),
	    toString = __webpack_require__(25),
	    unicodeWords = __webpack_require__(31);

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;

	  if (pattern === undefined) {
	    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
	  }
	  return string.match(pattern) || [];
	}

	module.exports = words;

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	/** Used to match words composed of alphanumeric characters. */
	var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

	/**
	 * Splits an ASCII `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function asciiWords(string) {
	  return string.match(reAsciiWord) || [];
	}

	module.exports = asciiWords;

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	/**
	 * Checks if `string` contains a word composed of Unicode symbols.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {boolean} Returns `true` if a word is found, else `false`.
	 */
	function hasUnicodeWord(string) {
	  return reHasUnicodeWord.test(string);
	}

	module.exports = hasUnicodeWord;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsPunctuationRange = '\\u2000-\\u206f',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	var rsApos = '[\'’]',
	    rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
	    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

	/** Used to match complex or compound words. */
	var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')', rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr, rsUpper + '+' + rsOptUpperContr, rsDigits, rsEmoji].join('|'), 'g');

	/**
	 * Splits a Unicode `string` into an array of its words.
	 *
	 * @private
	 * @param {string} The string to inspect.
	 * @returns {Array} Returns the words of `string`.
	 */
	function unicodeWords(string) {
	    return string.match(reUnicodeWord) || [];
	}

	module.exports = unicodeWords;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.deepExtend = deepExtend;
	exports.extend = extend;
	exports.rebind = rebind;
	exports.functor = functor;

	var _isObject = __webpack_require__(5);

	var _isObject2 = _interopRequireDefault(_isObject);

	var _isFunction = __webpack_require__(33);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//---------------------------------------------------
	// From http://youmightnotneedjquery.com/
	//---------------------------------------------------

	function deepExtend(out) {
	  out = out || {};

	  for (var i = 1; i < arguments.length; i++) {
	    var obj = arguments[i];

	    if (!obj) continue;

	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        var value = obj[key];
	        if ((0, _isObject2.default)(value) && !Array.isArray(value) && !(0, _isFunction2.default)(value)) {
	          out[key] = deepExtend(out[key], value);
	        } else out[key] = value;
	      }
	    }
	  }

	  return out;
	}

	function extend(out) {
	  out = out || {};

	  for (var i = 1; i < arguments.length; i++) {
	    if (!arguments[i]) continue;

	    for (var key in arguments[i]) {
	      if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
	    }
	  }

	  return out;
	}

	//---------------------------------------------------
	// From D3 v3
	//---------------------------------------------------

	// Method is assumed to be a standard D3 getter-setter:
	// If passed with no arguments, gets the value.
	// If passed with arguments, sets the value and returns the target.
	function d3_rebind(target, source, method) {
	  return function () {
	    var value = method.apply(source, arguments);
	    return value === source ? target : value;
	  };
	}

	// Copies a variable number of methods from source to target.
	function rebind(target, source) {
	  var i = 1,
	      n = arguments.length,
	      method = void 0;
	  while (++i < n) {
	    target[method = arguments[i]] = d3_rebind(target, source, source[method]);
	  }return target;
	}

	function functor(v) {
	  return typeof v === 'function' ? v : function () {
	    return v;
	  };
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(5);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _d3Dispatch = __webpack_require__(3);

	var _debounce = __webpack_require__(4);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _helper = __webpack_require__(32);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function NOOP(selection, done) {
	  done();
	}

	function Chartlet(enter, update, exit, customEvents) {
	  update = update || NOOP;
	  exit = exit || NOOP;
	  customEvents = customEvents || [];
	  var _propertyCache = {};
	  var _dispatch = _d3Dispatch.dispatch.apply(this, ['enterDone', 'updateDone', 'exitDone'].concat(customEvents));

	  // getter and setter of chartlet properties

	  function property(name, value) {
	    // if functioning as a setter, set property in cache
	    if (arguments.length > 1) {
	      _propertyCache[name] = (0, _helper.functor)(value);
	      return this;
	    }

	    // functioning as a getter, return property accessor
	    return (0, _helper.functor)(_propertyCache[name]);
	  }

	  function getPropertyValue(name, d, i) {
	    return property(name)(d, i);
	  }

	  function _wrapAction(action, doneHookName) {
	    return function (selection) {
	      action(selection, (0, _debounce2.default)(function (d, i) {
	        _dispatch.call(doneHookName, this, selection);
	      }), 5);
	    };
	  }

	  function inheritPropertyFrom(chartlet, from, to) {
	    _propertyCache[to || from] = function (d, i) {
	      return chartlet.property(from)(d, i);
	    };
	    return this;
	  }

	  function inheritPropertiesFrom(chartlet, froms, tos) {
	    froms.forEach(function (from, i) {
	      inheritPropertyFrom(chartlet, from, tos && i < tos.length ? tos[i] : undefined);
	    });
	    return this;
	  }

	  function publishEventsTo(foreignDispatcher) {
	    customEvents.forEach(function (event) {
	      _dispatch.on(event, function () {
	        var args = Array.prototype.slice.call(arguments);
	        foreignDispatcher.apply(event, this, args);
	      });
	    });
	    return this;
	  }

	  function getCustomEventNames() {
	    return customEvents;
	  }

	  // exports
	  var exports = {
	    // for use by child chartlet
	    getDispatcher: function getDispatcher() {
	      return _dispatch;
	    },

	    getPropertyValue: getPropertyValue,
	    inheritPropertyFrom: inheritPropertyFrom,
	    inheritPropertiesFrom: inheritPropertiesFrom,
	    publishEventsTo: publishEventsTo,
	    getCustomEventNames: getCustomEventNames,

	    property: property,
	    enter: _wrapAction(enter, 'enterDone'),
	    update: _wrapAction(update, 'updateDone'),
	    exit: _wrapAction(exit, 'exitDone')
	  };

	  // bind events to exports
	  (0, _helper.rebind)(exports, _dispatch, 'on');

	  // return exports
	  return exports;
	}

	exports.default = Chartlet;

/***/ }
/******/ ])
});
;