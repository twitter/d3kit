import AbstractChart from './AbstractChart.js';

class CanvasChart extends AbstractChart {
  static getCustomEventNames() {
    return [];
  }

  constructor(selector, ...options) {
    super(selector, CanvasChart.DEFAULT_OPTIONS, ...options);

    this.canvas = this.container.append('canvas');
    this.updateDimensionNow();
  }

  getBoundElement() {
    return this.canvas.node();
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

CanvasChart.DEFAULT_OPTIONS = {
  pixelRatio: window.devicePixelRatio,
};

export default CanvasChart;
