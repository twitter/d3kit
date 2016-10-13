 > [Docs](README.md) ▸ [API Reference](API.md) ▸ **Skeleton**

## d3Kit.Skeleton

Creating a skeleton does all the basic groundwork for you before creating any chart.

<a name="constructor" href="Skeleton#constructor">#</a> new **d3Kit.Skeleton**(*selector:String/DOMElement*[, *options:Object*[, *customEvents:Array*]])

```selector``` can be

* *CSS Selector* - A skeleton will be created within the first element that matches this CSS selector. Example usage: ```new d3Kit.Skeleton('#chart')```
* *DOM element* - A skeleton will be created within this element. Usually a ```<div>``` is passed as an argument. Example usage: ```new d3Kit.Skeleton(document.getElementById('chart))```

```options``` will override default options similar to calling ```skeleton.options(options)``` later.

```customEvents``` will define the type of events that this skeleton can dispatch in addition to the default events.

By calling ```new d3Kit.Skeleton(...)```, the following tasks are performed:

* Creates ```<svg>``` in side the container (either an element matched by given CSS selector or a DOM element passed as an argument).
* Creates ```<g>``` within the ```<svg>``` using d3's [margin convention](http://bl.ocks.org/mbostock/3019563). This ```<g>``` is called the root ```<g>``` and can be accessed via skeleton.getRootG() function.
* Creates an event dispatcher using d3.dispatch for this skeleton with default events: *data*, *resize* and *options*.
* Creates [d3Kit.LayerOrganizer](LayerOrganizer) for the root ```<g>```
* Provides function for setting the dimension, margin, etc.
* When auto-resizing is enabled, will dispatch *resize* event when the container size changes.

See this [bubble chart example](http://bl.ocks.org/kristw/75999459f1a34e05d580).

### Getter functions

<a name="getCustomEventNames" href="Skeleton#getCustomEventNames">#</a> skeleton.**getCustomEventNames**()

Return the names of custom events that this skeleton can dispatch. The list of custom event names is passed to the skeleton constructor when you created the skeleton.

<a name="getDispatcher" href="Skeleton#getDispatcher">#</a> skeleton.**getDispatcher**()

Return the skeleton's event dispatcher. This dispatcher is d3.dispatch.

<a name="getInnerWidth" href="Skeleton#getInnerWidth">#</a> skeleton.**getInnerWidth**()

Return the width of the skeleton, less the left and right margin values.

<a name="getInnerHeight" href="Skeleton#getInnerHeight">#</a> skeleton.**getInnerHeight**()

Return the height of the skeleton, less the top and bottom margin values.

<a name="getLayerOrganizer" href="Skeleton#getLayerOrganizer">#</a> skeleton.**getLayerOrganizer**()

Return the skeleton's internal layer organizer, which is a [d3Kit.LayerOrganizer](LayerOrganizer) that wraps the root ```<g>```.

<a name="getRootG" href="Skeleton#getRootG">#</a> skeleton.**getRootG**()

Return a d3 selection that is the root ```<g>``` element, to which you will append the rest of the elements for your chart.

<a name="getSvg" href="Skeleton#getSvg">#</a> skeleton.**getSvg**()

Return a d3 selection that is the skeleton's ```<svg>``` element.

### Getter/Setter functions

If a value is passed these functions set the specified value to the variable, otherwise these functions return the current value for that variable.

<a name="data" href="Skeleton#data">#</a> skeleton.**data**([*data:Any*[*, doNotDispatch:Boolean*]])

Get/Set the data for this skeleton. ```data``` can be any value.

Calling ```skeleton.data(value)``` will make the skeleton dispatch event *data*. If you do not wish to dispatch the *data* event, you can pass *true* as the second argument (```skeleton.data(value, true)```) to suppress the event.

<a name="options" href="Skeleton#options">#</a> skeleton.**options**([*options:Object*[*, doNotDispatch:Boolean*]])

Get/Set the options for this skeleton. The input options will merge with current options and override any field with the same key. When the skeleton was created, these are the default options:

```
var DEFAULT_OPTIONS = {
  margin: {top: 30, right: 30, bottom: 30, left: 30},
  offset: [0.5, 0.5],
  initialWidth:  720,
  initialHeight: 500
};
```

Calling ```skeleton.options(value)``` will make the skeleton dispatch event *options*. If you do not wish to dispatch the *options* event, you can pass *true* as the second argument (```skeleton.options(value, true)```) to suppress the event.

<a name="margin" href="Skeleton#margin">#</a> skeleton.**margin**([*margin:Object*,[*, doNotDispatch:Boolean*]])

Get/Set the margin for this skeleton. The input margin will merge with current margin and override any field with the same key. The ```margin``` object can have up to four keys: *top*, *bottom*, *left* and *right*.

Calling ```skeleton.margin(value)``` will make the skeleton dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```skeleton.margin(value, true)```) to suppress the event.

