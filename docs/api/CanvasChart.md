 > [Docs](../index.md) ▸ [API Reference](index.md) ▸ **CanvasChart**

# CanvasChart

This class extends from [AbstractChart](AbstractChart.md) and therefore inherits all fields and functions. In addition, this class also creates `<canvas>` in side the container.

## Examples

### A. Scaffold and create something quickly

```html
<div id="chart0"></div>
```

```javascript
import { SvgChart } from 'd3kit';
const chart = new CanvasChart('#chart0', {
  initialWidth: 720,
  initialHeight: 500,
  margin: { top: 30, right: 30, bottom: 30, left: 30 }
});
```

The output will looks like this.

```html
<!--chart.container is a D3 selection of this element.-->
<div id="chart0">
  <!--chart.canvas is a D3 selection of this element.-->
  <!--notice that width/height are handled to ensure that it will look nice on retina display-->
  <canvas width="1440" height="1000" style="width: 720px; height: 500px;"></canvas>
</div>
```

So you can draw on the canvas

```javascript
const ctx = chart.getContext2d();
ctx.fillRect(10, 10, 10, 10);
```

### B. Create a reusable chart

```javascript
import { CanvasChart, helper } from 'd3kit';
import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { extent } from 'd3-array';

class CanvasBubbleChart extends CanvasChart {
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
      .range([0, this.getInnerWidth()]);
    this.yScale.domain(extent(data, d => d.y))
      .range([this.getInnerHeight(), 0]);

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

export default CanvasBubbleChart;
```

## Constructor

```javascript
const chart = new CanvasChart(container[, options]);
```

* **options:Object** - There is an extra field `pixelRatio` to specify the resolution of the canvas. Default value is `window.devicePixelRatio`.

## Fields

<a name="canvas" href="CanvasChart.md#canvas">#</a> chart.**canvas**

Return a D3 selection of ```<canvas>``` element.

## Functions

<a name="clear" href="CanvasChart.md#clear">#</a> chart.**clear**()

Clear canvas

<a name="getContext2d" href="CanvasChart.md#getContext2d">#</a> chart.**getContext2d**()

Return `context2d` that has been adjusted for scaling and margins.

