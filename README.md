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
* encapsulates [D3's margin convention](http://bl.ocks.org/mbostock/3019563) [P5]
* can listen to resize (either window or element) and update the chart size to fit and maintain given aspect ratio. Once the chart is resized, it will dispatch event `resize`. [P3, P4]
* defines two main input channels `.data(...)` and `.options(...)` and dispatch event `data` and `options` when they are changed, respectively. 
* assumes little about how you implement a chart. You can extends it and implements it the way you want.

Most of the time you will not need to access `AbstractChart` directly, but you will use one of its children: `SvgChart` or `CanvasChart`.

### SvgChart

* create `<svg>` boilerplate inside the container



### CanvasChart

* create `<canvas>` inside the container. It also handles different screen resolution for you (retina display vs. standard display).

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

Want to learn more? 

* Getting started guide
* [API Reference](https://github.com/twitter/d3kit/docs/API.md)

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
