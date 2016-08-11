> [Wiki](Home) ▸ [[API Reference]] ▸ **Factory**

## d3Kit.factory

<a name="createChart" href="Factory#createChart">#</a> d3Kit.factory.**createChart**(*defaultOptions*, *customEvents*, *constructor*)

Create a reusable chart and return a constructor function.

[d3Kit.Skeleton](Skeleton) help you easily create an ad-hoc chart. However, if you would like to reuse and create the same chart with different data, this function can help you. For example, below is how you would create a bubble chart. (See full example [here](http://bl.ocks.org/kristw/d8b15dd09a4c3510621c).)

```
var BubbleChart = d3Kit.factory.createChart(
  // First argument is the default options for this chart
  {
    margin: {top: 10, left:10, right:10, bottom:10}
  },
  // The second argument is an Array that contains
  // names of custom events from this chart.
  // In this example chart,
  // it will dispatch event "bubbleClick" when users click on a bubble.
  ['bubbleClick'],
  // The third argument is an internal constructor.
  // This is where you would implement a bubble chart
  // inside the passed skeleton.
  function(skeleton){
  	// Define scale, etc.
  	...

  	skeleton.on('data', visualize);

  	function visualize(){
  	  var data = skeleton.data();

	  var selection = skeleton.getRootG().selectAll('circle')
	  	.data(data);

	  selection.enter().append('circle')
	  	.attr('x', function(d){return x(d.x);})
	  	.attr('y', function(d){return y(d.y);});
  	}
  }
);
```

Then, to create two bubble charts with two different datasets:

```
new BubbleChart('#bubble-chart1').data(dataSet1);
new BubbleChart('#bubble-chart2').data(dataSet2);
```