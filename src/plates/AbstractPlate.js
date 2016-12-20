import { select } from 'd3-selection';
import Base from '../Base.js';

class AbstractPlate extends Base {
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
}

export default AbstractPlate;
