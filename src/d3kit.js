define([
  './modules/factory',
  './modules/helper',
  './modules/skeleton',
  './modules/layerOrganizer',
  './modules/chartlet'
],
function(factory, helper, Skeleton, LayerOrganizer, Chartlet) {
  return {
    factory: factory,
    helper: helper,
    Skeleton: Skeleton,
    LayerOrganizer: LayerOrganizer,
    Chartlet: Chartlet
  };
});
