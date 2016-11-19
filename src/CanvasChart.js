import AbstractChart from './AbstractChart.js';
import { deepExtend } from './helper.js';

class CanvasChart extends AbstractChart {
  static getDefaultOptions() {
    return deepExtend(
      super.getDefaultOptions(),
      {
        pixelRatio: window.devicePixelRatio,
      }
    );
  }

  constructor(selector, ...options) {
    super(selector, ...options);

    this.canvas = this.container.append('canvas');
    this.updateDimensionNow();
  }

  getContext2d() {
    const { pixelRatio, margin, offset } = this.options();
    const [x, y] = offset;
    const ctx = this.canvas.node().getContext('2d');
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.translate(
      margin.left + x,
      margin.top + y
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
      .style('width', `${width}px`)
      .style('height', `${height}px`)
      .attr('width', width * pixelRatio)
      .attr('height', height * pixelRatio);

    return this;
  }
}

export default CanvasChart;
