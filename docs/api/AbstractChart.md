> [Docs](../../TableOfContent.md) ▸ [API Reference](index.md) ▸ **AbstractChart**

# AbstractChart

An AbstractChart does all the basic groundwork for you before creating any chart.

## Constructor

```javascript
const chart = new AbstractChart(container[, options]);
```

However, never call this constructor directly, but use [SvgChart](SvgChart.md) or [CanvasChart](CanvasChart.md) instead.

* **container** can be anything you can pass to `d3.select()`. For example:

	* *CSS Selector string* - A chart will be created within the first element that matches this CSS selector. Example usage: `new AbstractChart('#chart')`
	* *DOM element* - A chart will be created within this element. Usually a `<div>` is passed as an argument. Example usage: `new AbstractChart(document.getElementById('chart))`

* **options:Object** will override default options similar to calling ```chart.options(options)``` later.

## Fields

### Public

<a name="container" href="AbstractChart.md#container">#</a> chart.**container**

Return a D3 selection of the container.

<a name="dispatcher" href="AbstractChart.md#dispatcher">#</a> chart.**dispatcher**

Return the chart's event dispatcher. This dispatcher is `d3.dispatch`.

### Private

There are private fields named begin with underscore (`_`). Please do not touch them unless you really know what you are doing.

## Functions

For getter/setter function, if a value is passed these functions set the specified value to the variable, otherwise these functions return the current value for that variable.

### Event handling

<a name="static-getCustomEventNames" href="AbstractChart.md#static-getCustomEventNames">#</a> *(static)* AbstractChart.**getCustomEventNames**()

Return the names of custom events that an object of this class can dispatch (other than `resize`, `data` and `options` that are included with every AbstractChart).

<a name="getCustomEventNames" href="AbstractChart.md#getCustomEventNames">#</a> chart.**getCustomEventNames**()

Return the names of custom events that this chart can dispatch.

<a name="setupDispatcher" href="AbstractChart.md#setupDispatcher">#</a> chart.**setupDispatcher**(*customEventNames:Array*)

Setup the dispatcher to include the specified custom event names.

<a name="on" href="AbstractChart.md#on">#</a> chart.**on**(*eventName:String*, *listener:Function*)

Add an event listener to an event from this chart. Similar to [d3.dispatch.on](https://github.com/mbostock/d3/wiki/Internals#dispatch_on).

<a name="off" href="AbstractChart.md#off">#</a> chart.**off**(*eventName:String*, *listener:Function*)

Remove event listener.

#### Events

By default, the chart can dispatch these events out-of-the-box.

<a name="event_data" href="AbstractChart.md#event_data">#</a> event: **data**

dispatched whenever the data are set via ```chart.data(value)```. Note that it the chart does not watch for changes in the data.

```
chart.on('data', function(data){ ... })
```

<a name="event_options" href="AbstractChart.md#event_options">#</a> event: **options**

dispatched whenever the options are set via ```chart.options(value)```. Note that it the chart does not watch for changes in the options Object.

```
chart.on('options', function(options){ ... })
```

<a name="event_resize" href="AbstractChart.md#event_resize">#</a> event: **resize**

dispatched whenever the dimension of the chart is changed. This could be due to changes in *width*, *height*, *margin* or *offset*.

```
chart.on('resize', function(info){ ... })
```

```info``` is an Array ```[width, height, innerWidth, innerHeight]```

### Data Handling

<a name="data" href="AbstractChart.md#data">#</a> chart.**data**([*data:Any*])

Get/Set the data for this chart. ```data``` can be any value.

Calling ```chart.data(value)``` will make the chart dispatch event *data*.

<a name="options" href="AbstractChart.md#options">#</a> chart.**options**([*options:Object*])

Get/Set the options for this chart. The input options will merge with current options and override any field with the same key. When the chart was created, these are the default options:

```
var DEFAULT_OPTIONS = {
  margin: {top: 30, right: 30, bottom: 30, left: 30},
  offset: [0.5, 0.5],
  initialWidth:  720,
  initialHeight: 500
};
```

Calling ```chart.options(value)``` will make the chart dispatch event *options*.

<a name="hasData" href="AbstractChart.md#hasData">#</a> chart.**hasData**()

Return true if ```chart.data()``` is not null and not undefined.

### Size Handling

<a name="getInnerWidth" href="AbstractChart.md#getInnerWidth">#</a> chart.**getInnerWidth**()

Return the width of the chart, less the left and right margin values.

<a name="getInnerHeight" href="AbstractChart.md#getInnerHeight">#</a> chart.**getInnerHeight**()

Return the height of the chart, less the top and bottom margin values.

<a name="margin" href="AbstractChart.md#margin">#</a> chart.**margin**([*margin:Object*,[*, doNotDispatch:Boolean*]])

Get/Set the margin for this chart. The input margin will merge with current margin and override any field with the same key. The ```margin``` object can have up to four keys: *top*, *bottom*, *left* and *right*.

Calling ```chart.margin(value)``` will make the chart dispatch event *resize*.

<a name="offset" href="AbstractChart.md#offset">#</a> chart.**offset**([*offset:Array*])

Get/Set the offset for this chart. By default the root ```<g>``` will have half-pixel offset [0.5, 0.5], which is a small trick to provide sharp edges. See the second answer in this [StackOverflow question](http://stackoverflow.com/questions/7589650/drawing-grid-with-jquery-svg-produces-2px-lines-instead-of-1px) for more explanation. However, if this become an issue and you would like to remove the offset, you can override it. ```offset``` is an Array ```[xOffset, yOffset]```

Calling ```chart.offset(value)``` will make the chart dispatch event *resize*.

<a name="width" href="AbstractChart.md#width">#</a> chart.**width**([*value:Number*])

Get/Set the total width for this chart. The innerWidth of the chart will be automatically recomputed using this formula:

```
innerWidth = chart.width() - chart.options().margin.left - chart.options().margin.right;
```

Calling ```chart.width(value)``` will make the chart dispatch event *resize*.

<a name="height" href="AbstractChart.md#height">#</a> chart.**height**([*value:Number*])

Get/Set the total height for this chart. The innerHeight of the chart will be automatically recomputed using this formula:

```
innerHeight = chart.height() - chart.options().margin.top - chart.options().margin.bottom;
```

Calling ```chart.height(value)``` will make the chart dispatch event *resize*.

<a name="dimension" href="AbstractChart.md#dimension">#</a> chart.**dimension**([*dimension:Array*])

Syntactic sugar for getting/setting both width and height at the same time. Will dispatch *resize* event only once. ```dimension``` is an Array ```[width, height]```.

<a name="hasNonZeroArea" href="AbstractChart.md#hasNonZeroArea">#</a> chart.**hasNonZeroArea**()

Return true if ```inner width * inner height > 0```
