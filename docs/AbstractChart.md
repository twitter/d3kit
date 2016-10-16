 > [Docs](README.md) ▸ [API Reference](API.md) ▸ **AbstractChart**

## AbstractChart

An AbstractChart does all the basic groundwork for you before creating any chart.

<a name="constructor" href="Abstract#constructor">#</a> new **AbstractChart**(*selector:String/DOMElement*[, *options:Object*[, *customEvents:Array*]])

However, never call this constructor directly, but use `SvgChart` or `CanvasChart` instead.

```selector``` can be

* *CSS Selector* - A chart will be created within the first element that matches this CSS selector. Example usage: ```new AbstractChart('#chart')```
* *DOM element* - A chart will be created within this element. Usually a ```<div>``` is passed as an argument. Example usage: ```new AbstractChart(document.getElementById('chart))```

```options``` will override default options similar to calling ```chart.options(options)``` later.

```customEvents``` will define the type of events that this chart can dispatch in addition to the default events.

By calling ```new AbstractChart(...)```, the following tasks are performed:

* Creates ```<svg>``` in side the container (either an element matched by given CSS selector or a DOM element passed as an argument).
* Creates ```<g>``` within the ```<svg>``` using d3's [margin convention](http://bl.ocks.org/mbostock/3019563). This ```<g>``` is called the root ```<g>``` and can be accessed via chart.rootG() function.
* Creates an event dispatcher using d3.dispatch for this chart with default events: *data*, *resize* and *options*.
* Creates [d3Kit.LayerOrganizer](LayerOrganizer) for the root ```<g>```
* Provides function for setting the dimension, margin, etc.
* When auto-resizing is enabled, will dispatch *resize* event when the container size changes.

See this [bubble chart example](http://bl.ocks.org/kristw/75999459f1a34e05d580).

### Fields



### Getter functions

<a name="getCustomEventNames" href="Abstract#getCustomEventNames">#</a> chart.**getCustomEventNames**()

Return the names of custom events that this chart can dispatch. The list of custom event names is passed to the chart constructor when you created the chart.

<a name="getDispatcher" href="Abstract#getDispatcher">#</a> chart.**getDispatcher**()

Return the chart's event dispatcher. This dispatcher is d3.dispatch.

<a name="getInnerWidth" href="Abstract#getInnerWidth">#</a> chart.**getInnerWidth**()

Return the width of the chart, less the left and right margin values.

<a name="getInnerHeight" href="Abstract#getInnerHeight">#</a> chart.**getInnerHeight**()

Return the height of the chart, less the top and bottom margin values.

### Getter/Setter functions

If a value is passed these functions set the specified value to the variable, otherwise these functions return the current value for that variable.

<a name="data" href="Abstract#data">#</a> chart.**data**([*data:Any*[*, doNotDispatch:Boolean*]])

Get/Set the data for this chart. ```data``` can be any value.

Calling ```chart.data(value)``` will make the chart dispatch event *data*. If you do not wish to dispatch the *data* event, you can pass *true* as the second argument (```chart.data(value, true)```) to suppress the event.

<a name="options" href="Abstract#options">#</a> chart.**options**([*options:Object*[*, doNotDispatch:Boolean*]])

Get/Set the options for this chart. The input options will merge with current options and override any field with the same key. When the chart was created, these are the default options:

```
var DEFAULT_OPTIONS = {
  margin: {top: 30, right: 30, bottom: 30, left: 30},
  offset: [0.5, 0.5],
  initialWidth:  720,
  initialHeight: 500
};
```

Calling ```chart.options(value)``` will make the chart dispatch event *options*. If you do not wish to dispatch the *options* event, you can pass *true* as the second argument (```chart.options(value, true)```) to suppress the event.

<a name="margin" href="Abstract#margin">#</a> chart.**margin**([*margin:Object*,[*, doNotDispatch:Boolean*]])

Get/Set the margin for this chart. The input margin will merge with current margin and override any field with the same key. The ```margin``` object can have up to four keys: *top*, *bottom*, *left* and *right*.

Calling ```chart.margin(value)``` will make the chart dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```chart.margin(value, true)```) to suppress the event.

