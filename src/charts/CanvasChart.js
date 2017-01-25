import AbstractChart from './AbstractChart.js';
import CanvasPlate from '../plates/CanvasPlate.js';

class CanvasChart extends AbstractChart {
  constructor(selector, ...options) {
    super(selector, ...options);

    this.addPlate('canvas', new CanvasPlate());
    this.canvas = this.plates.canvas.getSelection();
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
