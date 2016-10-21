 > [Docs](../../README.md) ▸ [API Reference](index.md) ▸ **CanvasChart**

# CanvasChart

This class extends from [AbstractChart](AbstractChart.md) and therefore inherits all fields and functions. In addition, this class also creates ```<canvas>``` in side the container.

## Constructor

```javascript
const chart = new CanvasChart(container[, options]);
```

* **options:Object** - There is an extra field `pixelRatio` to specify the resolution of the canvas. Default value is `window.devicePixelRatio`.

## Fields

<a name="canvas" href="CanvasChart.md#canvas">#</a> chart.**canvas**

Return a D3 selection of ```<canvas>``` element.

## Functions

<a name="getContext2d" href="CanvasChart.md#getContext2d">#</a> chart.**getContext2d**()

Return `context2d` that has been adjusted for scaling and margins.

<a name="clear" href="CanvasChart.md#clear">#</a> chart.**clear**()

Clear canvas
