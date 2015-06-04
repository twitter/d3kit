define(['d3', './helper'], function(d3, helper) {
function NOOP(selection, done){ done(); }

function Chartlet(enter, update, exit, customEvents) {
  update = update || NOOP;
  exit = exit || NOOP;
  customEvents = customEvents || [];
  var _propertyCache = {};
  var _dispatch = d3.dispatch.apply(d3, ['enterDone', 'updateDone', 'exitDone'].concat(customEvents));

  // getter and setter of chartlet properties

  function property(name, value) {
    // if functioning as a setter, set property in cache
    if (arguments.length > 1) {
      _propertyCache[name] = d3.functor(value);
      return this;
    }

    // functioning as a getter, return property accessor
    return d3.functor(_propertyCache[name]);
  }

  function getPropertyValue(name, d, i) {
    return property(name)(d, i);
  }

  function _wrapAction(action, doneHookName) {
    return function(selection) {
      action(selection, helper.debounce(function(d, i) {
        var doneHook = _dispatch[doneHookName];
        if (doneHook) {
          doneHook(selection);
        }
      }), 5);
    };
  }

  function inheritPropertyFrom(chartlet, from, to) {
    _propertyCache[to || from] = function(d, i) {return chartlet.property(from)(d, i);};
    return this;
  }

  function inheritPropertiesFrom(chartlet, froms, tos) {
    froms.forEach(function(from, i) {
      inheritPropertyFrom(chartlet, from, tos && i < tos.length ? tos[i] : undefined);
    });
    return this;
  }

  function publishEventsTo(foreignDispatcher) {
    customEvents.forEach(function(event) {
      _dispatch.on(event, foreignDispatcher[event]);
    });
    return this;
  }

  function getCustomEventNames() {
    return customEvents;
  }

  // exports
  var exports = {
    // for use by child chartlet
    getDispatcher: function(){ return _dispatch; },
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
  d3.rebind(exports, _dispatch, 'on');

  // return exports
  return exports;
}
// return module
return Chartlet;
});
