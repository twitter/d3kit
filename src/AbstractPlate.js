import { select } from 'd3-selection';
import { extend } from './helper.js';

class AbstractPlate {
  constructor(node) {
    this._state = {
      width: 720,
      height: 500,
      options: {
        margin: {
          top: 30,
          right: 30,
          bottom: 30,
          left: 30,
        },
        offset: [0.5, 0.5]
      }
    };
    this.node = node;
    this.selection = select(this.node);
  }

  getNode() {
    return this.node;
  }

  getSelection() {
    return this.selection;
  }

  updateDimension(parentPlate) {
    if (parentPlate) {
      const { width, height } = parentPlate._state;
      const { offset, margin } = parentPlate._state.options;
      this._state.width = width;
      this._state.height = height;
      this._state.options.offset = offset.concat();
      extend(this._state.options.margin, margin);
    }
  }
}

export default AbstractPlate;
