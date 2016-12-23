import AbstractChart from './AbstractChart.js';
import SvgPlate from '../plates/SvgPlate.js';

class SvgChart extends AbstractChart {
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

export default SvgChart;
