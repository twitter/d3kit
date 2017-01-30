import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { extent } from 'd3-array';
import { HybridChart, helper } from '../../src/main.js';

export default class HybridExample extends HybridChart {
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
    return ['bubbleClick'];
  }

  constructor(selector, options) {
    super(selector, options);

    // create <g> layers
    this.layers.create(['x-axis', 'y-axis']);

    // add custom variables
    this.xScale = scaleLinear();
    this.yScale = scaleLinear();
    this.color = scaleOrdinal(schemeCategory10);
    this.xAxis = axisBottom().scale(this.xScale);
    this.yAxis = axisLeft().scale(this.yScale);

    // add basic event listeners
    this.visualize = this.visualize.bind(this);
    this.on('resize.default', this.visualize);
    this.on('data.default', this.visualize);
  }

  // You can define a new function for this class.
  visualize() {
    if(!this.hasData()){
      this.layers.get('content').selectAll('*').remove();
      return;
    }

    const data = this.data();

    this.xScale.domain(extent(data, d => d.x))
      .range([0, this.getInnerWidth()])
      .nice();
    this.yScale.domain(extent(data, d => d.y))
      .range([this.getInnerHeight(), 0])
      .nice();

    this.layers.get('x-axis')
      .attr('transform', `translate(0,${this.getInnerHeight()})`)
      .call(this.xAxis);

    this.layers.get('y-axis')
      .call(this.yAxis);

    this.clear();

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