<a name="offset" href="Skeleton#offset">#</a> skeleton.**offset**([*offset:Array*[*, doNotDispatch:Boolean*]])

Get/Set the offset for this skeleton. By default the root ```<g>``` will have half-pixel offset [0.5, 0.5], which is a small trick to provide sharp edges. See the second answer in this [StackOverflow question](http://stackoverflow.com/questions/7589650/drawing-grid-with-jquery-svg-produces-2px-lines-instead-of-1px) for more explanation. However, if this become an issue and you would like to remove the offset, you can override it. ```offset``` is an Array ```[xOffset, yOffset]```

Calling ```skeleton.offset(value)``` will make the skeleton dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```skeleton.offset(value, true)```) to suppress the event.

<a name="width" href="Skeleton#width">#</a> skeleton.**width**([*value:Number*[*, doNotDispatch:Boolean*]])

Get/Set the total width for this skeleton. The innerWidth of the chart will be automatically recomputed using this formula:

```
innerWidth = skeleton.width() - skeleton.options().margin.left - skeleton.options().margin.right;
```

Calling ```skeleton.width(value)``` will make the skeleton dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```skeleton.width(value, true)```) to suppress the event.

<a name="height" href="Skeleton#height">#</a> skeleton.**height**([*value:Number*[*, doNotDispatch:Boolean*]])

Get/Set the total height for this skeleton. The innerHeight of the chart will be automatically recomputed using this formula:

```
innerHeight = skeleton.height() - skeleton.options().margin.top - skeleton.options().margin.bottom;
```

Calling ```skeleton.height(value)``` will make the skeleton dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument (```skeleton.height(value, true)```) to suppress the event.

<a name="dimension" href="Skeleton#dimension">#</a> skeleton.**dimension**([*dimension:Array*[*, doNotDispatch:Boolean*]])

Syntactic sugar for getting/setting both width and height at the same time. Will dispatch *resize* event only once. If you wish to suppress the *resize* event, pass ```true``` as the second argument. ```dimension``` is an Array ```[width, height]```.

<a name="autoResize" href="Skeleton#autoResize">#</a> skeleton.**autoResize**([*mode:String/Boolean*])

Enable/Disable auto-resizing. The ```mode``` argument can be the following:

* ```false``` - Disable auto-resizing
* ```true``` or ```'width'``` - Auto-resize to full width of the container
* ```'height'``` - Auto-resize to full height of the container
* ```'full'```, ```'both'``` or ```'all'``` - Auto-resize to full width and height of the container.

The auto-resizing is *DISABLED* by default.

<a name="autoResizeDetection" href="Skeleton#autoResizeDetection">#</a> skeleton.**autoResizeDetection**([*method:String*])

Get/Set how to detect the size change.

* ```'window'``` - Listen to *window.resize* event.
* ```'dom'``` - Listen to container's *resize* event. Only works if the container can dispatch *resize* event, either by [polling](http://hackersome.com/p/ramitos/resize) or other mechanisms.

The default method is ```'window'```.

<a name="autoResizeToAspectRatio" href="Skeleton#autoResizeToAspectRatio">#</a> skeleton.**autoResizeToAspectRatio**([*ratio:Number/Boolean*])

