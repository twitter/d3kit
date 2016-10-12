import AbstractSkeleton from './abstractSkeleton.js';
import LayerOrganizer from './layerOrganizer.js';

class SvgSkeleton extends AbstractSkeleton {
  static getCustomEventNames() {
    return [];
  }

  constructor(selector, ...options) {
    super(selector, SvgSkeleton.DEFAULT_OPTIONS, ...options);

    this.svg = this.container.append('svg');
    this.rootG = this.svg.append('g');
    this.layers = new LayerOrganizer(this.rootG);
    this.mainElement = this.svg.node();
    this.updateDimensionNow();
  }

  getBoundElement() {
    return this.svg.node();
  }

  updateDimension() {
    super.updateDimension();

    const { width, height } = this.state;
    const { offset, margin } = this.state.options;
    const { top, left } = margin;

    this.svg
      .attr('width', width)
      .attr('height', height);

    this.rootG.attr(
      'transform',
      `translate(${left + offset.x},${top + offset.y})`
    );

    return this;
  }
}

SvgSkeleton.DEFAULT_OPTIONS = {};

export default SvgSkeleton;
