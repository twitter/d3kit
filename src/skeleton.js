import { select } from 'd3-selection';
import { dispatch } from 'd3-dispatch';
import LayerOrganizer from './layerOrganizer.js';
import helper from './helper.js';

// Constants
const DEFAULT_OPTIONS = {
  margin: { top: 30, right: 30, bottom: 30, left: 30 },
  offset: [0.5, 0.5],
  initialWidth: 720,
  initialHeight: 500,
};

const BASE_EVENTS = ['data', 'options', 'resize'];

// Core Skeleton
function Skeleton(chartNode, customOptions, customEvents) {
  const skeleton = {};

  chartNode = helper.$(chartNode);

  let _data = null;

  let _options = helper.deepExtend({}, DEFAULT_OPTIONS, customOptions);

  let _totalWidth = 0;
  let _totalHeight = 0;
  let _innerWidth = 0;
  let _innerHeight = 0;

  let _autoResizeDetection = 'window'; // either 'window' or 'dom';
  let _autoResizeMode = false;
  let _autoResizeFn = null;
  let _autoResizeToAspectRatio = false;

  // add svg element
  const _svg = select(chartNode).append('svg');
  const _vis = _svg.append('g');
  updateOffset();

  const _layers = new LayerOrganizer(_vis);

  // setup event dispatcher
  const _customEvents = customEvents ? customEvents.concat(BASE_EVENTS) : BASE_EVENTS;
  const _dispatch = dispatch.apply(this, _customEvents);

  // set default dimension
  dimension([
    _options.initialWidth,
    _options.initialHeight,
  ]);

  function data(newValue, doNotDispatch) {
    // getter
    if (arguments.length === 0) {
      return _data;
    }
    // setter
    _data = newValue;
    // dispatch
    if (!doNotDispatch) {
      _dispatch.call('data', this, newValue);
    }
    return skeleton;
  }

  function options(newValue, doNotDispatch) {
    // getter
    if (arguments.length === 0) {
      return _options;
    }

    // setter
    _options = helper.deepExtend(_options, newValue);

    if (newValue) {
      if (newValue.margin) {
        updateMargin(doNotDispatch);
      }
      else if (newValue.offset) {
        // When the margin is changed,
        // updateOffset() is already called within updateMargin()
        // so "else if" is used here instead of "if".
        // This will call updateOffset() manually
        // only when margin is not changed and offset is changed.
        updateOffset();
      }
    }

    // dispatch
    if (!doNotDispatch) {
      _dispatch.call('options', this, newValue);
    }
    return skeleton;
  }

  function updateOffset() {
    _vis.attr('transform', 'translate(' + (_options.margin.left + _options.offset[0]) + ',' + (_options.margin.top + _options.offset[1]) + ')');
  }

  function updateMargin(doNotDispatch) {
    updateOffset();

    _innerWidth = _totalWidth - _options.margin.left - _options.margin.right;
    _innerHeight = _totalHeight - _options.margin.top - _options.margin.bottom;

    if (!doNotDispatch) {
      _dispatch.call('resize', this, [_totalWidth, _totalHeight, _innerWidth, _innerHeight]);
    }
  }

  function margin(newValue, doNotDispatch) {
    // getter
    if (arguments.length === 0) {
      return _options.margin;
    }

    // setter
    _options.margin = helper.extend(_options.margin, newValue);
    updateMargin(doNotDispatch);

    return skeleton;
  }

  function offset(newValue) {
    // getter
    if (arguments.length === 0) {
      return _options.offset;
    }

    // setter
    _options.offset = newValue;
    updateOffset();

    return skeleton;
  }

  function width(newValue, doNotDispatch) {
    // getter
    if (arguments.length === 0 || newValue === null || newValue === undefined) {
      return _totalWidth;
    }

    // setter
    if (helper.isNumber(newValue)) {
      _totalWidth = +newValue;
    }
    else if (newValue.trim().toLowerCase() == 'auto') {
      _totalWidth = chartNode.clientWidth;
    }
    else {
      _totalWidth = +((newValue + '').replace(/px/gi, '').trim());
    }

    if (helper.isNaN(_totalWidth)) {
      throw Error('invalid width: ' + _totalWidth);
    }

    // round to integer
    _totalWidth = Math.floor(_totalWidth);
    _innerWidth = _totalWidth - _options.margin.left - _options.margin.right;

    _svg.attr('width', _totalWidth);

    // dispatch
    if (!doNotDispatch) {
      _dispatch.call('resize', this, [_totalWidth, _totalHeight, _innerWidth, _innerHeight]);
    }
    return skeleton;
  }

  function height(newValue, doNotDispatch) {
    // getter
    if (arguments.length === 0 || newValue === null || newValue === undefined) {
      return _totalHeight;
    }

    // setter
    if (helper.isNumber(newValue)) {
      _totalHeight = +newValue;
    }
    else if (newValue.trim().toLowerCase() == 'auto') {
      _totalHeight = chartNode.clientHeight;
    }
    else {
      _totalHeight = +((newValue + '').replace(/px/gi, '').trim());
    }

    if (helper.isNaN(_totalHeight)) {
      throw Error('invalid height: ' + _totalHeight);
    }

    // round to integer
    _totalHeight = Math.floor(_totalHeight);

    _innerHeight = _totalHeight - _options.margin.top - _options.margin.bottom;
    _svg.attr('height', _totalHeight);

    // dispatch
    if (!doNotDispatch) {
      _dispatch.call('resize', this, [_totalWidth, _totalHeight, _innerWidth, _innerHeight]);
    }
    return skeleton;
  }

  function dimension(values, doNotDispatch) {
    if (arguments.length === 0) {
      return [_totalWidth, _totalHeight];
    }
    width(values[0], true);
    height(values[1], doNotDispatch);

    return skeleton;
  }

  function autoResize(newMode) {
    if (arguments.length === 0) {
      return _autoResizeMode;
    }
    else if (_autoResizeMode != newMode) {
      return setupAutoResize(newMode, _autoResizeDetection);
    }
    return skeleton;
  }

  function autoResizeDetection(newDetection) {
    if (arguments.length === 0) {
      return _autoResizeDetection;
    }
    else if (_autoResizeDetection != newDetection) {
      return setupAutoResize(_autoResizeMode, newDetection);
    }
    return skeleton;
  }

  function autoResizeToAspectRatio(ratio) {
    if (arguments.length === 0) {
      return _autoResizeToAspectRatio;
    }

    if (ratio === null || ratio === undefined || ratio === '' || ratio === false || (ratio + '').toLowerCase() === 'false') {
      _autoResizeToAspectRatio = false;
    }
    else if (!helper.isNumber(ratio)) {
      _autoResizeToAspectRatio = false;
    }
    else if (+ratio === 0) {
      _autoResizeToAspectRatio = false;
    }
    else {
      _autoResizeToAspectRatio = +ratio;
    }
    return skeleton;
  }

  function clearAutoResizeListener() {
    if (_autoResizeFn) {
      switch (_autoResizeDetection) {
        case 'dom':
          helper.off(chartNode, 'resize', _autoResizeFn);
          break;
        default:
        case 'window':
          helper.off(window, 'resize', _autoResizeFn);
          break;
      }
    }
    _autoResizeFn = null;
    return skeleton;
  }

  function setAutoResizeListener(fn) {
    if (fn) {
      switch (_autoResizeDetection) {
        case 'dom':
          helper.on(chartNode, 'resize', fn);
          break;
        default:
        case 'window':
          helper.on(window, 'resize', fn);
          break;
      }
    }
    _autoResizeFn = fn;
    return skeleton;
  }

  function setupAutoResize(newMode, newDetection) {
    newMode = newMode && (newMode + '').toLowerCase() == 'false' ? false : newMode;
    newDetection = newDetection || _autoResizeDetection;

    // check if there is change in listener
    if (newMode != _autoResizeMode) {
      clearAutoResizeListener();
      _autoResizeMode = newMode;
      _autoResizeDetection = newDetection;
      if (newMode) {
        _autoResizeFn = helper.debounce(function () {
          if (_autoResizeToAspectRatio) {
            resizeToFitContainer(_autoResizeMode, true);
            resizeToAspectRatio(_autoResizeToAspectRatio);
          }
          else {
            resizeToFitContainer(_autoResizeMode);
          }
        }, 100);
        setAutoResizeListener(_autoResizeFn);
      }
    }
    // change detection mode only
    else if (newDetection != _autoResizeDetection) {
      const oldAutoResizeFn = _autoResizeFn;
      clearAutoResizeListener();
      _autoResizeDetection = newDetection;
      setAutoResizeListener(oldAutoResizeFn);
    }

    if (_autoResizeFn) _autoResizeFn();

    return skeleton;
  }

  function getCustomEventNames() {
    return customEvents || [];
  }

  function mixin(mixer) {
    const self = skeleton;
    if (helper.isObject(mixer)) {
      Object.keys(mixer).forEach(function (key) {
        self[key] = mixer[key];
      });
    }
    return self;
  }

  // This function is only syntactic sugar
  function resizeToFitContainer(mode, doNotDispatch) {
    switch (mode) {
      case 'all':
      case 'full':
      case 'both':
        dimension(['auto', 'auto'], doNotDispatch);
        break;
      case 'height':
        height('auto', doNotDispatch);
        break;
      default:
      case 'width':
        width('auto', doNotDispatch);
        break;
    }
    return skeleton;
  }

  function resizeToAspectRatio(ratio, doNotDispatch) {
    const w = _totalWidth;
    const h = _totalHeight;

    if (!helper.isNumber(ratio)) throw 'Invalid ratio: must be a Number';

    ratio = +ratio;

    // no need to resize if already at ratio
    if ((w / h).toFixed(4) == ratio.toFixed(4)) return skeleton;

    const estimatedH = Math.floor(w / ratio);
    if (estimatedH > h) {
      width(Math.floor(h * ratio), doNotDispatch);
    }
    else {
      height(estimatedH, doNotDispatch);
    }
    return skeleton;
  }

  function hasData() {
    return _data !== null && _data !== undefined;
  }

  function hasNonZeroArea() {
    return (_innerWidth > 0 && _innerHeight > 0);
  }

  // define public fields and functions
  helper.extend(skeleton, {
    // getter only
    getCustomEventNames,
    getDispatcher() { return _dispatch; },
    getInnerWidth() { return _innerWidth; },
    getInnerHeight() { return _innerHeight; },
    getLayerOrganizer() { return _layers; },
    getRootG() { return _vis; },
    getSvg() { return _svg; },

    // getter & setter
    data,
    options,
    margin,
    offset,
    width,
    height,
    dimension,
    autoResize,
    autoResizeDetection,
    autoResizeToAspectRatio,

    // functions
    hasData,
    hasNonZeroArea,
    mixin,
    resizeToFitContainer,
    resizeToAspectRatio,
  });

  // bind events
  helper.rebind(skeleton, _dispatch, 'on');

  return skeleton;
}

export default Skeleton;
