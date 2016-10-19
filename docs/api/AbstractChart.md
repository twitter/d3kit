 > [Docs](../../README.md) ▸ [API Reference](index.md) ▸ **AbstractChart / CanvasChart / SvgChart**

## AbstractChart

An AbstractChart does all the basic groundwork for you before creating any chart.

<a name="constructor" href="AbstractChart#constructor">#</a> new **AbstractChart**(*container:String/DOMElement*[, *options:Object*])

However, never call this constructor directly, but use `SvgChart` or `CanvasChart` instead.

* **container** can be

	* *CSS Selector string* - A chart will be created within the first element that matches this CSS selector. Example usage: ```new AbstractChart('#chart')```
	* *DOM element* - A chart will be created within this element. Usually a ```<div>``` is passed as an argument. Example usage: ```new AbstractChart(document.getElementById('chart))```

* **options:Object** will override default options similar to calling ```chart.options(options)``` later.

### Fields

<a name="container" href="AbstractChart#container">#</a> chart.**container**

Return a D3 selection of the container.

<a name="dispatcher" href="AbstractChart#dispatcher">#</a> chart.**dispatcher**

Return the chart's event dispatcher. This dispatcher is `d3.dispatch`.

<a name="\_state" href="AbstractChart#\_state">#</a> chart.**\_state**

Hold internal states of this chart. You will never need to touch it. Just do not override.

### Static functions



### Getter functions

<a name="getCustomEventNames" href="AbstractChart#getCustomEventNames">#</a> chart.**getCustomEventNames**()

Return the names of custom events that this chart can dispatch.

<a name="getInnerWidth" href="AbstractChart#getInnerWidth">#</a> chart.**getInnerWidth**()

Return the width of the chart, less the left and right margin values.

<a name="getInnerHeight" href="AbstractChart#getInnerHeight">#</a> chart.**getInnerHeight**()

Return the height of the chart, less the top and bottom margin values.

### Getter/Setter functions

If a value is passed these functions set the specified value to the variable, otherwise these functions return the current value for that variable.

<a name="data" href="AbstractChart#data">#</a> chart.**data**([*data:Any*[*, doNotDispatch:Boolean*]])

Get/Set the data for this chart. ```data``` can be any value.

Calling ```chart.data(value)``` will make the chart dispatch event *data*. If you do not wish to dispatch the *data* event, you can pass *true* as the second argument (```chart.data(value, true)```) to suppress the event.

<a name="options" href="AbstractChart#options">#</a> chart.**options**([*options:Object*[*, doNotDispatch:Boolean*]])

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

<a name="margin" href="AbstractChart#margin">#</a> chart.**margin**([*margin:Object*,[*, doNotDispatch:Boolean*]])

Get/Set the margin for this chart. The input margin will merge with current margin and override any field with the same key. The ```margin``` object can have up to four keys: *top*, *bottom*, *left* and *right*.

Calling ```chart.margin(value)``` will make the chart dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```chart.margin(value, true)```) to suppress the event.

<a name="offset" href="AbstractChart#offset">#</a> chart.**offset**([*offset:Array*[*, doNotDispatch:Boolean*]])

Get/Set the offset for this chart. By default the root ```<g>``` will have half-pixel offset [0.5, 0.5], which is a small trick to provide sharp edges. See the second answer in this [StackOverflow question](http://stackoverflow.com/questions/7589650/drawing-grid-with-jquery-svg-produces-2px-lines-instead-of-1px) for more explanation. However, if this become an issue and you would like to remove the offset, you can override it. ```offset``` is an Array ```[xOffset, yOffset]```

Calling ```chart.offset(value)``` will make the chart dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```chart.offset(value, true)```) to suppress the event.

<a name="width" href="AbstractChart#width">#</a> chart.**width**([*value:Number*[*, doNotDispatch:Boolean*]])

Get/Set the total width for this chart. The innerWidth of the chart will be automatically recomputed using this formula:

