define([
  './skeleton',
  './helper'
],
function(Skeleton, helper){
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------

var module = (function(){
  /**
   * Return a constructor for your custom chart type
   * @param  Object        defaultOptions default options for your chart
   * @param  Array[String] customEvents   list of custom events this chart will dispatch
   * @param  Function      constructor    constructor function function(skeleton){...}
   * @return Function                     function(chartNode, options) that return your chart
   */
  function createChart(defaultOptions, customEvents, constructor){
    var newChartClass = function(chartNode, options){
      var skeleton = new Skeleton(chartNode, helper.deepExtend({}, defaultOptions, options), customEvents);
      if(constructor) constructor(skeleton);
      return skeleton;
    };

    customEvents = customEvents ? customEvents : [];

    /**
     * Return supported custom events for this chart class.
     * This is a static method for class, not instance method.
     * @return Array[String] names of custom events
     */
    newChartClass.getCustomEvents = function(){
      return customEvents;
    };

    return newChartClass;
  }

  return {
    createChart: createChart
  };
}());

// return module
return module;

//---------------------------------------------------
// END code for this module
//---------------------------------------------------
});
