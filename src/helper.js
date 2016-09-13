import isObject from 'lodash/isObject.js';
import isFunction from 'lodash/isFunction.js';

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
function d3_rebind(target, source, method) {
  return function () {
    const value = method.apply(source, arguments);
    return value === source ? target : value;
  };
}

// Copies a variable number of methods from source to target.
export function rebind(target, source) {
  let i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
  return target;
}

export function functor(v) {
  return typeof v === 'function' ? v : function () { return v; };
}
