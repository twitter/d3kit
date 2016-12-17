import { select } from 'd3-selection';
import { extend } from '../helper.js';
import Box from '../Box.js';

class AbstractPlate extends Box {
  constructor(node, ...options) {
    super(...options);
    this.node = node;
    this.selection = select(this.node);
  }

  getNode() {
    return this.node;
  }

  getSelection() {
    return this.selection;
  }

  updateDimension(parent) {
    this.copyDimension(parent);
  }
}

export default AbstractPlate;
