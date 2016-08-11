> [Docs](README.md) ▸ **API Reference**

## d3Kit.Skeleton

* [new d3Kit.Skeleton](Skeleton#constructor) - construct a skeleton within the specified container.

##### Getter functions

* [skeleton.getCustomEventNames](Skeleton#getCustomEventNames) - return the names of custom events that this skeleton can dispatch.
* [skeleton.getDispatcher](Skeleton#getDispatcher) - return the skeleton's internal event dispatcher.
* [skeleton.getInnerWidth](Skeleton#getInnerWidth) - return the width of the skeleton without margin.
* [skeleton.getInnerHeight](Skeleton#getInnerHeight) - return the height of the skeleton without margin.
* [skeleton.getLayerOrganizer](Skeleton#getLayerOrganizer) - return the skeleton's LayerOrganizer.
* [skeleton.getRootG](Skeleton#getRootG) - return the skeleton's root ```<g>``` element.
* [skeleton.getSvg](Skeleton#getSvg) - return the skeleton's ```<svg>``` element.

##### Getter/Setter functions

If a value is passed to these functions, set the specified value to the variable, otherwise these functions return the current value for that variable.

* [skeleton.data](Skeleton#data) - get/set the data.
* [skeleton.options](Skeleton#options) - get/set the options.
* [skeleton.margin](Skeleton#margin) - get/set the margin.
* [skeleton.offset](Skeleton#offset) - get/set the offset.
* [skeleton.width](Skeleton#width) - get/set the width.
* [skeleton.height](Skeleton#height) - get/set the height.
* [skeleton.dimension](Skeleton#dimension) - get/set both width and height at the same time.
* [skeleton.autoResize](Skeleton#autoResize) - get/set auto-resizing.
* [skeleton.autoResizeDetection](Skeleton#autoResizeDetection) - get/set auto-resize detection mode.
* [skeleton.autoResizeToAspectRatio](Skeleton#autoResizeToAspectRatio) - get/set aspect ratio for auto-resizing.

##### Other functions

* [skeleton.on](Skeleton#on) - add an event listener to an event from this skeleton.
* [skeleton.hasData](Skeleton#hasData) - return true if skeleton has data.
* [skeleton.hasNonZeroArea](Skeleton#hasNonZeroArea) - return true if the inner area (*inner width x inner height*) is more than zero.
* [skeleton.mixin](Skeleton#mixin) - add new functions to the skeleton object.
* [skeleton.resizeToFitContainer](Skeleton#resizeToFitContainer): resize to fit the skeleton's container.
* [skeleton.resizeToAspectRatio](Skeleton#resizeToAspectRatio): resize to specified aspect ratio.

##### Events

* [data](Skeleton#event_data) - dispatched whenever the data are set.
* [options](Skeleton#event_options) - dispatched whenever the options are set.
* [resize](Skeleton#event_resize) - dispatched whenever the dimension of the skeleton is changed.

## d3Kit.Chartlet

* [new d3Kit.Chartlet](Chartlet#constructor) - construct a chartlet.

##### Getter Functions

* [chartlet.getDispatcher](Chartlet#getDispatcher) - return chartlet's dispatcher.
* [chartlet.getCustomEvents](Chartlet#getCustomEvents) - return chartlet's custom events.
* [chartlet.getPropertyValue](Chartlet#getPropertyValue) - return a naked value for a charlet named property.

##### Getter/Setter Function

* [chartlet.property](Chartlet#property) - return function which will return a charlet named property value.

##### Enter/Update/Exit Functions

* [chartlet.enter](Chartlet#enter) - will cause the chartlet to add new elements to a chart.
* [chartlet.update](Chartlet#update) - will cause the chartlet to update existing chart elements.
* [chartlet.exit](Chartlet#exit) - will cause the chartlet to remove elements from the chart.

##### Inheritance Functions

* [chartlet.inheritPropertyFrom](Chartlet#inheritPropertyFrom) - map a named property for parent to child chartlet.
* [chartlet.inheritPropertiesFrom](Chartlet#inheritPropertiesFrom) - map many named properties for parent to child chartet.
* [chartlet.publishEventsTo](Chartlet#publishEventsTo) - dispatch child charlet events to parent chartlet.

##### Events

* [chartlet.on](Chartlet#on) - bind charlet event to event handler.
* [enterDone](Chartlet#enterDone) - fired when asynchronous activity in [Chartlet.enter](Chartlet#enter) has completed.
* [updateDone](Chartlet#updateDone) - fired when asynchronous activity in [Chartlet.update](Chartlet#update) has completed.
* [exitDone](Chartlet#exitDone) - fired when asynchronous activity in [Chartlet.exit](Chartlet#exit) has completed.

## d3Kit.LayerOrganizer

* [new d3Kit.LayerOrganizer](LayerOrganizer#constructor) - construct a layer organizer for the specified container.
* [layers.create](LayerOrganizer#create) - create layers of ```<g>``` within the container.
* [layers.get](LayerOrganizer#get) - get a layer by name.
* [layers.has](LayerOrganizer#has) - check if there is a layer with specified name.

## d3Kit.factory

* [d3Kit.factory.createChart](Factory#createChart) - create a reusable chart and return a constructor function.

## d3Kit.helper

* [d3Kit.helper.debounce](Helper#debounce) - debounce function.
* [d3Kit.helper.extend](Helper#extend) - Merge the contents of two or more objects together into the first object.
* [d3Kit.helper.deepExtend](Helper#deepExtend) - Recursively merge the contents of two or more objects together into the first object.
