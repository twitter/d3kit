import AbstractPlate from './AbstractPlate.js';
import LayerOrganizer from '../layerOrganizer.js';

class SvgPlate extends AbstractPlate {
  constructor(...options) {
    super(document.createElementNS('http://www.w3.org/2000/svg', 'svg'), ...options);
    this.rootG = this.selection.append('g');
    this.layers = new LayerOrganizer(this.rootG);
  }

  _updateDimension() {
    const width = this.width();
    const height = this.height();
    const { top, left } = this.margin();
    const [x, y] = this.offset();

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
