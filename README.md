# d3Kit

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

**d3Kit** provides thin scaffold for creating *reusable* and *responsive* charts with [D3](https://github.com/mbostock/d3).
It aims to relieve you from the same groundwork tasks you found yourself doing again and again.

[Introduction slides](http://d3kit.surge.sh) |
[Getting started guide](docs/Getting-started.md) |
[API Reference](docs/api/index.md) |
[All Documentation](docs/TableOfContent.md)

For developers who have tried d3Kit v1-2, d3Kit v3 was rewritten to support D3 v4, consider several new use cases (`<canvas>`, for example) and use ES6 class for the implementation, making every chart can be extended easily.
Documentation of version 1-2 can be found [here](https://github.com/twitter/d3kit/tree/be7a37738fb5661c84920faf7f1a981025fe4993/docs)

## Install

```bash
npm install d3kit --save
```

See [getting start guide](docs/Getting-started.md) for more details.

## Examples

Here are a few examples of d3Kit in action:

* [Using d3Kit to scaffold \<svg>](http://bl.ocks.org/kristw/09d462027bb50e80cec0c53c0856e663)
* [Using d3Kit to scaffold \<canvas>](http://bl.ocks.org/kristw/2cc83b10a1677a16f6448a5108b322a1)
* [SVG Scatterplot](http://bl.ocks.org/kristw/4628672d57f5fe822bb4c84b682abb6e)
* [Canvas Scatterplot](http://bl.ocks.org/kristw/840bd7750742458f20f00749c13e6241)
* [Simple bar graph in v4 (with d3Kit)](http://bl.ocks.org/kristw/12991fb0fec6e9287980902bfb746ef7) - forked from [Simple bar graph in v4](http://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4) to show how to use d3Kit for scaffolding svg with D3 margin convention.
* [Reusable bar graph](http://bl.ocks.org/kristw/f57f88f6f60d2ef22992d7866ba2933f) - forked from the bar chart above and make it a reusable component.


## Why should you use d3Kit?

##### 😫 You are tired of copying the boilerplate `d3.select('body').append('svg')...` from D3 examples.

There is `SvgChart` for that.

##### 😫 You want to create a chart on `<canvas>` but never remember how to handle different screen resolution (retina display).

There is `CanvasChart` for that.

##### 🤔 You want to create a *reusable* chart in D3.

You can extends from `SvgChart`, `CanvasChart`, or `AbstractChart`.

##### 😫 You want to create a *responsive* chart, but are tired of listening to window resize or manually polling for changes of element size by yourself.

If your chart extends from `SvgChart`, `CanvasChart` or `AbstractChart`, you get that ability for free.

##### 🤔 You want to make a responsive chart that maintains aspect ratio.

If your chart extends from `SvgChart`, `CanvasChart` or `AbstractChart`, you get that ability for free.

##### 😫 You use [D3's margin convention](http://bl.ocks.org/mbostock/3019563) and are tired of copy pasting from [Mike's block](http://bl.ocks.org/mbostock/3019563).

If your chart extends from `SvgChart`, `CanvasChart` or `AbstractChart`, you get that ability for free.

##### 🤔 You are familiar with creating charts in D3 and want to adapt them easily into React or angular components.

Currently there are [react-d3kit](https://github.com/kristw/react-d3kit) and [angular-d3kit-adapter](https://github.com/kristw/angular-d3kit-adapter) that can convert charts written in d3Kit into React and angular components, respectively, in a few lines of code.

## What is d3Kit?

The core of d3Kit are base classes for creating a chart. Currently there are `SvgChart` and `CanvasChart`, both extends from `AbstractChart`. (This was revised and improved from the `Skeleton` in d3Kit v1-2.)

### AbstractChart

* takes a target container (usually a `<div>`) and helps you build a chart inside.
* encapsulates [D3's margin convention](http://bl.ocks.org/mbostock/3019563). The dimension of each chart is defined by `width`, `height` and `margin`.
  * `chart.width()` get/set the total width (including margin)
  * `chart.height()` get/set the total height (including margin)
  * `chart.margin()` get/set the margin
  * `chart.getInnerWidth()` returns width excluding margin. This is usually used as the boundary of the x-axis.
  * `chart.getInnerHeight()` returns height excluding margin. This is usually used as the boundary of the y-axis.
* can resize the chart to be percentage of a container and/or maintain aspect ratio
  * `chart.fit(fitOptions:Object)` Calling this function with single argument will resize the chart to fit into the container once. Please refer to [slimfit documentation](https://github.com/kristw/slimfit) for `fitOptions`.
* can listen to resize (either window or element) and update the chart size to fit container.
  * `chart.fit(fitOptions:Object, watchOptions:Boolean/Object)` Calling with two arguments, such as `chart.fit({...}, true)` or `chart.fit({...}, {...})`, will enable watching. Please refer to [slimfit documentation](https://github.com/kristw/slimfit) for `fitOptions` and `watchOptions`
  * `chart.stopFitWatcher()` will disable the watcher.
* dispatches event `resize` when the chart is resized.
  * `chart.on('resize', listener)` is then use to register what to do after the chart is resized.
* defines two main input channels `.data(...)` and `.options(...)` and dispatches event `data` and `options` when they are changed, respectively.
  * `chart.data(data)` get/set data.
  * `chart.options(options)` get/merge options
  * `chart.on('data', listener)`
  * `chart.on('options', listener)`
* assumes little about how you implement a chart. You can extends the class and implements it the way you want.

Most of the time you will not need to access `AbstractChart` directly, but you will use one of its children: `SvgChart` or `CanvasChart`.

### SvgChart

This class creates `<svg>` boilerplate inside the container.

#### A. Scaffold and create something quickly

```html
<div id="chart0"></div>
```

```javascript
import { SvgChart } from 'd3kit';
const chart = new SvgChart('#chart0', {
  initialWidth: 720,
  initialHeight: 500,
  margin: { top: 30, right: 30, bottom: 30, left: 30 },
  offset: { x: 0.5, y: 0.5 } // add little offset for sharp-edge rendering
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

#### B. Create a reusable chart

First create a chart by extending `SvgChart`.

```javascript
import { SvgChart } from 'd3kit';
import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { extent } from 'd3-array';

class SvgBubbleChart extends SvgChart {
  // Define default options for this chart
  static getDefaultOptions() {
    return deepExtend(
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

### CanvasChart

While `SvgChart` creates necessary element for building chart with `<svg>`. This class creates `<canvas>` inside the container. It also handles different screen resolution for you (retina display vs. standard display).

#### A. Scaffold and create something quickly

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

#### B. Create a reusable chart

```javascript
import { CanvasChart } from 'd3kit';
import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { extent } from 'd3-array';

class CanvasBubbleChart extends CanvasChart {
  // Define default options for this chart
  static getDefaultOptions() {
    return deepExtend(
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

## Other features

### LayerOrganizer

This was created from a habit of creating many `<g>`s inside the root `<g>`.

#### Input

```html
<svg>
  <g class="container"></g>
</svg>
```

```javascript
const layers = new LayerOrganizer(d3.selection('.container'));
layers.create(['content', 'x-axis', 'y-axis']);
```

#### Output

```html
<svg>
  <g class="container">
    <!-- layers.get('content') is a D3 selection of this g -->
    <g class="content-layer"></g>
    <!-- layers.get('x-axis') is a D3 selection of this g -->
    <g class="x-axis-layer"></g>
    <!-- layers.get('y-axis') is a D3 selection of this g -->
    <g class="y-axis-layer"></g>
  </g>
</svg>
```

All `SvgChart` includes `chart.layers` by default, which is `new LayerOrganizer(chart.container)`.

There are more features. [Read more here.](docs/LayerOrganizer.md)

### Chartlet

d3Kit v1-2 also helps you create reusable subcomponent (a.k.a. Chartlet). We have not ported it to v3 yet.

## Documentation

Want to learn more? Follow these links.

* [Getting started guide](docs/Getting-started.md)
* [API Reference](docs/api/index.md)

(We are still updating them to reflect the latest API, so some pages may be a bit outdated at the moment.)

## Appendix

A diagram explaining D3's margin convention

<p align="center">
  <a href="https://bl.ocks.org/trebor/554ffd04106ab92cb8014cd9500f428c" style="width:100%;">
    <img src="resources/skeleton.png" height="400">
  </a>
</p>

## Authors

* Robert Harris [@trebor](https://twitter.com/trebor)
* Krist Wongsuphasawat [@kristw](https://twitter.com/kristw)

## License

© 2015-2016 [Twitter, Inc.](https://twitter.com) MIT License


[npm-image]: https://badge.fury.io/js/d3kit.svg
[npm-url]: https://npmjs.org/package/d3kit
[travis-image]: https://travis-ci.org/twitter/d3kit.svg?branch=master
[travis-url]: https://travis-ci.org/twitter/d3kit
[daviddm-image]: https://david-dm.org/twitter/d3kit.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/twitter/d3kit
