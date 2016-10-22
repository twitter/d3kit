## d3Kit

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

**d3Kit** is a set of thin scaffolds and utilities for speeding visualization development with [D3](https://github.com/mbostock/d3).
It is a lightweight library (~8KB, minified) to relieve you from the same groundwork tasks you found yourself doing again and again. Writing code in d3Kit way also help you create reusable and responsive components easily.

<p align="center">
  <a href="https://bl.ocks.org/trebor/554ffd04106ab92cb8014cd9500f428c" style="width:100%;">
    <img src="resources/skeleton.png" height="400">
  </a>
</p>

d3Kit features include, but are not limited to:

* Setup ```<svg>``` according to d3's [margin convention](http://bl.ocks.org/mbostock/3019563), make it support auto-resizing and add other convenient functions. We called it a "Skeleton" for your visualization.
* Help you create reusable component.
* Help you create reusable subcomponent (a.k.a. Chartlet).
* Help you manage layers within a visualization.
* and many more...

Here are a few examples of d3Kit in action:
* [Dot in a box](https://bl.ocks.org/trebor/b7155e556a90781d78ebe4101a35d062)
* [Bubble Chart](https://bl.ocks.org/trebor/ccc5bb7da3fcaa73aa7cbee973d6dcb6)
* [Reusable Bubble Chart](https://bl.ocks.org/trebor/2f4115302d3db4084ab6792863d7731e)
* [Circle Chartlet](https://bl.ocks.org/trebor/3817668ce6a358a685cab29907c0f52f)

For more examples, [check out our gallery](https://github.com/twitter/d3kit/wiki/Gallery).

Want to learn more? [See the wiki](https://github.com/twitter/d3kit/wiki) or [API Reference](https://github.com/twitter/d3kit/wiki/API-reference)

### Can't wait to try it?

```
bower install d3kit --save
```

or

```
npm install d3kit --save
```

### Authors

* Robert Harris [@trebor](https://twitter.com/trebor)
* Krist Wongsuphasawat [@kristw](https://twitter.com/kristw)


[npm-image]: https://badge.fury.io/js/d3kit.svg
[npm-url]: https://npmjs.org/package/d3kit
[travis-image]: https://travis-ci.org/twitter/d3kit.svg?branch=master
[travis-url]: https://travis-ci.org/twitter/d3kit
[daviddm-image]: https://david-dm.org/twitter/d3kit.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/twitter/d3kit
