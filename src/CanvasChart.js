import AbstractChart from './AbstractChart.js';
import CanvasPlate from './CanvasPlate.js';
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

    const canvasPlate = new CanvasPlate(this);
    this.canvas = this.addPlate(canvasPlate);
    this.updateDimensionNow();
  }

  getContext2d() {
    return this.canvasPlate.getContext2d();
  }

  clear() {
    this.canvasPlate.clear();
    return this;
  }
}

export default CanvasChart;
