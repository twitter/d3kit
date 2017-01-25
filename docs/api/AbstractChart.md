> [Docs](../index.md) ▸ [API Reference](index.md) ▸ **AbstractChart**

# AbstractChart

An AbstractChart does all the basic groundwork for you before creating any chart. (This was revised and improved from the `Skeleton` in d3Kit v1-2.)

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

<a name="on" href="AbstractChart.md#on">#</a> chart.**on**(*eventName:String*, *listener:Function*)

Add an event listener to an event from this chart. Similar to [d3.dispatch.on](https://github.com/mbostock/d3/wiki/Internals#dispatch_on).

<a name="off" href="AbstractChart.md#off">#</a> chart.**off**(*eventName:String*, *listener:Function*)

Remove event listener.

<a name="setupDispatcher" href="AbstractChart.md#setupDispatcher">#</a> chart.**setupDispatcher**(*customEventNames:Array*)

Setup the dispatcher to include the specified custom event names.

<a name="dispatchAs" href="AbstractChart.md#dispatchAs">#</a> chart.**dispatchAs**(*name:String*)

Returns an event handler that will capture all arguments and dispatch as event `name`.

#### Events

By default, the chart can dispatch these events out-of-the-box.

<a name="event_data" href="AbstractChart.md#event_data">#</a> event: **data**

dispatched whenever the data are set via ```chart.data(value)```. Note that it the chart does not watch for changes in the data.

```javascript
chart.on('data', function(data){ ... })
```

<a name="event_options" href="AbstractChart.md#event_options">#</a> event: **options**

dispatched whenever the options are set via ```chart.options(value)```. Note that it the chart does not watch for changes in the options Object.

```javascript
chart.on('options', function(options){ ... })
```

<a name="event_resize" href="AbstractChart.md#event_resize">#</a> event: **resize**

dispatched whenever the dimension of the chart is changed. This could be due to changes in *width*, *height*, *margin* or *offset*.

```javascript
chart.on('resize', function(info){ ... })
```

```info``` is an Array ```[width, height, innerWidth, innerHeight]```

### Data Handling

<a name="static-getDefaultOptions" href="AbstractChart.md#static-getDefaultOptions">#</a> *(static)* AbstractChart.**getDefaultOptions**()

Create and return a default `options` Object. Overwrite this function when extending the class to modify default options. For example:

```javascript
class CanvasChart extends AbstractChart {
  static getDefaultOptions() {
    return deepExtend(
      super.getDefaultOptions(),
      {
        pixelRatio: window.devicePixelRatio,
      }
    );
  }
  ...
}
```

<a name="data" href="AbstractChart.md#data">#</a> chart.**data**([*data:Any*])

Get/Set the data for this chart. ```data``` can be any value.

Calling ```chart.data(value)``` will make the chart dispatch event *data*.

<a name="hasData" href="AbstractChart.md#hasData">#</a> chart.**hasData**()

Return true if ```chart.data()``` is not null and not undefined.

<a name="options" href="AbstractChart.md#options">#</a> chart.**options**([*options:Object*])

Get/Set the options for this chart. The input options will merge with current options and override any field with the same key. When the chart was created, these are the default options:

```javascript
// AbstractChart.getDefaultOptions()
{
  margin: {top: 30, right: 30, bottom: 30, left: 30},
  offset: [0.5, 0.5],
  initialWidth:  720,
  initialHeight: 500
};
```

Calling ```chart.options(value)``` will make the chart dispatch event *options*.

### Size Handling

<a name="dimension" href="AbstractChart.md#dimension">#</a> chart.**dimension**([*dimension:Array*])

Syntactic sugar for getting/setting both width and height at the same time.

* When called without argument will return Array `[width, height]`.
* When called with argument will set both width and height and dispatch *resize* event.

<a name="fit" href="AbstractChart.md#fit">#</a> chart.**fit**([*fitOptions:Object*[, *watchOptions:Object*])

* Calling this function without any argument will resize the chart to fit into the container once using default settings (width = 100%, height <= container), or previous settings if `.fit(fitOptions)` has been called with more than one argument before.
* Calling this function with single argument will resize the chart to fit into the container once using the specified `fitOptions`.
* Calling with two arguments, such as `chart.fit({...}, true)` or `chart.fit({...}, {...})`, will create a `fitWatcher` that watch for size changes and auto-resize to fit. To kill the `fitWatcher`, call `chart.stopFitWatcher()`.

Please refer to [slimfit documentation](https://github.com/kristw/slimfit) for `fitOptions` and `watchOptions`

<a name="getInnerHeight" href="AbstractChart.md#getInnerHeight">#</a> chart.**getInnerHeight**()

Return the height of the chart, less the top and bottom margin values.

```javascript
innerHeight = chart.height() - chart.options().margin.top - chart.options().margin.bottom;
```

<a name="getInnerWidth" href="AbstractChart.md#getInnerWidth">#</a> chart.**getInnerWidth**()

Return the width of the chart, less the left and right margin values.

```javascript
innerWidth = chart.width() - chart.options().margin.left - chart.options().margin.right;
```

<a name="hasNonZeroArea" href="AbstractChart.md#hasNonZeroArea">#</a> chart.**hasNonZeroArea**()

Return true if ```inner width * inner height > 0```

<a name="height" href="AbstractChart.md#height">#</a> chart.**height**([*value:Number*])

Get/Set the total height for this chart. Calling ```chart.height(value)``` will make the chart dispatch event *resize*.

<a name="margin" href="AbstractChart.md#margin">#</a> chart.**margin**([*margin:Object*,[*, doNotDispatch:Boolean*]])

Get/Set the margin for this chart. The input margin will merge with current margin and override any field with the same key. The ```margin``` object can have up to four keys: *top*, *bottom*, *left* and *right*.

Calling ```chart.margin(value)``` will make the chart dispatch event *resize*.

<a name="offset" href="AbstractChart.md#offset">#</a> chart.**offset**([*offset:Array*])

Get/Set the offset for this chart. By default the root ```<g>``` will have half-pixel offset [0.5, 0.5], which is a small trick to provide sharp edges. See the second answer in this [StackOverflow question](http://stackoverflow.com/questions/7589650/drawing-grid-with-jquery-svg-produces-2px-lines-instead-of-1px) for more explanation. However, if this become an issue and you would like to remove the offset, you can override it. ```offset``` is an Array ```[xOffset, yOffset]```

Calling ```chart.offset(value)``` will make the chart dispatch event *resize*.

<a name="stopFitWatcher" href="AbstractChart.md#stopFitWatcher">#</a> chart.**stopFitWatcher**()

Stop the watcher.

<a name="updateDimensionNow" href="AbstractChart.md#updateDimensionNow">#</a> chart.**updateDimensionNow**()

Force the chart to recompute the dimension immediately. This is a synchronous operation while other sizing functions are asynchronous.

For example,

```javascript
// Other size functions are asynchronous
const chart = new SvgChart('#container', { initialWidth: 400 });
chart.width(800);
console.log(chart.container.clientWidth); // 400
chart.on('resize', () => {
  console.log(chart.container.clientWidth); // 800
});
```

```javascript
// Force update with .updateDimensionNow()
const chart = new SvgChart('#container', { initialWidth: 400 });
chart.width(800).updateDimensionNow();
console.log(chart.container.clientWidth); // 800
```

<a name="width" href="AbstractChart.md#width">#</a> chart.**width**([*value:Number*])

Get/Set the total width for this chart. Calling ```chart.width(value)``` will make the chart dispatch event *resize*.

### Plate functions

<a name="addPlate" href="AbstractChart.md#addPlate">#</a> chart.**addPlate**(*name:String*, *plate:AbstractPlate*[, *doNotAppend:Boolean*])

Add a plate to this chart with the given name. If `doNotAppend` is true, will not append the plate node to this chart node (only keep in memory).

<a name="removePlate" href="AbstractChart.md#removePlate">#</a> chart.**removePlate**(*name:String*)

Remove a plate with the specified name.

### Other functions

<a name="destroy" href="AbstractChart.md#destroy">#</a> chart.**destroy**()

Kill all event listeners and watchers. Useful for cleaning up when the chart is not needed anymore.
