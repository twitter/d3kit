> [Docs](../../README.md) ▸ [API Reference](index.md) ▸ **Chartlet**

** This component was in d3Kit v1-2, but has not been ported to v3 yet **

## d3Kit.Chartlet

Chartlets provide a way to break large, often entangled, chart code into smaller, reusable components.  The [Circle Chartlet](http://bl.ocks.org/treboresque/0f01e42fb3c9268d7105) provides the most simple, stripped down, example. Chartlets can be constructed from other chartlets, or even recursively call themselves - see the [Sierpinski Chartlet](http://bl.ocks.org/treboresque/28476a3ae1297af52d95) example. Chartlets feature:

* d3 enter/update/exit semantics
* named properties, who's values can are specified in the calling context
* custom events, which can be handled in the calling context
* support for transitions and other asynchronous action
* ability to inherit properties from parent chartlets

### How chartlets typically work

Typically a chart, which is going to use a chartlet, uses the d3 enter/update/exit system to create and position a number of ```<g>``` elements in the normal way.  The chartlet is called on the selection of those ```<g>```s, and adds addition DOM elements to them.

### Creating a charlet:

The following is taken from the [Circle Chartlet](http://bl.ocks.org/treboresque/0f01e42fb3c9268d7105) example, which creates ```<circle>``` elements.  Internally it implements ```enter()```, ```update()```, and ```exit()``` functions, which are passed into the chartlet constructor.  Each of those functions is passed a selection to operate on and a ```done()``` callback function to call when any asynchronous activity has finished.  Internally the done method is debounced so it may be called multiple times as shown.  If you call ```done()``` directly, pass the ```selection``` into it as the first parameter.

```javascript
function CircleChartlet() {

  var events = ['circleClicked'];

  var chartlet = d3Kit.Chartlet(enter, update, exit, events);

  function enter(selection, done) {
    selection
      .append('circle')
      .attr('r', 0)
      .attr('fill', 'white')
      .on('click', chartlet.getDispatcher().circleClicked);

    done(selection);
  }

  function update(selection, done) {
    selection.select('circle')
      .transition()
      .attr('fill', chartlet.property('color'))
      .attr('r', chartlet.property('radius'))
      .each('end', done);
  }

  function exit(selection, done) {
    selection.select('circle')
      .transition()
      .attr('r', 0)
      .remove()
      .each('end', done);
  }

  return chartlet;
};
```

### Using a charlet:

The following code paraphrases [Circle Chartlet](http://bl.ocks.org/treboresque/0f01e42fb3c9268d7105) to show how the chartlet might be used.  Note that the ```color``` and ```radius``` properties provide abstracted access to these values inside the chartlet.  The the chartlet's ```enter()```, ```update()```, and ```exit()``` methods are called during those phases the containing chart.

```javascript
var radiusScale = d3.scale.linear().range([10, 50]);
var colorScale = d3.scale.category20();

var circles = CircleChartlet()
  .property('radius', function(d, i) {return radiusScale(d.size);})
  .property('color', function(d, i) {return colorScale(i);});

var data = d3.range(20).map(function(i) {
  return {size: i, x: Math.random(), y: Math.random()};
});

var nodes = chart.getRootG().selectAll('g.node')
   .data(data);

// handle enter case

nodes.enter()
  .append('g')
  .classed('node', true)
  .call(circles.enter);

// handle exit case

nodes.exit()
  .call(circles.exit);

// handle update case

nodes
  .attr('transform', function(d) {return 'translate(' + [xScale(d.x), yScale(d.y)] + ')';})
  .call(circles.update);
```

## Constructor

<a name="constructor" href="Chartlet#constructor">#</a> new **d3Kit.Chartlet(**enterFunction, updateFuncton, exitFunction [, *customEventNames*]**)**

This creates a new chartlet with the specified **[enterFunction](Chartlet#enter)**,
**[updateFunction](Chartlet#update)** and **[exitFunction](Chartlet#exit)**.  An optional list of **customEventNames** may be passed which are used to configure the chartlet's dispatcher.

### Getter Functions

<a name="getDispatcher" href="Chartlet#getDispatcher">#</a> chartlet.**getDispatcher()**

Returns the chartlets's internal event dispatcher.  This dispatcher is an instance of d3.dispatch.

<a name="getCustomEvents" href="Chartlet#getCustomEvents">#</a> chartlet.**getCustomEvents()**

Returns the list of custom events which a given chartlet might dispatch.

<a name="getPropertyValue" href="Chartlet#getPropertyValue">#</a> chartlet.**getPropertyValue(***name, datum, datum_index***)**

Returns the value of a named property. This is typically called from inside the chartlet code, and thus the **datum** and **datum_index** are passed in as parameters as they may be needed to compute the property value.  This is the same as calling:

```javascript
chartlet.property('foo')(datum, datum_index);
```

### Getter/Setter Function

<a name="property" href="Chartlet#property">#</a> chartlet.**property(**name, [function_or_value]**)**

Either gets or sets the function which returns the value for a given chartlet named property.  If **function_or_value** is specified, then that property will be set to that function or value.  If a naked value is passed, it will be wrapped in a function.  In either case the original chartlet will be returned so that calls to **Chartlet.property** may be chained.

If **function_or_value** is omitted, then the a function will be returned, which  when called with a datum and datum_index, will return the value for the name property.

### Enter/Update/Exit Functions

These functions are typically called using d3's [selection.call()](https://github.com/mbostock/d3/wiki/Selections#call) to cause the chartlet code to execute and update the DOM.

<a name="enter" href="Chartlet#enter">#</a> chartlet.**enter(**selection**)**

This call performs the actions which will cause the chartlet to add new elements to a chart.

<a name="update" href="Chartlet#update">#</a> chartlet.**update(**selection**)**

This call performs the actions which will cause the chartlet to update existing elements in a chart.

<a name="exit" href="Chartlet#exit">#</a> chartlet.**exit(**selection**)**

This call performs the actions which will cause the chartlet to remove elements from a chart.

### Inheritance Functions

Chartlets can be composed of (aka contain) other chartlets.  These functions map properties and events between parent and children chartlets.

<a name="inheritPropertyFrom" href="Chartlet#inheritPropertyFrom">#</a> chartlet.**inheritPropertyFrom(**parent_chartlet, parent_property_name, [child_property_name]**)**

This function maps **parent_property_name** property from the **parent_chartlet** to the calling chartlet. If specified the property will be renamed to **child_property_name**.

<a name="inheritPropertiesFrom" href="Chartlet#inheritPropertiesFrom">#</a> chartlet.**inheritPropertiesFrom(**parent_chartlet, parent_property_names, [child_property_names]**)**

This function maps a list of **parent_property_names** properties from the **parent_chartlet** to the calling chartlet. If specified the properties will be renamed to **child_property_names**.

<a name="publishEventsTo" href="Chartlet#publishEventsTo">#</a> chartlet.**publishEventsTo(**dispatcher**)**

This function causes the chartlet to dispatch all it's events to the provided dispatcher. Typically you will pass the dispatcher from a parent chartlet to a child chartlet to pass all it's events up stream.

```javascript
childChartlet.publishEventsTo(parentChartlet.getDispatcher());
```

### Events

Chartlets dispatch a set of stock events to indicate completion of asynchronous activity during calls to [Chartlet.enter](Chartlet#enter), [Chartlet.update](Chartlet#update) or [Chartlet.exit](Chartlet#exit).  This allows calling code to chain action only after such asynchronous activity has completed.  Handlers of stock events will be passed the [d3.selection](https://github.com/mbostock/d3/wiki/Selections) that was being operated on.

Authors may also add custom events as needed for a specific chartlet.  Where possible, the handler of custom events should be passed the **datum** and **datum_index** associated with the element which is the source of the event.

<a name="on" href="Chartlet#on">#</a> chartlet.**on(**eventName, handlerFunction**)**

This function maps a **handlerFunction** to the specified **eventName**.

<a name="enterDone" href="Chartlet#enterDone">#</a> chartlet.**enterDone**

This event is fired when asynchronous activity in [Chartlet.enter](Chartlet#enter) has completed.  The handler of this event will be passed the [d3.selection](https://github.com/mbostock/d3/wiki/Selections) that was being operated on.

<a name="updateDone" href="Chartlet#updateDone">#</a> chartlet.**updateDone**

This event is fired when asynchronous activity in [Chartlet.update](Chartlet#update) has completed.  The handler of this event will be passed the [d3.selection](https://github.com/mbostock/d3/wiki/Selections) that was being operated on.

<a name="exitDone" href="Chartlet#exitDone">#</a> chartlet.**exitDone**

This event is fired when asynchronous activity in [Chartlet.exit](Chartlet#exit) has completed.  The handler of this event will be passed the [d3.selection](https://github.com/mbostock/d3/wiki/Selections) that was being operated on.