```
innerWidth = chart.width() - chart.options().margin.left - chart.options().margin.right;
```

Calling ```chart.width(value)``` will make the chart dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```chart.width(value, true)```) to suppress the event.

<a name="height" href="AbstractChart#height">#</a> chart.**height**([*value:Number*[*, doNotDispatch:Boolean*]])

Get/Set the total height for this chart. The innerHeight of the chart will be automatically recomputed using this formula:

```
innerHeight = chart.height() - chart.options().margin.top - chart.options().margin.bottom;
```

Calling ```chart.height(value)``` will make the chart dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```chart.height(value, true)```) to suppress the event.

<a name="dimension" href="AbstractChart#dimension">#</a> chart.**dimension**([*dimension:Array*[*, doNotDispatch:Boolean*]])

Syntactic sugar for getting/setting both width and height at the same time. Will dispatch *resize* event only once. If you wish to suppress the *resize* event, pass ```true``` as the second argument. ```dimension``` is an Array ```[width, height]```.

### Other functions

<a name="hasData" href="AbstractChart#hasData">#</a> chart.**hasData**()

Return true if ```chart.data()``` is not null and not undefined.

<a name="hasNonZeroArea" href="AbstractChart#hasNonZeroArea">#</a> chart.**hasNonZeroArea**()

Return true if ```inner width * inner height > 0```

### Event Handling

<a name="on" href="AbstractChart#on">#</a> chart.**on**(*eventName*, *listener*)

Add an event listener to an event from this chart. Similar to [d3.dispatch.on](https://github.com/mbostock/d3/wiki/Internals#dispatch_on).

<a name="off" href="AbstractChart#off">#</a> chart.**off**(*eventName*, *listener*)

Remove event listener.

By default, the chart can dispatch these events out-of-the-box.

<a name="event_data" href="AbstractChart#event_data">#</a> event: **data**

dispatched whenever the data are set via ```chart.data(value)```. Note that it the chart does not watch for changes in the data.

```
chart.on('data', function(data){ ... })
```

<a name="event_options" href="AbstractChart#event_options">#</a> event: **options**

dispatched whenever the options are set via ```chart.options(value)```. Note that it the chart does not watch for changes in the options Object.

```
chart.on('options', function(options){ ... })
```

<a name="event_resize" href="AbstractChart#event_resize">#</a> event: **resize**

dispatched whenever the dimension of the chart is changed. This could be due to changes in *width*, *height*, *margin* or *offset*.

```
chart.on('resize', function(info){ ... })
```

```info``` is an Array ```[width, height, innerWidth, innerHeight]```

## CanvasChart

In the constructor, these additional tasks are performed:

* Creates ```<canvas>``` in side the container.

### Fields

<a name="canvas" href="CanvasChart#canvas">#</a> chart.**canvas**

Return a D3 selection of ```<canvas>``` element.

### Functions

<a name="getContext2d" href="SvgChart#getContext2d">#</a> chart.**getContext2d**()

Return `context2d` that has been adjusted for scaling and margins.

<a name="clear" href="SvgChart#clear">#</a> chart.**clear**()

Clear canvas

## SvgChart

In the constructor, these additional tasks are performed:

* Creates ```<svg>``` in side the container.
* Creates ```<g>``` within the ```<svg>``` using D3's [margin convention](http://bl.ocks.org/mbostock/3019563). This ```<g>``` is called the root ```<g>``` and can be accessed via `chart.rootG`.

### Fields

<a name="layers" href="SvgChart#layers">#</a> chart.**layers**

Return the chart's internal layer organizer, which is a [LayerOrganizer](LayerOrganizer) that wraps the root ```<g>```.

<a name="rootG" href="SvgChart#rootG">#</a> chart.**rootG**

Return a D3 selection that is the root ```<g>``` element, to which you will append the rest of the elements for your chart.

<a name="svg" href="SvgChart#svg">#</a> chart.**svg**

Return a D3 selection that is the chart's ```<svg>``` element.
