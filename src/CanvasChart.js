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

  getContext2d() {
    const { pixelRatio, margin, offset } = this.options();
    const ctx = this.canvas.node().getContext('2d');
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.translate(
      margin.left + offset.x,
      margin.top + offset.y
    );
    return ctx;
  }

  clear() {
    const { pixelRatio } = this.options();
    const ctx = this.canvas.node().getContext('2d');
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.clearRect(0, 0, this.width(), this.height());
    return this;
  }

  _updateDimension() {
    super._updateDimension();

    const { width, height } = this._state;
    const { pixelRatio } = this._state.options;

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
