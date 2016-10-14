// This module has not been revised yet.

import { dispatch } from 'd3-dispatch';
import debounce from 'lodash-es/debounce.js';
import { functor, rebind } from './helper.js';

function NOOP(selection, done) { done(); }

function Chartlet(enter, update, exit, customEvents) {
  update = update || NOOP;
  exit = exit || NOOP;
  customEvents = customEvents || [];
  const _propertyCache = {};
  const _dispatch = dispatch.apply(this, ['enterDone', 'updateDone', 'exitDone'].concat(customEvents));

  // getter and setter of chartlet properties

  function property(name, value) {
    // if functioning as a setter, set property in cache
    if (arguments.length > 1) {
      _propertyCache[name] = functor(value);
      return this;
    }

    // functioning as a getter, return property accessor
    return functor(_propertyCache[name]);
  }

  function getPropertyValue(name, d, i) {
    return property(name)(d, i);
  }

  function _wrapAction(action, doneHookName) {
    return function (selection) {
      action(selection, debounce(function (d, i) {
        _dispatch.call(doneHookName, this, selection);
      }), 5);
    };
  }

  function inheritPropertyFrom(chartlet, from, to) {
    _propertyCache[to || from] = function (d, i) { return chartlet.property(from)(d, i); };
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
        const args = Array.prototype.slice.call(arguments);
        foreignDispatcher.apply(event, this, args);
      });
    });
    return this;
  }

  function getCustomEventNames() {
    return customEvents;
  }

  // exports
  const exports = {
    // for use by child chartlet
    getDispatcher() { return _dispatch; },
    getPropertyValue,
    inheritPropertyFrom,
    inheritPropertiesFrom,
    publishEventsTo,
    getCustomEventNames,

    property,
    enter: _wrapAction(enter, 'enterDone'),
    update: _wrapAction(update, 'updateDone'),
    exit: _wrapAction(exit, 'exitDone'),
  };

  // bind events to exports
  rebind(exports, _dispatch, 'on');

  // return exports
  return exports;
}

export default Chartlet;
