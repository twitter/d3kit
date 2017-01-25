# Change logs

## v3.x.x

### 3.2.0
- Add `HybridChart`
- Implement plating systems with `SvgPlate`, `CanvasPlate` and `DivPlate`.

### 3.1.3
- Fix issue with CanvasChart when setting style `width` and `height` by adding `'px'`.

### 3.1.2
- Revert `options.offset` format from object `{ x, y }` to array `[x, y]` for consistency with v1-2.

### 3.1.1

- Use existing `fitOptions` when calling `.fit()` with no argument.
- Fix issue with fit watching when it does not resize as expected.

### 3.1.0

Change from using `DEFAULT_OPTIONS` variable to store default options to static function `.getDefaultOptions()` that creates and returns a new Object. This resolve issues when the value in the options is not plain Object (for example, a scale) and multiple chart instances try to access and modify the default value (scale).

### 3.0.0

Rewrite the chart abstraction in es6 and split `Skeleton` into `SvgChart` and `CanvasChart`, both extends from `AbstractChart`. The resize/auto-resize logic are revisited and published as another library called `slimfit`. (d3Kit wraps and includes slimfit by default.)

## v2.x.x

### 2.0.0 (2016-08-16)

Make d3Kit compatible with D3 v4. Key changes are due to:

- Removal of `d3.functor` and `d3.rebind`. Implement helper functions as replacements.
- API changes for `d3.dispatch`. Now use `dispatch.call('x', ...)` instead of `dispatch.x(...)`

The npm package also remove `d3` from `dependencies` and add `d3-selection` and `d3-dispatch` to `peerDependencies` instead.

In terms of development, switch from grunt to gulp and webpack and prepare to migrate each module to es2015.

## v1.x.x

### 1.1.0 (2016-04-07)

Add an option to select tag type for LayerOrganizer

```javascript
new LayerOrganizer(container); //will create layers as <g> by default
new LayerOrganizer(container, 'div'); // will create layers as <div>
```

### 1.0.11 (2016-02-23)

Change main file to point to `d3kit.min.js` instead of `d3kit.js`

### 1.0.10 (2016-02-17)

Update D3 version in the dependencies to 3.5.16

