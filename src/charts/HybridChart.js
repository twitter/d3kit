import CanvasChart from './CanvasChart.js';
import SvgPlate from '../plates/SvgPlate.js';

class HybridChart extends CanvasChart {
  constructor(selector, ...options) {
    super(selector, ...options);

    this.addPlate('svg', new SvgPlate());
    const plate = this.plates.svg;
    this.svg = plate.getSelection();
    this.rootG = plate.rootG;
    this.layers = plate.layers;
    this.updateDimensionNow();
  }
}

export default HybridChart;
