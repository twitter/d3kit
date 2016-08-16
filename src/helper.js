/**
 * Example usage:
 * selection.call(d3Kit.helper.bindMouseEventsToDispatcher, dispatch, 'bar')
 *
 * @param  {[type]} dispatch [description]
 * @param  {[type]} prefix   [description]
 * @return {[type]}          [description]
 */
function bindMouseEventsToDispatcher(selection, dispatch, prefix) {
  return selection
    .on('click', dispatch[prefix + 'Click'])
    .on('mouseover', dispatch[prefix + 'MouseOver'])
    .on('mousemove', dispatch[prefix + 'MouseMove'])
    .on('mouseout', dispatch[prefix + 'MouseOut']);
}

function removeAllChildren(selection, noTransition) {
  if (noTransition) {
    return selection.selectAll('*').remove();
  }
  else {
    return selection.selectAll('*')
      .transition()
        .style('opacity', 0)
        .remove();
  }
}

// Returns true if it is a DOM element
// From http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
function isElement(o) {
  return (
    typeof HTMLElement === 'object' ? o instanceof HTMLElement : // DOM2
    o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
  );
}

const isNaN = Number.isNaN ? Number.isNaN : window.isNaN;

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

  for (let i = 1; i < arguments.length; i++) {
    const obj = arguments[i];

    if (!obj)
      continue;

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (isObject(value) && !Array.isArray(value) && !isFunction(value)) {
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

  for (let i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (const key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;
}

function on(element, type, listener) {
  if (element.addEventListener) {
    element.addEventListener(type, listener, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, listener);
  }
}

function off(element, type, listener) {
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
  let timeout;

  const outputFn = function () {
    let context = this, args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);

    // return caller for chaining
    return context;
  };

  // so we know this function is debounced
  outputFn.isDebounced = true;
  // and provide a way to call the original function immediately
  outputFn.now = function () {
    clearTimeout(timeout);
    return func.apply(this, arguments);
  };

  return outputFn;
}

//---------------------------------------------------
// From lodash
//---------------------------------------------------

/** Used to determine if values are of the language type Object */
const objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false,
};

function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

/** `Object#toString` result shortcuts */
const numberClass = '[object Number]';

/** Used for native method references */
const objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
const toString = objectProto.toString;

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

function isFunction(functionToCheck) {
  const getType = {};
  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

//---------------------------------------------------
// From underscore.string
//---------------------------------------------------
/* jshint ignore:start */

const nativeTrim = String.prototype.trim;

function escapeRegExp(str) {
  if (str == null) return '';
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}

const defaultToWhiteSpace = function (characters) {
  if (characters == null)
    return '\\s';
  else if (characters.source)
    return characters.source;
  else
    return '[' + escapeRegExp(characters) + ']';
};

function trim(str, characters) {
  if (str == null) return '';
  if (!characters && nativeTrim) return nativeTrim.call(str);
  characters = defaultToWhiteSpace(characters);
  return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
}

function dasherize(str) {
  return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}


// Copies a variable number of methods from source to target.
function rebind(target, source) {
  let i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
  return target;
}

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3_rebind(target, source, method) {
  return function () {
    const value = method.apply(source, arguments);
    return value === source ? target : value;
  };
}

function functor(v) {
  return typeof v === 'function' ? v : function () { return v; };
}


/* jshint ignore:end */

export default {
  $,
  $$,

  dasherize,
  debounce,

  deepExtend,
  extend,

  isElement,
  isFunction,
  isNaN,
  isNumber,
  isObject,
  on,
  off,
  trim,

  rebind,
  functor,

  removeAllChildren,
  bindMouseEventsToDispatcher,
};