When the element is auto-resized, will maintain the *width/height* ratio. (For this to work, you must enable auto-resizing using ```skeleton.autoResize(...)``` first.)

* ```false``` or ```0``` - Disable auto-resizing to aspect ratio. (Does not disable overall auto-resizing, though.)
* *Number* - Will resize the skeleton to keep this aspect ratio within the bounding box of the container. It will not expand the size of the skeleton beyond the container.

The default ratio is ```false``` (DISABLED).

For example, to make your skeleton always a square:

```
skeleton.autoResize(true)
  .autoResizeToAspectRatio(1);
```

### Other functions

<a name="on" href="Skeleton#on">#</a> skeleton.**on**(*eventName*, *listener*)

Add an event listener to an event from this skeleton. Similar to [d3.dispatch.on](https://github.com/mbostock/d3/wiki/Internals#dispatch_on).

<a name="hasData" href="Skeleton#hasData">#</a> skeleton.**hasData**()

Return true if ```chart.data()``` is not null and not undefined.

<a name="hasNonZeroArea" href="Skeleton#hasNonZeroArea">#</a> skeleton.**hasNonZeroArea**()

Return true if ```inner width * inner height > 0```

<a name="mixin" href="Skeleton#mixin">#</a> skeleton.**mixin**(functions:Object)

Utility function for adding new functions to the skeleton object. Instead of:

```
function a(){...}
function b(){...}
function c(){...}
skeleton.drawCircle = a;
skeleton.drawRectangle = b;
skeleton.drawHexagon = c;
```

This will also work.

```
skeleton.mixin({
  drawCircle: a,
  drawRectangle: b,
  drawHexagon: c
});
```

<a name="resizeToFitContainer" href="Skeleton#resizeToFitContainer">#</a> skeleton.**resizeToFitContainer**(*mode*[*, doNotDispatch:Boolean*])

Resize the skeleton to fit its container. This is a one time resizing, not auto-resizing. Use [skeleton.autoResize](Skeleton#autoResize) instead for auto-resizing. The argument ```mode``` can be

* ```true``` or ```'width'``` - Resize to full width of the container
* ```'height'``` - Resize to full height of the container
* ```'full'```, ```'both'``` or ```'all'``` - Resize to full width and height of the container.

Calling this function will make the skeleton dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument. (```skeleton.resizeToFitContainer(value, true)```) to suppress the event.

<a name="resizeToAspectRatio" href="Skeleton#resizeToAspectRatio">#</a> skeleton.**resizeToAspectRatio**(*ratio*[*, doNotDispatch:Boolean*])

Resize the skeleton to specified *width/height* ratio. This is a one time resizing, not auto-resizing. Use [skeleton.autoResize](Skeleton#autoResize) and [skeleton.autoResizeToAspectRatio](Skeleton#autoResizeToAspectRatio) instead for auto-resizing.

Calling this function will make the skeleton dispatch event *resize*. If you do not wish to dispatch the *resize* event, you can pass *true* as the second argument. (```skeleton.resizeToAspectRatio(value, true)```) to suppress the event.

### Events

By default, the skeleton can dispatch these events out-of-the-box.

<a name="event_data" href="Skeleton#event_data">#</a> event: **data**

dispatched whenever the data are set via ```skeleton.data(value)```. Note that it the skeleton does not watch for changes in the data.

```
skeleton.on('data', function(data){ ... })
```

<a name="event_options" href="Skeleton#event_options">#</a> event: **options**

dispatched whenever the options are set via ```skeleton.options(value)```. Note that it the skeleton does not watch for changes in the options Object.

```
skeleton.on('options', function(options){ ... })
```

<a name="event_resize" href="Skeleton#event_resize">#</a> event: **resize**

dispatched whenever the dimension of the skeleton is changed. This could be due to changes in *width*, *height*, *margin* or *offset*.

```
skeleton.on('resize', function(info){ ... })
```

```info``` is an Array ```[width, height, innerWidth, innerHeight]```