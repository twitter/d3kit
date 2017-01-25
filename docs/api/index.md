> [Docs](../index.md) ▸ **API Reference**

## AbstractChart

##### Constructor

const chart = [new AbstractChart(container[, options])](AbstractChart.md#constructor)

##### Fields

* [chart.container](AbstractChart.md#container) - D3 selection of the container.
* [chart.dispatcher](AbstractChart.md#dispatch) - A `d3-dispatch` event dispatcher for this chart.

##### Event functions

* *(static)* [AbstractChart.getCustomEventNames()](AbstractChart.md#static-getCustomEventNames) - return the names of custom events that an object of this class can dispatch (other than `resize`, `data` and `options` that are included with every AbstractChart).
* [chart.getCustomEventNames()](AbstractChart.md#getCustomEventNames) - return the names of custom events that this chart can dispatch (other than `resize`, `data` and `options` that are included with every AbstractChart).
* [chart.on(eventName, listener)](AbstractChart.md#on) - add an event listener to an event from this chart.
* [chart.off(eventName, listener)](AbstractChart.md#off) - remove an event listener from this chart.
* [chart.setupDispatcher(customEventNames)](AbstractChart.md#setupDispatcher) - setup the dispatcher to include the specified custom event names.
* [chart.dispatchAs(name)](AbstractChart.md#dispatchAs) - Returns an event handler that will capture all arguments and dispatch as event `name`.

##### Data functions

* *(static)* [AbstractChart.getDefaultOptions()](AbstractChart.md#static-getDefaultOptions) - create and return a default `options` Object. Overwrite this function when extending the class to modify default options.
* [chart.data([data])](AbstractChart.md#data) - get/set the data.
* [chart.on('data', listener)](AbstractChart.md#event_data) - handle when the data are set.
* [chart.hasData()](AbstractChart.md#hasData) - return `true` if data is not `null` or `undefined`.
* [chart.options([options])](AbstractChart.md#options) - get/set the options.
* [chart.on('options', listener)](AbstractChart.md#event_options) - handle when the options are set.

##### Size functions

* [chart.dimension([dimension])](AbstractChart.md#dimension) - get/set both width and height at the same time.
* [chart.fit(fitOptions[, watchOptions])](AbstractChart.md#fit) - Calling this function with single argument will resize the chart to fit into the container once. Calling with two arguments, such as `chart.fit({...}, true)` or `chart.fit({...}, {...})`, will enable watching. Please refer to [slimfit documentation](https://github.com/kristw/slimfit) for `fitOptions` and `watchOptions`
* [chart.getInnerHeight()](AbstractChart.md#getInnerHeight) - return the height of the chart without margin.
* [chart.getInnerWidth()](AbstractChart.md#getInnerWidth) - return the width of the chart without margin.
* [chart.hasNonZeroArea()](AbstractChart.md#hasNonZeroArea) - return `true` if the inner area (*inner width x inner height*) is more than zero.
* [chart.height([height])](AbstractChart.md#height) - get/set the height.
* [chart.margin([margin])](AbstractChart.md#margin) - get/set the margin.
* [chart.offset([offset])](AbstractChart.md#offset) - get/set the offset.
* [chart.stopFitWatcher()](AbstractChart.md#stopFitWatcher) - stop the watcher.
* [chart.updateDimensionNow()](AbstractChart.md#updateDimensionNow()) - force the chart to recompute the dimension immediately. This is a synchronous operation while other sizing functions are asynchronous.
* [chart.width([width])](AbstractChart.md#width) - get/set the width.
* [chart.on('resize', listener)](AbstractChart.md#event_resize) - handle when the dimension is changed.

##### Plate functions

* [chart.addPlate(name, plate[, doNotAppend])](AbstractChart.md#addPlate) - Add a plate to this chart with the given name. If `doNotAppend` is true, will not append the plate node to this chart node (only keep in memory).
* [chart.removePlate(name)](AbstractChart.md#removePlate) - Remove a plate with the specified name.

##### Other functions

* [chart.destroy()](AbstractChart.md#destroy) - kill all event listeners and watchers. Useful for cleaning up when the chart is not needed anymore.

## SvgChart

##### Constructor

const chart = [new SvgChart(container[, options])](SvgChart.md#constructor)

##### Fields

* *inherits from* `AbstractChart`
* [chart.layers](SvgChart.md#layers) - return the LayerOrganizer.
* [chart.rootG](SvgChart.md#rootG) - D3 selection of the root `<g>` element.
* [chart.svg](SvgChart.md#svg) - D3 selection of the `<svg>` element.

## CanvasChart

##### Constructor

const chart = [new CanvasChart(container[, options])](CanvasChart.md#constructor)

##### Fields

* *inherits from* `AbstractChart`
* [chart.canvas](CanvasChart.md#canvas) - D3 selection of the `<canvas>` element.

##### Functions

* *inherits from* `AbstractChart`
* [chart.clear()](CanvasChart.md#clear) - clear canvas.
* [chart.getContext2d()](CanvasChart.md#getContext2d) - return a context for drawing on canvas.

## HybridChart

##### Constructor

const chart = [new HybridChart(container[, options])](HybridChart.md#constructor)

##### Fields

* *inherits from* `CanvasChart`
* *inherits from* `SvgChart`

##### Functions

* *inherits from* `CanvasChart`
* *inherits from* `SvgChart`

## AbstractPlate

##### Constructor

const plate = [new AbstractPlate(node[, options])](AbstractPlate.md#constructor)

##### Functions

* [plate.getNode()](CanvasPlate.md#getNode) - returns a DOM node represented by this plate
* [plate.getSelection()](CanvasPlate.md#getSelection) - returns a D3 selection of the DOM node represented by this plate

## CanvasPlate

##### Constructor

const plate = [new CanvasPlate(node[, options])](CanvasPlate.md#constructor)

##### Functions

* *inherits from* `AbstractPlate`
* [plate.clear()](CanvasPlate.md#clear) - clear canvas.
* [plate.getContext2d()](CanvasPlate.md#getContext2d) - return a context for drawing on canvas.

## DivPlate

##### Constructor

const plate = [new DivPlate(node[, options])](DivPlate.md#constructor)

##### Functions

* *inherits from* `AbstractPlate`

## SvgPlate

##### Constructor

const plate = [new SvgPlate(node[, options])](SvgPlate.md#constructor)

##### Functions

* *inherits from* `AbstractPlate`

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

##### Constructor

const layers = [new LayerOrganizer(container[, defaultTag])](LayerOrganizer.md#constructor)

##### Functions

* [layers.create(config)](LayerOrganizer.md#create) - create layers of element, such as ```<g>```, within the container.
* [layers.get(name)](LayerOrganizer.md#get) - get a layer by name.
* [layers.has(name)](LayerOrganizer.md#has) - check if there is a layer with specified name.

## helper

##### Functions

* *(static)* [helper.debounce(func, delay)](https://lodash.com/docs/4.16.4#debounce)
* *(static)* [helper.deepExtend(dest, src1, src2, ...)](Helper.md#deepExtend)
* *(static)* [helper.extend(dest, src1, src2, ...)](Helper.md#extend)
* *(static)* [helper.functor(valueOrFunc)](https://github.com/d3/d3-3.x-api-reference/blob/master/Internals#functor)
* *(static)* [helper.isFunction(value)](https://lodash.com/docs/4.16.4#isFunction)
* *(static)* [helper.isObject(value)](https://lodash.com/docs/4.16.4#isObject)
* *(static)* [helper.kebabCase(string)](https://lodash.com/docs/4.16.4#kebabCase)
* *(static)* [helper.throttle(func, delay)](https://lodash.com/docs/4.16.4#throttle)
