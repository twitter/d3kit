import AbstractChart from './AbstractChart.js';
import SvgPlate from './SvgPlate.js';

class SvgChart extends AbstractChart {
  constructor(selector, ...options) {
    super(selector, ...options);

    const plate = this.addPlate(new SvgPlate());
    this.svg = plate.getSelection();
    this.rootG = plate.rootG;
    this.layers = plate.layers;
    this.updateDimensionNow();
  }
}

export default SvgChart;
