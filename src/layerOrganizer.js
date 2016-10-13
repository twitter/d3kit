import { isObject, kebabCase } from './helper.js';

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
// layers.get('axis/bar'),
// layers.get('axis/mark'),
// layers.get('glass'),
// layers.get('label')

export default function (mainContainer, defaultTag = 'g') {
  const layers = {};

  function createLayerFromName(container, layerName, prefix = '') {
    const chunks = layerName.split('.');
    let name;
    let tag;
    if (chunks.length > 1) {
      tag = chunks[0].length > 0 ? chunks[0] : defaultTag;
      name = chunks[1];
    } else {
      tag = defaultTag;
      name = chunks[0];
    }

    const id = `${prefix}${name}`;
    if (layers.hasOwnProperty(id)) {
      throw new Error(`invalid or duplicate layer id: ${id}`);
    }
    const className = `${kebabCase(name)}-layer`;
    const layer = container.append(tag)
      .classed(className, true);

    layers[id] = layer;
    return layer;
  }

  function createLayerFromConfig(container, config, prefix = '') {
    if (Array.isArray(config)) {
      return config
        .map(info => createLayerFromConfig(container, info, prefix));
    } else if (isObject(config)) {
      const [parentKey] = Object.keys(config);
      const parentLayer = createLayerFromName(container, parentKey, prefix);
      createLayerFromConfig(parentLayer, config[parentKey], `${prefix}${parentKey}/`);
      return parentLayer;
    }

    return createLayerFromName(container, config, prefix);
  }

  function createLayer(config) {
    return createLayerFromConfig(mainContainer, config);
  }

  function create(layerNames) {
    return Array.isArray(layerNames)
      ? layerNames.map(createLayer)
      : createLayer(layerNames);
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
