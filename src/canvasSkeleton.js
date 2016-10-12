import AbstractSkeleton from './abstractSkeleton.js';

class CanvasSkeleton extends AbstractSkeleton {
  static getCustomEventNames() {
    return [];
  }

  constructor(selector, ...options) {
    super(selector, CanvasSkeleton.DEFAULT_OPTIONS, ...options);

    this.canvas = this.container.append('canvas');

    this.updateDimensionNow();
  }

  updateDimension() {
    super.updateDimension();

    const { width, height } = this.state;
    const { pixelRatio } = this.state.options;

    this.canvas
      .style('width', width)
      .style('height', height)
      .attr('width', width * pixelRatio)
      .attr('height', height * pixelRatio);

    return this;
  }
}

CanvasSkeleton.DEFAULT_OPTIONS = {
  pixelRatio: window.devicePixelRatio,
};

export default CanvasSkeleton;
