 > [Docs](../../TableOfContent.md) ▸ [API Reference](index.md) ▸ **HybridChart**

# HybridChart

This class combines behaviors of [CanvasChart](CanvasChart.md) and [SvgChart](SvgChart.md), so it has both `<canvas>` and `<svg>`.

## Constructor

```javascript
const chart = new HybridChart(container[, options]);
```

* **options:Object** - There is an extra field `pixelRatio` to specify the resolution of the canvas. Default value is `window.devicePixelRatio`.

## Fields

#### inherits from `CanvasChart`

<a name="canvas" href="HybridChart.md#canvas">#</a> chart.**canvas**

Return a D3 selection of ```<canvas>``` element.

#### inherits from `SvgChart`

<a name="layers" href="SvgChart.md#layers">#</a> chart.**layers**

Return the chart's internal layer organizer, which is a [LayerOrganizer](LayerOrganizer) that wraps the root ```<g>```.

<a name="rootG" href="SvgChart.md#rootG">#</a> chart.**rootG**

Return a D3 selection that is the root ```<g>``` element, to which you will append the rest of the elements for your chart.

<a name="svg" href="SvgChart.md#svg">#</a> chart.**svg**

Return a D3 selection that is the chart's ```<svg>``` element.

## Functions

#### inherits from `CanvasChart`

<a name="clear" href="HybridChart.md#clear">#</a> chart.**clear**()

Clear canvas

<a name="getContext2d" href="HybridChart.md#getContext2d">#</a> chart.**getContext2d**()

Return `context2d` that has been adjusted for scaling and margins.

