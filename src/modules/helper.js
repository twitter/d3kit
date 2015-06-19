define([

],
function(){
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------

var module = (function(){
  /**
   * Example usage:
   * selection.call(d3Kit.helper.bindMouseEventsToDispatcher, dispatch, 'bar')
   *
   * @param  {[type]} dispatch [description]
   * @param  {[type]} prefix   [description]
   * @return {[type]}          [description]
   */
  function bindMouseEventsToDispatcher(selection, dispatch, prefix){
    return selection
      .on('click', dispatch[prefix+'Click'])
      .on('mouseover', dispatch[prefix+'MouseOver'])
      .on('mousemove', dispatch[prefix+'MouseMove'])
      .on('mouseout', dispatch[prefix+'MouseOut']);
  }

  function removeAllChildren(selection, noTransition){
    if(noTransition){
      return selection.selectAll('*').remove();
    }
    else{
      return selection.selectAll('*')
        .transition()
          .style('opacity', 0)
          .remove();
    }
  }

  // Returns true if it is a DOM element
  // From http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
  function isElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
  }

  var isNaN = Number.isNaN ? Number.isNaN : window.isNaN;

  // Check whether s is element if not then do the querySelector
  function $(s) {
    return isElement(s) ? s : document.querySelector(s);
  }

  // To get a proper array from a NodeList that matches the CSS selector
  function $$(s) {
    return Array.isArray(s) ? s : [].slice.call(document.querySelectorAll(s));
  }

  //---------------------------------------------------
  // From http://youmightnotneedjquery.com/
  //---------------------------------------------------

  function deepExtend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      if (!obj)
        continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var value = obj[key];
          if (isObject(value) && !Array.isArray(value) && !isFunction(value)){
            out[key] = deepExtend(out[key], value);
          }
          else
            out[key] = value;
        }
      }
    }

    return out;
  }

  function extend(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      if (!arguments[i])
        continue;

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key))
          out[key] = arguments[i][key];
      }
    }

    return out;
  }

  function on(element, type, listener){
    if (element.addEventListener) {
      element.addEventListener(type, listener, false);
    } else if (element.attachEvent)  {
      element.attachEvent('on'+type, listener);
    }
  }

  function off(element, type, listener){
    element.removeEventListener(type, listener, false);
  }

  //---------------------------------------------------
  // Modified from lodash
  //---------------------------------------------------

  /**
   * Returns a function, that, as long as it continues to be invoked,
   * will not be triggered.
   * The function will be called after it stops being called for
   * "wait" milliseconds.
   * The output function can be called with .now() to execute immediately
   * For example:
   * doSomething(params); // will debounce
   * doSomething.now(params); // will execute immediately
   *
   * @param  Function func      function to be debounced
   * @param  Number   wait      wait time until it will be executed
   * @param  Boolean  immediate If "immediate" is passed, trigger the function on the
   * leading edge, instead of the trailing.
   * @return Function           debounced function
   */
  function debounce(func, wait, immediate) {
    var timeout;

    var outputFn = function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);

      // return caller for chaining
      return context;
    };

    // so we know this function is debounced
    outputFn.isDebounced = true;
    // and provide a way to call the original function immediately
    outputFn.now = function(){
      clearTimeout(timeout);
      return func.apply(this, arguments);
    };

    return outputFn;
  }

  //---------------------------------------------------
  // From lodash
  //---------------------------------------------------

  /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  function isObject(value) {
    // check if the value is the ECMAScript language type of Object
    // http://es5.github.io/#x8
    // and avoid a V8 bug
    // http://code.google.com/p/v8/issues/detail?id=2291
    return !!(value && objectTypes[typeof value]);
  }

  /** `Object#toString` result shortcuts */
  var numberClass = '[object Number]';

  /** Used for native method references */
  var objectProto = Object.prototype;

  /** Used to resolve the internal [[Class]] of values */
  var toString = objectProto.toString;

  /**
   * Checks if `value` is a number.
   *
   * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
   *
   * @static
   * @memberOf _
   * @category Objects
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(8.4 * 5);
   * // => true
   */
  function isNumber(value) {
    return typeof value == 'number' ||
      value && typeof value == 'object' && toString.call(value) == numberClass || false;
  }

  function isFunction(functionToCheck){
    var getType = {};
    return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  //---------------------------------------------------
  // From underscore.string
  //---------------------------------------------------
  /* jshint ignore:start */

  var nativeTrim = String.prototype.trim;

  function escapeRegExp(str){
    if (str == null) return '';
    return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return '[' + escapeRegExp(characters) + ']';
  };

  function trim(str, characters){
    if (str == null) return '';
    if (!characters && nativeTrim) return nativeTrim.call(str);
    characters = defaultToWhiteSpace(characters);
    return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
  }

  function dasherize(str){
    return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
  }

  /* jshint ignore:end */

  return {
    $: $,
    $$: $$,

    dasherize: dasherize,
    debounce: debounce,

    deepExtend: deepExtend,
    extend: extend,

    isElement: isElement,
    isFunction: isFunction,
    isNaN: isNaN,
    isNumber: isNumber,
    isObject: isObject,
    on: on,
    off: off,
    trim: trim,

    removeAllChildren: removeAllChildren,
    bindMouseEventsToDispatcher: bindMouseEventsToDispatcher
  };
}());

// return module
return module;

//---------------------------------------------------
// END code for this module
//---------------------------------------------------
});