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
* [Simple bar graph](http://bl.ocks.org/kristw/12991fb0fec6e9287980902bfb746ef7) - show how to use d3Kit for scaffolding svg with D3 margin convention.
* [Reusable bar graph](http://bl.ocks.org/kristw/f57f88f6f60d2ef22992d7866ba2933f) - forked from the bar chart above and make it a reusable component.


## Why should you use d3Kit?

### Avoid coding basic building blocks again and again.

😫 You are tired of copying the boilerplate `d3.select('body').append('svg')...` from D3 examples.

**Solution:** There is `SvgChart` for that.

😫 You want to create a chart on `<canvas>` but never remember how to handle different screen resolution (retina display).

**Solution:** There is `CanvasChart` for that.

🤔 You want to use `<svg>` and `<canvas>` together.

**Solution:** There is `HybridChart` for that.

😫 You use [D3's margin convention](http://bl.ocks.org/mbostock/3019563) and are tired of copy pasting from [Mike's block](http://bl.ocks.org/mbostock/3019563).

**Solution:** All `SvgChart`, `CanvasChart` and `HybridChart` extends `AbstractChart`, which was built based on the margin convention.

### Reusable charts

🤔 You want to create a *reusable* chart in D3.

😫 You want to create a *responsive* chart, but are tired of listening to window resize or manually polling for element size.

🤔 You want to make a responsive chart that maintains aspect ratio.

**Solution:** Create a chart extends from `SvgChart`, `CanvasChart`, `HybridChart` or `AbstractChart` then you get all of the above handled.

🤔 You are familiar with creating charts in D3 and want to adapt them easily into React or angular components.

**Solution:** Currently there are [react-d3kit](https://github.com/kristw/react-d3kit) and [angular-d3kit-adapter](https://github.com/kristw/angular-d3kit-adapter) that can convert charts written in d3Kit into React and Angular 1 components, respectively, in a few lines of code.

## What is d3Kit?

The core of d3Kit are base classes for creating a chart. Currently there are `SvgChart`, `CanvasChart` and `HybridChart`. All are extended from `AbstractChart`.

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

Most of the time you will not need to access `AbstractChart` directly, but you will use one of its children: `SvgChart`, `CanvasChart` or `HybridChart`.

### SvgChart

This class creates `<svg>` boilerplate inside the container.

### CanvasChart

While `SvgChart` creates necessary element for building chart with `<svg>`. This class creates `<canvas>` inside the container. It also handles different screen resolution for you (retina display vs. standard display).

### HybridChart

Thought about using `<svg>` and `<canvas>` in combination? Here it is. A `HybridChart` creates both `<svg>` and `<canvas>` inside the container.

### Build your own chart with `plates`

If `SvgChart`, `CanvasChart` or `HybridChart` does not fit your need yet, you can create your own.

Under the hood, d3Kit use its "plating" system to wrap different type of components (`<svg>`, `<canvas>`, etc.). The current implementation includes three types of plates: `SvgPlate`, `CanvasPlate` and `DivPlate`.

Think of `AbstractChart` as a container. **Any resizing done to the chart will be applied to the plates in it by d3Kit.** This abstraction helps you think of a chart as one piece and not to worry about how to keep track of each children size. Then you can just focus on what to drawn on svg or canvas based on the current dimension of the chart.

* An `SvgChart` is an `AbstractChart` that has an `SvgPlate` in it.
* A `CanvasChart` is an `AbstractChart` that has a `CanvasPlate` in it.
* A `HybridChart`, as you may guess, is an `AbstractChart` that has two plates (`CanvasPlate` and `SvgPlate`) in it.

Now if you want to create a chart with multiple canvases and svg, just create a new subclass.

```javascript
import { AbstractChart, CanvasPlate, SvgPlate } from 'd3kit';

class CustomChart extends AbstractChart {
  constructor(selector, ...options) {
    super(selector, ...options);

    this.addPlate('canvas1', new CanvasPlate());
    // now access D3 selection of this <canvas> element
    // via this.plates.canvas1.getSelection()

    this.addPlate('canvas2', new CanvasPlate());
    // now access D3 selection of this <canvas> element
    // via this.plates.canvas2.getSelection()

    this.addPlate('svg', new SvgPlate());
    // now access D3 selection of this <svg> element
    // via this.plates.svg.getSelection()

    this.updateDimensionNow();
  }
}
```

Once you call

```javascript
new CustomChart('#my-chart');
```

This will be created.

```html
<div id="my-chart">
  <div class="d3kit-chart-root">
  	 <canvas />
  	 <canvas />
  	 <svg></svg>
  </div>
</div>
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
* [All Documentation](docs/TableOfContent.md)

## Appendix

A diagram explaining D3's margin convention

<p align="center">
  <a href="https://bl.ocks.org/trebor/554ffd04106ab92cb8014cd9500f428c" style="width:100%;">
    <img src="resources/skeleton.png" height="400">
  </a>
</p>

## Authors

* Robert Harris / [@trebor](https://twitter.com/trebor)
* Krist Wongsuphasawat / [@kristw](https://twitter.com/kristw)

## License

© 2015-2017 [Twitter, Inc.](https://twitter.com) MIT License

[npm-image]: https://badge.fury.io/js/d3kit.svg
[npm-url]: https://npmjs.org/package/d3kit
[travis-image]: https://travis-ci.org/twitter/d3kit.svg?branch=master
[travis-url]: https://travis-ci.org/twitter/d3kit
[daviddm-image]: https://david-dm.org/twitter/d3kit.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/twitter/d3kit
