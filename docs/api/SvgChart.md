> [Docs](../../TableOfContent.md) ▸ [API Reference](index.md) ▸ **SvgChart**

# SvgChart

This class extends from [AbstractChart](AbstractChart.md) and therefore inherits all fields and functions. These additional tasks are performed:

* Creates ```<svg>``` in side the container.
* Creates ```<g>``` within the ```<svg>``` using D3's [margin convention](http://bl.ocks.org/mbostock/3019563). This ```<g>``` is called the root ```<g>``` and can be accessed via `chart.rootG`.

## Constructor

```javascript
const chart = new SvgChart(container[, options]);
```

## Fields

<a name="layers" href="SvgChart.md#layers">#</a> chart.**layers**

Return the chart's internal layer organizer, which is a [LayerOrganizer](LayerOrganizer) that wraps the root ```<g>```.

<a name="rootG" href="SvgChart.md#rootG">#</a> chart.**rootG**

Return a D3 selection that is the root ```<g>``` element, to which you will append the rest of the elements for your chart.

<a name="svg" href="SvgChart.md#svg">#</a> chart.**svg**

Return a D3 selection that is the chart's ```<svg>``` element.
