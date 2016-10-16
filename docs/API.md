> [Docs](../README.md) ▸ **API Reference**

## AbstractChart

##### Constructor

* [new AbstractChart(selector, options)](AbstractChart.md#constructor) - construct a chart within the specified container.

##### Fields

These fields are created by the class. Please do not override.

* [chart.dispatcher()](AbstractChart.md#dispatcher) -  internal `d3-dispatch` event dispatcher for this chart.

##### Deal with events

* [chart.getCustomEventNames()](AbstractChart.md#getCustomEventNames) - return the names of custom events that this chart can dispatch (other than `resize`, `data` and `options` that are included with every AbstractChart).
* [chart.on(eventName, listener)](AbstractChart.md#on) - add an event listener to an event from this chart.
* [chart.off(eventName, listener)](AbstractChart.md#off) - remove an event listener from this chart.

##### Deal with size

* [chart.margin([margin])](AbstractChart.md#margin) - get/set the margin.
* [chart.offset([offset])](AbstractChart.md#offset) - get/set the offset.
* [chart.width([width])](AbstractChart.md#width) - get/set the width.
* [chart.height([height])](AbstractChart.md#height) - get/set the height.
* [chart.dimension([dimension])](AbstractChart.md#dimension) - get/set both width and height at the same time.
* [chart.fit(fitOptions, watchOptions)](AbstractChart.md#fit) - fit the chart to container.
* [chart.stopFitWatcher()](AbstractChart.md#stopFitWatcher) - stop the watcher.
* [chart.getInnerWidth()](AbstractChart.md#getInnerWidth) - return the width of the chart without margin.
* [chart.getInnerHeight()](AbstractChart.md#getInnerHeight) - return the height of the chart without margin.
* [chart.hasData()](AbstractChart.md#hasData) - return true if chart has data.
* [chart.hasNonZeroArea()](AbstractChart.md#hasNonZeroArea) - return true if the inner area (*inner width x inner height*) is more than zero.
* [chart.on('resize', listener)](AbstractChart.md#event_resize) - handle when the dimension is changed.

##### Deal with data

* [chart.data([data])](AbstractChart.md#data) - get/set the data.
* [chart.on('data', listener)](AbstractChart.md#event_data) - handle when the data are set.
* [chart.options([options])](AbstractChart.md#options) - get/set the options.
* [chart.on('options', listener)](AbstractChart.md#event_options) - handle when the options are set.

## SvgChart

This class extends from AbstractChart and therefor inherits all fields and functions. In addition, it also provides the followings:

##### Fields

* [chart.rootG](SvgChart.md#rootG) - D3 selection of the root `<g>` element.
* [chart.svg](SvgChart.md#svg) - D3 selection of the `<svg>` element.
* [chart.layers](SvgChart.md#layers) - return the LayerOrganizer.

## CanvasChart

This class extends from AbstractChart and therefor inherits all fields and functions. In addition, it also provides the followings:

##### Fields

* [chart.canvas](CanvasChart.md#canvas) - D3 selection of the `<canvas>` element.

##### Functions

* [chart.getContext2d()](CanvasChart.md#getContext2d) - Return a context for drawing on canvas that has been adjusted for screen resolution and margins.

<!--
## d3Kit.Chartlet

* [new d3Kit.Chartlet](Chartlet.md#constructor) - construct a chartlet.

##### Getter Functions

* [chartlet.getDispatcher](Chartlet.md#getDispatcher) - return chartlet's dispatcher.
* [chartlet.getCustomEvents](Chartlet.md#getCustomEvents) - return chartlet's custom events.
* [chartlet.getPropertyValue](Chartlet.md#getPropertyValue) - return a naked value for a charlet named property.

##### Getter/Setter Function

* [chartlet.property](Chartlet.md#property) - return function which will return a charlet named property value.

##### Enter/Update/Exit Functions

* [chartlet.enter](Chartlet.md#enter) - will cause the chartlet to add new elements to a chart.
* [chartlet.update](Chartlet.md#update) - will cause the chartlet to update existing chart elements.
* [chartlet.exit](Chartlet.md#exit) - will cause the chartlet to remove elements from the chart.

##### Inheritance Functions

* [chartlet.inheritPropertyFrom](Chartlet.md#inheritPropertyFrom) - map a named property for parent to child chartlet.
* [chartlet.inheritPropertiesFrom](Chartlet.md#inheritPropertiesFrom) - map many named properties for parent to child chartet.
* [chartlet.publishEventsTo](Chartlet.md#publishEventsTo) - dispatch child charlet events to parent chartlet.

##### Events

* [chartlet.on](Chartlet.md#on) - bind charlet event to event handler.
* [enterDone](Chartlet.md#enterDone) - fired when asynchronous activity in [Chartlet.enter](Chartlet.md#enter) has completed.
* [updateDone](Chartlet.md#updateDone) - fired when asynchronous activity in [Chartlet.update](Chartlet.md#update) has completed.
* [exitDone](Chartlet.md#exitDone) - fired when asynchronous activity in [Chartlet.exit](Chartlet.md#exit) has completed.
-->

## LayerOrganizer

* [new d3Kit.LayerOrganizer(container, defaultTag='g')](LayerOrganizer.md#constructor) - construct a layer organizer for the specified container.
* [layers.create(config)](LayerOrganizer.md#create) - create layers of ```<g>``` within the container.
* [layers.get(name)](LayerOrganizer.md#get) - get a layer by name.
* [layers.has(name)](LayerOrganizer.md#has) - check if there is a layer with specified name.

## helper

* [helper.debounce(func, delay)](Helper.md#debounce) - debounce function from lodash.
* [helper.throttle(func, delay)](Helper.md#throttle) - throttle function from lodash.
* [helper.functor(valueOrFunc)](Helper.md#functor) - functor function from D3 v3.
* [helper.extend](Helper.md#extend) - Merge the contents of two or more objects together into the first object.
* [helper.deepExtend](Helper.md#deepExtend) - Recursively merge the contents of two or more objects together into the first object.
