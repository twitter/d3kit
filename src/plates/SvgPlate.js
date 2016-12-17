import AbstractPlate from './AbstractPlate.js';
import LayerOrganizer from '../layerOrganizer.js';

class SvgPlate extends AbstractPlate {
  constructor() {
    super(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
    this.rootG = this.selection.append('g');
    this.layers = new LayerOrganizer(this.rootG);
  }

  updateDimension(...args) {
    super.updateDimension(...args);

    const { width, height } = this._state;
    const { offset, margin } = this._state.options;
    const { top, left } = margin;
    const [x, y] = offset;

    this.selection
      .attr('width', width)
      .attr('height', height);

    this.rootG.attr(
      'transform',
      `translate(${left + x},${top + y})`
    );

    return this;
  }
}

export default SvgPlate;
