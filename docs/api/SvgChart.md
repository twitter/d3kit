> [Docs](../index.md) ▸ [API Reference](index.md) ▸ **SvgChart**

# SvgChart

This class extends from [AbstractChart](AbstractChart.md) and therefore inherits all fields and functions. These additional tasks are performed:

* Creates ```<svg>``` in side the container.
* Creates ```<g>``` within the ```<svg>``` using D3's [margin convention](http://bl.ocks.org/mbostock/3019563). This ```<g>``` is called the root ```<g>``` and can be accessed via `chart.rootG`.

## Example Usage

### A. Scaffold and create something quickly

```html
<div id="chart0"></div>
```

```javascript
import { SvgChart } from 'd3kit';
const chart = new SvgChart('#chart0', {
  initialWidth: 720,
  initialHeight: 500,
  margin: { top: 30, right: 30, bottom: 30, left: 30 },
  offset: [0.5, 0.5] // add little offset for sharp-edge rendering
});
```

The output will looks like this.

```html
<!--chart.container is a D3 selection of this element.-->
<div id="chart0">
  <!--chart.svg is a D3 selection of this element.-->
  <svg width="720" height="500">
    <!--chart.rootG is a D3 selection of this element.-->
    <g transform="translate(30.5,30.5)"></g>
  </svg>
</div>
```

So you can append a circle or do anything you usually do with D3.

```javascript
chart.rootG.append('circle')
  .attr('cx', 10)
  .attr('cy', 10)
  .attr('r', 5)
```

### B. Create a reusable chart

First create a chart by extending `SvgChart`.

```javascript
import { SvgChart, helper } from 'd3kit';
import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { extent } from 'd3-array';

class SvgBubbleChart extends SvgChart {
  // Define default options for this chart
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

    // Add custom variables
    this.xScale = scaleLinear();
    this.yScale = scaleLinear();
    this.color = scaleOrdinal(schemeCategory10);
    this.xAxis = axisBottom().scale(this.xScale);
    this.yAxis = axisLeft().scale(this.yScale);
    this.xAxisG = this.rootG.append('g');
    this.yAxisG = this.rootG.append('g');

    // Add basic event listeners
    this.visualize = this.visualize.bind(this);
    this.on('resize.default', this.visualize);
    this.on('data.default', this.visualize);
  }

  // You can define a new function for this class.
  visualize() {
    if(!this.hasData()) return;

    const data = this.data();

    this.xScale.domain(extent(data, d => d.x))
      .range([0, this.getInnerWidth()]);
    this.yScale.domain(extent(data, d => d.y))
      .range([this.getInnerHeight(), 0]);

    this.xAxisG
      .attr('transform', `translate(0,${this.getInnerHeight()})`)
      .call(this.xAxis);

    this.yAxisG.call(this.yAxis);

    const selection = this.rootG.selectAll('circle')
      .data(data);

    selection.exit().remove();

    const sEnter = selection.enter().append('circle')
      .attr('cx', d => this.xScale(d.x))
      .attr('cy', d => this.yScale(d.y))
      .on('click', (...args) => {
        this.dispatcher.apply('bubbleClick', this, args);
      });

    selection.merge(sEnter)
      .attr('cx', d => this.xScale(d.x))
      .attr('cy', d => this.yScale(d.y))
      .attr('r', d => d.r)
      .style('fill', (d,i) => this.color(i));
  }
}

export default SvgBubbleChart;
```

Then use it

```javascript
const chart1 = new SvgBubbleChart('#chart1', {
  margin: { top: 20 },
  initialWidth: 300,
  initialHeight: 300,
})
  .data(bubbles)
  // handle bubbleClick event
  .on('bubbleClick', d => { alert(JSON.stringify(d)); })
  // demonstrate auto resizing to maintain 16:9 aspect ratio
  .fit({
    mode: 'aspectRatio',
    ratio: 16/9,
  }, true);
```

## Constructor

```javascript
const chart = new SvgChart(container[, options]);
```

## Fields

<a name="layers" href="SvgChart.md#layers">#</a> chart.**layers**

Return the chart's internal layer organizer, which is a [LayerOrganizer](LayerOrganizer) that wraps the root ```<g>```.

<a name="rootG" href="SvgChart.md#rootG">#</a> chart.**rootG**

Return a D3 selection that is the root ```<g>``` element, to which you will append the rest of the elements for your chart.

<a name="svg" href="SvgChart.md#svg">#</a> chart.**svg**

Return a D3 selection that is the chart's ```<svg>``` element.
