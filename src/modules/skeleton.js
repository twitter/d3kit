define([
  'd3',
  './layerOrganizer',
  './helper'
],
function(d3, LayerOrganizer, helper){
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------

// Constants
var DEFAULT_OPTIONS = {
  margin: {top: 30, right: 30, bottom: 30, left: 30},
  offset: [0.5, 0.5],
  initialWidth:  720,
  initialHeight: 500
};

var BASE_EVENTS = ['data', 'options', 'resize'];

// Core Skeleton
function Skeleton(chartNode, customOptions, customEvents){
  var skeleton = {};

  chartNode = helper.$(chartNode);

  var _data = null;

  var _options = helper.deepExtend({}, DEFAULT_OPTIONS, customOptions);

  var _totalWidth  = 0;
  var _totalHeight = 0;
  var _innerWidth  = 0;
  var _innerHeight = 0;

  var _autoResizeDetection = 'window'; // either 'window' or 'dom';
  var _autoResizeMode = false;
  var _autoResizeFn = null;
  var _autoResizeToAspectRatio = false;

  // add svg element
  var _svg = d3.select(chartNode).append('svg');
  var _vis = _svg.append('g');
  updateOffset();

  var _layers = new LayerOrganizer(_vis);

  // setup event dispatcher
  var _customEvents = customEvents ? customEvents.concat(BASE_EVENTS) : BASE_EVENTS;
  var _dispatch = d3.dispatch.apply(d3, _customEvents);

  // set default dimension
  dimension([
    _options.initialWidth,
    _options.initialHeight
  ]);

  function data(newValue, doNotDispatch){
    // getter
    if(arguments.length === 0){
      return _data;
    }
    // setter
    _data = newValue;
    // dispatch
    if(!doNotDispatch){
      _dispatch.data(newValue);
    }
    return skeleton;
  }

  function options(newValue, doNotDispatch){
    // getter
    if(arguments.length === 0){
      return _options;
    }

    // setter
    _options = helper.deepExtend(_options, newValue);

    if(newValue){
      if(newValue.margin){
        updateMargin(doNotDispatch);
      }
      else if(newValue.offset){
        // When the margin is changed,
        // updateOffset() is already called within updateMargin()
        // so "else if" is used here instead of "if".
        // This will call updateOffset() manually
        // only when margin is not changed and offset is changed.
        updateOffset();
      }
    }

    // dispatch
    if(!doNotDispatch){
      _dispatch.options(newValue);
    }
    return skeleton;
  }

  function updateOffset(){
    _vis.attr('transform', 'translate(' + (_options.margin.left + _options.offset[0]) + ',' + (_options.margin.top + _options.offset[1]) + ')');
  }

  function updateMargin(doNotDispatch){
    updateOffset();

    _innerWidth  = _totalWidth - _options.margin.left - _options.margin.right;
    _innerHeight = _totalHeight - _options.margin.top - _options.margin.bottom;

    if(!doNotDispatch){
      _dispatch.resize([_totalWidth, _totalHeight, _innerWidth, _innerHeight]);
    }
  }

  function margin(newValue, doNotDispatch){
    // getter
    if(arguments.length === 0){
      return _options.margin;
    }

    // setter
    _options.margin = helper.extend(_options.margin, newValue);
    updateMargin(doNotDispatch);

    return skeleton;
  }

  function offset(newValue){
    // getter
    if(arguments.length === 0){
      return _options.offset;
    }

    // setter
    _options.offset = newValue;
    updateOffset();

    return skeleton;
  }

  function width(newValue, doNotDispatch){
    // getter
    if(arguments.length === 0 || newValue===null || newValue===undefined){
      return _totalWidth;
    }

    // setter
    if(helper.isNumber(newValue)){
      _totalWidth = +newValue;
    }
    else if(newValue.trim().toLowerCase()=='auto'){
      _totalWidth = chartNode.clientWidth;
    }
    else{
      _totalWidth = +((newValue+'').replace(/px/gi, '').trim());
    }

    if(helper.isNaN(_totalWidth)){
      throw Error('invalid width: ' + _totalWidth);
    }

    // round to integer
    _totalWidth = Math.floor(_totalWidth);
    _innerWidth = _totalWidth - _options.margin.left - _options.margin.right;

    _svg.attr('width', _totalWidth);

    // dispatch
    if(!doNotDispatch){
      _dispatch.resize([_totalWidth, _totalHeight, _innerWidth, _innerHeight]);
    }
    return skeleton;
  }

  function height(newValue, doNotDispatch){
    // getter
    if(arguments.length === 0 || newValue===null || newValue===undefined){
      return _totalHeight;
    }

    // setter
    if(helper.isNumber(newValue)){
      _totalHeight = +newValue;
    }
    else if(newValue.trim().toLowerCase()=='auto'){
      _totalHeight = chartNode.clientHeight;
    }
    else{
      _totalHeight = +((newValue+'').replace(/px/gi, '').trim());
    }

    if(helper.isNaN(_totalHeight)){
      throw Error('invalid height: ' + _totalHeight);
    }

    // round to integer
    _totalHeight = Math.floor(_totalHeight);

    _innerHeight = _totalHeight - _options.margin.top - _options.margin.bottom;
    _svg.attr('height', _totalHeight);

    // dispatch
    if(!doNotDispatch){
      _dispatch.resize([_totalWidth, _totalHeight, _innerWidth, _innerHeight]);
    }
    return skeleton;
  }

  function dimension(values, doNotDispatch){
    if(arguments.length === 0){
      return [_totalWidth, _totalHeight];
    }
    width(values[0], true);
    height(values[1], doNotDispatch);

    return skeleton;
  }

  function autoResize(newMode){
    if(arguments.length === 0){
      return _autoResizeMode;
    }
    else if(_autoResizeMode!=newMode){
      return setupAutoResize(newMode, _autoResizeDetection);
    }
    return skeleton;
  }

  function autoResizeDetection(newDetection){
    if(arguments.length === 0){
      return _autoResizeDetection;
    }
    else if(_autoResizeDetection!=newDetection){
      return setupAutoResize(_autoResizeMode, newDetection);
    }
    return skeleton;
  }

  function autoResizeToAspectRatio(ratio){
    if(arguments.length === 0){
      return _autoResizeToAspectRatio;
    }

    if(ratio===null || ratio===undefined || ratio==='' || ratio===false || (ratio+'').toLowerCase()==='false'){
      _autoResizeToAspectRatio = false;
    }
    else if(!helper.isNumber(ratio)){
      _autoResizeToAspectRatio = false;
    }
    else if(+ratio===0){
      _autoResizeToAspectRatio = false;
    }
    else{
      _autoResizeToAspectRatio = +ratio;
    }
    return skeleton;
  }

  function clearAutoResizeListener(){
    if(_autoResizeFn){
      switch(_autoResizeDetection){
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

  function setAutoResizeListener(fn){
    if(fn){
      switch(_autoResizeDetection){
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

  function setupAutoResize(newMode, newDetection){
    newMode = newMode && (newMode+'').toLowerCase()=='false' ? false : newMode;
    newDetection = newDetection || _autoResizeDetection;

    // check if there is change in listener
    if(newMode!=_autoResizeMode){
      clearAutoResizeListener();
      _autoResizeMode = newMode;
      _autoResizeDetection = newDetection;
      if(newMode){
        _autoResizeFn = helper.debounce(function(){
          if(_autoResizeToAspectRatio){
            resizeToFitContainer(_autoResizeMode, true);
            resizeToAspectRatio(_autoResizeToAspectRatio);
          }
          else{
            resizeToFitContainer(_autoResizeMode);
          }
        }, 100);
        setAutoResizeListener(_autoResizeFn);
      }
    }
    // change detection mode only
    else if(newDetection!=_autoResizeDetection){
      var oldAutoResizeFn = _autoResizeFn;
      clearAutoResizeListener();
      _autoResizeDetection = newDetection;
      setAutoResizeListener(oldAutoResizeFn);
    }

    if(_autoResizeFn) _autoResizeFn();

    return skeleton;
  }

  function getCustomEventNames(){
    return Object.keys(_dispatch).filter(function(d){
      return BASE_EVENTS.indexOf(d) < 0;
    });
  }

  function mixin(mixer){
    var self = skeleton;
    if(helper.isObject(mixer)){
      Object.keys(mixer).forEach(function(key){
        self[key] = mixer[key];
      });
    }
    return self;
  }

  // This function is only syntactic sugar
  function resizeToFitContainer(mode, doNotDispatch){
    switch(mode){
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

  function resizeToAspectRatio(ratio, doNotDispatch){
    var w = _totalWidth;
    var h = _totalHeight;

    if(!helper.isNumber(ratio)) throw 'Invalid ratio: must be a Number';

    ratio = +ratio;

    // no need to resize if already at ratio
    if( (w/h).toFixed(4) == ratio.toFixed(4) ) return skeleton;

    var estimatedH = Math.floor(w / ratio);
    if(estimatedH > h){
      width(Math.floor(h * ratio), doNotDispatch);
    }
    else{
      height(estimatedH, doNotDispatch);
    }
    return skeleton;
  }

  function hasData(){
    return _data!==null && _data!==undefined;
  }

  function hasNonZeroArea(){
    return (_innerWidth > 0 && _innerHeight > 0);
  }

  // define public fields and functions
  helper.extend(skeleton, {
    // getter only
    getCustomEventNames: getCustomEventNames,
    getDispatcher: function(){ return _dispatch; },
    getInnerWidth: function(){ return _innerWidth; },
    getInnerHeight: function(){ return _innerHeight; },
    getLayerOrganizer: function(){ return _layers; },
    getRootG: function(){ return _vis; },
    getSvg: function(){ return _svg; },

    // getter & setter
    data: data,
    options: options,
    margin: margin,
    offset: offset,
    width: width,
    height: height,
    dimension: dimension,
    autoResize: autoResize,
    autoResizeDetection: autoResizeDetection,
    autoResizeToAspectRatio: autoResizeToAspectRatio,

    // functions
    hasData: hasData,
    hasNonZeroArea: hasNonZeroArea,
    mixin: mixin,
    resizeToFitContainer: resizeToFitContainer,
    resizeToAspectRatio: resizeToAspectRatio
  });

  // bind events
  d3.rebind(skeleton, _dispatch, 'on');

  return skeleton;
}

// return module
return Skeleton;

//---------------------------------------------------
// END code for this module
//---------------------------------------------------
});