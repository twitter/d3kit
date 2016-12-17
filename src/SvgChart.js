import AbstractChart from './AbstractChart.js';
import SvgPlate from './SvgPlate.js';

class SvgChart extends AbstractChart {
  constructor(selector, ...options) {
    super(selector, ...options);

    const svgPlate = new SvgPlate(this);
    this.svg = this.addPlate(svgPlate);
    this.rootG = svgPlate.rootG;
    this.layers = svgPlate.layers;
    this.updateDimensionNow();
  }
}

export default SvgChart;
