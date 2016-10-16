> [Docs](https://github.com/twitter/d3kit/README.md) ▸ **API Reference**

## d3Kit.AbstractChart

* [new d3Kit.AbstractChart](AbstractChart.md#constructor) - construct a chart within the specified container.

##### Getter functions

* [chart.getCustomEventNames](AbstractChart.md#getCustomEventNames) - return the names of custom events that this skeleton can dispatch.
* [chart.getDispatcher](AbstractChart.md#getDispatcher) - return the skeleton's internal event dispatcher.
* [chart.getInnerWidth](AbstractChart.md#getInnerWidth) - return the width of the skeleton without margin.
* [chart.getInnerHeight](AbstractChart.md#getInnerHeight) - return the height of the skeleton without margin.
* [chart.getLayerOrganizer](AbstractChart.md#getLayerOrganizer) - return the skeleton's LayerOrganizer.
* [chart.getRootG](AbstractChart.md#getRootG) - return the skeleton's root ```<g>``` element.
* [chart.getSvg](AbstractChart.md#getSvg) - return the skeleton's ```<svg>``` element.

##### Getter/Setter functions

If a value is passed to these functions, set the specified value to the variable, otherwise these functions return the current value for that variable.

* [chart.data](AbstractChart.md#data) - get/set the data.
* [chart.options](AbstractChart.md#options) - get/set the options.
* [chart.margin](AbstractChart.md#margin) - get/set the margin.
* [chart.offset](AbstractChart.md#offset) - get/set the offset.
* [chart.width](AbstractChart.md#width) - get/set the width.
* [chart.height](AbstractChart.md#height) - get/set the height.
* [chart.dimension](AbstractChart.md#dimension) - get/set both width and height at the same time.

##### Other functions

* [chart.on](AbstractChart.md#on) - add an event listener to an event from this chart.
* [chart.hasData](AbstractChart.md#hasData) - return true if skeleton has data.
* [chart.hasNonZeroArea](AbstractChart.md#hasNonZeroArea) - return true if the inner area (*inner width x inner height*) is more than zero.

##### Events

* [data](AbstractChart.md#event_data) - dispatched whenever the data are set.
* [options](AbstractChart.md#event_options) - dispatched whenever the options are set.
* [resize](AbstractChart.md#event_resize) - dispatched whenever the dimension of the skeleton is changed.

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

## d3Kit.LayerOrganizer

* [new d3Kit.LayerOrganizer](LayerOrganizer.md#constructor) - construct a layer organizer for the specified container.
* [layers.create](LayerOrganizer.md#create) - create layers of ```<g>``` within the container.
* [layers.get](LayerOrganizer.md#get) - get a layer by name.
* [layers.has](LayerOrganizer.md#has) - check if there is a layer with specified name.

## d3Kit.helper

* [d3Kit.helper.debounce](Helper.md#debounce) - debounce function from lodash.
* [d3Kit.helper.throttle](Helper.md#throttle) - throttle function from lodash.
* [d3Kit.helper.functor](Helper.md#functor) - functor function from D3 v3.
* [d3Kit.helper.extend](Helper.md#extend) - Merge the contents of two or more objects together into the first object.
* [d3Kit.helper.deepExtend](Helper.md#deepExtend) - Recursively merge the contents of two or more objects together into the first object.
