import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { extent } from 'd3-array';
import { CanvasChart, helper } from '../../src/main.js';

export default class CanvasExample extends CanvasChart {
  static getDefaultOptions() {
    return helper.deepExtend(
      super.getDefaultOptions(),
      {
        margin: {top: 60, right: 60, bottom: 60, left: 60},
        initialWidth: 800,
        initialHeight: 460
      }
    );
  }

  /**
   * Define the names of custom events that can be dispatched from this chart
   * @return {Array[String]} event names
   */
  static getCustomEventNames() {
    return [];
  }

  constructor(selector, options) {
    super(selector, options);

    // add custom variables
    this.xScale = scaleLinear();
    this.yScale = scaleLinear();
    this.color = scaleOrdinal(schemeCategory10);

    // add basic event listeners
    this.visualize = this.visualize.bind(this);
    this.on('resize.default', this.visualize);
    this.on('data.default', this.visualize);
  }

  // You can define a new function for this class.
  visualize() {
    this.clear();

    if(!this.hasData()){
      return;
    }

    const data = this.data();

    this.xScale.domain(extent(data, d => d.x))
      .range([0, this.getInnerWidth()])
      .nice();
    this.yScale.domain(extent(data, d => d.y))
      .range([this.getInnerHeight(), 0])
      .nice();

    const ctx = this.getContext2d();
    data.forEach((d,i) => {
      ctx.fillStyle = this.color(i);
      ctx.fillRect(
        this.xScale(d.x) - d.r,
        this.yScale(d.y) - d.r,
        d.r * 2,
        d.r * 2
      );
    });

  }
}