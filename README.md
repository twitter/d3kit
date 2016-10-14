# d3Kit

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

**d3Kit** provides thin scaffold for creating reusable charts and utilities for speeding visualization development with [D3](https://github.com/mbostock/d3).
It aims to relieve you from the same groundwork tasks you found yourself doing again and again. Writing code in d3Kit way also help you create reusable and responsive components easily.

For developers who have tried d3Kit v1-2, d3Kit v3 was rewritten to support D3 v4, consider several new use cases (`<canvas>`, for example) and use ES6 class for the implementation, making every chart can be extended easily.

## Install

```bash
# via npm
npm install d3-selection d3-dispatch d3kit --save
# or bower
bower install d3 d3kit --save
```

## Why should you use d3Kit?

##### **P1:** You are tired of copying the boilerplate `d3.select('body').append('svg')...` from D3 examples. 

There is `SvgChart` for that.

##### **P2:** You want to create a chart on `<canvas>` but never remember how to handle different screen resolution (retina display).

There is `CanvasChart` for that.

##### **P2:** You want to create a *reusable* chart in D3.

You can extends from `SvgChart`, `CanvasChart`, or `AbstractChart`.

##### **P3:** You want to create a *responsive* chart, but are tired of listening to window resize or manually polling for changes of element size by yourself. 

If your chart extends from `SvgChart`, `CanvasChart` or `AbstractChart`, you get that ability for free.

##### **P4:** You want to make a responsive chart that maintains aspect ratio.

If your chart extends from `SvgChart`, `CanvasChart` or `AbstractChart`, you get that ability for free.

##### **P5:** You use [D3's margin convention](http://bl.ocks.org/mbostock/3019563) and are tired of copy pasting from [Mike's block](http://bl.ocks.org/mbostock/3019563)

If your chart extends from `SvgChart`, `CanvasChart` or `AbstractChart`, you get that ability for free.

##### **P6:** You are familiar with creating charts in D3 and want to adapt them easily into React or angular components.

Currently there are [react-d3kit](https://github.com/kristw/react-d3kit) and [angular-d3kit-adapter](https://github.com/kristw/angular-d3kit-adapter) that can convert any chart written in d3Kit into React and angular components, respectively, in a few lines of code.

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
* can listen to resize (either window or element) and update the chart size to fit and maintain given aspect ratio using slimfit library. 
  * `chart.fit(fitOptions, watchOptions)`
  * `chart.stopFitWatcher()`
* dispatches event `resize` when the chart is resized.
  * `chart.on('resize', listener)` is then use to register what to do after the chart is resized.
* defines two main input channels `.data(...)` and `.options(...)` and dispatches event `data` and `options` when they are changed, respectively. 
  * `chart.on('data', listener)`
  * `chart.on('options', listener)`
* assumes little about how you implement a chart. You can extends the class and implements it the way you want.

Most of the time you will not need to access `AbstractChart` directly, but you will use one of its children: `SvgChart` or `CanvasChart`.

### SvgChart

This class also creates `<svg>` boilerplate inside the container.

#### Scaffold and create something quickly

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

#### Create a reusable chart

First create a chart by extending `SvgChart`.

```javascript
import { SvgChart } from 'd3kit';
import { scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { extent } from 'd3-array';

// Define default options for this chart
const DEFAULT_OPTIONS = {
  margin: {top: 60, right: 60, bottom: 60, left: 60},
  initialWidth: 800,
  initialHeight: 460
};

class SvgBubbleChart extends SvgChart {
  /**
   * Define the names of custom events that can be dispatched from this chart
   * @return {Array[String]} event names
   */
  static getCustomEventNames() {
    return ['bubbleClick'];
  }

  constructor(selector, options) {
    super(selector, DEFAULT_OPTIONS, options);

    // Create <g> layers. See LayerOrganizer
    this.layers.create(['content', 'x-axis', 'y-axis']);

    // Add custom variables
    this.xScale = scaleLinear();
    this.yScale = scaleLinear();
    this.color = scaleOrdinal(schemeCategory10);
    this.xAxis = axisBottom().scale(this.xScale);
    this.yAxis = axisLeft().scale(this.yScale);

    // Add basic event listeners
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
      .range([0, this.getInnerWidth()]);
    this.yScale.domain(extent(data, d => d.y))
      .range([this.getInnerHeight(), 0]);

    this.layers.get('x-axis')
      .attr('transform', `translate(0,${this.getInnerHeight()})`)
      .call(this.xAxis);

    this.layers.get('y-axis')
      .call(this.yAxis);

    const selection = this.layers.get('content').selectAll('circle')
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

SvgBubbleChart.DEFAULT_OPTIONS = DEFAULT_OPTIONS;

export default SvgBubbleChart;
```

Then use it

```
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

This class also creates `<canvas>` inside the container. It also handles different screen resolution for you (retina display vs. standard display).

## Other features

### LayerOrganizer

Help you manage layers.

### Chartlet

d3Kit v1-2 also helps you create reusable subcomponent (a.k.a. Chartlet). We have not ported it to v3 yet. 

## Examples

Here are a few examples of d3Kit in action:

* [Dot in a box](https://bl.ocks.org/trebor/b7155e556a90781d78ebe4101a35d062)
* [Bubble Chart](https://bl.ocks.org/trebor/ccc5bb7da3fcaa73aa7cbee973d6dcb6)
* [Reusable Bubble Chart](https://bl.ocks.org/trebor/2f4115302d3db4084ab6792863d7731e)
* [Circle Chartlet](https://bl.ocks.org/trebor/3817668ce6a358a685cab29907c0f52f)

For more examples, [check out our gallery](https://github.com/twitter/d3kit/wiki/Gallery).

## Documentation

Want to learn more? Follow these links. 

* [Getting started guide](https://github.com/twitter/d3kit/docs/Getting-started.md)
* [API Reference](https://github.com/twitter/d3kit/docs/API.md) (We are still updating them to reflect the latest API, so some pages may be a bit outdated at the moment.)

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
