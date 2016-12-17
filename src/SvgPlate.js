import { select } from 'd3-selection';
import LayerOrganizer from './layerOrganizer.js';

class SvgPlate {
  constructor(chart) {
    this.chart = chart;
    this.node = document.createElement('svg');
    this.selection = select(this.node);
    this.rootG = this.selection.append('g');
    this.layers = new LayerOrganizer(this.rootG);
  }

  getNode() {
    return this.node;
  }

  getSelection() {
    return this.selection;
  }

  updateDimension() {
    const { width, height } = this.chart._state;
    const { offset, margin } = this.chart.options();
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
