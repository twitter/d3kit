var BubbleChart = d3Kit.factory.createChart(
  // First argument is the default options for this chart
  {
    margin: {top: 30, right: 60, bottom: 40, left: 60},
    initialWidth: 800,
    initialHeight: 400,
    color: d3.scaleOrdinal(d3.schemeCategory10),
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
    var layers = skeleton.getLayerOrganizer();
    var dispatch = skeleton.getDispatcher();
    var options = skeleton.options();

    layers.create(['content', 'x-axis', 'y-axis']);

    var x = d3.scaleLinear()
      .range([0, skeleton.getInnerWidth()]);

    var y = d3.scaleLinear()
      .range([0, skeleton.getInnerHeight()]);

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    var visualize = d3Kit.helper.debounce(function(){
      if(!skeleton.hasData()){
        d3Kit.helper.removeAllChildren(layers.get('content'));
        return;
      }
      var data = skeleton.data();

      x.domain(d3.extent(data, function(d){return d.x;}))
        .range([0, skeleton.getInnerWidth()]);
      y.domain(d3.extent(data, function(d){return d.y;}))
        .range([skeleton.getInnerHeight(), 0]);

      layers.get('x-axis')
        .attr('transform', 'translate(0,' + skeleton.getInnerHeight() + ')')
        .call(xAxis);

      layers.get('y-axis')
        .call(yAxis);

      var selection = layers.get('content').selectAll('circle')
        .data(data);

      selection.exit().remove();

      var sEnter = selection.enter().append('circle')
        .attr('cx', function(d){return x(d.x);})
        .attr('cy', function(d){return y(d.y);})
        .on('click', function(d,i){ dispatch.apply('bubbleClick', this, [d,i]); });

      var color = options.color;

      selection.merge(sEnter)
        .attr('cx', function(d){return x(d.x);})
        .attr('cy', function(d){return y(d.y);})
        .attr('r', function(d){return d.r;})
        .style('fill', function(d, i){return color(i);});

    }, 10);

    skeleton
      .on('options', visualize)
      .on('data', visualize);
  }
);

function generateBubbles() {
  var bubbles = [];

  for(var i=0;i<100;i++){
    bubbles.push({
      x: Math.random()*100,
      y: Math.random()*100,
      r: Math.random()*5+3
    });
  }

  return bubbles;
}

var chart = new BubbleChart('#chart')
  .data(generateBubbles())
  .on('bubbleClick', function() { console.log(arguments); });