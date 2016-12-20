import AbstractChart from './AbstractChart.js';
import { deepExtend } from '../helper.js';

class CanvasChart extends AbstractChart {
  constructor(selector, ...options) {
    super(selector, ...options);

    const plate = this.addPlate('canvas', new CanvasPlate());
    this.canvas = plate.getSelection();
    this.updateDimensionNow();
  }

  getContext2d() {
    return this.plates.canvas.getContext2d();
  }

  clear() {
    this.plates.canvas.clear();
    return this;
  }
}

export default CanvasChart;
