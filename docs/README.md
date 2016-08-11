**d3Kit** is a lightweight (~8KB, minified) scaffold for building components with [d3.js](http://d3js.org/). After working on various projects, we found ourselves implementing the same block of code over and over to set the dimension, dispatch events, manage auto-resizing, etc. These repetitive tasks are extracted into d3Kit for everyone's sake.

Please read [Getting started guide](Getting-started.md) for how to use d3Kit in your project and see [API Reference](API.md) for full documentation.

[Gallery](Gallery.md) is also a good place to browse examples.

At a glance, here are a few things d3Kit provides for you:

### [d3Kit.Skeleton](Skeleton.md)

Creating a skeleton does all the basic groundwork for you before creating any chart.
Groundwork tasks include, but are not limited to:

* Setup the chart according to d3's [margin convention](http://bl.ocks.org/mbostock/3019563)
* Support auto-resizing
* and many more...

[read more...](Skeleton.md)

### [d3Kit.Chartlet](Chartlet.md)

The chartlets are components which can be used across different charts.  You can specify d3 style properties for each instance of a chartlet, and chartlets can dispatch events.

[read more...](Chartlet.md)

### [d3Kit.LayerOrganizer](LayerOrganizer.md)

A utility for creating layers from a given config. If you have a habit of creating many ```<g>``` to layer your visual elements. This utility will let you create nested layers easily in one command.

[read more...](LayerOrganizer.md)

### [d3Kit.factory](Factory.md)

Help you create a reusable chart easily based on [d3Kit.Skeleton](Skeleton.md).

[read more...](Factory.md)