<a name="offset" href="Abstract#offset">#</a> chart.**offset**([*offset:Array*[*, doNotDispatch:Boolean*]])

Get/Set the offset for this chart. By default the root ```<g>``` will have half-pixel offset [0.5, 0.5], which is a small trick to provide sharp edges. See the second answer in this [StackOverflow question](http://stackoverflow.com/questions/7589650/drawing-grid-with-jquery-svg-produces-2px-lines-instead-of-1px) for more explanation. However, if this become an issue and you would like to remove the offset, you can override it. ```offset``` is an Array ```[xOffset, yOffset]```

Calling ```chart.offset(value)``` will make the chart dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```chart.offset(value, true)```) to suppress the event.

<a name="width" href="Abstract#width">#</a> chart.**width**([*value:Number*[*, doNotDispatch:Boolean*]])

Get/Set the total width for this chart. The innerWidth of the chart will be automatically recomputed using this formula:

```
innerWidth = chart.width() - chart.options().margin.left - chart.options().margin.right;
```

Calling ```chart.width(value)``` will make the chart dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```chart.width(value, true)```) to suppress the event.

<a name="height" href="Abstract#height">#</a> chart.**height**([*value:Number*[*, doNotDispatch:Boolean*]])

Get/Set the total height for this chart. The innerHeight of the chart will be automatically recomputed using this formula:

```
innerHeight = chart.height() - chart.options().margin.top - chart.options().margin.bottom;
```

Calling ```chart.height(value)``` will make the chart dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```chart.height(value, true)```) to suppress the event.

<a name="dimension" href="Abstract#dimension">#</a> chart.**dimension**([*dimension:Array*[*, doNotDispatch:Boolean*]])

Syntactic sugar for getting/setting both width and height at the same time. Will dispatch *resize* event only once. If you wish to suppress the *resize* event, pass ```true``` as the second argument. ```dimension``` is an Array ```[width, height]```.

### Other functions

<a name="on" href="Abstract#on">#</a> chart.**on**(*eventName*, *listener*)

Add an event listener to an event from this chart. Similar to [d3.dispatch.on](https://github.com/mbostock/d3/wiki/Internals#dispatch_on).

<a name="hasData" href="Abstract#hasData">#</a> chart.**hasData**()

Return true if ```chart.data()``` is not null and not undefined.

<a name="hasNonZeroArea" href="Abstract#hasNonZeroArea">#</a> chart.**hasNonZeroArea**()

Return true if ```inner width * inner height > 0```

### Events

By default, the chart can dispatch these events out-of-the-box.

<a name="event_data" href="Abstract#event_data">#</a> event: **data**

dispatched whenever the data are set via ```chart.data(value)```. Note that it the chart does not watch for changes in the data.

```
chart.on('data', function(data){ ... })
```

<a name="event_options" href="Abstract#event_options">#</a> event: **options**

dispatched whenever the options are set via ```chart.options(value)```. Note that it the chart does not watch for changes in the options Object.

```
chart.on('options', function(options){ ... })
```

<a name="event_resize" href="Abstract#event_resize">#</a> event: **resize**

dispatched whenever the dimension of the chart is changed. This could be due to changes in *width*, *height*, *margin* or *offset*.

```
chart.on('resize', function(info){ ... })
```

```info``` is an Array ```[width, height, innerWidth, innerHeight]```

## SvgChart

### Fields

<a name="layers" href="Abstract#layers">#</a> chart.**layers**()

Return the chart's internal layer organizer, which is a [LayerOrganizer](LayerOrganizer) that wraps the root ```<g>```.

<a name="rootG" href="Abstract#rootG">#</a> chart.**rootG**

Return a d3 selection that is the root ```<g>``` element, to which you will append the rest of the elements for your chart.

<a name="svg" href="Abstract#svg">#</a> chart.**svg**

Return a d3 selection that is the chart's ```<svg>``` element.
