import helper from './helper.js';

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

export default function (mainContainer, tag) {
  const layers = {};
  tag = tag || 'g';

  function createLayerFromName(container, layerName, prefix) {
    const id = prefix ? prefix + '.' + layerName : layerName;
    if (layers.hasOwnProperty(id)) {
      throw 'invalid or duplicate layer id: ' + id;
    }

    const layer = container.append(tag)
      .classed(helper.dasherize(layerName) + '-layer', true);

    layers[id] = layer;
    return layer;
  }

  function createLayerFromInfo(container, layerInfo, prefix) {
    if (Array.isArray(layerInfo)) {
      return layerInfo.map(function (info) {
        createLayerFromInfo(container, info, prefix);
      });
    }
    else if (helper.isObject(layerInfo)) {
      const parentKey = Object.keys(layerInfo)[0];
      const parentLayer = createLayerFromName(container, parentKey, prefix);
      createLayerFromInfo(parentLayer, layerInfo[parentKey], prefix ? prefix + '.' + parentKey : parentKey);
      return parentLayer;
    }
    else {
      return createLayerFromName(container, layerInfo, prefix);
    }
  }

  function createLayer(layerInfo) {
    return createLayerFromInfo(mainContainer, layerInfo);
  }

  function create(layerNames) {
    if (Array.isArray(layerNames)) {
      return layerNames.map(createLayer);
    }
    else {
      return createLayer(layerNames);
    }
  }

  function get(layerName) {
    return layers[layerName];
  }

  function has(layerName) {
    return !!layers[layerName];
  }

  return {
    create,
    get,
    has,
  };
}
