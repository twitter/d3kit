define([
  './helper'
],
function(helper){
//---------------------------------------------------
// BEGIN code for this module
//---------------------------------------------------
//
// EXAMPLE USAGE:
//
// var layers = new d3LayerOrganizer(vis);
// layers.create([
//   {'axis': ['bar', 'mark']},
//   'glass',
//   'label'
// ]);
//
// Then access the layers via
// layers.get('axis'),
// layers.get('axis.bar'),
// layers.get('axis.mark'),
// layers.get('glass'),
// layers.get('label')
//

return function (mainContainer, tag) {
  var layers = {};
  tag = tag || 'g';

  function createLayerFromName(container, layerName, prefix){
    var id = prefix ? prefix + '.' + layerName : layerName;
    if(layers.hasOwnProperty(id)){
      throw 'invalid or duplicate layer id: ' + id;
    }

    var layer = container.append(tag)
      .classed(helper.dasherize(layerName)+'-layer', true);

    layers[id] = layer;
    return layer;
  }

  function createLayerFromInfo(container, layerInfo, prefix){
    if(Array.isArray(layerInfo)){
      return layerInfo.map(function(info){
        createLayerFromInfo(container, info, prefix);
      });
    }
    else if(helper.isObject(layerInfo)){
      var parentKey = Object.keys(layerInfo)[0];
      var parentLayer = createLayerFromName(container, parentKey, prefix);
      createLayerFromInfo(parentLayer, layerInfo[parentKey], prefix ? prefix + '.' + parentKey : parentKey);
      return parentLayer;
    }
    else{
      return createLayerFromName(container, layerInfo, prefix);
    }
  }

  function createLayer(layerInfo){
    return createLayerFromInfo(mainContainer, layerInfo);
  }

  function create(layerNames){
    if(Array.isArray(layerNames)){
      return layerNames.map(createLayer);
    }
    else{
      return createLayer(layerNames);
    }
  }

  function get(layerName){
    return layers[layerName];
  }

  function has(layerName){
    return !!layers[layerName];
  }

  return {
    create: create,
    get: get,
    has: has
  };

};

//---------------------------------------------------
// END code for this module
//---------------------------------------------------
});
