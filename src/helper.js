import isFunction from 'lodash-es/isFunction.js';
import isObject from 'lodash-es/isObject.js';

export { isObject, isFunction };
export { default as debounce } from 'lodash-es/debounce.js';
export { default as throttle } from 'lodash-es/throttle.js';

//---------------------------------------------------
// From underscore.string
//---------------------------------------------------
/* jshint ignore:start */

const nativeTrim = String.prototype.trim;

function escapeRegExp(str) {
  if (str == null) return '';
  return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}

function defaultToWhiteSpace(characters) {
  if (characters == null) {
    return '\\s';
  } else if (characters.source) {
    return characters.source;
  }
  return `[${escapeRegExp(characters)}]`;
}

function trim(str, characters) {
  if (str == null) return '';
  if (!characters && nativeTrim) return nativeTrim.call(str);
  const chars = defaultToWhiteSpace(characters);
  const pattern = new RegExp(`\^${chars}+|${chars}+$`, 'g');
  return String(str).replace(pattern, '');
}

export function kebabCase(str) {
  return trim(str)
    .replace(/([A-Z])/g, '-$1')
    .replace(/[-_\s]+/g, '-')
    .toLowerCase();
}

//---------------------------------------------------
// From http://youmightnotneedjquery.com/
//---------------------------------------------------

export function deepExtend(out) {
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

export function extend(out) {
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

//---------------------------------------------------
// From D3 v3
//---------------------------------------------------

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3Rebind(target, source, method) {
  return function () {
    const value = method.apply(source, arguments);
    return value === source ? target : value;
  };
}

// Copies a variable number of methods from source to target.
export function rebind(target, source) {
  let i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3Rebind(target, source, source[method]);
  return target;
}

export function functor(v) {
  return isFunction(v) ? v : () => v;
}
